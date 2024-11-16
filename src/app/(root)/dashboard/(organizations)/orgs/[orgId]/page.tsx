'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus, Calendar, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Schedule {
  id: string
  name: string
  description: string
}

export default function ListSchedules({ params }: { params: { orgId: string } }) {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { orgId } = params;
  const router = useRouter();

  useEffect(() => {
    const fetchSchedules = async () => {
      // Simulating API call to fetch schedules
      await new Promise(resolve => setTimeout(resolve, 2000))
      const mockSchedules = Array.from({ length: 5 }, (_, i) => ({
        id: `schedule-${i + 1}`,
        name: `Schedule ${i + 1}`,
        description: `This is the description for Schedule ${i + 1}`
      }))
      setSchedules(mockSchedules)
      setIsLoading(false)
    }
    fetchSchedules()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-300 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Schedules</h1>
          <Button asChild>
            <Link href={`/dashboard/orgs/${orgId}/create-schedule`}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Schedule
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule) => (
            <Card key={schedule.id} className="bg-[#1A1A1A] border-gray-800" onClick={()=>{
              router.push(`/dashboard/orgs/${orgId}/${schedule.id}`)
            }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  {schedule.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{schedule.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {schedules.length === 0 && (
          <div className="text-center text-gray-400">
            No schedules found. Create a new schedule to get started.
          </div>
        )}

        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/org/${orgId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Organization
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}