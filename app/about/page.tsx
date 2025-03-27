import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Volume2, Code, FileText, Mail, Github, Twitter, ExternalLink, BookOpen, MessageSquare, HelpCircle } from 'lucide-react'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Nav/>
      
      <main className="flex-1 container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">À propos de SpeechCraft</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Transformer le texte en parole naturelle grâce à une technologie d&apos;IA avancée
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Objectif de l&apos;application</CardTitle>
                <CardDescription>
                  Découvrez l&apos;objectif et les capacités de notre plateforme de synthèse vocale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  SpeechCraft est une plateforme puissante de conversion texte-voix conçue pour transformer le contenu écrit en parole naturelle. Notre application sert plusieurs objectifs :
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Accessibilité du contenu</strong> : Rendez votre contenu écrit accessible aux personnes malvoyantes ou ayant des difficultés de lecture.
                  </li>
                  <li>
                    <strong>Matériel d&apos;apprentissage en ligne</strong> : Convertissez le contenu éducatif en format audio pour améliorer l&apos;expérience d&apos;apprentissage.
                  </li>
                  <li>
                    <strong>Création de podcasts</strong> : Transformez des articles de blog et des articles en épisodes de podcast sans avoir besoin d&apos;équipement d&apos;enregistrement.
                  </li>
                  <li>
                    <strong>Voice-over</strong> : Créez des voix-off pour des vidéos, des présentations et d&apos;autres contenus multimédias.
                  </li>
                  <li>
                    <strong>Apprentissage des langues</strong> : Aidez les apprenants en langues avec la prononciation et la compréhension orale.
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Stack technologique</CardTitle>
                <CardDescription>
                  Les technologies et APIs qui alimentent notre plateforme de synthèse vocale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Technologies Frontend</h3>
                    </div>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Next.js - Framework React pour les applications rendues côté serveur</li>
                      <li>React - Bibliothèque JavaScript pour créer des interfaces utilisateur</li>
                      <li>Tailwind CSS - Framework CSS utility-first</li>
                      <li>shadcn/ui - Composants UI réutilisables</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">APIs de synthèse vocale</h3>
                    </div>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>ElevenLabs - Synthèse vocale de pointe</li>
                      <li>Google Cloud Text-to-Speech - Génération vocale haute qualité</li>
                      <li>Amazon Polly - Synthèse vocale naturelle</li>
                      <li>Microsoft Azure Text-to-Speech - Capacités vocales neurales</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 rounded-lg bg-muted p-4">
                  <h3 className="font-medium mb-2">Intégration API</h3>
                  <p className="text-sm text-muted-foreground">
                    SpeechCraft s&apos;intègre avec plusieurs APIs de synthèse vocale pour fournir la meilleure qualité de voix. Notre plateforme sélectionne automatiquement la meilleure API en fonction de vos besoins spécifiques, de votre sélection de voix et de vos besoins linguistiques. Cette approche multi-API garantit des performances et une qualité optimales pour toutes vos conversions texte-voix.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Documentation & Ressources</CardTitle>
                <CardDescription>
                  Ressources utiles pour tirer le meilleur parti de SpeechCraft
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="user-guide">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        <span>Guide utilisateur</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-7 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Notre guide utilisateur complet couvre tout, du démarrage aux fonctionnalités avancées.
                        </p>
                        <Button variant="outline" className="gap-2" asChild>
                          <Link href="#">
                            Voir le guide utilisateur <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="api-docs">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        <span>Documentation API</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-7 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Intégrez SpeechCraft dans vos propres applications avec notre API. Documentation complète disponible.
                        </p>
                        <Button variant="outline" className="gap-2" asChild>
                          <Link href="#">
                            Voir la documentation API <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="tutorials">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>Tutoriels & Exemples</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-7 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Apprenez à utiliser SpeechCraft efficacement avec nos tutoriels et exemples étape par étape.
                        </p>
                        <Button variant="outline" className="gap-2" asChild>
                          <Link href="#">
                            Voir les tutoriels <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5" />
                        <span>Questions fréquentes</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-7 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Trouvez des réponses aux questions courantes sur SpeechCraft et la technologie de synthèse vocale.
                        </p>
                        <Button variant="outline" className="gap-2" asChild>
                          <Link href="#">
                            Voir la FAQ <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
                <CardDescription>
                  Contactez notre équipe pour le support ou des questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Support par email</h3>
                        <p className="text-sm text-muted-foreground">
                          <Link href="mailto:support@speechcraft.com" className="hover:text-primary">
                            support@speechcraft.com
                          </Link>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Chat en direct</h3>
                        <p className="text-sm text-muted-foreground">
                          Disponible du lundi au vendredi, 9h-17h EST
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Connectez-vous avec nous</h3>
                    <div className="flex gap-3">
                      <Button variant="outline" size="icon" asChild>
                        <Link href="#" aria-label="GitHub">
                          <Github className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href="#" aria-label="Twitter">
                          <Twitter className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href="mailto:support@speechcraft.com" aria-label="Email">
                          <Mail className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full" asChild>
                        <Link href="#">
                          Nous contacter
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer/>
    </div>
  )
}
