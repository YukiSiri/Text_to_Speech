"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Mail, Lock, Facebook, Twitter, Github } from 'lucide-react'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      toast.success("Connexion réussie !")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <Nav />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Connexion</h1>
              <p className="text-muted-foreground">
                Entrez vos identifiants pour accéder à votre compte
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Mot de passe
                  </label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Mot de passe oublié?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Se souvenir de moi
                </label>
              </div>
              <Button type="submit" className="w-full gap-1" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"} <ArrowRight className="h-4 w-4" />
              </Button>
              <div className="relative flex items-center justify-center">
                <span className="absolute inset-x-0 h-px bg-muted" />
                <span className="relative bg-background px-2 text-xs text-muted-foreground">
                  Ou continuer avec
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="icon" className="w-full">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-full">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-full">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center text-sm">
                Vous n&apos;avez pas de compte?{" "}
                <a href="/sign-up" className="text-primary hover:underline">
                  S&apos;inscrire
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
