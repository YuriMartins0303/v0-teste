"use client"

import { ComparisonTable } from "@/components/ComparisonTable"
import { Header } from "@/components/Header"
import { PricingCard } from "@/components/PricingCard"
import { PricingHero } from "@/components/PricingHero"
import { useState } from "react"

export default function Home() {
  const [selectedContacts, setSelectedContacts] = useState("5000")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [hasAddOn, setHasAddOn] = useState(false)

  const priceData = {
    249: { monthly: 249, annual: 2490 },
    319: { monthly: 319, annual: 3190 },
    499: { monthly: 499, annual: 4990 }
  }

  const formatPrice = (basePrice: number) => {
    const prices = priceData[basePrice as keyof typeof priceData]
    
    if (selectedPeriod === "monthly") {
      return {
        fullPrice: `R$ ${prices.monthly.toFixed(2).replace('.', ',')}`,
        period: "/mês",
        installments: undefined
      }
    } else {
      const installment = prices.annual / 12
      return {
        fullPrice: `R$ ${prices.annual.toFixed(2).replace('.', ',')}`,
        period: "",
        installments: {
          value: `R$ ${installment.toFixed(2).replace('.', ',')}`,
          times: 12,
          text: `em 12x no cartão`
        }
      }
    }
  }

  const getRecommendedAddOn = () => {
    const contacts = Number.parseInt(selectedContacts)
    if (contacts <= 1000) return { messages: 1000, price: 100 }
    if (contacts <= 2500) return { messages: 2000, price: 200 }
    if (contacts <= 5000) return { messages: 3000, price: 300 }
    if (contacts <= 10000) return { messages: 5000, price: 500 }
    return { messages: 10000, price: 1000 }
  }

  const recommendedAddOn = getRecommendedAddOn()

  const getRecommendedPlan = () => {
    const contacts = Number.parseInt(selectedContacts)
    if (contacts <= 2500) return "Starter"
    if (contacts <= 5000) return "Growth"
    if (contacts <= 10000) return "Pro"
    return "Ultra"
  }

  const recommendedPlan = getRecommendedPlan()

  const getPlanPrice = (planTitle: string) => {
    const planPriceMap: Record<string, { monthly: number; annual: number }> = {
      'Starter': { monthly: 249, annual: 2490 },
      'Growth': { monthly: 319, annual: 3190 },
      'Pro': { monthly: 499, annual: 4990 },
      'Ultra': { monthly: 0, annual: 0 }
    }
    
    const planPrices = planPriceMap[planTitle] || { monthly: 0, annual: 0 }
    return selectedPeriod === 'monthly' ? planPrices.monthly : planPrices.annual
  }

  const handlePlanClick = (planTitle: string) => {
    const planPrice = getPlanPrice(planTitle)
    // Converter para centavos (Stripe trabalha com centavos)
    const planPriceInCents = Math.round(planPrice * 100)
    
    const params: Record<string, string> = {
      plano: planTitle,
      contatos: selectedContacts,
      periodo: selectedPeriod,
    }

    // Só adiciona preço se for diferente de 0 (Ultra não tem preço fixo)
    if (planPriceInCents > 0) {
      params.plano_preco = planPriceInCents.toString()
    }

    params.addon = hasAddOn ? 'true' : 'false'
    
    if (hasAddOn) {
      params.addon_mensagens = recommendedAddOn.messages.toString()
      // Converter add-on para centavos também
      params.addon_preco = Math.round(recommendedAddOn.price * 100).toString()
    }

    const url = `http://localhost:3001/auth/plg-billing?${new URLSearchParams(params).toString()}`
    window.location.href = url
  }

  const plans = [
    {
      title: "Starter",
      price: formatPrice(249),
      messages: "3000",
      features: ["Painel de performance", "Piloto Automático de Campanhas", "Suporte online"],
      ctaText: "Adquirir",
      onCtaClick: () => handlePlanClick("Starter"),
      recommended: recommendedPlan === "Starter",
    },
    {
      title: "Growth",
      price: formatPrice(319),
      messages: "6000",
      description: "Recupere clientes perdidos e aumente as vendas recorrentes com automação.",
      features: [
        "Todas as funcionalidades de Starter +",
        "Mais campanhas personalizadas",
        "Acesso a modelos prontos de mensagens",
        "Programa de fidelidade automatizado integrado com cardápio digital",
      ],
      ctaText: "Adquirir",
      onCtaClick: () => handlePlanClick("Growth"),
      recommended: recommendedPlan === "Growth",
    },
    {
      title: "Pro",
      price: formatPrice(499),
      messages: "10000",
      description: "Acompanhamento estratégico completo para maximizar resultados.",
      features: [
        "Todas as funcionalidades de Growth +",
        "Onboarding dedicado para você e seu time pelos nossos experts",
        "Recomendações estratégicas do Gestor de Contas",
        "Experiência guiada para atingir os objetivos de seus negócios",
      ],
      ctaText: "Adquirir",
      onCtaClick: () => handlePlanClick("Pro"),
      recommended: recommendedPlan === "Pro",
    },
    {
      title: "Ultra",
      price: {
        fullPrice: "Vamos conversar!",
        period: "",
        installments: undefined
      },
      messages: "18000",
      features: [
        "Campanhas personalizadas ilimitadas",
        "Número de engajamentos com contatos customizado",
        "Otimize a eficiência com testes A/B",
      ],
      ctaText: "Fale Conosco",
      onCtaClick: () => handlePlanClick("Ultra"),
      isUltra: true,
      recommended: recommendedPlan === "Ultra",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto">
        <PricingHero
          selectedContacts={selectedContacts}
          onContactsChange={setSelectedContacts}
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />

        <section className="px-4 pb-12 md:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </section>

        {/* Seção de Add-ons */}
        <section className="px-4 pb-12 md:pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl md:text-3xl font-bold">
                Add-ons
              </h2>
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                Opcional
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              Potencialize seu plano com recursos extras. Adicione ou remova a qualquer momento.
            </p>

            <div 
              className={`relative rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 cursor-pointer ${
                hasAddOn 
                  ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-primary shadow-lg shadow-primary/10' 
                  : 'bg-card border-border/50 hover:border-primary/30 hover:shadow-md'
              }`}
              onClick={() => setHasAddOn(!hasAddOn)}
            >
              {/* Indicador de selecionado */}
              {hasAddOn && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Info do Add-on */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold">
                        Régua de Relacionamento
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Adicional ao plano {recommendedPlan}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Amplie sua comunicação com mensagens adicionais para campanhas de WhatsApp.
                    Aumente o engajamento com seus clientes através de campanhas automatizadas e personalizadas.
                  </p>
                </div>

                {/* Preço e Botão */}
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-4">
                  <div className="text-left sm:text-right lg:text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        R$ {recommendedAddOn.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-muted-foreground font-medium">/mês</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {recommendedAddOn.messages.toLocaleString('pt-BR')} mensagens extras
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!hasAddOn) {
                        // Redireciona diretamente para billing com addon=true
                        const planPrice = getPlanPrice(recommendedPlan)
                        const planPriceInCents = Math.round(planPrice * 100)
                        
                        const params: Record<string, string> = {
                          plano: recommendedPlan,
                          contatos: selectedContacts,
                          periodo: selectedPeriod,
                          addon: 'true',
                          addon_mensagens: recommendedAddOn.messages.toString(),
                          addon_preco: Math.round(recommendedAddOn.price * 100).toString()
                        }

                        if (planPriceInCents > 0) {
                          params.plano_preco = planPriceInCents.toString()
                        }

                        const url = `http://localhost:3001/auth/plg-billing?${new URLSearchParams(params).toString()}`
                        window.location.href = url
                      } else {
                        setHasAddOn(false)
                      }
                    }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[160px] ${
                      hasAddOn
                        ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30'
                        : 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    {hasAddOn ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Adicionado
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Adicionar
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Explicação quando selecionado */}
              {hasAddOn && (
                <div className="mt-6 pt-6 border-t border-primary/20">
                  <div className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Este add-on será adicionado ao seu plano {recommendedPlan}.</span>{' '}
                      Você terá {recommendedAddOn.messages.toLocaleString('pt-BR')} mensagens extras por mês além das incluídas no plano base. 
                      O valor total será calculado na próxima etapa.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Disponível a partir de 12/25. O pacote é baseado no número de contatos selecionado.
            </p>
          </div>
        </section>

        <ComparisonTable />

        <section className="py-12 md:py-16 px-4 text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl md:rounded-3xl mx-4 mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent px-4">
            Pronto para crescer seu restaurante?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Escolha o plano ideal e comece a aumentar suas vendas com campanhas automatizadas e estratégias
            personalizadas.
          </p>
          <a
            href="https://whatsapp.glutoes.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Fale com consultor
          </a>
        </section>
      </main>

      <footer className="border-t border-border py-6 md:py-8 px-4 text-center text-xs md:text-sm text-muted-foreground">
        <div className="container mx-auto">© 2025 Glutões. Todos os direitos reservados.</div>
      </footer>
    </div>
  )
}
