"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2, Save } from "lucide-react"
import { useApplicationStore, type Project } from "../store/application-store"

interface ProjectFormProps {
  copyToClipboard: (text: string, section: string) => void
}

export function ProjectForm({ copyToClipboard }: ProjectFormProps) {
  const { projects, addProject, updateProject, deleteProject } = useApplicationStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    projectName: "",
    company: "",
    participationPeriod: "",
    responsibilities: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateProject(editingId, formData)
      setEditingId(null)
    } else {
      addProject(formData)
    }
    setFormData({
      projectName: "",
      company: "",
      participationPeriod: "",
      responsibilities: "",
    })
  }

  const handleEdit = (project: Project) => {
    setFormData(project)
    setEditingId(project.id)
  }

  const formatProjectForCopy = (project: Project) => {
    return `프로젝트명: ${project.projectName}
회사명: ${project.company}
참여기간: ${project.participationPeriod}
담당업무 및 내용: ${project.responsibilities}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>프로젝트 {editingId ? "수정" : "추가"}</CardTitle>
          <CardDescription>프로젝트 정보를 입력하고 저장하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectName">프로젝트명</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  placeholder="프로젝트명을 입력하세요"
                />
              </div>
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
                <Label htmlFor="participationPeriod">참여기간</Label>
                <Input
                  id="participationPeriod"
                  value={formData.participationPeriod}
                  onChange={(e) => setFormData({ ...formData, participationPeriod: e.target.value })}
                  placeholder="2022.03~2022.12"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="responsibilities">담당업무 및 내용</Label>
              <Textarea
                id="responsibilities"
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                placeholder="담당업무 및 내용을 상세히 입력하세요"
                rows={4}
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
                      projectName: "",
                      company: "",
                      participationPeriod: "",
                      responsibilities: "",
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
        <h3 className="text-lg font-semibold">저장된 프로젝트 ({projects.length}개)</h3>
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{project.projectName}</h4>
                  <p className="text-sm text-gray-600">
                    {project.company} | {project.participationPeriod}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(formatProjectForCopy(project), "프로젝트")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                    수정
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteProject(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <strong>담당업무 및 내용:</strong>
                <p className="mt-1 text-sm text-gray-700">{project.responsibilities}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
