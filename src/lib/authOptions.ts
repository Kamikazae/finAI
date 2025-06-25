 import { NextAuthOptions } from "next-auth";
 import  CredentialsProvider  from "next-auth/providers/credentials";
 import {prisma} from "@/lib/db";
 import { verifyPassword } from "./auth";

 export const authOptions: NextAuthOptions={
    providers:[
        CredentialsProvider({
        name:'Credentials',
        credentials:{
            email:{label:'Email',type:"email"},
            password:{label:'Password',type:"password"}
        },
        async authorize(credentials){
            if(!credentials) return null;
        const user=await prisma.user.findUnique({
            where:{email:credentials.email}
        })
        if(!user) return null;
        const isValid=await verifyPassword (credentials.password,user.password);
        return isValid ? {id:user.id,email:user.email} : null;
        }
        })
    ],
    callbacks:{
        session:({session,token})=>({  //a function that takes an object with session and token and keep everything except add id to the token
            ...session,
            user:{
                ...session.user,
                id:token.sub
            }
        }),
    },
    session:{
        strategy:'jwt' //how to store the token
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/login', //a custom login page
    }
};