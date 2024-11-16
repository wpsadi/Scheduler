'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Github } from 'lucide-react'

export default function GitHubCheckRedirect() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [hasGitHubCredentials, setHasGitHubCredentials] = useState(false)
  const [progress, setProgress] = useState(0)
  const [githubUsername, setGithubUsername] = useState('')
  const [githubRepo, setGithubRepo] = useState('')

  useEffect(() => {
    const checkGitHubCredentials = async () => {
      // Simulate API call to check GitHub credentials
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // For demonstration, we'll randomly decide if credentials exist
      const credentialsExist = Math.random() > 0.5
      setHasGitHubCredentials(credentialsExist)
      setIsChecking(false)

      if (credentialsExist) {
        // If credentials exist, start the "preparing" progress
        let progressValue = 0
        const interval = setInterval(() => {
          progressValue += 10
          setProgress(progressValue)
          if (progressValue >= 100) {
            clearInterval(interval)
            router.push('/config-editor')
          }
        }, 500)
      }
    }

    checkGitHubCredentials()
  }, [router])

  const handleGitHubConnect = () => {
    console.log('Connecting to GitHub:', { githubUsername, githubRepo })
    // Implement GitHub connection logic here
    // After successful connection, you would typically redirect to the config editor
    router.push('/config-editor')
  }

  if (isChecking) {
    return (
      <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Checking GitHub Credentials</CardTitle>
            <CardDescription>Please wait while we verify your GitHub connection</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={33} className="w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (hasGitHubCredentials) {
    return (
      <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Preparing Your Configuration</CardTitle>
            <CardDescription>Setting up your environment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center">
              We're getting everything ready for you. You'll be redirected to the configuration editor in a few moments.
            </p>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              Initializing your workspace...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Connect to GitHub</CardTitle>
          <CardDescription>Link your GitHub account to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            To create and manage your configurations, we need to connect to your GitHub account. This allows us to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Store your configurations securely</li>
            <li>Track changes to your configurations</li>
            <li>Collaborate with team members (if applicable)</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Github className="mr-2 h-4 w-4" /> Connect GitHub Repository
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card text-card-foreground">
              <DialogHeader>
                <DialogTitle>Connect to GitHub</DialogTitle>
                <DialogDescription>
                  Enter your GitHub details to connect your repository.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="github-username">GitHub Username</Label>
                  <Input
                    id="github-username"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder="Enter your GitHub username"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="github-repo">GitHub Repository</Label>
                  <Input
                    id="github-repo"
                    value={githubRepo}
                    onChange={(e) => setGithubRepo(e.target.value)}
                    placeholder="Enter your GitHub repository name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleGitHubConnect}>Connect Repository</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}