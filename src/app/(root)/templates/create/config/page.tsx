'use client'

import { useState } from 'react'
import JsonEditor from "@/components/monaco-editor"
import { jsonSchema } from "./schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, GitCommit, Github } from 'lucide-react'
import { useRouter } from 'next/navigation'

const boiler = {
  "name": "Major's Datesheet",
  "description": "Exam schedule for Major's exams from December 2024 to January 2025",
  "timezone": "UTC",
  "allowCustomization": false,
  "events": [
    {
      "id": "event-001",
      "title": "FCS Exam",
      "description": "Major exam for FCS (Fundamentals of Computing Systems)",
      "start": "2024-12-26T10:00:00Z",
      "end": "2024-12-26T13:00:00Z",
      "isAllDay": false
    },
    {
      "id": "event-002",
      "title": "DLCD Exam",
      "description": "Major exam for DLCD (Digital Logic and Circuit Design)",
      "start": "2024-12-27T10:00:00Z",
      "end": "2024-12-27T13:00:00Z",
      "isAllDay": false
    },
    {
      "id": "event-003",
      "title": "OS Exam",
      "description": "Major exam for OS (Operating Systems)",
      "start": "2024-12-30T10:00:00Z",
      "end": "2024-12-30T13:00:00Z",
      "isAllDay": false
    },
    {
      "id": "event-004",
      "title": "OOPS Exam",
      "description": "Major exam for OOPS (Object-Oriented Programming Systems)",
      "start": "2025-01-03T10:00:00Z",
      "end": "2025-01-03T13:00:00Z",
      "isAllDay": false
    },
    {
      "id": "event-005",
      "title": "DBMS Exam",
      "description": "Major exam for DBMS (Database Management Systems)",
      "start": "2025-01-07T10:00:00Z",
      "end": "2025-01-07T13:00:00Z",
      "isAllDay": false
    },
    {
      "id": "event-006",
      "title": "DS Exam",
      "description": "Major exam for DS (Data Structures)",
      "start": "2025-01-09T10:00:00Z",
      "end": "2025-01-09T13:00:00Z",
      "isAllDay": false
    }
  ],
  "defaultView": "agenda",
  "colorTheme": "light"
}

export default function Hello() {
  const [commitMessage, setCommitMessage] = useState('')
  const [githubUsername, setGithubUsername] = useState('')
  const [githubRepo, setGithubRepo] = useState('')
  const router = useRouter();

  const handlePublish = () => {
    console.log('Publishing with commit message:', commitMessage)
    // Implement your publish logic here
  }

  const handleBack = () => {
    console.log('Going back')
    // Implement your back navigation logic here
  }

  const handleGithubCommit = () => {
    console.log('Committing to GitHub:', { githubUsername, githubRepo, commitMessage })
    // Implement GitHub commit logic here
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col">
      <nav className="bg-card text-card-foreground p-4 flex justify-between items-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-card text-card-foreground">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to go back?</AlertDialogTitle>
              <AlertDialogDescription>
                All unsaved changes will be lost. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleBack}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <GitCommit className="mr-2 h-4 w-4" /> Publish
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card text-card-foreground">
              <DialogHeader>
                <DialogTitle>Commit Changes</DialogTitle>
                <DialogDescription>
                  Enter a commit message to describe your changes.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="commit-message">Commit Message</Label>
                  <Input
                    id="commit-message"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="Enter your commit message"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handlePublish}>Publish</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        
    
              <Button variant="outline" onClick={()=>{
                 window.open("https://github.com","_blank")
              }}>
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
           
        </div>
      </nav>

      <main className="flex-1 p-4">
        <JsonEditor jsonSchema={jsonSchema} boilerplate={boiler} />
      </main>

      <footer className="bg-card text-card-foreground p-4 text-center">
        <p className="text-sm font-medium">Realtime configuration coming soon!</p>
      </footer>
    </div>
  )
}