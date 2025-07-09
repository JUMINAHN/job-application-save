"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2, Save } from "lucide-react"
import { useApplicationStore, type Community } from "../store/application-store"

interface CommunityFormProps {
  copyToClipboard: (text: string, section: string) => void
}

export function CommunityForm({ copyToClipboard }: CommunityFormProps) {
  const { communities, addCommunity, updateCommunity, deleteCommunity } = useApplicationStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Community, "id">>({
    category: "",
    activityName: "",
    period: "",
    mainActivities: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateCommunity(editingId, formData)
      setEditingId(null)
    } else {
      addCommunity(formData)
    }
    setFormData({
      category: "",
      activityName: "",
      period: "",
      mainActivities: "",
    })
  }

  const handleEdit = (community: Community) => {
    setFormData(community)
    setEditingId(community.id)
  }

  const formatCommunityForCopy = (community: Community) => {
    return `구분: ${community.category}
활동명: ${community.activityName}
활동기간: ${community.period}
주요활동내용: ${community.mainActivities}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>커뮤니티활동 {editingId ? "수정" : "추가"}</CardTitle>
          <CardDescription>커뮤니티 활동 정보를 입력하고 저장하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">구분</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="동아리, 봉사활동, 스터디 등"
                />
              </div>
              <div>
                <Label htmlFor="activityName">활동명</Label>
                <Input
                  id="activityName"
                  value={formData.activityName}
                  onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
                  placeholder="활동명을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="period">활동기간</Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="2022.03~2023.02"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="mainActivities">주요활동내용</Label>
              <Textarea
                id="mainActivities"
                value={formData.mainActivities}
                onChange={(e) => setFormData({ ...formData, mainActivities: e.target.value })}
                placeholder="주요활동내용을 상세히 입력하세요"
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
                      category: "",
                      activityName: "",
                      period: "",
                      mainActivities: "",
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
        <h3 className="text-lg font-semibold">저장된 커뮤니티활동 ({communities.length}개)</h3>
        {communities.map((community) => (
          <Card key={community.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{community.activityName}</h4>
                  <p className="text-sm text-gray-600">
                    {community.category} | {community.period}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(formatCommunityForCopy(community), "커뮤니티활동")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(community)}>
                    수정
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteCommunity(community.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <strong>주요활동내용:</strong>
                <p className="mt-1 text-sm text-gray-700">{community.mainActivities}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
