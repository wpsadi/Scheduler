'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function CreateOrganization() {
  const [orgName, setOrgName] = useState('')
  const [orgDescription, setOrgDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Organization created:', { name: orgName, description: orgDescription })
    setIsLoading(false)
    router.push('/dashboard/orgs')
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-300 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard/orgs" className="flex items-center text-gray-300 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Organizations
            </Link>
          </Button>
        </div>

        <Card className="bg-[#1A1A1A] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Create New Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="orgName" className="text-gray-300">Organization Name</Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="bg-[#0D0D0D] border-gray-800 text-white"
                  placeholder="Enter organization name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgDescription" className="text-gray-300">Description</Label>
                <Textarea
                  id="orgDescription"
                  value={orgDescription}
                  onChange={(e) => setOrgDescription(e.target.value)}
                  className="bg-[#0D0D0D] border-gray-800 text-white"
                  placeholder="Enter organization description"
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Organization'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}