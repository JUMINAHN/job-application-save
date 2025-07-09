"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2, Save } from "lucide-react"
import { useApplicationStore, type ITSkill } from "../store/application-store"

interface ITSkillFormProps {
  copyToClipboard: (text: string, section: string) => void
}

export function ITSkillForm({ copyToClipboard }: ITSkillFormProps) {
  const { itSkills, addITSkill, updateITSkill, deleteITSkill } = useApplicationStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<ITSkill, "id">>({
    type: "",
    level: "",
    ability: "",
    proficiency: "",
    usagePeriod: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateITSkill(editingId, formData)
      setEditingId(null)
    } else {
      addITSkill(formData)
    }
    setFormData({
      type: "",
      level: "",
      ability: "",
      proficiency: "",
      usagePeriod: "",
    })
  }

  const handleEdit = (itSkill: ITSkill) => {
    setFormData(itSkill)
    setEditingId(itSkill.id)
  }

  const formatITSkillForCopy = (itSkill: ITSkill) => {
    return `IT활용종류: ${itSkill.type}
수준: ${itSkill.level}
활용능력: ${itSkill.ability}
정도: ${itSkill.proficiency}
사용기간: ${itSkill.usagePeriod}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>IT활용능력 {editingId ? "수정" : "추가"}</CardTitle>
          <CardDescription>IT활용능력 정보를 입력하고 저장하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">IT활용종류</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="Java, Python, React 등"
                />
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
                    <SelectItem value="전문가">전문가</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="proficiency">정도</Label>
                <Select
                  value={formData.proficiency}
                  onValueChange={(value) => setFormData({ ...formData, proficiency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="정도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="초급">초급</SelectItem>
                    <SelectItem value="중급">중급</SelectItem>
                    <SelectItem value="고급">고급</SelectItem>
                    <SelectItem value="전문가">전문가</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="usagePeriod">사용기간</Label>
                <Input
                  id="usagePeriod"
                  value={formData.usagePeriod}
                  onChange={(e) => setFormData({ ...formData, usagePeriod: e.target.value })}
                  placeholder="3년, 1년 6개월 등"
                />
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
                      type: "",
                      level: "",
                      ability: "",
                      proficiency: "",
                      usagePeriod: "",
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
        <h3 className="text-lg font-semibold">저장된 IT활용능력 ({itSkills.length}개)</h3>
        {itSkills.map((itSkill) => (
          <Card key={itSkill.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{itSkill.type}</h4>
                  <p className="text-sm text-gray-600">
                    수준: {itSkill.level} | 정도: {itSkill.proficiency} | 사용기간: {itSkill.usagePeriod}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(formatITSkillForCopy(itSkill), "IT활용능력")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(itSkill)}>
                    수정
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteITSkill(itSkill.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <strong>활용능력:</strong>
                <p className="mt-1 text-sm text-gray-700">{itSkill.ability}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
