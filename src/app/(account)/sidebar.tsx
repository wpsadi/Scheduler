'use client'

import { useState } from 'react'
import { User, Settings, Bell, HelpCircle, LogOut, Menu, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  hamburgerRef: React.RefObject<HTMLButtonElement>
}

export function Sidebar({ activeSection, setActiveSection,hamburgerRef }: SidebarProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: User, label: 'Profile', value: 'profile' },
    { icon: Mail, label: 'SMTP', value: 'mailing-services' },
    { icon: Settings, label: 'Settings', value: 'settings' },
    { icon: Bell, label: 'Notifications', value: 'notifications' },
    { icon: HelpCircle, label: 'Help', value: 'help' },
  ]

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground">
          JP
        </div>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.value}
            variant={activeSection === item.value ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => {
              setActiveSection(item.value)
              router.push(`/${item.value}`)
              setIsOpen(false)
            }}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span className="md:inline">{item.label}</span>
          </Button>
        ))}
      </nav>
      <div className="mt-auto pt-6">
        <Button variant="ghost" className="w-full justify-start text-destructive" onClick={()=>{
          router.push("/logout")
        }}>
          <LogOut className="mr-2 h-4 w-4" />
          <span className="md:inline">Logout</span>
        </Button>
      </div>
    </>
  )

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen} >
        <SheetTrigger asChild >
          <Button variant="ghost" size="icon" ref={hamburgerRef} className="hidden ">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-black text-primary-foreground">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <aside className="hidden md:flex md:w-64 md:flex-col bg-card text-card-foreground p-4 space-y-4">
        <SidebarContent />
      </aside>
    </>
  )
}