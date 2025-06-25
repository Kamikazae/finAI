import {prisma} from './db';
import bcrypt from 'bcrypt'

export const hashPassword=async(password:string)=>{
    return await bcrypt.hash(password,10)
}

export const verifyPassword=async(password:string,hashPassword:string)=>{
    return await bcrypt.compare(password,hashPassword)
}

export const getUserByEmail=async(email:string)=>{
    return await prisma.user.findUnique({where:{email}});
};

export const getCurrentUser=async (email:string)=>{
    return await prisma.user.findUnique({
        where:{email},
        include:{transactions:true}
    });
};