'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Crown, Shield, Loader2 } from 'lucide-react'

interface Collaborator {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'editor' | 'viewer'
  avatarUrl?: string
}

export function AccessManagement() {
  const [isTransferring, setIsTransferring] = useState(false)
  const [transferEmail, setTransferEmail] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'owner',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'admin',
    },
  ])

  const handleTransferOwnership = async () => {
    setIsTransferring(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsTransferring(false)
  }

  const handleEmailChange = async (email: string) => {
    setTransferEmail(email)
    // Simulate API call for email suggestions
    await new Promise(resolve => setTimeout(resolve, 500))
    setSuggestions([
      'user1@example.com',
      'user2@example.com',
      'user3@example.com',
    ].filter(e => e.includes(email)))
  }

  const handleRevokeAccess = async (collaboratorId: string) => {
    setCollaborators(prev => 
      prev.filter(c => c.id !== collaboratorId)
    )
  }

  return (
    <div className="space-y-8 p-6 bg-[#0D0D0D]">
      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-[#1A1A1A] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Members
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">245</div>
            <p className="text-xs text-gray-400">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1A1A] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Following Schedule
            </CardTitle>
            <Shield className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">189</div>
            <p className="text-xs text-gray-400">
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Access Management Section */}
      <Card className="bg-[#1A1A1A] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Access Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Transfer Ownership */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Transfer Ownership</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Crown className="mr-2 h-4 w-4" />
                  Transfer Ownership
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1A1A1A] border-gray-800">
                <DialogHeader>
                  <DialogTitle>Transfer Ownership</DialogTitle>
                  <DialogDescription>
                    This action will transfer all owner permissions to the selected user.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter email address"
                    value={transferEmail}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className="bg-[#0D0D0D] border-gray-800"
                  />
                  {suggestions.length > 0 && (
                    <div className="bg-[#0D0D0D] border border-gray-800 rounded-md p-2">
                      {suggestions.map((email) => (
                        <div
                          key={email}
                          className="p-2 hover:bg-gray-800 cursor-pointer rounded"
                          onClick={() => setTransferEmail(email)}
                        >
                          {email}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setTransferEmail('')}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleTransferOwnership}
                    disabled={isTransferring}
                  >
                    {isTransferring ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Transferring...
                      </>
                    ) : (
                      'Transfer'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Collaborators Table */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Collaborators</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">User</TableHead>
                  <TableHead className="text-gray-400">Role</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collaborators.map((collaborator) => (
                  <TableRow key={collaborator.id} className="border-gray-800">
                    <TableCell className="font-medium text-white">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          {collaborator.avatarUrl && (
                            <AvatarImage src={collaborator.avatarUrl} />
                          )}
                          <AvatarFallback>
                            {collaborator.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{collaborator.name}</div>
                          <div className="text-sm text-gray-400">
                            {collaborator.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={collaborator.role === 'owner' ? 'default' : 'secondary'}
                        className={
                          collaborator.role === 'owner'
                            ? 'bg-yellow-600'
                            : 'bg-gray-700'
                        }
                      >
                        {collaborator.role.charAt(0).toUpperCase() + collaborator.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {collaborator.role !== 'owner' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevokeAccess(collaborator.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Revoke Access
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccessManagement;