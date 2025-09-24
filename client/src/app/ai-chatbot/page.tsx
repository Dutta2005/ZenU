import { ComingSoon } from "@/components/coming-soon"
import { MessageCircle } from "lucide-react"

export default function AIChatbotPage() {
  return (
    <ComingSoon
      title="AI Chatbot"
      description="24/7 empathetic support in your language"
      icon={<MessageCircle className="h-8 w-8" />}
      estimatedLaunch="Q2 2024"
    />
  )
}