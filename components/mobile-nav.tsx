"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">SpeechCraft</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container grid gap-6 py-6">
            <Link href="#features" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Features
            </Link>
            <Link href="#pricing" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
            <Link href="#demo" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Demo
            </Link>
            <Link href="#contact" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Link href="#" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                Log in
              </Link>
              <Button onClick={() => setIsOpen(false)}>Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

