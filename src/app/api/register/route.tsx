import bcrypt from "bcrypt";
import prisma from '@/libs/prismaDB'
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json();
    const { name, email, password } = body;

    if(!name || !email || !password){
        return new NextResponse('Missing Fields', { status: 400})
    }

    const alreadyExist = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(alreadyExist){
        return new NextResponse('Email already Exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword,
        }
    })

    return NextResponse.json(user)
}