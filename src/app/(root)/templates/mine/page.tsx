'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Edit, Trash } from 'lucide-react'
import { Navback } from "@/components/NavBack";
interface Config {
  id: string
  name: string
  description: string
  category: string
  createdAt: string
}

export default function MyConfigs() {
  const [configs, setConfigs] = useState<Config[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchConfigs = async () => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Mock data
      const mockConfigs: Config[] = [
        { id: '1', name: 'University Schedule', description: 'A schedule for university classes', category: 'Education', createdAt: '2023-11-01' },
        { id: '2', name: 'Work Hours', description: 'Tracking work hours', category: 'Business', createdAt: '2023-10-15' },
        // Add more mock configs...
      ]
      setConfigs(mockConfigs)
      setIsLoading(false)
    }

    fetchConfigs()
  }, [])

  const handleDelete = async (id: string) => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setConfigs(configs.filter(config => config.id !== id))
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
          <Navback title="back" href="/templates"/>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">My Configs</h1>
          <Button asChild>
            <Link href="/templates/create" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create New Config
            </Link>
          </Button>
        </div>

        {configs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">You haven&apos;t created any configs yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {configs.map((config) => (
              <Card key={config.id} className="bg-[#1A1A1A] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">{config.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">{config.description}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Badge variant="outline">{config.category}</Badge>
                    <span className="text-xs text-gray-500">
                      Created on {new Date(config.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/edit-config/${config.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(config.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}