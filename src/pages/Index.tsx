"use client"

import { ComparisonTable } from "@/components/ComparisonTable"
import { Header } from "@/components/Header"
import { PricingCard } from "@/components/PricingCard"
import { PricingHero } from "@/components/PricingHero"
import { useState } from "react"

const Index = () => {
  const [selectedContacts, setSelectedContacts] = useState("5000")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const getPriceMultiplier = () => {
    switch (selectedPeriod) {
      case "semiannual":
        return 5.5 // 6 meses com pequeno desconto
      case "annual":
        return 10.8 // 12 meses com 10% desconto
      default:
        return 1
    }
  }

  const formatPrice = (basePrice: number) => {
    const multiplier = getPriceMultiplier()
    const total = basePrice * multiplier

    if (selectedPeriod === "monthly") {
      return {
        fullPrice: `R$ ${basePrice.toFixed(2)}`,
        period: "/mês",
        installments: undefined
      }
    } else if (selectedPeriod === "semiannual") {
      const installment = total / 6
      return {
        fullPrice: ` R$ ${total.toFixed(2)}`,
        period: "",
        installments: {
          value: `R$ ${installment.toFixed(2)}`,
          times: 6,
          text: "em 6x no cartão"
        }
      }
    } else {
      const installment = total / 12
      return {
        fullPrice: ` R$ ${total.toFixed(2)}`,
        period: "",
        installments: {
          value: `R$ ${installment.toFixed(2)}`,
          times: 12,
          text: "em 12x no cartão"
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
      price: formatPrice(349),
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
      price: formatPrice(449),
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
        </section>
      </main>

      <footer className="border-t border-border py-6 md:py-8 px-4 text-center text-xs md:text-sm text-muted-foreground">
        <div className="container mx-auto">© 2025 Glutões. Todos os direitos reservados.</div>
      </footer>
    </div>
  )
}

export default Index
