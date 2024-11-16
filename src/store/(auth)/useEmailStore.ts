import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AxiosError } from "axios";
import { apiInstance } from "@/axiosInstance/apiInstance";
import { useUser } from "../user/useUserStore";

interface IEmailStore {
  hydrated: boolean;
    resendVerification: (email: string) => Promise<string>;
    verifyEmail: (userId: string,otp:string) => Promise<void>;
  

  setHydrated(): void;
}

export const useEmailStore = create<IEmailStore>()(
  persist(
    immer((set) => ({
      hydrated: false,
      resendVerification:async(email)=>{
        try{
            if (useUser.getState().verificationStatus){
                throw new AxiosError("Email is already verified")
            }
            const result = await apiInstance.post("/send-verify-email",{
                email
            })

            return result.data.data.phrase as string;
        }catch(e){
            if (e instanceof AxiosError){
                throw new Error(e.response?.data?.message || e.message)
            }


    
            throw new Error("An unknown error occurred")
            
        }
      },

      async verifyEmail(userId, otp) {
        try{
            if (useUser.getState().verificationStatus){
                throw new AxiosError("Email is already verified")
            }
            await apiInstance.post("/verify-email",{
                userId:userId,
                otp
            })
            useUser.setState({
                verificationStatus:true
            })
        }catch(e){
            if (e instanceof AxiosError){
                throw new Error(e.response?.data?.message || e.message)
            }
            if (e instanceof Error){
                throw new Error(e.message)
            }
            throw new Error("An unknown error occurred")
        }
          
      },

      setHydrated() {
        set({ hydrated: true });
      },
    })),
    {
      name: "email",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
