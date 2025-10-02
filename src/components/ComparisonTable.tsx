import { Check, X } from "lucide-react"

interface Feature {
  name: string
  starter: boolean | string
  growth: boolean | string
  pro: boolean | string
  enterprise: boolean | string
  isCategory?: boolean
}

const features: Feature[] = [
  // Fidelidade
  {
    name: "Fidelidade",
    starter: "",
    growth: "",
    pro: "",
    enterprise: "",
    isCategory: true,
  },
  {
    name: "Programa de fidelidade automatizado integrado com cardápio digital",
    starter: true,
    growth: true,
    pro: true,
    enterprise: true,
  },
  {
    name: "Cadastro e atualização automática de cupons de desconto",
    starter: true,
    growth: true,
    pro: true,
    enterprise: true,
  },
  // Crescimento
  {
    name: "Crescimento",
    starter: "",
    growth: "",
    pro: "",
    enterprise: "",
    isCategory: true,
  },
  {
    name: "Painel de performance",
    starter: true,
    growth: true,
    pro: true,
    enterprise: true,
  },
  {
    name: "Piloto Automático de Campanhas",
    starter: true,
    growth: true,
    pro: true,
    enterprise: true,
  },
  {
    name: "Suporte online",
    starter: true,
    growth: true,
    pro: true,
    enterprise: true,
  },
  {
    name: "Campanhas personalizadas",
    starter: "3",
    growth: "8",
    pro: "15",
    enterprise: "Ilimitadas",
  },
  // Aquisição
  {
    name: "Aquisição",
    starter: "",
    growth: "",
    pro: "",
    enterprise: "",
    isCategory: true,
  },
  {
    name: "Número de engajamentos com contatos",
    starter: "100",
    growth: "300",
    pro: "1000",
    enterprise: "Customizado",
  },
  {
    name: "Recuperador de vendas por Instagram",
    starter: false,
    growth: false,
    pro: true,
    enterprise: true,
  },
  {
    name: "Acesso a modelos prontos de mensagens",
    starter: true,
    growth: true,
    pro: true,
    enterprise: true,
  },
  {
    name: "Marca Glutões nas mensagens de Instagram",
    starter: "Powered by Glutões",
    growth: "Sem marca",
    pro: "Sem marca",
    enterprise: "Sem marca",
  },
  // Suporte e Serviços
  {
    name: "Suporte e Serviços",
    starter: "",
    growth: "",
    pro: "",
    enterprise: "",
    isCategory: true,
  },
  {
    name: "Onboarding dedicado para você e seu time pelos nossos experts",
    starter: false,
    growth: false,
    pro: true,
    enterprise: true,
  },
  {
    name: "Recomendações estratégias do Gestor de Contas",
    starter: false,
    growth: false,
    pro: true,
    enterprise: true,
  },
  {
    name: "Experiência guiada para atingir os objetivos de seus negócios",
    starter: false,
    growth: false,
    pro: true,
    enterprise: true,
  },
  {
    name: "Otimize a eficiência com testes A/B",
    starter: false,
    growth: false,
    pro: true,
    enterprise: true,
  },
]

const renderCell = (value: boolean | string) => {
  if (typeof value === "string") {
    return (
      <div className="flex justify-center">
        <span className="text-xs md:text-sm text-muted-foreground">{value}</span>
      </div>
    )
  }
  if (value) {
    return (
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-1">
          <Check className="w-4 h-4 md:w-5 md:h-5 text-primary" />
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      <X className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground/30" />
    </div>
  )
}

export const ComparisonTable = () => {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Compare os nossos Planos
        </h2>

        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-sm rounded-lg">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 md:py-6 px-2 md:px-4 font-semibold text-foreground text-xs md:text-base min-w-[140px] md:min-w-0">
                      Funcionalidades
                    </th>
                    <th className="py-4 md:py-6 px-2 md:px-4 text-center min-w-[100px] md:min-w-0">
                      <div className="font-bold text-sm md:text-lg text-foreground">Starter</div>
                      <div className="text-xs md:text-sm text-muted-foreground mt-1">R$249/mês</div>
                    </th>
                    <th className="py-4 md:py-6 px-2 md:px-4 text-center min-w-[100px] md:min-w-0">
                      <div className="font-bold text-sm md:text-lg text-foreground">Growth</div>
                      <div className="text-xs md:text-sm text-muted-foreground mt-1">R$279/mês</div>
                    </th>
                    <th className="py-4 md:py-6 px-2 md:px-4 text-center bg-primary/5 rounded-t-xl min-w-[100px] md:min-w-0">
                      <div className="font-bold text-sm md:text-lg text-primary">Pro</div>
                      <div className="text-xs md:text-sm text-muted-foreground mt-1">R$349/mês</div>
                    </th>
                    <th className="py-4 md:py-6 px-2 md:px-4 text-center min-w-[110px] md:min-w-0">
                      <div className="font-bold text-sm md:text-lg text-foreground">Enterprise</div>
                      <div className="text-xs md:text-sm text-muted-foreground mt-1">Personalizado</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    feature.isCategory ? (
                      <tr key={index} className="bg-muted/50">
                        <td colSpan={5} className="py-3 md:py-4 px-2 md:px-4 font-bold text-primary text-sm md:text-lg">
                          {feature.name}
                        </td>
                      </tr>
                    ) : (
                      <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-3 md:py-4 px-2 md:px-4 font-medium text-foreground text-xs md:text-base">
                          {feature.name}
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-4">{renderCell(feature.starter)}</td>
                        <td className="py-3 md:py-4 px-2 md:px-4">{renderCell(feature.growth)}</td>
                        <td className="py-3 md:py-4 px-2 md:px-4 bg-primary/5">{renderCell(feature.pro)}</td>
                        <td className="py-3 md:py-4 px-2 md:px-4">{renderCell(feature.enterprise)}</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 md:hidden">Deslize para ver todos os planos →</p>
      </div>
    </section>
  )
}
