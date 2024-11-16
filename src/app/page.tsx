"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Users, Zap } from 'lucide-react'
import { useUser } from '@/store/user/useUserStore'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const {isLoggedIn,loadingUserFinished,loadingUserStated,userId} = useUser()
  const router = useRouter();

  console.log(isLoggedIn,loadingUserFinished,loadingUserStated,userId)

  if (!(loadingUserStated && loadingUserFinished)) {
    return (
      <div className="dark min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (isLoggedIn && userId !==null) {
    return router.push("/dashboard/orgs")
  }


  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">SchedulePro</h1>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Create Your Perfect Schedule</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Effortlessly plan your day, week, or month with our intuitive scheduling platform.
          </p>
          <Button size="lg" asChild>
            <Link href="/sign-up">Start Scheduling Now</Link>
          </Button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Calendar className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Flexible Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Create daily, weekly, or monthly schedules that fit your lifestyle.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Time Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Optimize your time with intelligent scheduling suggestions.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Share schedules and coordinate with team members or friends.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Productivity Boost</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Increase your efficiency with our powerful scheduling tools.</CardDescription>
            </CardContent>
          </Card>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Time?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who have transformed their productivity with SchedulePro.
          </p>
          <Button size="lg" asChild>
            <Link href="/sign-up">Create Your Free Account</Link>
          </Button>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2023 SchedulePro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}