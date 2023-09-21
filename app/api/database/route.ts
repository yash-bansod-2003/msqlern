import { NextResponse } from 'next/server'
import { db } from "@/lib/db";
import { getCurrentUser } from '@/lib/session';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
    const user = await getCurrentUser();
    if (!user) {
        return new NextResponse("unauthorize", { status: 401 });
    }

    try {
        const dbUser = await db.user.findFirst({
            where: {
                id: user?.id
            }
        });
        if (!dbUser) {
            return new NextResponse("unauthorize", { status: 401 });
        }

        const { query } = await req.json()

        if (!query) {
            return new NextResponse("query can't be empty or null", { status: 402 });
        }

        console.log(query);

        const dbResult = await db.$queryRawUnsafe(query);

        if (!dbResult) {
            return new NextResponse("something went wrong", { status: 500 });
        }

        return NextResponse.json(dbResult)
    } catch (error) {
        console.log("[SERVER_POST] ", error);
        return new NextResponse("internal server error", { status: 500 });
    }
}