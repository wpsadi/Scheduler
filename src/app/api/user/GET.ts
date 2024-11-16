

import {  retrieveAuthCookieToken, setSessionConfig } from "@/app/(cookies)/(auth)/cookies";
import { errorHandler, successHandler } from "../handler";

import { clientAppwrite } from "@/config/appwrite.config";

export const GET =async ()=>{
try{
 
    const {account,client} = await clientAppwrite();
    await setSessionConfig(client);

    const token = await retrieveAuthCookieToken()

    console.log(token)


//    return successHandler(session)
    const accountInfo = await account.get();
    // // return successHandler({suc:1}) 
    return successHandler({
      user:{
        userId:accountInfo.$id,
        email:accountInfo.email,
        emailVerification: accountInfo.emailVerification
      }
    })
}catch(e){
    return errorHandler(e)
}
}