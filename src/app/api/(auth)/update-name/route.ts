

import {  setSessionConfig } from "@/app/(cookies)/(auth)/cookies";


import { clientAppwrite } from "@/config/appwrite.config";
import { errorHandler, successHandler } from "../../handler";
import { NextRequest } from "next/server";

export const POST =async (req:NextRequest)=>{

try{

    const body = await req.json();
    const {name} = body;

    if (!name){
        throw new Error("Name is required");
    }
 
    const {account,client} = await clientAppwrite();
    await setSessionConfig(client);



    const accountInfo = await account.updateName(name);
    // // return successHandler({suc:1}) 
    return successHandler({account:accountInfo},"Name updated successfully",200);
}catch(e){
    return errorHandler(e)
}
}