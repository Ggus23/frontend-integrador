import { About } from "@/components/About"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Header />
      <main className="flex-grow">
        <About />
      </main>
      <Footer />
    </div>
  )
}
