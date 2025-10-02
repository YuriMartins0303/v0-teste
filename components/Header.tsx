"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Glutões
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#aquisicao" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Aquisição
          </a>
          <a
            href="#crescimento"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Crescimento
          </a>
          <a href="#fidelidade" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Fidelidade
          </a>
          <a href="#pricing" className="text-sm font-medium text-primary transition-colors">
            Pricing
          </a>
        </nav>

        <a href="https://whatsapp.glutoes.com/" target="_blank" rel="noopener noreferrer">
          <Button className="hidden md:flex font-semibold">Começar agora</Button>
        </a>

        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container px-4 py-4 flex flex-col gap-4">
            <a
              href="#aquisicao"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Aquisição
            </a>
            <a
              href="#crescimento"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Crescimento
            </a>
            <a
              href="#fidelidade"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fidelidade
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a href="https://whatsapp.glutoes.com/" target="_blank" rel="noopener noreferrer">
              <Button className="font-semibold w-full mt-2">Começar agora</Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
