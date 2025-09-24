import { ComingSoon } from "@/components/coming-soon"
import { Users } from "lucide-react"

export default function PeerSupportPage() {
  return (
    <ComingSoon
      title="Peer Support"
      description="Connect safely with other students"
      icon={<Users className="h-8 w-8" />}
      estimatedLaunch="Q2 2024"
    />
  )
}