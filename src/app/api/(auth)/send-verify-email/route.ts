

import {  setSessionConfig } from "@/app/(cookies)/(auth)/cookies";


import { clientAppwrite } from "@/config/appwrite.config";
import { errorHandler, successHandler } from "../../handler";
import { AppwriteException } from "node-appwrite";
import { NextRequest } from "next/server";
import httpError from "http-errors";
import { sendVerifyEmailSchema } from "@/validations/(auth)/send-verify-email";

export const POST =async (req:NextRequest)=>{
try{
    const {email} = await req.json();

    if (!email){
        throw new AppwriteException("Email is required",(new httpError.BadRequest().statusCode));
    }

    const validation = sendVerifyEmailSchema.safeParse({email});

    if (!validation.success){
        throw new AppwriteException(validation.error.errors[0].message,(new httpError.BadRequest().statusCode));
    }


 
    const {account,client} = await clientAppwrite();
    await setSessionConfig(client);


    const user = await account.get();


    // sending verification email
    const emailVerification = await account.createEmailToken(user.$id,user.email,true);


    return successHandler({
        phrase:emailVerification.phrase
    },"Verification email sent",200);


    
}catch(e){
    return errorHandler(e)
}
}