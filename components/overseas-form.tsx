"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2, Save } from "lucide-react"
import { useApplicationStore, type Overseas } from "../store/application-store"

interface OverseasFormProps {
  copyToClipboard: (text: string, section: string) => void
}

export function OverseasForm({ copyToClipboard }: OverseasFormProps) {
  const { overseas, addOverseas, updateOverseas, deleteOverseas } = useApplicationStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Overseas, "id">>({
    purpose: "",
    country: "",
    period: "",
    institution: "",
    experience: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateOverseas(editingId, formData)
      setEditingId(null)
    } else {
      addOverseas(formData)
    }
    setFormData({
      purpose: "",
      country: "",
      period: "",
      institution: "",
      experience: "",
    })
  }

  const handleEdit = (overseas: Overseas) => {
    setFormData(overseas)
    setEditingId(overseas.id)
  }

  const formatOverseasForCopy = (overseas: Overseas) => {
    return `거주목적: ${overseas.purpose}
국가: ${overseas.country}
거주기간: ${overseas.period}
기관: ${overseas.institution}
해외경험: ${overseas.experience}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>해외연수 {editingId ? "수정" : "추가"}</CardTitle>
          <CardDescription>해외연수 정보를 입력하고 저장하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="purpose">거주목적</Label>
                <Input
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  placeholder="유학, 연수, 근무 등"
                />
              </div>
              <div>
                <Label htmlFor="country">국가</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="국가명을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="period">거주기간</Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="2021.03~2022.02"
                />
              </div>
              <div>
                <Label htmlFor="institution">기관</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="기관명을 입력하세요"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="experience">해외경험</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="해외경험을 상세히 입력하세요"
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
                      purpose: "",
                      country: "",
                      period: "",
                      institution: "",
                      experience: "",
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
        <h3 className="text-lg font-semibold">저장된 해외연수 ({overseas.length}개)</h3>
        {overseas.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">
                    {item.country} - {item.purpose}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.institution} | {item.period}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(formatOverseasForCopy(item), "해외연수")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    수정
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteOverseas(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <strong>해외경험:</strong>
                <p className="mt-1 text-sm text-gray-700">{item.experience}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
