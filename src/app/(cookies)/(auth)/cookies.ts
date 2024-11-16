
import { cookies } from "next/headers";
import {Client, Models} from "node-appwrite"

const cookieName = "auth";


export const setAuthCookie = async (session:Models.Session) =>{
    const cookieStore = await cookies();

  

    cookieStore.set(cookieName,session.secret,{
        expires: new Date(session.expire),
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
        
    })
return session.secret;
}

export const retrieveAuthCookieToken =async ():Promise<string> =>{

    const cookieStore = await cookies();

    

    const IsPresentCookie = cookieStore.has(cookieName);

    if (!IsPresentCookie){
        return "";
    }

    const cookieValue = cookieStore.get(cookieName)?.value as string;

    return cookieValue 


}

export const setSessionConfig = async (client:Client)=>{
    const session = await retrieveAuthCookieToken();
    if (!session){
        return;
    }

    
    await client.setSession(session)
   
    ;
}