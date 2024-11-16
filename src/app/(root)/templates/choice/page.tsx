'use client'
import { Navback } from "@/components/NavBack";
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { School, Briefcase, Search } from 'lucide-react'

export default function ChooseTemplate() {
  return (

    <div className="min-h-screen bg-[#0D0D0D] text-gray-300 p-6">
          <Navback title="back" href="/"/>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white text-center">Choose a Template for Your Scheduler</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#1A1A1A] border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <School className="mr-2 h-6 w-6" />
                School/University Timetable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Perfect for educational institutions to manage class schedules.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select Template</Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#1A1A1A] border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Briefcase className="mr-2 h-6 w-6" />
                Office Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Ideal for managing office hours and meeting schedules.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select Template</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/marketplace" className="flex items-center justify-center">
              <Search className="mr-2 h-4 w-4" />
              Browse the Marketplace
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}