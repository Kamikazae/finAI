import { NextRequest,NextResponse } from "next/server";
import {prisma} from '@/lib/db';
import { hashPassword } from "@/lib/auth";

export async function POST (request: NextRequest){
    try{
        const {email,password}=await request.json();
        if(!email || !password){
            return NextResponse.json(
                {error:'Email and password are required'},
                {status: 400}
            );
        }
            const existingUser=await prisma.user.findUnique({
                where:{email}
            })
            if(existingUser){
                return NextResponse.json(
                    {error:'User with this email already exits'},
                    {status:400}
                );
            }
            const hashedPassword=await hashPassword(password)
            const newUser=await prisma.user.create({
                data:{
                    email,
                    password:hashedPassword
                }
            });
            return NextResponse.json({
                success:true,
                message:'User created successfully',
                userId:newUser.id
            });
        
    } catch(error){
        return NextResponse.json({
            error:'Internal server error'
        },
    {status:500});
    }
}