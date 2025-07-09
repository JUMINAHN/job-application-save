"use client"

import { useState, useEffect } from "react"
import { Eye } from "lucide-react"

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0)
  const [isNewVisitor, setIsNewVisitor] = useState<boolean>(false)

  useEffect(() => {
    // 방문자 카운터 로직
    const updateVisitorCount = () => {
      // 현재 방문자 수 가져오기
      const currentCount = Number.parseInt(localStorage.getItem("totalVisitors") || "0")

      // 오늘 날짜 확인
      const today = new Date().toDateString()
      const lastVisitDate = localStorage.getItem("lastVisitDate")
      const userFingerprint = localStorage.getItem("userFingerprint")

      // 사용자 고유 식별자 생성 (IP 대신 브라우저 fingerprint 사용)
      const generateFingerprint = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.textBaseline = "top"
          ctx.font = "14px Arial"
          ctx.fillText("Visitor tracking", 2, 2)
        }

        return btoa(
          navigator.userAgent +
            navigator.language +
            screen.width +
            "x" +
            screen.height +
            new Date().getTimezoneOffset() +
            (canvas.toDataURL ? canvas.toDataURL() : ""),
        ).substring(0, 20)
      }

      const currentFingerprint = generateFingerprint()

      // 새로운 방문자인지 확인 (다른 브라우저/기기 또는 하루가 지난 경우)
      if (!userFingerprint || userFingerprint !== currentFingerprint || lastVisitDate !== today) {
        const newCount = currentCount + 1
        localStorage.setItem("totalVisitors", newCount.toString())
        localStorage.setItem("lastVisitDate", today)
        localStorage.setItem("userFingerprint", currentFingerprint)
        setVisitorCount(newCount)
        setIsNewVisitor(true)

        // 새 방문자 알림 (선택사항)
        console.log(`🎉 새로운 방문자! 총 방문자 수: ${newCount}`)
      } else {
        setVisitorCount(currentCount)
        setIsNewVisitor(false)
      }
    }

    // 페이지 로드 시 실행
    updateVisitorCount()
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm border">
      <Eye className="w-4 h-4" />
      <span>방문자 수: </span>
      <span className="font-semibold text-blue-600">{visitorCount.toLocaleString()}</span>
      {isNewVisitor && (
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full animate-pulse">NEW</span>
      )}
    </div>
  )
}
