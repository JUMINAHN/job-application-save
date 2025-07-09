"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, Save } from "lucide-react"
import { useApplicationStore, type Education } from "../store/application-store"

interface EducationFormProps {
  copyToClipboard: (text: string, section: string) => void
}

export function EducationForm({ copyToClipboard }: EducationFormProps) {
  const { educations, addEducation, updateEducation, deleteEducation } = useApplicationStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Education, "id">>({
    courseName: "",
    period: "",
    completionStatus: "",
    institution: "",
    hours: "",
    mainContent: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateEducation(editingId, formData)
      setEditingId(null)
    } else {
      addEducation(formData)
    }
    setFormData({
      courseName: "",
      period: "",
      completionStatus: "",
      institution: "",
      hours: "",
      mainContent: "",
    })
  }

  const handleEdit = (education: Education) => {
    setFormData(education)
    setEditingId(education.id)
  }

  const formatEducationForCopy = (education: Education) => {
    return `교육과정명: ${education.courseName}
교육기간: ${education.period}
수료구분: ${education.completionStatus}
교육기관: ${education.institution}
교육시간: ${education.hours}
주요내용: ${education.mainContent}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>교육이력 {editingId ? "수정" : "추가"}</CardTitle>
          <CardDescription>교육이력 정보를 입력하고 저장하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="courseName">교육과정명</Label>
                <Input
                  id="courseName"
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  placeholder="교육과정명을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="period">교육기간</Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="2023.01~2023.03"
                />
              </div>
              <div>
                <Label htmlFor="completionStatus">수료구분</Label>
                <Select
                  value={formData.completionStatus}
                  onValueChange={(value) => setFormData({ ...formData, completionStatus: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="수료구분 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="수료">수료</SelectItem>
                    <SelectItem value="이수">이수</SelectItem>
                    <SelectItem value="중도포기">중도포기</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="institution">교육기관</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="교육기관을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="hours">교육시간</Label>
                <Input
                  id="hours"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  placeholder="40시간"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="mainContent">주요내용</Label>
              <Textarea
                id="mainContent"
                value={formData.mainContent}
                onChange={(e) => setFormData({ ...formData, mainContent: e.target.value })}
                placeholder="교육의 주요내용을 입력하세요"
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
                      courseName: "",
                      period: "",
                      completionStatus: "",
                      institution: "",
                      hours: "",
                      mainContent: "",
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
        <h3 className="text-lg font-semibold">저장된 교육이력 ({educations.length}개)</h3>
        {educations.map((education) => (
          <Card key={education.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{education.courseName}</h4>
                  <p className="text-sm text-gray-600">
                    {education.institution} | {education.period}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(formatEducationForCopy(education), "교육이력")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(education)}>
                    수정
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteEducation(education.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <strong>수료구분:</strong> {education.completionStatus}
                </div>
                <div>
                  <strong>교육시간:</strong> {education.hours}
                </div>
              </div>
              <div>
                <strong>주요내용:</strong>
                <p className="mt-1 text-sm text-gray-700">{education.mainContent}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
