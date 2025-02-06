import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server'
import db from '@/db/db';
import { tasks } from '@/db/index';
import { sql } from 'drizzle-orm';
import { z } from 'zod';
import { format } from 'date-fns';



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

        const currentDate = new Date();
        const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');

        let projectCondition = sql``;
        if (result.success || projectId !== 0) {
            projectCondition = sql`AND project_id = ${projectId}`;
        }

        const analytics = await db.execute(sql`
            SELECT
                COUNT(*) AS totalTasks_count,
                COUNT(*) FILTER (WHERE status = 'completed') AS completedTask,
                COUNT(*) FILTER (WHERE status = 'in-progress') AS ongoingTask,
                COUNT(*) FILTER (WHERE status = 'not-started') AS dueTask,
                (
                    SELECT json_agg(t)
                    FROM (
                        SELECT id, title, deadline
                        FROM ${tasks}
                        WHERE deadline >= ${formattedCurrentDate}
                        AND user_id = ${userId}
                        ${projectCondition}
                        ORDER BY deadline ASC
                        LIMIT 4
                    ) t
                ) AS upComingDeadline
            FROM ${tasks}
            WHERE user_id = ${userId}
            ${projectCondition}
        `);


        return NextResponse.json(analytics.rows[0], { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.error();
    }
}