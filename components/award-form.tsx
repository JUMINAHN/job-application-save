"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2, Save } from "lucide-react"
import { useApplicationStore, type Award } from "../store/application-store"

interface AwardFormProps {
  copyToClipboard: (text: string, section: string) => void
}

export function AwardForm({ copyToClipboard }: AwardFormProps) {
  const { awards, addAward, updateAward, deleteAward } = useApplicationStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Award, "id">>({
    awardName: "",
    date: "",
    organization: "",
    details: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateAward(editingId, formData)
      setEditingId(null)
    } else {
      addAward(formData)
    }
    setFormData({
      awardName: "",
      date: "",
      organization: "",
      details: "",
    })
  }

  const handleEdit = (award: Award) => {
    setFormData(award)
    setEditingId(award.id)
  }

  const formatAwardForCopy = (award: Award) => {
    return `수상명: ${award.awardName}
수상일: ${award.date}
수상기관(단체): ${award.organization}
수상내역: ${award.details}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>수상경력 {editingId ? "수정" : "추가"}</CardTitle>
          <CardDescription>수상경력 정보를 입력하고 저장하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="awardName">수상명</Label>
                <Input
                  id="awardName"
                  value={formData.awardName}
                  onChange={(e) => setFormData({ ...formData, awardName: e.target.value })}
                  placeholder="수상명을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="date">수상일</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="organization">수상기관(단체)</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="수상기관을 입력하세요"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="details">수상내역</Label>
              <Textarea
                id="details"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="수상내역을 상세히 입력하세요"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingId ? "수정" : "저장"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({
                      awardName: "",
                      date: "",
                      organization: "",
                      details: "",
                    })
                  }}
                >
                  취소
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">저장된 수상경력 ({awards.length}개)</h3>
        {awards.map((award) => (
          <Card key={award.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{award.awardName}</h4>
                  <p className="text-sm text-gray-600">
                    {award.organization} | {award.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(formatAwardForCopy(award), "수상경력")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(award)}>
                    수정
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteAward(award.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <strong>수상내역:</strong>
                <p className="mt-1 text-sm text-gray-700">{award.details}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
