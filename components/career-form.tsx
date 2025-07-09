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
import { useApplicationStore, type Career } from "../store/application-store"

interface CareerFormProps {
  copyToClipboard: (text: string, section: string) => void
}

export function CareerForm({ copyToClipboard }: CareerFormProps) {
  const { careers, addCareer, updateCareer, deleteCareer } = useApplicationStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Career, "id">>({
    company: "",
    period: "",
    department: "",
    employmentType: "",
    position: "",
    responsibilities: "",
    salary: "",
    resignationReason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateCareer(editingId, formData)
      setEditingId(null)
    } else {
      addCareer(formData)
    }
    setFormData({
      company: "",
      period: "",
      department: "",
      employmentType: "",
      position: "",
      responsibilities: "",
      salary: "",
      resignationReason: "",
    })
  }

  const handleEdit = (career: Career) => {
    setFormData(career)
    setEditingId(career.id)
  }

  const formatCareerForCopy = (career: Career) => {
    return `회사: ${career.company}
기간: ${career.period}
근무부서: ${career.department}
고용형태: ${career.employmentType}
직위: ${career.position}
담당업무: ${career.responsibilities}
연봉: ${career.salary}
퇴직사유: ${career.resignationReason}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>주요경력 {editingId ? "수정" : "추가"}</CardTitle>
          <CardDescription>경력 정보를 입력하고 저장하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">회사명</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="회사명을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="period">근무기간</Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="2022.11~2023.12"
                />
              </div>
              <div>
                <Label htmlFor="department">근무부서</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="근무부서를 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="employmentType">고용형태</Label>
                <Select
                  value={formData.employmentType}
                  onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="고용형태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="정규직">정규직</SelectItem>
                    <SelectItem value="계약직">계약직</SelectItem>
                    <SelectItem value="인턴">인턴</SelectItem>
                    <SelectItem value="프리랜서">프리랜서</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="position">직위</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="직위를 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="salary">연봉</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="연봉을 입력하세요"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="responsibilities">담당업무</Label>
              <Textarea
                id="responsibilities"
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                placeholder="담당업무를 상세히 입력하세요"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="resignationReason">퇴직사유</Label>
              <Input
                id="resignationReason"
                value={formData.resignationReason}
                onChange={(e) => setFormData({ ...formData, resignationReason: e.target.value })}
                placeholder="퇴직사유를 입력하세요"
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
                      company: "",
                      period: "",
                      department: "",
                      employmentType: "",
                      position: "",
                      responsibilities: "",
                      salary: "",
                      resignationReason: "",
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
        <h3 className="text-lg font-semibold">저장된 경력 ({careers.length}개)</h3>
        {careers.map((career) => (
          <Card key={career.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{career.company}</h4>
                  <p className="text-sm text-gray-600">
                    {career.period} | {career.position}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(formatCareerForCopy(career), "주요경력")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(career)}>
                    수정
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteCareer(career.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>근무부서:</strong> {career.department}
                </div>
                <div>
                  <strong>고용형태:</strong> {career.employmentType}
                </div>
                <div>
                  <strong>연봉:</strong> {career.salary}
                </div>
                <div>
                  <strong>퇴직사유:</strong> {career.resignationReason}
                </div>
              </div>
              <div className="mt-4">
                <strong>담당업무:</strong>
                <p className="mt-1 text-sm text-gray-700">{career.responsibilities}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
