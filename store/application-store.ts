import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Career {
  id: string
  company: string
  period: string
  department: string
  employmentType: string
  position: string
  responsibilities: string
  salary: string
  resignationReason: string
}

export interface Community {
  id: string
  category: string
  activityName: string
  period: string
  mainActivities: string
}

export interface Project {
  id: string
  projectName: string
  company: string
  participationPeriod: string
  responsibilities: string
}

export interface Overseas {
  id: string
  purpose: string
  country: string
  period: string
  institution: string
  experience: string
}

export interface Education {
  id: string
  courseName: string
  period: string
  completionStatus: string
  institution: string
  hours: string
  mainContent: string
}

export interface Award {
  id: string
  awardName: string
  date: string
  organization: string
  details: string
}

export interface Language {
  id: string
  language: string
  test: string
  grade: string
  score: string
  registrationNumber: string
  date: string
}

export interface ForeignLanguage {
  id: string
  language: string
  level: string
  ability: string
}

export interface Certification {
  id: string
  type: string
  grade: string
  acquisitionDate: string
  registrationNumber: string
  issuingOrganization: string
}

export interface ITSkill {
  id: string
  type: string
  level: string
  ability: string
  proficiency: string
  usagePeriod: string
}

interface ApplicationState {
  careers: Career[]
  communities: Community[]
  projects: Project[]
  overseas: Overseas[]
  educations: Education[]
  awards: Award[]
  languages: Language[]
  foreignLanguages: ForeignLanguage[]
  certifications: Certification[]
  itSkills: ITSkill[]

  // Career actions
  addCareer: (career: Omit<Career, "id">) => void
  updateCareer: (id: string, career: Partial<Career>) => void
  deleteCareer: (id: string) => void

  // Community actions
  addCommunity: (community: Omit<Community, "id">) => void
  updateCommunity: (id: string, community: Partial<Community>) => void
  deleteCommunity: (id: string) => void

  // Project actions
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void

  // Overseas actions
  addOverseas: (overseas: Omit<Overseas, "id">) => void
  updateOverseas: (id: string, overseas: Partial<Overseas>) => void
  deleteOverseas: (id: string) => void

  // Education actions
  addEducation: (education: Omit<Education, "id">) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  deleteEducation: (id: string) => void

  // Award actions
  addAward: (award: Omit<Award, "id">) => void
  updateAward: (id: string, award: Partial<Award>) => void
  deleteAward: (id: string) => void

  // Language actions
  addLanguage: (language: Omit<Language, "id">) => void
  updateLanguage: (id: string, language: Partial<Language>) => void
  deleteLanguage: (id: string) => void

  // Foreign Language actions
  addForeignLanguage: (foreignLanguage: Omit<ForeignLanguage, "id">) => void
  updateForeignLanguage: (id: string, foreignLanguage: Partial<ForeignLanguage>) => void
  deleteForeignLanguage: (id: string) => void

  // Certification actions
  addCertification: (certification: Omit<Certification, "id">) => void
  updateCertification: (id: string, certification: Partial<Certification>) => void
  deleteCertification: (id: string) => void

