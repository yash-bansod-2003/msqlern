import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session';
import { v4 as uuid } from 'uuid';
import { db } from '@/lib/db';
import { Role } from '@prisma/client';

export async function POST(req: Request) {
    /* Auth Check */
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

        const { name, image } = await req.json()

        if (!name || !image) {
            return new NextResponse("name or image cant be empty or null", { status: 402 });
        }

        const dbServer = await db.server.create({
            data: {
                userId: dbUser.id,
                name,
                image,
                inviteCode: uuid(),
                channels: {
                    create: [
                        { name: "general", userId: dbUser.id }
                    ]
                },
                members: {
                    create: [
                        { userId: dbUser.id, role: Role.ADMIN }
                    ]
                }
            }
        });

        if (!dbServer) {

        }


        return NextResponse.json({ status: "hello" })
    } catch (error) {
        console.log("[SERVER_POST] ", error);
        return new NextResponse("internal server error", { status: 500 });
    }
}