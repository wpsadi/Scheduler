'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Menu } from 'lucide-react'
import { Sidebar } from '../sidebar'

import LogoutPage from './logout-serivce'

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('')
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col">
      <header className="p-4 border-b border-border flex  justify-around md:justify-center">
        <Button variant="ghost" asChild>
          <Link href="/dashboard" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      
        <Button variant="ghost" size="icon" onClick={()=>{
          if (hamburgerRef !==null) {
            let btn = hamburgerRef.current
            btn?.click();
          }
        

        }} className="md:hidden ">
            <Menu />
          </Button>
   
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} hamburgerRef={hamburgerRef} />
        <main className="flex-1 p-6 overflow-auto">
          <LogoutPage/>
          {/* Add other sections here as needed */}
        </main>
      </div>
    </div>
  )
}