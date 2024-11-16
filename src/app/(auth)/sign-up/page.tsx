'use client'

import { useState } from 'react'
import { Eye, EyeOff, Github, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { useAuthStore } from '@/store/(auth)/useAuth'
import { useUser } from '@/store/user/useUserStore'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const {toast} = useToast();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {signup} = useAuthStore();
  const router = useRouter();
  const {isLoggedIn} = useUser();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call

    let signUpSuccess = false;
    let securityPhrase = "";
    await signup(email,password,"User").then((e)=>{
      signUpSuccess = true;

      securityPhrase = e;
    }).catch((e)=>{
      console.log(e)
      toast({
        title:"Error",
        description:e.message,
        variant:"destructive"
      })

    }).finally(()=>{
      setIsLoading(false)
      if (isLoggedIn){
        toast({
          title:"Success",
           description:"Account created successfully",
          variant:"default"
        })
        
        
      }
      
     
    
    })

    console.log(signUpSuccess)

    if (!signUpSuccess){
      return;
    }

    // Redirect to email verification page
    router.push(`/verify-recovery-code?phrase=${securityPhrase}&purpose=Account Creation Verification`)
  

  }

  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <Separator className="my-4" />
            <span>or</span>
            <Separator className="my-4" />
          </div>
          <Button variant="outline" className="w-full" onClick={() => console.log('Continue with GitHub')}>
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}