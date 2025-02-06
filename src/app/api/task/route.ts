import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server'
import db from '@/db/db';
import { tasks } from '@/db/index';
import { eq, and, desc } from 'drizzle-orm';
import { z } from 'zod';
import { createTaskSchema, updateTaskSchema } from '@/lib/zodSchema';


export async function GET(request: NextRequest) {
    const projectIdSchema = z.number().min(1, "Project ID is required");
    try {

        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Error: No signed in user' }, { status: 401 })
        }

        const searchParams = request.nextUrl.searchParams;
        const projectId = Number(searchParams.get('projectId'));
        const result = projectIdSchema.safeParse(projectId);

        let tasksList;
        if (!result.success || projectId === 0) {
            tasksList = await db.select().from(tasks).where(eq(tasks.user_id, userId)).orderBy(desc(tasks.id));
        } else {
            tasksList = await db.select().from(tasks).where(
                and(
                    eq(tasks.user_id, userId),
                    eq(tasks.projectId, Number(projectId))
                )
            ).orderBy(desc(tasks.id));
        }


        return NextResponse.json(tasksList, { status: 200 });
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

        const { taskData: data, projectId } = await request.json();
        const result = createTaskSchema.safeParse(data);

        if (!result.success) {
            return NextResponse.json({ error: result.error.errors.map(e => e.message).join(", ") }, { status: 400 });
        }

        const value: typeof tasks.$inferInsert = {
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: 'not-started',
            user_id: userId,
            ...(projectId && projectId !== 'all' && { projectId: projectId }),
            category: data.category,
            deadline: data.deadline,
        };

        const task = await db.insert(tasks).values(value).returning();

        return NextResponse.json(task, { status: 201 });
    } catch (e) {
        console.log(e);
        return NextResponse.error();
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Error: No signed in user' }, { status: 401 })
        }

        const data = await request.json();
        const result = updateTaskSchema.safeParse(data);

        if (!result.success) {
            return NextResponse.json({ error: result.error.errors.map(e => e.message).join(", ") }, { status: 400 });
        }

        const task = await db.update(tasks).set({ status: data.status }).where(
            and(
                eq(tasks.id, data.id),
                eq(tasks.user_id, userId)
            )
        );

        return NextResponse.json(task, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.error();
    }
}

export async function DELETE(request: NextRequest) {
    const deleteTaskSchema = z.string().min(1, "Task ID is required");
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Error: No signed in user' }, { status: 401 })
        }

        const data = await request.json();
        const result = deleteTaskSchema.safeParse(data);

        if (!result.success) {
            return NextResponse.json({ error: result.error.errors.map(e => e.message).join(", ") }, { status: 400 });
        }

        const task = await db.delete(tasks).where(
            and(
                eq(tasks.id, data.id),
                eq(tasks.user_id, userId)
            )
        );

        return NextResponse.json(task, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.error();
    }
}