"use client"
import CareerForm from "./components/career-form"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function JobApplicationManager() {
  const { toast } = useToast()

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "복사 완료!",
        description: `${section} 정보가 클립보드에 복사되었습니다.`,
      })
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">채용 지원서 관리 시스템</h1>
          <p className="text-gray-600">한 번 입력하고 어디든 복사해서 사용하세요!</p>
        </div>

        <div className="space-y-8">
          <CareerForm copyToClipboard={copyToClipboard} />
        </div>
      </div>
      {/* 건의사항 플로팅 버튼 */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSdYGk6x85Pj45U4aF9JD2JA5z5cSI-O5Xhni9XQnXCtNWaQ5A/viewform?usp=sharing&ouid=117938457471446645645",
              "_blank",
            )
          }
          className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-125 hover:w-12 hover:h-12"
          size="sm"
        >
          <MessageCircle className="w-4 h-4 text-white hover:w-5 hover:h-5 transition-all duration-300" />
        </Button>
      </div>
      <Toaster />
    </div>
  )
}
