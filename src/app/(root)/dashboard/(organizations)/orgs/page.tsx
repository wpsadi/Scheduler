'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Organization {
  id: string
  name: string
  description: string
}

const ITEMS_PER_PAGE_OPTIONS = [6, 12, 24, 48, 96]

export default function ListOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const router = useRouter();

  // Simulating API call to fetch organizations
  useState(() => {
    const fetchOrganizations = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const mockOrgs = Array.from({ length: 100 }, (_, i) => ({
        id: `org-${i + 1}`,
        name: `Organization ${i + 1}`,
        description: `This is the description for Organization ${i + 1}`
      }))
      setOrganizations(mockOrgs)
      setIsLoading(false)
    }
    fetchOrganizations()
  })

  const totalPages = Math.ceil(organizations.length / itemsPerPage)
  const paginatedOrganizations = organizations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-300 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Organizations</h1>
          <Button asChild>
            <Link href="/dashboard/create-org">
              <Plus className="mr-2 h-4 w-4" />
              Create New Organization
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedOrganizations.map((org) => (
                <Card key={org.id} className="bg-[#1A1A1A] border-gray-800" onClick={()=>{
                  router.push(`/dashboard/orgs/${org.id}`)
                }}>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">{org.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{org.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Show:</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>

            <div className="text-center text-sm text-gray-400">
              Total Organizations: {organizations.length}
            </div>
          </>
        )}
      </div>
    </div>
  )
}