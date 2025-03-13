'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mic, Wand2, Globe2, Zap, CheckCircle2, Volume2, ArrowRight } from "lucide-react"
import { AudioDemo } from "@/components/audio-demo"
import { MobileNav } from "@/components/mobile-nav"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <header className="sticky top-0 left-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Volume2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SpeechCraft</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#demo" className="text-sm font-medium hover:text-primary">
              Demo
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Log in
            </Link>
            <Button>Get Started</Button>
          </div>
          <MobileNav />
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Text to Natural Speech in Seconds
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Create lifelike voices for your content with our advanced AI-powered text-to-speech platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    Try for Free <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    View Demos
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-6 shadow-lg">
                  <div className="absolute inset-0 bg-grid-white/10" />
                  <div className="relative flex h-full flex-col items-center justify-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <Volume2 className="h-12 w-12 text-primary" />
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-12 w-1.5 animate-pulse rounded-full bg-primary"
                            style={{
                              animationDelay: `${i * 0.1}s`,
                              animationDuration: "0.8s",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="w-full max-w-sm rounded-lg bg-background/80 p-4 backdrop-blur-sm">
                      <p className="text-center text-sm">
                        &ldquo;Transform your text into natural-sounding speech with just a few clicks.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Advanced Text-to-Speech Technology</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers cutting-edge voice synthesis capabilities to bring your text to life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Natural Voices</h3>
                <p className="text-center text-muted-foreground">
                  Lifelike voices that sound indistinguishable from human speech.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Wand2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Voice Customization</h3>
                <p className="text-center text-muted-foreground">
                  Adjust tone, pitch, and speaking style to match your needs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Globe2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Multilingual Support</h3>
                <p className="text-center text-muted-foreground">
                  Support for over 30 languages with native-sounding pronunciation.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Fast Processing</h3>
                <p className="text-center text-muted-foreground">
                  Convert text to speech in seconds, even for long-form content.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">API Integration</h3>
                <p className="text-center text-muted-foreground">
                  Easily integrate with your applications using our robust API.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Volume2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Audio Export</h3>
                <p className="text-center text-muted-foreground">
                  Export high-quality audio files in multiple formats.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Try It Out</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Experience the Quality</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Try our text-to-speech technology with this interactive demo.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <AudioDemo />
            </div>
          </div>
        </section>

      </main>
      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">SpeechCraft</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} SpeechCraft. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

