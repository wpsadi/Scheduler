'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Star, Users, Calendar } from 'lucide-react'
import { Navback } from "@/components/NavBack";
interface ConfigDetails {
  id: string
  title: string
  description: string
  thumbnail: string
  creator: string
  verified: boolean
  downloads: number
  rating: number
  users: number
  lastUpdated: string
  category: string
}

export default function ConfigDetails({ params }: { params: { id: string } }) {
  const [config, setConfig] = useState<ConfigDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchConfigDetails = async () => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Mock data
      const mockConfig: ConfigDetails = {
        id: params.id,
        title: "University Schedule Pro",
        description: "A comprehensive scheduling solution for universities and colleges.",
        thumbnail: "/placeholder.svg",
        creator: "John Doe",
        verified: true,
        downloads: 5000,
        rating: 4.7,
        users: 1200,
        lastUpdated: "2023-11-01",
        category: "Education"
      }
      setConfig(mockConfig)
      setIsLoading(false)
    }

    fetchConfigDetails()
  }, [params.id])

  if (isLoading) {
    return (

      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
              {/* <Navback title="back" href="/"/> */}
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!config) {
    return (
    
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
          {/* <Navback title="back" href="/"/> */}
        <div className="text-white">Config not found</div>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-[#0D0D0D] text-gray-300 p-6">
          <Navback title="back" href="/"/>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img
              src={config.thumbnail}
              alt={config.title}
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <h1 className="text-3xl font-bold text-white">{config.title}</h1>
            <p className="text-gray-400">{config.description}</p>
            <div className="flex items-center space-x-2">
              <Badge variant={config.verified ? "default" : "secondary"}>
                {config.verified ? "Verified" : "Unverified"}
              </Badge>
              <Badge variant="outline">{config.category}</Badge>
            </div>
            <p className="text-sm">Created by: {config.creator}</p>
            <Button className="w-full md:w-auto">
              <Download className="mr-2 h-4 w-4" /> Download Config
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#1A1A1A] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{config.downloads.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1A1A1A] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{config.rating} / 5</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1A1A1A] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{config.users.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1A1A1A] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg">{new Date(config.lastUpdated).toLocaleDateString()}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}