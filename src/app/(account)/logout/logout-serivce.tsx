'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function LogoutPage() {
    const logoutBtnRef = useRef<HTMLButtonElement>(null)
  const [showDialog, setShowDialog] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // Perform logout logic here
    console.log("User logged out")
    // Redirect to login page or home page after logout
    router.push('/login')
  }


  const handleCancel = () => {
    setShowDialog(false)
    // Go back to the previous page in history
    router.back()
  }

  useEffect(()=>{
    logoutBtnRef?.current?.click()
  },[router])

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-300 flex items-center justify-center">
      <div className="text-center">
        {/* <h1 className="text-2xl font-semibold text-white mb-4">Logout</h1> */}
        <Button className='hidden' ref={logoutBtnRef} onClick={() => setShowDialog(true)}>Logout</Button>

        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent className="bg-[#1A1A1A] border-gray-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Are you sure you want to logout?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                This action will log you out of this device.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel} className="bg-gray-800 text-white hover:bg-gray-700">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} className="bg-red-600 text-white hover:bg-red-700">Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}