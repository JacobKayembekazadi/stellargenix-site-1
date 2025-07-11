import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TriangleAlert, TrendingDown, Wrench } from "lucide-react"

const painPoints = [
  {
    icon: <TrendingDown className="h-8 w-8 text-destructive" />,
    title: "Hidden Profit Leak",
    description: "Faded striping leads to collisions & lawsuits.",
    cost: "Avg. claim $35k/incident"
  },
  {
    icon: <TriangleAlert className="h-8 w-8 text-orange-500" />,
    title: "Real-World Cost",
    description: "Failing an ADA audit can be costly.",
    cost: "Up to $150k/lot in fines"
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: "StellarGenix Fix",
    description: "Frequent shutdowns for repainting lose you rent.",
    cost: "72hr turns & 3-year no-repaint pledge"
  }
]

export function PainPoints() {
  return (
    <section id="why-us" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {painPoints.map((point) => (
            <Card key={point.title} className="flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {point.icon}
                </div>
                <CardTitle className="font-headline">{point.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{point.description}</p>
                <p className="mt-2 text-lg font-bold text-primary">{point.cost}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