  // IT Skill actions
  addITSkill: (itSkill: Omit<ITSkill, "id">) => void
  updateITSkill: (id: string, itSkill: Partial<ITSkill>) => void
  deleteITSkill: (id: string) => void
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set) => ({
      careers: [],
      communities: [],
      projects: [],
      overseas: [],
      educations: [],
      awards: [],
      languages: [],
      foreignLanguages: [],
      certifications: [],
      itSkills: [],

      // Career actions
      addCareer: (career) =>
        set((state) => ({
          careers: [...state.careers, { ...career, id: Date.now().toString() }],
        })),
      updateCareer: (id, career) =>
        set((state) => ({
          careers: state.careers.map((c) => (c.id === id ? { ...c, ...career } : c)),
        })),
      deleteCareer: (id) =>
        set((state) => ({
          careers: state.careers.filter((c) => c.id !== id),
        })),

      // Community actions
      addCommunity: (community) =>
        set((state) => ({
          communities: [...state.communities, { ...community, id: Date.now().toString() }],
        })),
      updateCommunity: (id, community) =>
        set((state) => ({
          communities: state.communities.map((c) => (c.id === id ? { ...c, ...community } : c)),
        })),
      deleteCommunity: (id) =>
        set((state) => ({
          communities: state.communities.filter((c) => c.id !== id),
        })),

      // Project actions
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, { ...project, id: Date.now().toString() }],
        })),
      updateProject: (id, project) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),

      // Overseas actions
      addOverseas: (overseas) =>
        set((state) => ({
          overseas: [...state.overseas, { ...overseas, id: Date.now().toString() }],
        })),
      updateOverseas: (id, overseas) =>
        set((state) => ({
          overseas: state.overseas.map((o) => (o.id === id ? { ...o, ...overseas } : o)),
        })),
      deleteOverseas: (id) =>
        set((state) => ({
          overseas: state.overseas.filter((o) => o.id !== id),
        })),

      // Education actions
      addEducation: (education) =>
        set((state) => ({
          educations: [...state.educations, { ...education, id: Date.now().toString() }],
        })),
      updateEducation: (id, education) =>
        set((state) => ({
          educations: state.educations.map((e) => (e.id === id ? { ...e, ...education } : e)),
        })),
      deleteEducation: (id) =>
        set((state) => ({
          educations: state.educations.filter((e) => e.id !== id),
        })),

      // Award actions
      addAward: (award) =>
        set((state) => ({
          awards: [...state.awards, { ...award, id: Date.now().toString() }],
        })),
      updateAward: (id, award) =>
        set((state) => ({
          awards: state.awards.map((a) => (a.id === id ? { ...a, ...award } : a)),
        })),
      deleteAward: (id) =>
        set((state) => ({
          awards: state.awards.filter((a) => a.id !== id),
        })),

      // Language actions
      addLanguage: (language) =>
        set((state) => ({
          languages: [...state.languages, { ...language, id: Date.now().toString() }],
        })),
      updateLanguage: (id, language) =>
        set((state) => ({
          languages: state.languages.map((l) => (l.id === id ? { ...l, ...language } : l)),
        })),
      deleteLanguage: (id) =>
        set((state) => ({
          languages: state.languages.filter((l) => l.id !== id),
        })),

      // Foreign Language actions
      addForeignLanguage: (foreignLanguage) =>
        set((state) => ({
          foreignLanguages: [...state.foreignLanguages, { ...foreignLanguage, id: Date.now().toString() }],
        })),
      updateForeignLanguage: (id, foreignLanguage) =>
        set((state) => ({
          foreignLanguages: state.foreignLanguages.map((f) => (f.id === id ? { ...f, ...foreignLanguage } : f)),
        })),
      deleteForeignLanguage: (id) =>
        set((state) => ({
          foreignLanguages: state.foreignLanguages.filter((f) => f.id !== id),
        })),

      // Certification actions
      addCertification: (certification) =>
        set((state) => ({
          certifications: [...state.certifications, { ...certification, id: Date.now().toString() }],
        })),
      updateCertification: (id, certification) =>
        set((state) => ({
          certifications: state.certifications.map((c) => (c.id === id ? { ...c, ...certification } : c)),
        })),
      deleteCertification: (id) =>
        set((state) => ({
          certifications: state.certifications.filter((c) => c.id !== id),
        })),

      // IT Skill actions
      addITSkill: (itSkill) =>
        set((state) => ({
          itSkills: [...state.itSkills, { ...itSkill, id: Date.now().toString() }],
        })),
      updateITSkill: (id, itSkill) =>
        set((state) => ({
          itSkills: state.itSkills.map((i) => (i.id === id ? { ...i, ...itSkill } : i)),
        })),
      deleteITSkill: (id) =>
        set((state) => ({
          itSkills: state.itSkills.filter((i) => i.id !== id),
        })),
    }),
    {
      name: "job-application-storage",
    },
  ),
)
