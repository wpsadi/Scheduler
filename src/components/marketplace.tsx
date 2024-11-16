'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {useRouter} from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { User,  ChevronDown } from 'lucide-react'

interface Config {
  id: string
  title: string
  thumbnail: string
  verified: boolean
  creator: string
  category: string
}

export function MarketplaceComponent() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [configs, setConfigs] = useState<Config[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  // Mock categories
  const categories = ['College', 'Office', 'Personal', 'Sports', 'Other']

  useEffect(() => {
    // Simulating API call with debounce
    const timer = setTimeout(() => {
      // Mock data
      const mockConfigs: Config[] = [
        { id: '1', title: 'University Schedule', thumbnail: '/placeholder.svg', verified: true, creator: 'John Doe', category: 'College' },
        { id: '2', title: 'Office Hours', thumbnail: '/placeholder.svg', verified: false, creator: 'Jane Smith', category: 'Office' },
        // Add more mock configs...
      ]
      setConfigs(mockConfigs)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategories, sortOrder])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-300 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Marketplace</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Account
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1A1A1A] border-gray-800">
              <DropdownMenuItem>
                <Link href="/templates/mine">My Configs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/templates/create">Create a New Config</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search configs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1A1A1A] border-gray-800"
          />

          <div className="flex flex-wrap gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Sort: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1A1A1A] border-gray-800">
                <DropdownMenuItem onClick={() => setSortOrder('newest')}>Newest</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder('oldest')}>Oldest</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label
                  htmlFor={category}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {configs.map((config) => (
            <Card key={config.id} className="bg-[#1A1A1A] border-gray-800" onClick={()=>{
              router.push(`/templates/${config.title}`)
            }}>
              <CardContent className="p-0">
                <Image  src={config.thumbnail}
                  alt={config.title}
                  className="w-full h-40 object-cover rounded-t-lg" height={"500"} width={300}/>
                
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <h3 className="text-lg font-semibold text-white">{config.title}</h3>
                <p className="text-sm text-gray-400">by {config.creator}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Badge variant={config.verified ? "default" : "secondary"}>
                    {config.verified ? "Verified" : "Unverified"}
                  </Badge>
                  <Badge variant="outline">{config.category}</Badge>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}