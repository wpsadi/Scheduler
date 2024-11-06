'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Check, AlertTriangle } from 'lucide-react'
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

import { ToastAction } from "@/components/ui/toast"
import { useToast } from '@/hooks/use-toast'

export function NewPassword() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  })
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')

  useEffect(() => {
    if (!userId || !secret) {
      setShowAlert(true)
    }
  }, [userId, secret])

  useEffect(() => {
    setPasswordStrength({
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    })
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure both passwords are the same.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return
    }
    if (!Object.values(passwordStrength).every(Boolean)) {
      toast({
        variant: "destructive",
        title: "Password does not meet requirements",
        description: "Please ensure your password meets all the listed criteria.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return
    }
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Handle password update logic here
    console.log('Updating password for user:', userId, 'with secret:', secret)
    toast({
      title: "Password updated successfully",
      description: "Your new password has been set.",
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    })
    router.push("/sign-in")
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
          <CardTitle>Set New Password</CardTitle>
          <CardDescription>Please enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 text-sm">
              <p>Password must meet the following criteria:</p>
              <ul className="list-inside list-disc space-y-1">
                <li className={passwordStrength.length ? 'text-green-500' : 'text-red-500'}>
                  At least 12 characters long
                </li>
                <li className={passwordStrength.uppercase ? 'text-green-500' : 'text-red-500'}>
                  Contains at least one uppercase letter
                </li>
                <li className={passwordStrength.lowercase ? 'text-green-500' : 'text-red-500'}>
                  Contains at least one lowercase letter
                </li>
                <li className={passwordStrength.number ? 'text-green-500' : 'text-red-500'}>
                  Contains at least one number
                </li>
                <li className={passwordStrength.special ? 'text-green-500' : 'text-red-500'}>
                  Contains at least one special character
                </li>
              </ul>
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Password...
                </>
              ) : (
                'Set New Password'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}