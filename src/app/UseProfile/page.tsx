import { Header } from "@/components/Header"


import { Footer } from "@/components/Footer"
import { UserProfile } from "@/components/UserProfile"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-950">
      <Header />
      <main>
        <UserProfile/>
      </main>
      <Footer />
    </div>
  )
}