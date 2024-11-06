'use client'

import { useState } from 'react'
import { Mail, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MailingService {
  name: string
  value:string
  status: 'connected' | 'disconnected',
  default:boolean
}

export default function MailingServiceConnection() {
  const [selectedService, setSelectedService] = useState<string>('custom')

  const [smtpDetails, setSmtpDetails] = useState({
    host: '',
    port: '',
    username: '',
    password: '',
  })

  const services:MailingService[] = [{
    name:"Gmail",
    value:"gmail",
    status:"disconnected",
    default:true
  },{
    name:"Outlook",
    value:"outlook",
    status:"connected",
    default:true
  },{
    name:"Custom SMTP",
    value:"custom",
    status:"disconnected",
    default:true
  }]

  const [selectedServiceData,setSelectedServiceData] = useState<MailingService>(services[0])

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-300 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">Mailing Service Connection</h1>
          <p className="text-gray-400">Configure your email service provider for sending emails</p>
        </div>

        <Alert className="bg-[#1A1A1A] border-gray-800 flex items-center">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            The first service you connect will be used as the default for sending mail to your organization members.
          </AlertDescription>
        </Alert>

        <div className="space-y-6 bg-[#1A1A1A] rounded-lg p-6">
          <div className="space-y-2">
            <Label className="text-gray-300">Select Mailing Service</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map((service) => (
                <button
                  key={service.value}
                  onClick={() =>{ 
                    setSelectedServiceData(service)
                    
                    setSelectedService(service.value)}}
                  className={`p-4 rounded-lg border border-gray-800 transition-colors
                    ${selectedService === service.value 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-[#1A1A1A] hover:bg-gray-800'}`}
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          {selectedService === 'custom' && (
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host" className="text-gray-300">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    value={smtpDetails.host}
                    onChange={(e) => setSmtpDetails(prev => ({ ...prev, host: e.target.value }))}
                    placeholder="smtp.example.com"
                    className="bg-[#0D0D0D] border-gray-800 text-white placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port" className="text-gray-300">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    value={smtpDetails.port}
                    onChange={(e) => setSmtpDetails(prev => ({ ...prev, port: e.target.value }))}
                    placeholder="587"
                    className="bg-[#0D0D0D] border-gray-800 text-white placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-username" className="text-gray-300">SMTP Username</Label>
                <Input
                  id="smtp-username"
                  value={smtpDetails.username}
                  onChange={(e) => setSmtpDetails(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="your-username"
                  className="bg-[#0D0D0D] border-gray-800 text-white placeholder:text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-password" className="text-gray-300">SMTP Password</Label>
                <Input
                  id="smtp-password"
                  type="password"
                  value={smtpDetails.password}
                  onChange={(e) => setSmtpDetails(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  className="bg-[#0D0D0D] border-gray-800 text-white placeholder:text-gray-600"
                />
              </div>
            </form>
          )}

          {selectedService === 'gmail' && (
            <div className="space-y-4">
              <p className="text-gray-400">
                Connect your Gmail account to send emails through Google's SMTP servers.
              </p>
              {
                selectedServiceData.status === 'disconnected' ? (  <Button 
                  className="bg-white text-black hover:bg-gray-200"
                  onClick={() => console.log('Connect Outlook')}
                >
                  Connect Outlook Account
                </Button>) : (  <Button 
                className=" hover:bg-gray-200"
                variant="destructive"
                onClick={() => console.log('Connect Outlook')}
              >
                Disconnect
              </Button>)

              }
            </div>
          )}

          {selectedService === 'outlook' && (
            <div className="space-y-4">
              <p className="text-gray-400">
                Connect your Outlook account to send emails through Microsoft's SMTP servers.
              </p>
              <Button 
                className="bg-white text-black hover:bg-gray-200"
                onClick={() => console.log('Connect Outlook')}
              >
                Connect Outlook Account
              </Button>
            </div>
          )}

          <div className="pt-6 flex justify-end">
            <Button 
              className="bg-white text-black hover:bg-gray-200 min-w-[100px]"
              onClick={() => console.log('Save SMTP settings')}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}