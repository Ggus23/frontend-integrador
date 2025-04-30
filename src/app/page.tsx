import { Hero } from "@/components/Hero"
import { FeaturedProjects } from "@/components/FeaturedProjects"
import { JoinCommunity } from "@/components/JoinCommunity"
import { TeacherResources } from "@/components/TeacherResources"
import { TeacherTestimonials } from "@/components/TeacherTestimonials"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <Hero />
        <FeaturedProjects />
        <JoinCommunity />
        <TeacherResources />
        <TeacherTestimonials />
      </main>
      <Footer />
    </div>
  )
}