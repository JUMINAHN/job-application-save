"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Trash2, Save } from "lucide-react"
import { useApplicationStore, type Certification } from "../store/application-store"

interface CertificationFormProps {
  copyToClipboard: (text: string, section: string) => void
}

export function CertificationForm({ copyToClipboard }: CertificationFormProps) {
  const { certifications, addCertification, updateCertification, deleteCertification } = useApplicationStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Certification, "id">>({
    type: "",
    grade: "",
    acquisitionDate: "",
    registrationNumber: "",
    issuingOrganization: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateCertification(editingId, formData)
      setEditingId(null)
    } else {
      addCertification(formData)
    }
    setFormData({
      type: "",
      grade: "",
      acquisitionDate: "",
      registrationNumber: "",
      issuingOrganization: "",
    })
  }

  const handleEdit = (certification: Certification) => {
    setFormData(certification)
    setEditingId(certification.id)
  }

  const formatCertificationForCopy = (certification: Certification) => {
    return `자격종류: ${certification.type}
자격등급: ${certification.grade}
취득일자: ${certification.acquisitionDate}
등록(자격)번호: ${certification.registrationNumber}
발급기관: ${certification.issuingOrganization}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>자격증 {editingId ? "수정" : "추가"}</CardTitle>
          <CardDescription>자격증 정보를 입력하고 저장하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">자격종류</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="정보처리기사, 컴활1급 등"
                />
              </div>
              <div>
                <Label htmlFor="grade">자격등급</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="1급, 2급, 기사 등"
                />
              </div>
              <div>
                <Label htmlFor="acquisitionDate">취득일자</Label>
                <Input
                  id="acquisitionDate"
                  type="date"
                  value={formData.acquisitionDate}
                  onChange={(e) => setFormData({ ...formData, acquisitionDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="registrationNumber">등록(자격)번호</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  placeholder="등록번호를 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="issuingOrganization">발급기관</Label>
                <Input
                  id="issuingOrganization"
                  value={formData.issuingOrganization}
                  onChange={(e) => setFormData({ ...formData, issuingOrganization: e.target.value })}
                  placeholder="발급기관을 입력하세요"
                />
              </div>
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
                      type: "",
                      grade: "",
                      acquisitionDate: "",
                      registrationNumber: "",
                      issuingOrganization: "",
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
        <h3 className="text-lg font-semibold">저장된 자격증 ({certifications.length}개)</h3>
        {certifications.map((certification) => (
          <Card key={certification.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{certification.type}</h4>
                  <p className="text-sm text-gray-600">
                    {certification.grade} | {certification.acquisitionDate}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(formatCertificationForCopy(certification), "자격증")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(certification)}>
                    수정
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteCertification(certification.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>등록번호:</strong> {certification.registrationNumber}
                </div>
                <div>
                  <strong>발급기관:</strong> {certification.issuingOrganization}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
