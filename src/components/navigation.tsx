'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown, Search, Settings, HelpCircle, LogOut } from 'lucide-react'

export function MainNav() {
  const [activeTab, setActiveTab] = useState('Users')
  const tabs = ['Users', 'Teams', 'Security', 'Templates', 'Usage', 'Settings']

  return (
    <div className="flex flex-col w-full">
      {/* Main Navigation */}
      <div className="border-b border-gray-800 bg-[#0D0D0D]">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-white hover:text-gray-300">
              Wpsadi-Org
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/time-table" className="text-white hover:text-gray-300">
              Time-Table-Manager
            </Link>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <Button variant="default" className="bg-pink-600 hover:bg-pink-700">
              Upgrade
            </Button>
            <Button variant="ghost">Feedback</Button>
            <Button variant="ghost">Support</Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">ADITYA GOEL</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      wpsadi-org
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="border-b border-gray-800 bg-[#0D0D0D]">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex h-12 items-center px-4">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className={`px-4 ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}