"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, Save } from "lucide-react"
import { useApplicationStore, type Language } from "../store/application-store"

interface LanguageFormProps {
  copyToClipboard: (text: string, section: string) => void
}

export function LanguageForm({ copyToClipboard }: LanguageFormProps) {
  const { languages, addLanguage, updateLanguage, deleteLanguage } = useApplicationStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Language, "id">>({
    language: "",
    test: "",
    grade: "",
    score: "",
    registrationNumber: "",
    date: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateLanguage(editingId, formData)
      setEditingId(null)
    } else {
      addLanguage(formData)
    }
    setFormData({
      language: "",
      test: "",
      grade: "",
      score: "",
      registrationNumber: "",
      date: "",
    })
  }

  const handleEdit = (language: Language) => {
    setFormData(language)
    setEditingId(language.id)
  }

  const formatLanguageForCopy = (language: Language) => {
    return `언어: ${language.language}
시험: ${language.test}
어학등급: ${language.grade}
취득점수: ${language.score}
등록(자격)번호: ${language.registrationNumber}
취득일: ${language.date}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>어학능력 {editingId ? "수정" : "추가"}</CardTitle>
          <CardDescription>어학능력 정보를 입력하고 저장하세요.</CardDescription>
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
                <Label htmlFor="test">시험</Label>
                <Input
                  id="test"
                  value={formData.test}
                  onChange={(e) => setFormData({ ...formData, test: e.target.value })}
                  placeholder="TOEIC, OPIc, TOEFL 등"
                />
              </div>
              <div>
                <Label htmlFor="grade">어학등급</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="IM3, AL 등"
                />
              </div>
              <div>
                <Label htmlFor="score">취득점수</Label>
                <Input
                  id="score"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  placeholder="점수를 입력하세요"
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
                <Label htmlFor="date">취득일</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                      language: "",
                      test: "",
                      grade: "",
                      score: "",
                      registrationNumber: "",
                      date: "",
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
        <h3 className="text-lg font-semibold">저장된 어학능력 ({languages.length}개)</h3>
        {languages.map((language) => (
          <Card key={language.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">
                    {language.language} - {language.test}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language.grade} | {language.score}점 | {language.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(formatLanguageForCopy(language), "어학능력")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(language)}>
                    수정
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteLanguage(language.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm">
                <strong>등록번호:</strong> {language.registrationNumber}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
