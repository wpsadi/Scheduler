

import {  setAuthCookie, setSessionConfig } from "@/app/(cookies)/(auth)/cookies";


import { adminAppwriteClient} from "@/config/appwrite.config";
import { errorHandler, successHandler } from "../../handler";
import { NextRequest } from "next/server";
import { AppwriteException } from "node-appwrite";
import httpError from "http-errors";
import { verifyEmailSchema } from "@/validations/(auth)/verify-email";

export const POST =async (req:NextRequest)=>{
try{
    const body = await req.json();
    const {userId,otp} =body ;

    if (!userId || !otp){
        throw new AppwriteException("User ID and OTP are required",(new httpError.BadRequest().statusCode));
    }

    const validation = verifyEmailSchema.safeParse(body);

    if (!validation.success){
        throw new AppwriteException(validation.error.errors[0].message,(new httpError.BadRequest().statusCode));
    }

    const validatedData= validation.data;
 
    const {account,client} = await adminAppwriteClient();
    await setSessionConfig(client);



    const session = await account.createSession(
        validatedData.userId,
        validatedData.otp.toString()
    );


    

     


    await setAuthCookie(session);








    


//    return successHandler(session)
   
    // // return successHandler({suc:1}) 
    return successHandler({session},"Email verified successfully",200);
}catch(e){
    return errorHandler(e)
}
}