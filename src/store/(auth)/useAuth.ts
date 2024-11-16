import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { apiInstance } from "@/axiosInstance/apiInstance";
import { AxiosError } from "axios";
import { useUser } from "../user/useUserStore";

interface IAuthStore {
  hydrated: boolean;
  signup:(email:string,password:string,name:string)=>Promise<string>;
  signin:(email:string,password:string)=>Promise<void>;
  reinstateUser:()=>Promise<void>;
  setHydrated(): void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
      immer((set) => ({
        hydrated: false as boolean,

      signup:async(email,password,name)=>{
        try{
            useUser.setState({loadingUserStated:true,
              isLoggedIn:false,
                loadingUserFinished:false
            })

            const result = await apiInstance.post("/sign-up",{
                email,
                password,
                name
            })

            const data = result.data.data as {
                user:{
                    id:string,
                    email:string,
                    emailVerification:boolean
                },
                securityPhrase:string
            };

            console.log(data)

            useUser.setState({
                isLoggedIn:true,
                userId:data.user.id,
                email:data.user.email,
                verificationStatus:data.user.emailVerification,
                loadingUserStated:true,
                loadingUserFinished:true
            });

            return data.securityPhrase;

        }catch(e){
            useUser.setState({
                loadingUserStated:true,
                loadingUserFinished:true
            })

            
            if (e instanceof AxiosError){
                throw new Error(e.response?.data?.message || e.message)
            }

            if (e instanceof Error){
                throw new Error(e.message)
            }

            


            

            throw new Error("An unknown error occurred")

        }

      },


      signin:async(email,password)=>{
        try{
            useUser.setState({loadingUserStated:true,
                loadingUserFinished:false,
                isLoggedIn:false
            })

            const result = await apiInstance.post("/sign-in",{
                email,
                password,
            
            })

            const data = result.data.data as {
                user:{
                    id:string,
                    email:string,
                    emailVerification:boolean
                }
            };

            useUser.setState({
                isLoggedIn:true,
                userId:data.user.id,
                email:data.user.email,
                verificationStatus:data.user.emailVerification,
                loadingUserStated:true,
                loadingUserFinished:true
            });

            

        }catch(e){
            useUser.setState({
              loadingUserStated:true,
              loadingUserFinished:true
            })

            
            if (e instanceof AxiosError){
                throw new Error(e.response?.data?.message || e.message)
            }

            throw new Error("An unknown error occurred")

        }

      },

      reinstateUser:async ()=>{
        try{
          useUser.setState({
            isLoggedIn:false,
            loadingUserStated:true,
            loadingUserFinished:false
        })

        const result = await apiInstance.get("/user")

        const data = result.data.data as {
            user:{
                id:string,
                email:string,
                emailVerification:boolean
            }
        };

        useUser.setState({
            isLoggedIn:true,
            userId:data.user.id,
            email:data.user.email,
            verificationStatus:data.user.emailVerification,
            loadingUserStated:true,
            loadingUserFinished:true
        });


        }catch(e){
          useUser.setState({
            loadingUserStated:true,
            loadingUserFinished:true
        })

        
        if (e instanceof AxiosError){
            throw new Error(e.response?.data?.message || e.message)
        }

        throw new Error("An unknown error occurred")
        }
      },






      setHydrated() {
        set({ hydrated: true });
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);