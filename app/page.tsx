"use client"

import { ComparisonTable } from "@/components/ComparisonTable"
import { Header } from "@/components/Header"
import { PricingHero } from "@/components/PricingHero"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function Home() {
  const [selectedContacts, setSelectedContacts] = useState("5000")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [hasAddOn, setHasAddOn] = useState(false)
  const [selectedAddOnMessages, setSelectedAddOnMessages] = useState("1000")
  const [hasFacebookAddOn, setHasFacebookAddOn] = useState(false)
  const [hasChatbotAddOn, setHasChatbotAddOn] = useState(false)

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

  // Calcula preço do add-on considerando o período
  const getAddOnPriceWithPeriod = () => {
    const monthlyPrice = getAddOnPrice()
    return selectedPeriod === 'monthly' ? monthlyPrice : monthlyPrice * 12
  }

  // Preço do chatbot de acordo com o plano
  const getChatbotPrice = () => {
    const chatbotPriceMap: Record<string, number> = {
      'Starter': 149,
      'Growth': 199,
      'Pro': 299,
      'Ultra': 399
    }
    return chatbotPriceMap[recommendedPlan] || 199
  }

  // Calcula preço do chatbot considerando o período
  const getChatbotPriceWithPeriod = () => {
    const monthlyPrice = getChatbotPrice()
    return selectedPeriod === 'monthly' ? monthlyPrice : monthlyPrice * 12
  }

  // Calcula total
  const getTotalPrice = () => {
    let total = getPlanPrice(recommendedPlan)
    if (hasAddOn) total += getAddOnPriceWithPeriod()
    if (hasChatbotAddOn) total += getChatbotPriceWithPeriod()
    return total
  }

  const handleAddOnsPurchase = () => {
    const params: Record<string, string> = {
      plano: recommendedPlan,
      contatos: selectedContacts,
      periodo: selectedPeriod,
      addon: hasAddOn ? 'true' : 'false',
      addon_facebook: hasFacebookAddOn ? 'true' : 'false',
      addon_chatbot: hasChatbotAddOn ? 'true' : 'false'
    }

    if (hasAddOn) {
      params.addon_mensagens = selectedAddOnMessages
    }

    const url = `http://localhost:3001/auth/plg-billing?${new URLSearchParams(params).toString()}`
    window.location.href = url
  }

  // Benefícios por plano
  const getPlanFeatures = () => {
    switch (recommendedPlan) {
      case 'Starter':
        return [
          'Painel de performance',
          'Piloto Automático de Campanhas',
          'Suporte online'
        ]
      case 'Growth':
        return [
          'Todas funcionalidades Starter +',
          'Mais campanhas personalizadas',
          'Modelos prontos de mensagens',
          'Programa de fidelidade'
        ]
      case 'Pro':
        return [
          'Todas funcionalidades Growth +',
          'Onboarding dedicado',
          'Recomendações do Gestor',
          'Experiência guiada'
        ]
      case 'Ultra':
        return [
          'Todas funcionalidades Pro +',
          'Campanhas ilimitadas',
          'Engajamentos customizados',
          'Testes A/B'
        ]
      default:
        return []
    }
  }

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

        {/* Seção de Resumo - Layout de 3 colunas */}
        <section className="px-4 pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                
                {/* Coluna 1 - Plano */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-foreground mb-1">Plano {recommendedPlan}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Baseado em {Number(selectedContacts).toLocaleString('pt-BR')} contatos</p>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-foreground">
                      R$ {getPlanPrice(recommendedPlan).toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-muted-foreground ml-1">por mês</span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-semibold text-foreground mb-3">Inclui:</p>
                    <div className="space-y-2">
                      {getPlanFeatures().map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Coluna 2 - Marketing Suite Add-On */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground">Marketing Suite</h3>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">Add-on</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">Mensagens extras:</p>
                  <div className="flex gap-2 mb-6">
                    <Select value={hasAddOn ? selectedAddOnMessages : "0"} onValueChange={(val) => {
                      if (val === "0") {
                        setHasAddOn(false)
                      } else {
                        setHasAddOn(true)
                        setSelectedAddOnMessages(val)
                      }
                    }}>
                      <SelectTrigger className="w-full h-12 border-2 border-border hover:border-primary/50 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Não incluir</SelectItem>
                        {addOnOptions.map((option) => (
                          <SelectItem key={option.messages} value={option.messages.toString()}>
                            {option.messages.toLocaleString('pt-BR')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-foreground">
                      R$ {hasAddOn ? getAddOnPrice().toFixed(2).replace('.', ',') : '0,00'}
                    </span>
                    <span className="text-muted-foreground ml-1">por mês</span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Créditos acumulam para o próximo mês</span>
                    </div>
                  </div>
                </div>

                {/* Coluna 3 - Total */}
                <div className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                  <h3 className="text-xl font-bold text-primary mb-4">Total</h3>
                  
                  {/* Detalhamento dos valores */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-border/50">
                    {/* Plano */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Plano {recommendedPlan}</span>
                      <span className="font-medium">R$ {getPlanPrice(recommendedPlan).toFixed(2).replace('.', ',')}</span>
                    </div>
                    
                    {/* Marketing Suite */}
                    {hasAddOn && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Marketing Suite</span>
                        <span className="font-medium text-primary">+ R$ {getAddOnPriceWithPeriod().toFixed(2).replace('.', ',')}</span>
                      </div>
                    )}
                    
                    {/* Chatbot */}
                    {hasChatbotAddOn && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Chatbot Inteligente</span>
                        <span className="font-medium text-primary">+ R$ {getChatbotPriceWithPeriod().toFixed(2).replace('.', ',')}</span>
                      </div>
                    )}
                    
                    {/* Facebook - Implantação única */}
                    {hasFacebookAddOn && (
                      <div className="flex justify-between items-center text-sm pt-2 border-t border-border/30">
                        <span className="text-muted-foreground text-xs">Implantação única (Facebook)</span>
                        <span className="font-medium text-xs">+ R$ 650,00</span>
                      </div>
                    )}
                  </div>

                  {/* Primeiro período (com implantação se houver) */}
                  {hasFacebookAddOn ? (
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-bold text-primary">
                          R$ {(getTotalPrice() + 650).toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-muted-foreground text-sm">{selectedPeriod === 'monthly' ? 'no 1º mês' : 'no 1º ano'}</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold text-foreground">
                          R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-muted-foreground text-xs">{selectedPeriod === 'monthly' ? '/mês após' : '/ano após'}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-primary">
                        R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-muted-foreground ml-1">{selectedPeriod === 'monthly' ? 'por mês' : 'por ano'}</span>
                    </div>
                  )}

                  <button
                    onClick={handleAddOnsPurchase}
                    className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-bold text-base rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Começar agora
                  </button>

                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Cancele quando quiser
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Seção de Add-ons */}
        <section className="px-4 pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto">
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

            {/* Add-on Chatbot */}
            <div 
              className={`relative rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 mb-6 ${
                hasChatbotAddOn 
                  ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-primary shadow-lg shadow-primary/10' 
                  : 'bg-card border-border/50 hover:border-primary/30 hover:shadow-md'
              }`}
            >
              {hasChatbotAddOn && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold">Chatbot Inteligente</h3>
                      <p className="text-xs text-muted-foreground">Atendimento automatizado 24/7</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatize o atendimento ao cliente com nosso chatbot inteligente. Responda dúvidas frequentes, 
                    receba pedidos e qualifique leads automaticamente, 24 horas por dia, 7 dias por semana. 
                    Integrado diretamente ao WhatsApp do seu restaurante.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-4">
                  <div className="text-left sm:text-right lg:text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        R$ {getChatbotPrice().toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-muted-foreground font-medium">/mês</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Atendimento ilimitado
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setHasChatbotAddOn(!hasChatbotAddOn)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[160px] ${
                      hasChatbotAddOn
                        ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl'
                        : 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    {hasChatbotAddOn ? (
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

              {hasChatbotAddOn && (
                <div className="mt-6 pt-6 border-t border-primary/20">
                  <div className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">O Chatbot será ativado em seu WhatsApp.</span>{' '}
                      Nossa equipe entrará em contato para configurar o chatbot de acordo com as necessidades do seu restaurante.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Add-on Facebook Business Meta API */}
            <div 
              className={`relative rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 ${
                hasFacebookAddOn 
                  ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-primary shadow-lg shadow-primary/10' 
                  : 'bg-card border-border/50 hover:border-primary/30 hover:shadow-md'
              }`}
            >
              {hasFacebookAddOn && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold">Verificação e Ativação Facebook Business Meta API</h3>
                      <p className="text-xs text-muted-foreground">Implantação única</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configure e ative a integração completa com Facebook Business Meta API para seu negócio. 
                    Nossa equipe realiza toda a verificação e configuração necessária para conectar sua conta 
                    do Facebook Business ao sistema, permitindo campanhas avançadas e automações poderosas 
                    através da plataforma Meta.
                  </p>
                </div>

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
                    onClick={() => setHasFacebookAddOn(!hasFacebookAddOn)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[160px] ${
                      hasFacebookAddOn
                        ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl'
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
