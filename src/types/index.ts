export interface Subject {
  id: string
  title: string
  sort_order: number | null
}

export interface Course {
  id: string
  title: string
  description: string
  start_date: string
  status: string
  sort_order: number
  updated_at: Date
}

export interface SubjectWithCourses extends Subject {
  courses: Course[]
}

export interface CourseWithSubject extends Course {
  subjects: Subject
}

export interface Chapter {
  id: string
  title: string
  description: string
  start_date: string
  sort_order: number
}

export interface Lesson {
  id: string
  title: string
  class_date: Date
  updated_at: Date
  due_date: Date
  sort_order: number
}

export interface LessonAttachment {
  id: string
  file_name: string
  file_url: string
  file_type: string
}

export interface LessonWithLessonAttachments extends Lesson {
  lesson_attachments: LessonAttachment[]
}

export interface RecentLesson extends Lesson {
  chapters: Pick<Chapter, "id" | "title"> & {
    courses: Pick<Course, "id" | "title">
  }
}

export interface CourseWithLessons extends Course {
  chapters: Array<
    Chapter & {
      lessons: Array<
        Lesson & {
          lesson_attachments: LessonAttachment[]
        }
      >
    }
  >
}

export interface Message {
  id: string
  content: string
  created_at: Date
  expired_at: Date
}

export interface ScheduleEvent {
  id: string
  title: string
  dayOfWeek: number
  start_time: string
  end_time: string
  text_color: string
  background_color: string
  students: string
  created_at: Date
}
