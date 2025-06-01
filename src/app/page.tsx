import { Hero } from "../components/Hero"
import { FeaturedProjects } from "../components/FeaturedProjects"
import { JoinCommunity } from "../components/JoinCommunity"
import { Footer } from "../components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <Hero />
        <FeaturedProjects />
        <JoinCommunity />
      </main>
      <Footer />
    </div>
  )
}