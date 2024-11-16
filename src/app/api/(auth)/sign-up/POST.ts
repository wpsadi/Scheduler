import type { NextRequest } from "next/server";
import { errorHandler, successHandler } from "../../handler";
import { signUpSchema } from "@/validations/(auth)/sign-up";
import { AppwriteException, ID } from "node-appwrite";
import httpError from "http-errors";

// import { setAuthCookie, setSessionConfig } from "@/app/(cookies)/(auth)/cookies";
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

        const validation = signUpSchema.safeParse(body);

        if (!validation.success){
            throw new AppwriteException(validation.error.errors[0].message,(new httpError.BadRequest().statusCode));
        }

        const validatedData = validation.data;

        
        // creating account
        const {account:accountA} = await adminAppwriteClient()
        const user = await  accountA.create(
            ID.unique(),
            validatedData.email,
            validatedData.password,
            validatedData.name
        )








        // // create a session for the user

        // const session = await accountA.createEmailPasswordSession(user.email,validatedData.password);



     


        // await setAuthCookie(session);

        const  {account} = await clientAppwrite();
    
        // await setSessionConfig(client)


        // sending email verification
        const securityPhrase = await account.createEmailToken(user.$id,user.email,true);






        // const thisSess = await account.get();

        // console.log(thisSess)

        return successHandler({
            user:{
                id:user.$id,
                email:user.email,
                emailVerification:user.emailVerification
            },
            securityPhrase:securityPhrase.phrase,
            // session
        })
        

    }catch(e){
        return errorHandler(e)
    }
}