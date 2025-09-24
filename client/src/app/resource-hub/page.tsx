import { ComingSoon } from "@/components/coming-soon"
import { Music } from "lucide-react"

export default function ResourceHubPage() {
  return (
    <ComingSoon
      title="Resource Hub"
      description="Helpful content and wellness resources"
      icon={<Music className="h-8 w-8" />}
      estimatedLaunch="Q1 2024"
    />
  )
}