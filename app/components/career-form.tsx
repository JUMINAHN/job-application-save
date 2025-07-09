"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Save, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MajorCareer {
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
  category: string
  name: string
  period: string
  description: string
}

interface Project {
  name: string
  company: string
  period: string
  duties: string
}

interface OverseasExperience {
  purpose: string
  country: string
  period: string
  institute: string
  description: string
}

interface Education {
  course: string
  period: string
  status: string
  institute: string
  hours: string
  description: string
}

interface Award {
  name: string
  date: string
  org: string
  details: string
}

interface English {
  date: string
  language: string
  grade: string
  score: string
  regNumber: string
}

interface ForeignLanguage {
  language: string
  level: string
  ability: string
}

interface Certification {
  type: string
  level: string
  date: string
  regNumber: string
  issuer: string
}

interface ITSkill {
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

  const [majorCareer, setMajorCareer] = useState<MajorCareer>({
    company: "",
    period: "",
    department: "",
    employmentType: "",
    position: "",
    duties: "",
    salary: "",
    reasonForLeaving: "",
  })

  const [community, setCommunity] = useState<CommunityActivity>({
    category: "",
    name: "",
    period: "",
    description: "",
  })

  const [project, setProject] = useState<Project>({
    name: "",
    company: "",
    period: "",
    duties: "",
  })

  const [overseas, setOverseas] = useState<OverseasExperience>({
    purpose: "",
    country: "",
    period: "",
    institute: "",
    description: "",
  })

  const [education, setEducation] = useState<Education>({
    course: "",
    period: "",
    status: "",
    institute: "",
    hours: "",
    description: "",
  })

  const [award, setAward] = useState<Award>({
    name: "",
    date: "",
    org: "",
    details: "",
  })

  const [english, setEnglish] = useState<English>({
    date: "",
    language: "영어",
    grade: "",
    score: "",
    regNumber: "",
  })

  const [foreignLang, setForeignLang] = useState<ForeignLanguage>({
    language: "",
    level: "",
    ability: "",
  })

  const [cert, setCert] = useState<Certification>({
    type: "",
    level: "",
    date: "",
    regNumber: "",
    issuer: "",
  })

