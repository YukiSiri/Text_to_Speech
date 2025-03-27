import Link from "next/link"
import { Volume2 } from "lucide-react"


export function Footer() {

  return (
        <footer className="border-t py-6 md:py-10">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-primary" />
                    <span className="text-lg font-bold">SpeechCraft</span>
                </div>

                <p className="text-center text-sm text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} SpeechCraft. Tous droits réservés.
                </p>

                <div className="flex gap-4">
                    <Link href="/text-to-speech" className="text-sm text-muted-foreground hover:text-primary">
                        Utilisez l&apos;application
                    </Link>
                    <Link href="/history" className="text-sm text-muted-foreground hover:text-primary">
                        Regardez Votre historique
                    </Link>
                    <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                        Qui sommes-nous
                    </Link>
                </div>
            </div>
        </footer>
    )
}