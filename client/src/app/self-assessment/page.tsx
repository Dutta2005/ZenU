import { ComingSoon } from "@/components/coming-soon"
import { ClipboardList } from "lucide-react"

export default function SelfAssessmentPage() {
  return (
    <ComingSoon
      title="Self-Assessment"
      description="Understand your mental health with clinical tools"
      icon={<ClipboardList className="h-8 w-8" />}
      estimatedLaunch="Q1 2024"
    />
  )
}