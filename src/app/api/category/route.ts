import { NextResponse } from 'next/server';
import db from '@/db/db';
import { categories } from '@/db/index';

export async function GET() {
    try {
        const categoriesList = await db.select().from(categories);

        return NextResponse.json(categoriesList, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.error();
    }
}