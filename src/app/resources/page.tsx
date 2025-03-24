import { Resources } from "@/components/Resources"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Resources />
      </main>
      <Footer />
    </div>
  )
}