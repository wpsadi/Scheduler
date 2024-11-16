'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useUser } from '@/store/user/useUserStore'
import { useEmailStore } from '@/store/(auth)/useEmailStore'
import { useToast } from '@/hooks/use-toast'
import {useRouter} from "next/navigation"

export default function OtpVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState('')
  const {toast} = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const {userId} = useUser();
  const searchParams = useSearchParams()

  const purpose = searchParams.get('purpose')
  const phrase = searchParams.get('phrase')
  const {verifyEmail}= useEmailStore();

  useEffect(() => {
    if (!purpose || !phrase) {
      setShowAlert(true)
    }
  }, [purpose, phrase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    let verifySuccess = false
    await verifyEmail(userId as string,otp).then(()=>{
      verifySuccess=true
  
    }
  ).catch((e)=>{

    toast({
      title: 'Error',
      description: e.message,
      variant: 'destructive',
    })




    }).finally(()=>{
      setIsLoading(false)
    })

    if (verifySuccess) {
      toast({
        title: 'Success',
        description: 'Email verified successfully',
        variant: 'default',
      })
      router.push('/')
      
    }
   
  }

  if (showAlert) {
    return (
      <AlertDialog open={showAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Access Denied</AlertDialogTitle>
            <AlertDialogDescription>
              You are not allowed to access this page directly. Please ensure you have followed the correct link from your email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => window.location.href = '/'}>Return to Home</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>Enter the OTP sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p>Purpose: <span className='underline'>{purpose}</span></p>
            <p>Identification Phrase: <span className='font-bold'>{phrase}</span></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}