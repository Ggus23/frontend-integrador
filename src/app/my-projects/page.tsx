import { UserProjects } from "@/components/UserProjects"
import { Footer } from "@/components/Footer"

export default function MyProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow">
        <UserProjects />
      </main>
      <Footer />
    </div>
  )
}
