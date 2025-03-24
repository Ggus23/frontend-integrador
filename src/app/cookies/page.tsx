import { CookiePolicy } from "@/components/CookiePolicy"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CookiePolicy />
      </main>
      <Footer />
    </div>
  )
}
