import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabasePublishableKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabasePublishableKey)

export async function getSubjects() {
  return supabase.from("subjects").select(`
    id,
    title,
    sort_order,
    courses (count)
  `)
}

export async function getCourses() {
  return supabase
    .from("courses")
    .select(
      `
    id,
    subjects (
      id,
      title
    ),
    title,
    description,
    start_date,
    updated_on
  `
    )
    .eq("status", "active")
}

export async function getSubjectById(id: string) {
  return supabase
    .from("subjects")
    .select(
      `
      id,
      title,
      courses (
        id,
        title,
        description,
        start_date,
        updated_on,
        subjects (
          id,
          title
        )
      )
    `
    )
    .eq("id", id)
    .single()
}

export function getCourseById(id: string) {
  return supabase
    .from("courses")
    .select(
      `
    id,
    title,
    description,
    start_date,
    updated_on,
    status,
    sort_order,
    chapters (
      id,
      title,
      start_date,
      sort_order,
      lessons (
        id,
        title,
        class_date,
        updated_on,
        deadline,
        sort_order,
        lesson_attachments (
          id,
          file_name,
          file_url,
          file_type
        )
      )
    ),
    documents (
      id,
      file_name,
      file_url,
      file_type
    )
`
    )
    .order("id", { referencedTable: "chapters", ascending: true })
    .eq("id", id)
    .single()
}

export async function getRecentLessonsWithinWeek() {
  // 1. Tính toán mốc thời gian cách đây 7 ngày
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const targetDateISO = oneWeekAgo.toISOString() // Supabase cần định dạng ISO string

  // 2. Truy vấn Supabase
  return supabase
    .from("lessons")
    .select(
      `
      id,
      title,
      class_date,
      updated_on,
      chapters (
        id,
        title,
        courses (
          id,
          title
        )
      )
    `
    )
    .gte("updated_on", targetDateISO)
    .order("updated_on", { ascending: false })
    .order("id", { ascending: false })
}

export async function getLessons() {
  return supabase
    .from("lessons")
    .select(
      `
      id,
      title,
      class_date,
      updated_on,
      chapters (
        id,
        title,
        courses (
          id,
          title
        )
      )
    `
    )
    .order("updated_on", { ascending: false })
    .order("id", { ascending: false })
}

export async function getActiveMessages() {
  const now = new Date().toISOString()

  return supabase
    .from("messages")
    .select(
      `
        id,
        content,
        created_at,
        expired_at,
        courses (
          id,
          title
        )
      `
    )
    .or(`expired_at.gt.${now},expired_at.is.null`)
    .order("created_at", { ascending: false })
}

export async function getScheduleEvents() {
  return supabase.from("schedule_events").select().order("id")
}
