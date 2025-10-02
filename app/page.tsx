"use client"

import { ComparisonTable } from "@/components/ComparisonTable"
import { Header } from "@/components/Header"
import { PricingCard } from "@/components/PricingCard"
import { PricingHero } from "@/components/PricingHero"
import { useState } from "react"

export default function Home() {
  const [selectedContacts, setSelectedContacts] = useState("5000")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const priceData = {
    249: { monthly: 249, annual: 224, discountedMonthly: 201.60 },
    319: { monthly: 319, annual: 287.10, discountedMonthly: 258.39 },
    379: { monthly: 379, annual: 341.10, discountedMonthly: 314.10 }
  }

  const formatPrice = (basePrice: number) => {
    const prices = priceData[basePrice as keyof typeof priceData]
    
    if (selectedPeriod === "monthly") {
      return {
        fullPrice: `R$ ${prices.monthly.toFixed(2).replace('.', ',')}`,
        period: "/mês",
        installments: undefined
      }
    } else if (selectedPeriod === "semiannual") {
      const total = prices.annual * 6
      const installment = total / 6
      return {
        fullPrice: `R$ ${total.toFixed(2).replace('.', ',')}`,
        period: "",
        installments: {
          value: `R$ ${installment.toFixed(2).replace('.', ',')}`,
          times: 6,
          text: "em 6x no cartão"
        }
      }
    } else {
      const totalYear = prices.annual * 12
      const discountedTotal = prices.discountedMonthly * 12
      return {
        fullPrice: `R$ ${discountedTotal.toFixed(2).replace('.', ',')}`,
        period: "",
        installments: {
          value: `R$ ${prices.annual.toFixed(2).replace('.', ',')}`,
          times: 12,
          text: `em 12x no cartão`
        }
      }
    }
  }

  const getRecommendedPlan = () => {
    const contacts = Number.parseInt(selectedContacts)
    if (contacts <= 2500) return "Starter"
    if (contacts <= 5000) return "Growth"
    if (contacts <= 10000) return "Pro"
    return "Enterprise"
  }

  const recommendedPlan = getRecommendedPlan()

  const handlePlanClick = (planTitle: string) => {
    const url = `https://app.glutoes.com/auth/register/fidelizacao?produto=${encodeURIComponent(planTitle)}`
    window.location.href = url
  }

  const plans = [
    {
      title: "Starter",
      price: formatPrice(249),
      messages: "3000",
      features: ["Painel de performance", "Piloto Automático de Campanhas", "Suporte online"],
      ctaText: "Teste Grátis",
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
      ctaText: "Teste Grátis",
      onCtaClick: () => handlePlanClick("Growth"),
      recommended: recommendedPlan === "Growth",
    },
    {
      title: "Pro",
      price: formatPrice(379),
      messages: "10000",
      description: "Acompanhamento estratégico completo para maximizar resultados.",
      features: [
        "Todas as funcionalidades de Growth +",
        "Onboarding dedicado para você e seu time pelos nossos experts",
        "Recomendações estratégicas do Gestor de Contas",
        "Experiência guiada para atingir os objetivos de seus negócios",
      ],
      ctaText: "Teste Grátis",
      onCtaClick: () => handlePlanClick("Pro"),
      recommended: recommendedPlan === "Pro",
    },
    {
      title: "Enterprise",
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
      onCtaClick: () => handlePlanClick("Enterprise"),
      isEnterprise: true,
      recommended: recommendedPlan === "Enterprise",
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