  const [itSkill, setItSkill] = useState<ITSkill>({
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
        setMajorCareer(parsed.majorCareer || majorCareer)
        setCommunity(parsed.community || community)
        setProject(parsed.project || project)
        setOverseas(parsed.overseas || overseas)
        setEducation(parsed.education || education)
        setAward(parsed.award || award)
        setEnglish(parsed.english || english)
        setForeignLang(parsed.foreignLang || foreignLang)
        setCert(parsed.cert || cert)
        setItSkill(parsed.itSkill || itSkill)
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
      majorCareer,
      community,
      project,
      overseas,
      education,
      award,
      english,
      foreignLang,
      cert,
      itSkill,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  // 데이터 변경시마다 자동 저장 (알림 없이)
  useEffect(() => {
    saveToLocal()
  }, [majorCareer, community, project, overseas, education, award, english, foreignLang, cert, itSkill])

  // 수동 저장 (알림 포함)
  const saveData = () => {
    saveToLocal()
    toast({
      title: "💾 저장 완료!",
      description: "모든 정보가 안전하게 저장되었습니다.",
      duration: 3000,
    })
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

  // 개별 섹션 복사 함수들
  const copyMajorCareer = () => {
    const text = `회사: ${majorCareer.company}
기간: ${majorCareer.period}
근무부서: ${majorCareer.department}
고용형태: ${majorCareer.employmentType}
직위: ${majorCareer.position}
담당업무: ${majorCareer.duties}
연봉: ${majorCareer.salary}
퇴직사유: ${majorCareer.reasonForLeaving}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "💼 주요경력 복사 완료!",
          description: "주요경력 정보가 클립보드에 복사되었습니다.",
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

  const copyCommunity = () => {
    const text = `구분: ${community.category}
활동명: ${community.name}
활동기간: ${community.period}
주요활동내용: ${community.description}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "🤝 커뮤니티활동 복사 완료!",
          description: "커뮤니티활동 정보가 클립보드에 복사되었습니다.",
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

  const copyProject = () => {
    const text = `프로젝트명: ${project.name}
회사명: ${project.company}
참여기간: ${project.period}
담당업무 및 내용: ${project.duties}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "🚀 프로젝트 복사 완료!",
          description: "프로젝트 정보가 클립보드에 복사되었습니다.",
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

  const copyOverseas = () => {
    const text = `거주목적: ${overseas.purpose}
국가: ${overseas.country}
거주기간: ${overseas.period}
기관: ${overseas.institute}
해외경험: ${overseas.description}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "✈️ 해외연수 복사 완료!",
          description: "해외연수 정보가 클립보드에 복사되었습니다.",
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

  const copyEducation = () => {
    const text = `교육과정명: ${education.course}
교육기간: ${education.period}
수료구분: ${education.status}
교육기관: ${education.institute}
교육시간: ${education.hours}
주요내용: ${education.description}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "🎓 교육이력 복사 완료!",
          description: "교육이력 정보가 클립보드에 복사되었습니다.",
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

  const copyAward = () => {
    const text = `수상명: ${award.name}
수상일: ${award.date}
수상기관: ${award.org}
수상내역: ${award.details}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "🏆 수상경력 복사 완료!",
          description: "수상경력 정보가 클립보드에 복사되었습니다.",
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

  const copyEnglish = () => {
    const text = `취득일: ${english.date}
언어: ${english.language}
등급: ${english.grade}
점수: ${english.score}
등록번호: ${english.regNumber}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "🌍 어학능력 복사 완료!",
          description: "어학능력 정보가 클립보드에 복사되었습니다.",
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

  const copyForeignLang = () => {
    const text = `언어: ${foreignLang.language}
수준: ${foreignLang.level}
활용능력: ${foreignLang.ability}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "🗣️ 외국어활용능력 복사 완료!",
          description: "외국어활용능력 정보가 클립보드에 복사되었습니다.",
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

  const copyCert = () => {
    const text = `자격종류: ${cert.type}
자격등급: ${cert.level}
취득일자: ${cert.date}
등록번호: ${cert.regNumber}
발급기관: ${cert.issuer}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "📜 자격증 복사 완료!",
          description: "자격증 정보가 클립보드에 복사되었습니다.",
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

  const copyITSkill = () => {
    const text = `IT활용종류: ${itSkill.type}
수준: ${itSkill.level}
활용능력: ${itSkill.ability}
정도: ${itSkill.proficiency}
사용기간: ${itSkill.duration}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "💻 IT활용능력 복사 완료!",
          description: "IT활용능력 정보가 클립보드에 복사되었습니다.",
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

  const formatOutput = () => {
    return `
[주요경력]
회사: ${majorCareer.company}
기간: ${majorCareer.period}
근무부서: ${majorCareer.department}
고용형태: ${majorCareer.employmentType}
직위: ${majorCareer.position}
담당업무: ${majorCareer.duties}
연봉: ${majorCareer.salary}
퇴직사유: ${majorCareer.reasonForLeaving}

[커뮤니티 활동]
구분: ${community.category}
활동명: ${community.name}
활동기간: ${community.period}
주요활동내용: ${community.description}

[프로젝트]
프로젝트명: ${project.name}
회사명: ${project.company}
참여기간: ${project.period}
담당업무 및 내용: ${project.duties}

[해외연수]
거주목적: ${overseas.purpose}
국가: ${overseas.country}
거주기간: ${overseas.period}
기관: ${overseas.institute}
해외경험: ${overseas.description}

[교육이력]
교육과정명: ${education.course}
교육기간: ${education.period}
수료구분: ${education.status}
교육기관: ${education.institute}
교육시간: ${education.hours}
주요내용: ${education.description}

[수상경력]
수상명: ${award.name}
수상일: ${award.date}
수상기관: ${award.org}
수상내역: ${award.details}

[어학능력]
취득일: ${english.date}
언어: ${english.language}
등급: ${english.grade}
점수: ${english.score}
등록번호: ${english.regNumber}

[외국어활용능력]
언어: ${foreignLang.language}
수준: ${foreignLang.level}
활용능력: ${foreignLang.ability}

[자격증]
자격종류: ${cert.type}
자격등급: ${cert.level}
취득일자: ${cert.date}
등록번호: ${cert.regNumber}
발급기관: ${cert.issuer}

[IT활용능력]
IT활용종류: ${itSkill.type}
수준: ${itSkill.level}
활용능력: ${itSkill.ability}
정도: ${itSkill.proficiency}
사용기간: ${itSkill.duration}
    `.trim()
  }

  const handleCopyAll = () => {
    navigator.clipboard
      .writeText(formatOutput())
      .then(() =>
        toast({
          title: "🎉 전체 복사 완료!",
          description: "모든 정보가 클립보드에 복사되었습니다. 이제 어디든 붙여넣기 하세요!",
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
            <Button onClick={copyMajorCareer} variant="outline" size="sm" className="hover:bg-blue-100 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              전체 복사
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="company">회사명</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(majorCareer.company, "회사명")}
                  className="h-6 w-6 p-0 hover:bg-blue-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="company"
                value={majorCareer.company}
                onChange={(e) => setMajorCareer({ ...majorCareer, company: e.target.value })}
                placeholder="회사명을 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="period">근무기간</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(majorCareer.period, "근무기간")}
                  className="h-6 w-6 p-0 hover:bg-blue-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="period"
                value={majorCareer.period}
                onChange={(e) => setMajorCareer({ ...majorCareer, period: e.target.value })}
                placeholder="2022.11~2023.12"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="department">근무부서</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(majorCareer.department, "근무부서")}
                  className="h-6 w-6 p-0 hover:bg-blue-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="department"
                value={majorCareer.department}
                onChange={(e) => setMajorCareer({ ...majorCareer, department: e.target.value })}
                placeholder="근무부서를 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="employmentType">고용형태</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(majorCareer.employmentType, "고용형태")}
                  className="h-6 w-6 p-0 hover:bg-blue-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Select
                value={majorCareer.employmentType}
                onValueChange={(value) => setMajorCareer({ ...majorCareer, employmentType: value })}
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
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="position">직위</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(majorCareer.position, "직위")}
                  className="h-6 w-6 p-0 hover:bg-blue-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="position"
                value={majorCareer.position}
                onChange={(e) => setMajorCareer({ ...majorCareer, position: e.target.value })}
                placeholder="직위를 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="salary">연봉</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(majorCareer.salary, "연봉")}
                  className="h-6 w-6 p-0 hover:bg-blue-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="salary"
                value={majorCareer.salary}
                onChange={(e) => setMajorCareer({ ...majorCareer, salary: e.target.value })}
                placeholder="연봉을 입력하세요"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="duties">담당업무</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyField(majorCareer.duties, "담당업무")}
                className="h-6 w-6 p-0 hover:bg-blue-100"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Textarea
              id="duties"
              value={majorCareer.duties}
              onChange={(e) => setMajorCareer({ ...majorCareer, duties: e.target.value })}
              placeholder="담당업무를 상세히 입력하세요"
              rows={3}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="reasonForLeaving">퇴직사유</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyField(majorCareer.reasonForLeaving, "퇴직사유")}
                className="h-6 w-6 p-0 hover:bg-blue-100"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Input
              id="reasonForLeaving"
              value={majorCareer.reasonForLeaving}
              onChange={(e) => setMajorCareer({ ...majorCareer, reasonForLeaving: e.target.value })}
              placeholder="퇴직사유를 입력하세요"
            />
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
            <Button onClick={copyCommunity} variant="outline" size="sm" className="hover:bg-green-100 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              전체 복사
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="category">구분</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(community.category, "구분")}
                  className="h-6 w-6 p-0 hover:bg-green-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="category"
                value={community.category}
                onChange={(e) => setCommunity({ ...community, category: e.target.value })}
                placeholder="동아리, 봉사활동, 스터디 등"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="name">활동명</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(community.name, "활동명")}
                  className="h-6 w-6 p-0 hover:bg-green-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="name"
                value={community.name}
                onChange={(e) => setCommunity({ ...community, name: e.target.value })}
                placeholder="활동명을 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="communityPeriod">활동기간</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(community.period, "활동기간")}
                  className="h-6 w-6 p-0 hover:bg-green-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="communityPeriod"
                value={community.period}
                onChange={(e) => setCommunity({ ...community, period: e.target.value })}
                placeholder="2022.03~2023.02"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="description">주요활동내용</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyField(community.description, "주요활동내용")}
                className="h-6 w-6 p-0 hover:bg-green-100"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Textarea
              id="description"
              value={community.description}
              onChange={(e) => setCommunity({ ...community, description: e.target.value })}
              placeholder="주요활동내용을 상세히 입력하세요"
              rows={3}
            />
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
            <Button onClick={copyProject} variant="outline" size="sm" className="hover:bg-orange-100 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              전체 복사
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="projectName">프로젝트명</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(project.name, "프로젝트명")}
                  className="h-6 w-6 p-0 hover:bg-orange-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="projectName"
                value={project.name}
                onChange={(e) => setProject({ ...project, name: e.target.value })}
                placeholder="프로젝트명을 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="projectCompany">회사명</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(project.company, "회사명")}
                  className="h-6 w-6 p-0 hover:bg-orange-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="projectCompany"
                value={project.company}
                onChange={(e) => setProject({ ...project, company: e.target.value })}
                placeholder="회사명을 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="projectPeriod">참여기간</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(project.period, "참여기간")}
                  className="h-6 w-6 p-0 hover:bg-orange-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="projectPeriod"
                value={project.period}
                onChange={(e) => setProject({ ...project, period: e.target.value })}
                placeholder="2022.03~2022.12"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="projectDuties">담당업무 및 내용</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyField(project.duties, "담당업무 및 내용")}
                className="h-6 w-6 p-0 hover:bg-orange-100"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Textarea
              id="projectDuties"
              value={project.duties}
              onChange={(e) => setProject({ ...project, duties: e.target.value })}
              placeholder="담당업무 및 내용을 상세히 입력하세요"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* 해외연수 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-teal-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-teal-800">✈️ 해외연수</CardTitle>
              <CardDescription>해외 거주 및 연수 경험을 입력해주세요</CardDescription>
            </div>
            <Button onClick={copyOverseas} variant="outline" size="sm" className="hover:bg-teal-100 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              전체 복사
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="purpose">거주목적</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(overseas.purpose, "거주목적")}
                  className="h-6 w-6 p-0 hover:bg-teal-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="purpose"
                value={overseas.purpose}
                onChange={(e) => setOverseas({ ...overseas, purpose: e.target.value })}
                placeholder="유학, 연수, 근무 등"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="country">국가</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(overseas.country, "국가")}
                  className="h-6 w-6 p-0 hover:bg-teal-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="country"
                value={overseas.country}
                onChange={(e) => setOverseas({ ...overseas, country: e.target.value })}
                placeholder="국가명을 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="overseasPeriod">거주기간</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(overseas.period, "거주기간")}
                  className="h-6 w-6 p-0 hover:bg-teal-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="overseasPeriod"
                value={overseas.period}
                onChange={(e) => setOverseas({ ...overseas, period: e.target.value })}
                placeholder="2021.03~2022.02"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="institute">기관</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(overseas.institute, "기관")}
                  className="h-6 w-6 p-0 hover:bg-teal-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="institute"
                value={overseas.institute}
                onChange={(e) => setOverseas({ ...overseas, institute: e.target.value })}
                placeholder="기관명을 입력하세요"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="overseasDescription">해외경험</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyField(overseas.description, "해외경험")}
                className="h-6 w-6 p-0 hover:bg-teal-100"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Textarea
              id="overseasDescription"
              value={overseas.description}
              onChange={(e) => setOverseas({ ...overseas, description: e.target.value })}
              placeholder="해외경험을 상세히 입력하세요"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* 교육이력 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-indigo-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-indigo-800">🎓 교육이력</CardTitle>
              <CardDescription>교육 및 연수 이력을 입력해주세요</CardDescription>
            </div>
            <Button onClick={copyEducation} variant="outline" size="sm" className="hover:bg-indigo-100 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              전체 복사
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="course">교육과정명</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(education.course, "교육과정명")}
                  className="h-6 w-6 p-0 hover:bg-indigo-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="course"
                value={education.course}
                onChange={(e) => setEducation({ ...education, course: e.target.value })}
                placeholder="교육과정명을 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="educationPeriod">교육기간</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(education.period, "교육기간")}
                  className="h-6 w-6 p-0 hover:bg-indigo-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="educationPeriod"
                value={education.period}
                onChange={(e) => setEducation({ ...education, period: e.target.value })}
                placeholder="2023.01~2023.03"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="status">수료구분</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(education.status, "수료구분")}
                  className="h-6 w-6 p-0 hover:bg-indigo-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Select value={education.status} onValueChange={(value) => setEducation({ ...education, status: value })}>
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
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="educationInstitute">교육기관</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(education.institute, "교육기관")}
                  className="h-6 w-6 p-0 hover:bg-indigo-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="educationInstitute"
                value={education.institute}
                onChange={(e) => setEducation({ ...education, institute: e.target.value })}
                placeholder="교육기관을 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="hours">교육시간</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(education.hours, "교육시간")}
                  className="h-6 w-6 p-0 hover:bg-indigo-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="hours"
                value={education.hours}
                onChange={(e) => setEducation({ ...education, hours: e.target.value })}
                placeholder="40시간"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="educationDescription">주요내용</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyField(education.description, "주요내용")}
                className="h-6 w-6 p-0 hover:bg-indigo-100"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Textarea
              id="educationDescription"
              value={education.description}
              onChange={(e) => setEducation({ ...education, description: e.target.value })}
              placeholder="교육의 주요내용을 입력하세요"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* 수상경력 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-yellow-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-yellow-800">🏆 수상경력</CardTitle>
              <CardDescription>수상 및 표창 이력을 입력해주세요</CardDescription>
            </div>
            <Button onClick={copyAward} variant="outline" size="sm" className="hover:bg-yellow-100 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              전체 복사
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="awardName">수상명</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(award.name, "수상명")}
                  className="h-6 w-6 p-0 hover:bg-yellow-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="awardName"
                value={award.name}
                onChange={(e) => setAward({ ...award, name: e.target.value })}
                placeholder="수상명을 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="awardDate">수상일</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(award.date, "수상일")}
                  className="h-6 w-6 p-0 hover:bg-yellow-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="awardDate"
                type="date"
                value={award.date}
                onChange={(e) => setAward({ ...award, date: e.target.value })}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="awardOrg">수상기관(단체)</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(award.org, "수상기관(단체)")}
                  className="h-6 w-6 p-0 hover:bg-yellow-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="awardOrg"
                value={award.org}
                onChange={(e) => setAward({ ...award, org: e.target.value })}
                placeholder="수상기관을 입력하세요"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="awardDetails">수상내역</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyField(award.details, "수상내역")}
                className="h-6 w-6 p-0 hover:bg-yellow-100"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Textarea
              id="awardDetails"
              value={award.details}
              onChange={(e) => setAward({ ...award, details: e.target.value })}
              placeholder="수상내역을 상세히 입력하세요"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* 어학능력 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-pink-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-pink-800">🌍 어학능력</CardTitle>
              <CardDescription>어학시험 성적 및 자격을 입력해주세요</CardDescription>
            </div>
            <Button onClick={copyEnglish} variant="outline" size="sm" className="hover:bg-pink-100 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              전체 복사
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="language">언어</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(english.language, "언어")}
                  className="h-6 w-6 p-0 hover:bg-pink-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Select value={english.language} onValueChange={(value) => setEnglish({ ...english, language: value })}>
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
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="grade">어학등급</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(english.grade, "어학등급")}
                  className="h-6 w-6 p-0 hover:bg-pink-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="grade"
                value={english.grade}
                onChange={(e) => setEnglish({ ...english, grade: e.target.value })}
                placeholder="IM3, AL 등"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="score">취득점수</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(english.score, "취득점수")}
                  className="h-6 w-6 p-0 hover:bg-pink-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="score"
                value={english.score}
                onChange={(e) => setEnglish({ ...english, score: e.target.value })}
                placeholder="점수를 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="regNumber">등록(자격)번호</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(english.regNumber, "등록(자격)번호")}
                  className="h-6 w-6 p-0 hover:bg-pink-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="regNumber"
                value={english.regNumber}
                onChange={(e) => setEnglish({ ...english, regNumber: e.target.value })}
                placeholder="등록번호를 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="englishDate">취득일</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(english.date, "취득일")}
                  className="h-6 w-6 p-0 hover:bg-pink-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="englishDate"
                type="date"
                value={english.date}
                onChange={(e) => setEnglish({ ...english, date: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 외국어활용능력 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-cyan-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-cyan-800">🗣️ 외국어활용능력</CardTitle>
              <CardDescription>외국어 활용 수준 및 능력을 입력해주세요</CardDescription>
            </div>
            <Button onClick={copyForeignLang} variant="outline" size="sm" className="hover:bg-cyan-100 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              전체 복사
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="foreignLanguage">언어</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(foreignLang.language, "언어")}
                  className="h-6 w-6 p-0 hover:bg-cyan-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Select
                value={foreignLang.language}
                onValueChange={(value) => setForeignLang({ ...foreignLang, language: value })}
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
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="foreignLevel">수준</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(foreignLang.level, "수준")}
                  className="h-6 w-6 p-0 hover:bg-cyan-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Select
                value={foreignLang.level}
                onValueChange={(value) => setForeignLang({ ...foreignLang, level: value })}
              >
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
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="foreignAbility">활용능력</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyField(foreignLang.ability, "활용능력")}
                className="h-6 w-6 p-0 hover:bg-cyan-100"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Textarea
              id="foreignAbility"
              value={foreignLang.ability}
              onChange={(e) => setForeignLang({ ...foreignLang, ability: e.target.value })}
              placeholder="활용능력을 상세히 입력하세요"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* 자격증 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-red-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-red-800">📜 자격증</CardTitle>
              <CardDescription>보유 자격증 및 면허를 입력해주세요</CardDescription>
            </div>
            <Button onClick={copyCert} variant="outline" size="sm" className="hover:bg-red-100 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              전체 복사
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="certType">자격종류</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(cert.type, "자격종류")}
                  className="h-6 w-6 p-0 hover:bg-red-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="certType"
                value={cert.type}
                onChange={(e) => setCert({ ...cert, type: e.target.value })}
                placeholder="정보처리기사, 컴활1급 등"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="certLevel">자격등급</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(cert.level, "자격등급")}
                  className="h-6 w-6 p-0 hover:bg-red-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="certLevel"
                value={cert.level}
                onChange={(e) => setCert({ ...cert, level: e.target.value })}
                placeholder="1급, 2급, 기사 등"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="certDate">취득일자</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(cert.date, "취득일자")}
                  className="h-6 w-6 p-0 hover:bg-red-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="certDate"
                type="date"
                value={cert.date}
                onChange={(e) => setCert({ ...cert, date: e.target.value })}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="certRegNumber">등록(자격)번호</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(cert.regNumber, "등록(자격)번호")}
                  className="h-6 w-6 p-0 hover:bg-red-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="certRegNumber"
                value={cert.regNumber}
                onChange={(e) => setCert({ ...cert, regNumber: e.target.value })}
                placeholder="등록번호를 입력하세요"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="issuer">발급기관</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(cert.issuer, "발급기관")}
                  className="h-6 w-6 p-0 hover:bg-red-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="issuer"
                value={cert.issuer}
                onChange={(e) => setCert({ ...cert, issuer: e.target.value })}
                placeholder="발급기관을 입력하세요"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IT 활용능력 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-purple-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-purple-800">💻 IT 활용능력</CardTitle>
              <CardDescription>프로그래밍 언어, 소프트웨어 활용 능력</CardDescription>
            </div>
            <Button onClick={copyITSkill} variant="outline" size="sm" className="hover:bg-purple-100 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              전체 복사
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="itType">IT활용종류</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(itSkill.type, "IT활용종류")}
                  className="h-6 w-6 p-0 hover:bg-purple-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="itType"
                value={itSkill.type}
                onChange={(e) => setItSkill({ ...itSkill, type: e.target.value })}
                placeholder="Java, Python, React 등"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="itLevel">수준</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(itSkill.level, "수준")}
                  className="h-6 w-6 p-0 hover:bg-purple-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Select value={itSkill.level} onValueChange={(value) => setItSkill({ ...itSkill, level: value })}>
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
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="proficiency">정도</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(itSkill.proficiency, "정도")}
                  className="h-6 w-6 p-0 hover:bg-purple-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Select
                value={itSkill.proficiency}
                onValueChange={(value) => setItSkill({ ...itSkill, proficiency: value })}
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
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="duration">사용기간</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyField(itSkill.duration, "사용기간")}
                  className="h-6 w-6 p-0 hover:bg-purple-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Input
                id="duration"
                value={itSkill.duration}
                onChange={(e) => setItSkill({ ...itSkill, duration: e.target.value })}
                placeholder="3년, 1년 6개월 등"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="itAbility">활용능력</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyField(itSkill.ability, "활용능력")}
                className="h-6 w-6 p-0 hover:bg-purple-100"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Textarea
              id="itAbility"
              value={itSkill.ability}
              onChange={(e) => setItSkill({ ...itSkill, ability: e.target.value })}
              placeholder="활용능력을 상세히 입력하세요"
              rows={3}
            />
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
            {formatOutput()}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
