"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Save, FileText, Plus, Trash2, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MajorCareer {
  id: string
  company: string
  period: string
  department: string
  employmentType: string
  position: string
  duties: string
  salary: string
  reasonForLeaving: string
}

interface CommunityActivity {
  id: string
  category: string
  name: string
  period: string
  description: string
}

interface Project {
  id: string
  name: string
  company: string
  period: string
  duties: string
}

interface OverseasExperience {
  id: string
  purpose: string
  country: string
  period: string
  institute: string
  description: string
}

interface Education {
  id: string
  course: string
  period: string
  status: string
  institute: string
  hours: string
  description: string
}

interface Award {
  id: string
  name: string
  date: string
  org: string
  details: string
}

interface English {
  id: string
  date: string
  language: string
  grade: string
  score: string
  regNumber: string
}

interface ForeignLanguage {
  id: string
  language: string
  level: string
  ability: string
}

interface Certification {
  id: string
  type: string
  level: string
  date: string
  regNumber: string
  issuer: string
}

interface ITSkill {
  id: string
  type: string
  level: string
  ability: string
  proficiency: string
  duration: string
}

interface CareerFormProps {
  copyToClipboard?: (text: string, section: string) => void
}

export default function CareerForm({ copyToClipboard }: CareerFormProps) {
  const { toast } = useToast()

  // 로컬 스토리지 키
  const STORAGE_KEY = "job-application-data"

  // 배열로 변경된 상태들
  const [majorCareers, setMajorCareers] = useState<MajorCareer[]>([])
  const [communities, setCommunities] = useState<CommunityActivity[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [overseasList, setOverseasList] = useState<OverseasExperience[]>([])
  const [educations, setEducations] = useState<Education[]>([])
  const [awards, setAwards] = useState<Award[]>([])
  const [englishList, setEnglishList] = useState<English[]>([])
  const [foreignLangs, setForeignLangs] = useState<ForeignLanguage[]>([])
  const [certs, setCerts] = useState<Certification[]>([])
  const [itSkills, setItSkills] = useState<ITSkill[]>([])

  // 편집 상태
  const [editingCareer, setEditingCareer] = useState<string | null>(null)
  const [editingCommunity, setEditingCommunity] = useState<string | null>(null)
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [editingOverseas, setEditingOverseas] = useState<string | null>(null)
  const [editingEducation, setEditingEducation] = useState<string | null>(null)
  const [editingAward, setEditingAward] = useState<string | null>(null)
  const [editingEnglish, setEditingEnglish] = useState<string | null>(null)
  const [editingForeignLang, setEditingForeignLang] = useState<string | null>(null)
  const [editingCert, setEditingCert] = useState<string | null>(null)
  const [editingItSkill, setEditingItSkill] = useState<string | null>(null)

  // 폼 데이터 상태들
  const [careerForm, setCareerForm] = useState<Omit<MajorCareer, "id">>({
    company: "",
    period: "",
    department: "",
    employmentType: "",
    position: "",
    duties: "",
    salary: "",
    reasonForLeaving: "",
  })

  const [communityForm, setCommunityForm] = useState<Omit<CommunityActivity, "id">>({
    category: "",
    name: "",
    period: "",
    description: "",
  })

  const [projectForm, setProjectForm] = useState<Omit<Project, "id">>({
    name: "",
    company: "",
    period: "",
    duties: "",
  })

  const [overseasForm, setOverseasForm] = useState<Omit<OverseasExperience, "id">>({
    purpose: "",
    country: "",
    period: "",
    institute: "",
    description: "",
  })

  const [educationForm, setEducationForm] = useState<Omit<Education, "id">>({
    course: "",
    period: "",
    status: "",
    institute: "",
    hours: "",
    description: "",
  })

  const [awardForm, setAwardForm] = useState<Omit<Award, "id">>({
    name: "",
    date: "",
    org: "",
    details: "",
  })

  const [englishForm, setEnglishForm] = useState<Omit<English, "id">>({
    date: "",
    language: "영어",
    grade: "",
    score: "",
    regNumber: "",
  })

  const [foreignLangForm, setForeignLangForm] = useState<Omit<ForeignLanguage, "id">>({
    language: "",
    level: "",
    ability: "",
  })

  const [certForm, setCertForm] = useState<Omit<Certification, "id">>({
    type: "",
    level: "",
    date: "",
    regNumber: "",
    issuer: "",
  })

  const [itSkillForm, setItSkillForm] = useState<Omit<ITSkill, "id">>({
    type: "",
    level: "",
    ability: "",
    proficiency: "",
    duration: "",
  })

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setMajorCareers(parsed.majorCareers || [])
        setCommunities(parsed.communities || [])
        setProjects(parsed.projects || [])
        setOverseasList(parsed.overseasList || [])
        setEducations(parsed.educations || [])
        setAwards(parsed.awards || [])
        setEnglishList(parsed.englishList || [])
        setForeignLangs(parsed.foreignLangs || [])
        setCerts(parsed.certs || [])
        setItSkills(parsed.itSkills || [])
      } catch (error) {
        console.error("데이터 로드 실패:", error)
        toast({
          variant: "destructive",
          title: "데이터 로드 실패",
          description: "저장된 데이터를 불러오는데 실패했습니다.",
        })
      }
    }
  }, [])

  // 실시간 로컬 저장 함수
  const saveToLocal = () => {
    const data = {
      majorCareers,
      communities,
      projects,
      overseasList,
      educations,
      awards,
      englishList,
      foreignLangs,
      certs,
      itSkills,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  // 데이터 변경시마다 자동 저장
  useEffect(() => {
    saveToLocal()
  }, [
    majorCareers,
    communities,
    projects,
    overseasList,
    educations,
    awards,
    englishList,
    foreignLangs,
    certs,
    itSkills,
  ])

  // 수동 저장
  const saveData = () => {
    saveToLocal()
    toast({
      title: "💾 저장 완료!",
      description: "모든 정보가 안전하게 저장되었습니다.",
      duration: 3000,
    })
  }

  // ID 생성 함수
  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9)

  // 주요경력 관련 함수들
  const addCareer = () => {
    if (editingCareer) {
      setMajorCareers((prev) =>
        prev.map((item) => (item.id === editingCareer ? { ...careerForm, id: editingCareer } : item)),
      )
      setEditingCareer(null)
      toast({ title: "✅ 경력 수정 완료!", duration: 2000 })
    } else {
      const newCareer = { ...careerForm, id: generateId() }
      setMajorCareers((prev) => [...prev, newCareer])
      toast({ title: "✅ 경력 추가 완료!", duration: 2000 })
    }
    setCareerForm({
      company: "",
      period: "",
      department: "",
      employmentType: "",
      position: "",
      duties: "",
      salary: "",
      reasonForLeaving: "",
    })
  }

  const editCareer = (career: MajorCareer) => {
    setCareerForm(career)
    setEditingCareer(career.id)
  }

  const deleteCareer = (id: string) => {
    setMajorCareers((prev) => prev.filter((item) => item.id !== id))
    toast({ title: "🗑️ 경력 삭제 완료!", duration: 2000 })
  }

  // 커뮤니티 관련 함수들
  const addCommunity = () => {
    if (editingCommunity) {
      setCommunities((prev) =>
        prev.map((item) => (item.id === editingCommunity ? { ...communityForm, id: editingCommunity } : item)),
      )
      setEditingCommunity(null)
      toast({ title: "✅ 커뮤니티활동 수정 완료!", duration: 2000 })
    } else {
      const newCommunity = { ...communityForm, id: generateId() }
      setCommunities((prev) => [...prev, newCommunity])
      toast({ title: "✅ 커뮤니티활동 추가 완료!", duration: 2000 })
    }
    setCommunityForm({
      category: "",
      name: "",
      period: "",
      description: "",
    })
  }

  const editCommunity = (community: CommunityActivity) => {
    setCommunityForm(community)
    setEditingCommunity(community.id)
  }

  const deleteCommunity = (id: string) => {
    setCommunities((prev) => prev.filter((item) => item.id !== id))
    toast({ title: "🗑️ 커뮤니티활동 삭제 완료!", duration: 2000 })
  }

  // 프로젝트 관련 함수들
  const addProject = () => {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((item) => (item.id === editingProject ? { ...projectForm, id: editingProject } : item)),
      )
      setEditingProject(null)
      toast({ title: "✅ 프로젝트 수정 완료!", duration: 2000 })
    } else {
      const newProject = { ...projectForm, id: generateId() }
      setProjects((prev) => [...prev, newProject])
      toast({ title: "✅ 프로젝트 추가 완료!", duration: 2000 })
    }
    setProjectForm({
      name: "",
      company: "",
      period: "",
      duties: "",
    })
  }

  const editProject = (project: Project) => {
    setProjectForm(project)
    setEditingProject(project.id)
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((item) => item.id !== id))
    toast({ title: "🗑️ 프로젝트 삭제 완료!", duration: 2000 })
  }

  // 개별 항목 복사 함수
  const copyField = (value: string, fieldName: string) => {
    if (!value.trim()) {
      toast({
        variant: "destructive",
        title: "❌ 복사 실패",
        description: `${fieldName} 항목이 비어있습니다.`,
        duration: 3000,
      })
      return
    }

    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast({
          title: "📋 복사 완료!",
          description: `${fieldName}: ${value.length > 30 ? value.substring(0, 30) + "..." : value}`,
          duration: 2000,
        })
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "복사 실패",
          description: "클립보드 접근이 차단되었습니다.",
        })
      })
  }

  // 섹션별 전체 복사 함수들
  const copyAllCareers = () => {
    if (majorCareers.length === 0) {
      toast({
        variant: "destructive",
        title: "❌ 복사 실패",
        description: "저장된 경력이 없습니다.",
      })
      return
    }

    const text = majorCareers
      .map(
        (career, index) =>
          `[경력 ${index + 1}]
회사: ${career.company}
기간: ${career.period}
근무부서: ${career.department}
고용형태: ${career.employmentType}
직위: ${career.position}
담당업무: ${career.duties}
연봉: ${career.salary}
퇴직사유: ${career.reasonForLeaving}`,
      )
      .join("\n\n")

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "💼 전체 경력 복사 완료!",
          description: `${majorCareers.length}개의 경력이 클립보드에 복사되었습니다.`,
          duration: 3000,
        })
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "복사 실패",
          description: "클립보드 접근이 차단되었습니다.",
        })
      })
  }

  const copyAllCommunities = () => {
    if (communities.length === 0) {
      toast({
        variant: "destructive",
        title: "❌ 복사 실패",
        description: "저장된 커뮤니티활동이 없습니다.",
      })
      return
    }

    const text = communities
      .map(
        (community, index) =>
          `[커뮤니티활동 ${index + 1}]
구분: ${community.category}
활동명: ${community.name}
활동기간: ${community.period}
주요활동내용: ${community.description}`,
      )
      .join("\n\n")

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "🤝 전체 커뮤니티활동 복사 완료!",
          description: `${communities.length}개의 활동이 클립보드에 복사되었습니다.`,
          duration: 3000,
        })
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "복사 실패",
          description: "클립보드 접근이 차단되었습니다.",
        })
      })
  }

  const copyAllProjects = () => {
    if (projects.length === 0) {
      toast({
        variant: "destructive",
        title: "❌ 복사 실패",
        description: "저장된 프로젝트가 없습니다.",
      })
      return
    }

    const text = projects
      .map(
        (project, index) =>
          `[프로젝트 ${index + 1}]
프로젝트명: ${project.name}
회사명: ${project.company}
참여기간: ${project.period}
담당업무 및 내용: ${project.duties}`,
      )
      .join("\n\n")

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "🚀 전체 프로젝트 복사 완료!",
          description: `${projects.length}개의 프로젝트가 클립보드에 복사되었습니다.`,
          duration: 3000,
        })
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "복사 실패",
          description: "클립보드 접근이 차단되었습니다.",
        })
      })
  }

  const formatAllOutput = () => {
    let output = ""

    if (majorCareers.length > 0) {
      output += "[주요경력]\n"
      majorCareers.forEach((career, index) => {
        output += `${index + 1}. ${career.company} (${career.period})\n`
        output += `   직위: ${career.position} | 부서: ${career.department}\n`
        output += `   담당업무: ${career.duties}\n\n`
      })
    }

    if (communities.length > 0) {
      output += "[커뮤니티활동]\n"
      communities.forEach((community, index) => {
        output += `${index + 1}. ${community.name} (${community.period})\n`
        output += `   구분: ${community.category}\n`
        output += `   내용: ${community.description}\n\n`
      })
    }

    if (projects.length > 0) {
      output += "[프로젝트]\n"
      projects.forEach((project, index) => {
        output += `${index + 1}. ${project.name} (${project.period})\n`
        output += `   회사: ${project.company}\n`
        output += `   담당업무: ${project.duties}\n\n`
      })
    }

    return output.trim()
  }

  const handleCopyAll = () => {
    const output = formatAllOutput()
    if (!output) {
      toast({
        variant: "destructive",
        title: "❌ 복사 실패",
        description: "저장된 정보가 없습니다.",
      })
      return
    }

    navigator.clipboard
      .writeText(output)
      .then(() =>
        toast({
          title: "🎉 전체 복사 완료!",
          description: "모든 정보가 클립보드에 복사되었습니다.",
          duration: 4000,
        }),
      )
      .catch(() =>
        toast({
          variant: "destructive",
          title: "복사 실패",
          description: "클립보드 접근이 차단되었습니다.",
        }),
      )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white">
      {/* 헤더 */}
      <div className="text-center border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 채용 지원서</h1>
        <p className="text-gray-600">개인정보 및 경력사항 (실시간 자동 저장)</p>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <Button onClick={saveData} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4" />
          수동 저장
        </Button>
      </div>

      {/* 주요경력 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-blue-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-blue-800">💼 주요경력</CardTitle>
              <CardDescription>근무 경험 및 경력사항을 입력해주세요</CardDescription>
            </div>
            <Button onClick={copyAllCareers} variant="outline" size="sm" className="hover:bg-blue-100 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              전체 복사 ({majorCareers.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {/* 경력 입력 폼 */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold mb-4">{editingCareer ? "경력 수정" : "새 경력 추가"}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">회사명</Label>
                <Input
                  id="company"
                  value={careerForm.company}
                  onChange={(e) => setCareerForm({ ...careerForm, company: e.target.value })}
                  placeholder="회사명을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="period">근무기간</Label>
                <Input
                  id="period"
                  value={careerForm.period}
                  onChange={(e) => setCareerForm({ ...careerForm, period: e.target.value })}
                  placeholder="2022.11~2023.12"
                />
              </div>
              <div>
                <Label htmlFor="department">근무부서</Label>
                <Input
                  id="department"
                  value={careerForm.department}
                  onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
                  placeholder="근무부서를 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="employmentType">고용형태</Label>
                <Select
                  value={careerForm.employmentType}
                  onValueChange={(value) => setCareerForm({ ...careerForm, employmentType: value })}
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
                  value={careerForm.position}
                  onChange={(e) => setCareerForm({ ...careerForm, position: e.target.value })}
                  placeholder="직위를 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="salary">연봉</Label>
                <Input
                  id="salary"
                  value={careerForm.salary}
                  onChange={(e) => setCareerForm({ ...careerForm, salary: e.target.value })}
                  placeholder="연봉을 입력하세요"
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="duties">담당업무</Label>
              <Textarea
                id="duties"
                value={careerForm.duties}
                onChange={(e) => setCareerForm({ ...careerForm, duties: e.target.value })}
                placeholder="담당업무를 상세히 입력하세요"
                rows={3}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="reasonForLeaving">퇴직사유</Label>
              <Input
                id="reasonForLeaving"
                value={careerForm.reasonForLeaving}
                onChange={(e) => setCareerForm({ ...careerForm, reasonForLeaving: e.target.value })}
                placeholder="퇴직사유를 입력하세요"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={addCareer} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingCareer ? "수정 완료" : "경력 추가"}
              </Button>
              {editingCareer && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingCareer(null)
                    setCareerForm({
                      company: "",
                      period: "",
                      department: "",
                      employmentType: "",
                      position: "",
                      duties: "",
                      salary: "",
                      reasonForLeaving: "",
                    })
                  }}
                >
                  취소
                </Button>
              )}
            </div>
          </div>

          {/* 저장된 경력 목록 */}
          <div className="space-y-3">
            <h4 className="font-semibold">저장된 경력 ({majorCareers.length}개)</h4>
            {majorCareers.map((career, index) => (
              <Card key={career.id} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-semibold text-lg">{career.company}</h5>
                      <p className="text-sm text-gray-600">
                        {career.period} | {career.position} | {career.department}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          copyField(
                            `회사: ${career.company}\n기간: ${career.period}\n직위: ${career.position}\n담당업무: ${career.duties}`,
                            "경력",
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => editCareer(career)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteCareer(career.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>
                      <strong>담당업무:</strong> {career.duties}
                    </p>
                    <p>
                      <strong>연봉:</strong> {career.salary}
                    </p>
                    <p>
                      <strong>퇴직사유:</strong> {career.reasonForLeaving}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {majorCareers.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                아직 저장된 경력이 없습니다. 위에서 새 경력을 추가해보세요!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 커뮤니티 활동 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-green-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-green-800">🤝 커뮤니티 활동</CardTitle>
              <CardDescription>동아리, 봉사활동, 스터디 등의 활동사항</CardDescription>
            </div>
            <Button
              onClick={copyAllCommunities}
              variant="outline"
              size="sm"
              className="hover:bg-green-100 bg-transparent"
            >
              <Copy className="w-4 h-4 mr-2" />
              전체 복사 ({communities.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {/* 커뮤니티 입력 폼 */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold mb-4">{editingCommunity ? "활동 수정" : "새 활동 추가"}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">구분</Label>
                <Input
                  id="category"
                  value={communityForm.category}
                  onChange={(e) => setCommunityForm({ ...communityForm, category: e.target.value })}
                  placeholder="동아리, 봉사활동, 스터디 등"
                />
              </div>
              <div>
                <Label htmlFor="name">활동명</Label>
                <Input
                  id="name"
                  value={communityForm.name}
                  onChange={(e) => setCommunityForm({ ...communityForm, name: e.target.value })}
                  placeholder="활동명을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="communityPeriod">활동기간</Label>
                <Input
                  id="communityPeriod"
                  value={communityForm.period}
                  onChange={(e) => setCommunityForm({ ...communityForm, period: e.target.value })}
                  placeholder="2022.03~2023.02"
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="description">주요활동내용</Label>
              <Textarea
                id="description"
                value={communityForm.description}
                onChange={(e) => setCommunityForm({ ...communityForm, description: e.target.value })}
                placeholder="주요활동내용을 상세히 입력하세요"
                rows={3}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={addCommunity} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingCommunity ? "수정 완료" : "활동 추가"}
              </Button>
              {editingCommunity && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingCommunity(null)
                    setCommunityForm({
                      category: "",
                      name: "",
                      period: "",
                      description: "",
                    })
                  }}
                >
                  취소
                </Button>
              )}
            </div>
          </div>

          {/* 저장된 커뮤니티 활동 목록 */}
          <div className="space-y-3">
            <h4 className="font-semibold">저장된 커뮤니티 활동 ({communities.length}개)</h4>
            {communities.map((community, index) => (
              <Card key={community.id} className="border-l-4 border-l-green-500">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-semibold text-lg">{community.name}</h5>
                      <p className="text-sm text-gray-600">
                        {community.category} | {community.period}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          copyField(
                            `활동명: ${community.name}\n구분: ${community.category}\n기간: ${community.period}\n내용: ${community.description}`,
                            "커뮤니티활동",
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => editCommunity(community)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteCommunity(community.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>
                      <strong>주요활동내용:</strong> {community.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {communities.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                아직 저장된 커뮤니티 활동이 없습니다. 위에서 새 활동을 추가해보세요!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 프로젝트 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-orange-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-orange-800">🚀 프로젝트</CardTitle>
              <CardDescription>참여한 프로젝트 경험을 입력해주세요</CardDescription>
            </div>
            <Button
              onClick={copyAllProjects}
              variant="outline"
              size="sm"
              className="hover:bg-orange-100 bg-transparent"
            >
              <Copy className="w-4 h-4 mr-2" />
              전체 복사 ({projects.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {/* 프로젝트 입력 폼 */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold mb-4">{editingProject ? "프로젝트 수정" : "새 프로젝트 추가"}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectName">프로젝트명</Label>
                <Input
                  id="projectName"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  placeholder="프로젝트명을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="projectCompany">회사명</Label>
                <Input
                  id="projectCompany"
                  value={projectForm.company}
                  onChange={(e) => setProjectForm({ ...projectForm, company: e.target.value })}
                  placeholder="회사명을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="projectPeriod">참여기간</Label>
                <Input
                  id="projectPeriod"
                  value={projectForm.period}
                  onChange={(e) => setProjectForm({ ...projectForm, period: e.target.value })}
                  placeholder="2022.03~2022.12"
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="projectDuties">담당업무 및 내용</Label>
              <Textarea
                id="projectDuties"
                value={projectForm.duties}
                onChange={(e) => setProjectForm({ ...projectForm, duties: e.target.value })}
                placeholder="담당업무 및 내용을 상세히 입력하세요"
                rows={4}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={addProject} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingProject ? "수정 완료" : "프로젝트 추가"}
              </Button>
              {editingProject && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingProject(null)
                    setProjectForm({
                      name: "",
                      company: "",
                      period: "",
                      duties: "",
                    })
                  }}
                >
                  취소
                </Button>
              )}
            </div>
          </div>

          {/* 저장된 프로젝트 목록 */}
          <div className="space-y-3">
            <h4 className="font-semibold">저장된 프로젝트 ({projects.length}개)</h4>
            {projects.map((project, index) => (
              <Card key={project.id} className="border-l-4 border-l-orange-500">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-semibold text-lg">{project.name}</h5>
                      <p className="text-sm text-gray-600">
                        {project.company} | {project.period}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          copyField(
                            `프로젝트: ${project.name}\n회사: ${project.company}\n기간: ${project.period}\n담당업무: ${project.duties}`,
                            "프로젝트",
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => editProject(project)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteProject(project.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>
                      <strong>담당업무 및 내용:</strong> {project.duties}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {projects.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                아직 저장된 프로젝트가 없습니다. 위에서 새 프로젝트를 추가해보세요!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 전체 복사 버튼 */}
      <div className="flex justify-center pt-8">
        <Button
          onClick={handleCopyAll}
          size="lg"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
        >
          <FileText className="w-5 h-5" />
          전체 내용 복사하기
        </Button>
      </div>

      {/* 미리보기 */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">📄 복사될 내용 미리보기</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded border max-h-96 overflow-y-auto">
            {formatAllOutput() || "아직 저장된 정보가 없습니다."}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
