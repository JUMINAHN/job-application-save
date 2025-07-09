"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2, Save } from "lucide-react"
import { useApplicationStore, type ForeignLanguage } from "../store/application-store"

interface ForeignLanguageFormProps {
  copyToClipboard: (text: string, section: string) => void
}

export function ForeignLanguageForm({ copyToClipboard }: ForeignLanguageFormProps) {
  const { foreignLanguages, addForeignLanguage, updateForeignLanguage, deleteForeignLanguage } = useApplicationStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<ForeignLanguage, "id">>({
    language: "",
    level: "",
    ability: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateForeignLanguage(editingId, formData)
      setEditingId(null)
    } else {
      addForeignLanguage(formData)
    }
    setFormData({
      language: "",
      level: "",
      ability: "",
    })
  }

  const handleEdit = (foreignLanguage: ForeignLanguage) => {
    setFormData(foreignLanguage)
    setEditingId(foreignLanguage.id)
  }

  const formatForeignLanguageForCopy = (foreignLanguage: ForeignLanguage) => {
    return `언어: ${foreignLanguage.language}
수준: ${foreignLanguage.level}
활용능력: ${foreignLanguage.ability}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>외국어활용능력 {editingId ? "수정" : "추가"}</CardTitle>
          <CardDescription>외국어활용능력 정보를 입력하고 저장하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">언어</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="언어 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="영어">영어</SelectItem>
                    <SelectItem value="일본어">일본어</SelectItem>
                    <SelectItem value="중국어">중국어</SelectItem>
                    <SelectItem value="독일어">독일어</SelectItem>
                    <SelectItem value="프랑스어">프랑스어</SelectItem>
                    <SelectItem value="스페인어">스페인어</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">수준</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="수준 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="상">상</SelectItem>
                    <SelectItem value="중">중</SelectItem>
                    <SelectItem value="하">하</SelectItem>
                    <SelectItem value="원어민">원어민</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="ability">활용능력</Label>
              <Textarea
                id="ability"
                value={formData.ability}
                onChange={(e) => setFormData({ ...formData, ability: e.target.value })}
                placeholder="활용능력을 상세히 입력하세요"
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
                      language: "",
                      level: "",
                      ability: "",
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
        <h3 className="text-lg font-semibold">저장된 외국어활용능력 ({foreignLanguages.length}개)</h3>
        {foreignLanguages.map((foreignLanguage) => (
          <Card key={foreignLanguage.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{foreignLanguage.language}</h4>
                  <p className="text-sm text-gray-600">수준: {foreignLanguage.level}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(formatForeignLanguageForCopy(foreignLanguage), "외국어활용능력")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(foreignLanguage)}>
                    수정
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteForeignLanguage(foreignLanguage.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <strong>활용능력:</strong>
                <p className="mt-1 text-sm text-gray-700">{foreignLanguage.ability}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
