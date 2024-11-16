

import {  setSessionConfig } from "@/app/(cookies)/(auth)/cookies";


import { clientAppwrite } from "@/config/appwrite.config";
import { errorHandler, successHandler } from "../../handler";
import { AppwriteException } from "node-appwrite";
import { NextRequest } from "next/server";
import httpError from "http-errors";
import { sendPasswordRecoverySchema } from "@/validations/(auth)/send-password-recovery";


export const POST =async (req:NextRequest)=>{
try{
    const body = await req.json();

    const {email,url} = body;

    if (!email || !url){
        throw new AppwriteException("Email and URL are required ",(new httpError.BadRequest().statusCode));
    }



    const validation = sendPasswordRecoverySchema.safeParse(body);

    if (!validation.success){
        throw new AppwriteException(validation.error.errors[0].message,(new httpError.BadRequest().statusCode));
    }


 
    const {account,client} = await clientAppwrite();
    await setSessionConfig(client);



    // sending password recovery  email
    const passRecovery = await account.createRecovery(validation.data.email,validation.data.url);



    return successHandler(passRecovery,"Recovery mail sent to your device",200);


    
}catch(e){
    return errorHandler(e)
}
}