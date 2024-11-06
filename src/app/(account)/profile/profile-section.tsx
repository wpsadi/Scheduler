'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'


export function ProfileSection() {
  const {toast} = useToast();
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const accountCreatedOn = new Date('2023-01-01').toLocaleDateString()

  const handleSave = (field: string, value: string) => {
    // Simulate API call to update the field
    console.log(`Updating ${field} to ${value}`)
    toast({
      title: "Profile Updated",
      description: `Your ${field} has been updated successfully.`,
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your profile details here</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="flex-1 space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button className="w-full sm:w-auto" onClick={() => handleSave('name', name)}>Save</Button>
        </div>
        <div className="space-y-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="flex-1 space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button className="w-full sm:w-auto" onClick={() => handleSave('email', email)}>Save</Button>
        </div>
        <div className="space-y-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="flex-1 space-y-1">
            <Label>Account Created On</Label>
            <Input
              value={accountCreatedOn}
              readOnly
              disabled
            />
          </div>
          <Button className="w-full sm:w-auto" disabled>Save</Button>
        </div>
      </CardContent>
    </Card>
  )
}