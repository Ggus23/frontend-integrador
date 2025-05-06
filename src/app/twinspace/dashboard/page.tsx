import { Footer } from "@/components/Footer"
import { TwinSpace } from "@/components/TwinSpace"

export default function TwinSpaceDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow">
        <TwinSpace />
      </main>
      <Footer />
    </div>
  )
}
