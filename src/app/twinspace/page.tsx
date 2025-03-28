import { TwinSpace } from "@/components/TwinSpace"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function TwinSpacePage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <TwinSpace />
      </main>
      <Footer />
    </div>
  )
}