import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import db from '@/db/db';
import { usersTable } from '@/db/index';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const data = await currentUser()

    if (!data) {
      return new Response('Unauthorized', { status: 401 })
    }

    const user: typeof usersTable.$inferInsert = {
      name: data.firstName + ' ' + data.lastName,
      clerkId: data.id,
      email: data.emailAddresses[0].emailAddress,
    }

    const result = await db.select().from(usersTable).where(eq(usersTable.email, user.email));

    if (result.length === 0) {
      await db.insert(usersTable).values(user);
    }

    return NextResponse.redirect(new URL('/dashboard', process.env.FRONTEND_URL).toString());
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/', process.env.FRONTEND_URL).toString());
  }
}