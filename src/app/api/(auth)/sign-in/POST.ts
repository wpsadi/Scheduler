import type { NextRequest } from "next/server";
import { errorHandler, successHandler } from "../../handler";
import { AppwriteException,} from "node-appwrite";
import httpError from "http-errors";

import { signInSchema } from "@/validations/(auth)/sign-in";
import { setAuthCookie} from "@/app/(cookies)/(auth)/cookies";
import { adminAppwriteClient, clientAppwrite } from "@/config/appwrite.config";


export const POST = async (req:NextRequest)=>{
    try{
        const body = await req.json();

        const {email,password} = body;

        // if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        //     throw new AppwriteException("You cannot create an account with this email and password",(new httpError.BadRequest().statusCode));
        // }

        if (!email || !password){
            throw new AppwriteException("Email and password are required",(new httpError.BadRequest().statusCode));
        }

        const validation = signInSchema.safeParse(body);

        if (!validation.success){
            throw new AppwriteException(validation.error.errors[0].message,(new httpError.BadRequest().statusCode));
        }

        const validatedData = validation.data;


        console.log(validatedData)

       
        
        // logging account
        const {account} = await adminAppwriteClient()
        const session = await  account.createEmailPasswordSession(validatedData.email,validatedData.password)

        console.log(session)


       



      await setAuthCookie(session);
        



      const {client:client2,account:accountSelf} = await clientAppwrite()
      client2.setSession(session.secret);


        const user = await accountSelf.get();








        return successHandler({
            user:{
                
                id:user.$id,
                email:user.email,
                emailVerification:user.emailVerification


            }
        })
        

    }catch(e){
        return errorHandler(e)
    }
}