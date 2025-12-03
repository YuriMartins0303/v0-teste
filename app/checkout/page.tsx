"use client"

import { Header } from "@/components/Header"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function CheckoutContent() {
  const searchParams = useSearchParams()
  
  const plano = searchParams.get('plano') || ''
  const contatos = searchParams.get('contatos') || ''
  const periodo = searchParams.get('periodo') || 'monthly'
  const hasAddon = searchParams.get('addon') === 'true'
  const addonMensagens = searchParams.get('addon_mensagens') || ''
  const addonPreco = searchParams.get('addon_preco') || ''

  const priceData: Record<string, { monthly: number; annual: number }> = {
    'Starter': { monthly: 249, annual: 2490 },
    'Growth': { monthly: 319, annual: 3190 },
    'Pro': { monthly: 499, annual: 4990 },
  }

  const planPrice = priceData[plano] || { monthly: 0, annual: 0 }
  const basePrice = periodo === 'monthly' ? planPrice.monthly : planPrice.annual
  const addonPrice = hasAddon ? Number(addonPreco) * (periodo === 'monthly' ? 1 : 12) : 0
  const totalPrice = basePrice + addonPrice

  const handleConfirm = () => {
    const params = new URLSearchParams({
      produto: plano,
      contatos,
      periodo,
      addon: hasAddon ? 'true' : 'false',
      ...(hasAddon && {
        addon_mensagens: addonMensagens,
        addon_preco: addonPreco
      })
    })
    window.location.href = `http://localhost:3001/auth/plg-billing?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Resumo do Pedido
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Confira os detalhes antes de prosseguir
          </p>

          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
            {/* Plano selecionado */}
            <div className="pb-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Plano selecionado</p>
                  <h2 className="text-2xl font-bold">{plano}</h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {periodo === 'monthly' ? 'Mensal' : 'Anual'}
                  </p>
                  <p className="text-xl font-bold">
                    R$ {basePrice.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{Number(contatos).toLocaleString('pt-BR')} contatos</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{periodo === 'monthly' ? 'Cobrança mensal' : 'Cobrança anual'}</span>
                </div>
              </div>
            </div>

            {/* Add-on */}
            {hasAddon && (
              <div className="py-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Régua de Relacionamento</p>
                      <p className="text-sm text-muted-foreground">
                        +{Number(addonMensagens).toLocaleString('pt-BR')} mensagens/mês
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Add-on</p>
                    <p className="text-lg font-bold text-primary">
                      + R$ {addonPrice.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Total */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold">Total</span>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {periodo === 'monthly' ? '/mês' : '/ano (em 12x de R$ ' + (totalPrice / 12).toFixed(2).replace('.', ',') + ')'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
              >
                Confirmar e Continuar
              </button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Você será redirecionado para finalizar o cadastro
              </p>
            </div>
          </div>

          <button
            onClick={() => window.history.back()}
            className="w-full mt-4 py-3 text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            ← Voltar e alterar seleção
          </button>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}

