import { Footer } from "@/components/Footer"
import { ParticipantsManagement } from "@/components/twinspace/ParticipantsManagement"

export default function TwinSpaceDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow">
        <ParticipantsManagement />
      </main>
      <Footer />
    </div>
  )
}