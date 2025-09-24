import { ComingSoon } from "@/components/coming-soon"
import { BookOpen } from "lucide-react"

export default function DailyJournalingPage() {
  return (
    <ComingSoon
      title="Daily Journaling"
      description="Private space for thoughts and reflection"
      icon={<BookOpen className="h-8 w-8" />}
      estimatedLaunch="Q1 2024"
    />
  )
}