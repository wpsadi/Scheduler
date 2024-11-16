"use client"
import { useRouter } from 'next/navigation'
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  href: string
  title?: string
}

export function Navback({ href, title = "Back" }: NavbarProps) {
  const router = useRouter()

  return (
    <nav className="flex items-center p-4 bg-black shadow-md">
      <Button 
        variant="ghost" 
        className="flex items-center space-x-2 text-background"
        onClick={() => router.push(href)}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{title}</span>
      </Button>
    </nav>
  )
}
