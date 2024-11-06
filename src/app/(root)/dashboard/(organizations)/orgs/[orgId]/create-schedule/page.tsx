'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function CreateSchedule({ params }: { params: { orgId: string } }) {
  const [scheduleName, setScheduleName] = useState('')
  const [scheduleDescription, setScheduleDescription] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { orgId } = params

  useEffect(() => {
    // Simulating API call to fetch organization details
    const fetchOrgDetails = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsLoading(false)
    }
    fetchOrgDetails()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulating API call to create schedule
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Schedule created:', { name: scheduleName, description: scheduleDescription, orgId })
    setIsSubmitting(false)
    router.push(`/dashboard/orgs/${orgId}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-300 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href={`/dashboard/orgs/${orgId}`} className="flex items-center text-gray-300 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Organization
            </Link>
          </Button>
        </div>

        <Card className="bg-[#1A1A1A] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Create New Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="scheduleName" className="text-gray-300">Schedule Name</Label>
                <Input
                  id="scheduleName"
                  value={scheduleName}
                  onChange={(e) => setScheduleName(e.target.value)}
                  className="bg-[#0D0D0D] border-gray-800 text-white"
                  placeholder="Enter schedule name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduleDescription" className="text-gray-300">Description</Label>
                <Textarea
                  id="scheduleDescription"
                  value={scheduleDescription}
                  onChange={(e) => setScheduleDescription(e.target.value)}
                  className="bg-[#0D0D0D] border-gray-800 text-white"
                  placeholder="Enter schedule description"
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Schedule'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}