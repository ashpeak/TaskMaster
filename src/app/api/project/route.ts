import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server'
import db from '@/db/db';
import { projectsTable, tasks } from '@/db/index';
import { eq, and, desc, sql } from 'drizzle-orm';
import { createProjectSchema, deleteProjectSchema } from '@/lib/zodSchema';


export async function GET() {
    try {

        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Error: No signed in user' }, { status: 401 });
        }

        const projectsList = await db
            .select({
                task_count: sql`COUNT(${tasks.id})`,
                id: projectsTable.id,
                title: projectsTable.title,
                description: projectsTable.description,
                user_id: projectsTable.user_id,
                priority: projectsTable.priority,
            })
            .from(projectsTable)
            .leftJoin(tasks, eq(projectsTable.id, tasks.projectId))
            .where(eq(projectsTable.user_id, userId))
            .groupBy(projectsTable.id)
            .orderBy(desc(projectsTable.id));

        return NextResponse.json(projectsList, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.error();
    }
}

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Error: No signed in user' }, { status: 401 })
        }

        const data = await request.json();
        const result = createProjectSchema.safeParse(data);

        if (!result.success) {
            return NextResponse.json({ error: result.error.errors.map(e => e.message).join(", ") }, { status: 400 });
        }

        const value: typeof projectsTable.$inferInsert = {
            title: data.title,
            description: data.description,
            user_id: userId,
            priority: data.priority,
        };

        const project = await db.insert(projectsTable).values(value).returning();


        return NextResponse.json(project, { status: 201 });
    } catch (e) {
        console.log(e);
        return NextResponse.error();
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Error: No signed in user' }, { status: 401 })
        }

        const data = await request.json();
        const result = deleteProjectSchema.safeParse(data);

        if (!result.success) {
            return NextResponse.json({ error: result.error.errors.map(e => e.message).join(", ") }, { status: 400 });
        }

        const project = await db.delete(projectsTable).where(
            and(
                eq(projectsTable.user_id, userId),
                eq(projectsTable.id, Number(data.id))
            )
        );

        return NextResponse.json(project, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.error();
    }
}