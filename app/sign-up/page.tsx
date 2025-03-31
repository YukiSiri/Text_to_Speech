"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, User, Mail, Lock, Facebook, Twitter, Github } from "lucide-react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"

export default function SignupPage() {
  const [prenom, setPrenom] = useState("")
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [terms, setTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }

    if (!terms) {
      toast.error("Vous devez accepter les conditions d'utilisation")
      return
    }

    setIsLoading(true)

    try {
      await register(prenom, nom, email, password)
      toast.success("Inscription réussie !")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de l'inscription")
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
              <h1 className="text-3xl font-bold">Créer un compte</h1>
              <p className="text-muted-foreground">Inscrivez-vous pour accéder à toutes nos fonctionnalités</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="first-name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Prénom
                  </label>
                  <div className="relative">
                    <Input 
                      id="first-name" 
                      placeholder="Marie" 
                      className="pl-10"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      required
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="last-name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nom
                  </label>
                  <Input 
                    id="last-name" 
                    placeholder="Dupont"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
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
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mot de passe
                </label>
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
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={terms}
                  onCheckedChange={(checked) => setTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  J&apos;accepte les{" "}
                  <Link href="#" className="text-primary hover:underline">
                    conditions d&apos;utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="#" className="text-primary hover:underline">
                    politique de confidentialité
                  </Link>
                </label>
              </div>
              <Button type="submit" className="w-full gap-1" disabled={isLoading}>
                {isLoading ? "Inscription en cours..." : "S'inscrire"} <ArrowRight className="h-4 w-4" />
              </Button>
              <div className="relative flex items-center justify-center">
                <span className="absolute inset-x-0 h-px bg-muted" />
                <span className="relative bg-background px-2 text-xs text-muted-foreground">Ou continuer avec</span>
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
                Vous avez déjà un compte?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Se connecter
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

