"use client"

import { ComparisonTable } from "@/components/ComparisonTable"
import { Header } from "@/components/Header"
import { PricingCard } from "@/components/PricingCard"
import { PricingHero } from "@/components/PricingHero"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function Home() {
  const [selectedContacts, setSelectedContacts] = useState("5000")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [hasAddOn, setHasAddOn] = useState(false)
  const [selectedAddOnMessages, setSelectedAddOnMessages] = useState("1000")
  const [hasFacebookAddOn, setHasFacebookAddOn] = useState(false)

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

  // Opções de mensagens extras com preços
  const addOnOptions = [
    { messages: 1000, price: 99 },
    { messages: 2000, price: 198 },
    { messages: 3000, price: 297 },
    { messages: 5000, price: 495 },
    { messages: 10000, price: 990 }
  ]

  // Calcular preço do add-on baseado na seleção
  const getAddOnPrice = () => {
    const selected = addOnOptions.find(opt => opt.messages.toString() === selectedAddOnMessages)
    return selected ? selected.price : 99
  }

  // Calcular valor adicional por mensagem
  const getAddOnPricePerMessage = () => {
    const selected = addOnOptions.find(opt => opt.messages.toString() === selectedAddOnMessages)
    if (!selected) return 0.099
    return selected.price / selected.messages
  }

  const selectedAddOn = addOnOptions.find(opt => opt.messages.toString() === selectedAddOnMessages) || addOnOptions[0]

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
    const params: Record<string, string> = {
      plano: planTitle,
      contatos: selectedContacts,
      periodo: selectedPeriod,
    }

    params.addon = hasAddOn ? 'true' : 'false'
    
    if (hasAddOn) {
      params.addon_mensagens = selectedAddOnMessages
    }

    // Add-on Facebook Business Meta API
    params.addon_facebook = hasFacebookAddOn ? 'true' : 'false'

    const url = `http://localhost:3001/auth/plg-billing?${new URLSearchParams(params).toString()}`
    window.location.href = url
  }

  const handleAddOnsPurchase = () => {
    const params: Record<string, string> = {
      plano: recommendedPlan,
      contatos: selectedContacts,
      periodo: selectedPeriod,
      addon: hasAddOn ? 'true' : 'false',
      addon_facebook: hasFacebookAddOn ? 'true' : 'false'
    }

    if (hasAddOn) {
      params.addon_mensagens = selectedAddOnMessages
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

      <main className={`container mx-auto ${(hasAddOn || hasFacebookAddOn) ? 'pb-28 sm:pb-24' : ''}`}>
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
              className={`relative rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 ${
                hasAddOn 
                  ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-primary shadow-lg shadow-primary/10' 
                  : 'bg-card border-border/50 hover:border-primary/30 hover:shadow-md'
              }`}
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
                        Marketing Suite
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Adicional ao plano {recommendedPlan}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Amplie sua comunicação com mensagens adicionais para campanhas de WhatsApp.
                    Aumente o engajamento com seus clientes através de campanhas automatizadas e personalizadas.
                  </p>

                  {/* Seletor de Mensagens */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="text-sm font-semibold text-foreground">
                      Mensagens extras:
                    </label>
                    <Select 
                      value={selectedAddOnMessages} 
                      onValueChange={setSelectedAddOnMessages}
                    >
                      <SelectTrigger className="w-full sm:w-[250px] h-11 border-2 border-primary/30 bg-primary/5 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium text-foreground">
                        <SelectValue placeholder="Selecione a quantidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {addOnOptions.map((option) => (
                          <SelectItem key={option.messages} value={option.messages.toString()}>
                            {option.messages.toLocaleString('pt-BR')} mensagens - R$ {option.price.toFixed(2).replace('.', ',')}/mês
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preço e Botão */}
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-4">
                  <div className="text-left sm:text-right lg:text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        R$ {getAddOnPrice().toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-muted-foreground font-medium">/mês</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedAddOn.messages.toLocaleString('pt-BR')} mensagens extras
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setHasAddOn(!hasAddOn)
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
                      Você terá {selectedAddOn.messages.toLocaleString('pt-BR')} mensagens extras por mês além das incluídas no plano base. 
                      O valor total será calculado na próxima etapa.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Add-on Facebook Business Meta API */}
            <div 
              className={`relative rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 mt-6 ${
                hasFacebookAddOn 
                  ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-primary shadow-lg shadow-primary/10' 
                  : 'bg-card border-border/50 hover:border-primary/30 hover:shadow-md'
              }`}
            >
              {/* Indicador de selecionado */}
              {hasFacebookAddOn && (
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
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold">
                        Verificação e Ativação Facebook Business Meta API
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Implantação única
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configure e ative a integração completa com Facebook Business Meta API para seu negócio. 
                    Nossa equipe realiza toda a verificação e configuração necessária para conectar sua conta 
                    do Facebook Business ao sistema, permitindo campanhas avançadas e automações poderosas 
                    através da plataforma Meta.
                  </p>
                </div>

                {/* Preço e Botão */}
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-4">
                  <div className="text-left sm:text-right lg:text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        R$ 650,00
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Implantação única
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setHasFacebookAddOn(!hasFacebookAddOn)
                    }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[160px] ${
                      hasFacebookAddOn
                        ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30'
                        : 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    {hasFacebookAddOn ? (
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
              {hasFacebookAddOn && (
                <div className="mt-6 pt-6 border-t border-primary/20">
                  <div className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Este serviço de implantação será adicionado ao seu plano {recommendedPlan}.</span>{' '}
                      Nossa equipe entrará em contato para realizar a verificação e ativação completa da integração 
                      com Facebook Business Meta API. O valor de R$ 650,00 é uma taxa única de implantação.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Disponível a partir de 12/25. Escolha a quantidade de mensagens extras que deseja adicionar ao seu plano.
            </p>
          </div>
        </section>

        {/* Botão fixo para adquirir add-ons */}
        {(hasAddOn || hasFacebookAddOn) && (
          <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border shadow-2xl z-50 px-4 py-3 sm:px-6 sm:py-4">
            <div className="container mx-auto max-w-5xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex-1 w-full">
                  <p className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-1">
                    Plano e add-ons selecionados
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="px-2.5 py-1.5 bg-accent/20 text-accent font-semibold rounded-lg text-xs sm:text-xs border border-accent/30">
                      Plano {recommendedPlan}
                    </span>
                    {hasAddOn && (
                      <span className="px-2.5 py-1.5 bg-primary/10 text-primary font-medium rounded-lg text-xs sm:text-xs border border-primary/20">
                        Marketing Suite - {selectedAddOn.messages.toLocaleString('pt-BR')} mensagens
                      </span>
                    )}
                    {hasFacebookAddOn && (
                      <span className="px-2.5 py-1.5 bg-primary/10 text-primary font-medium rounded-lg text-xs sm:text-xs border border-primary/20">
                        Facebook Business Meta API
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleAddOnsPurchase}
                  className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-3 bg-gradient-to-r from-primary to-accent text-white font-bold text-sm sm:text-base rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Quero contratar
                </button>
              </div>
            </div>
          </div>
        )}

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
