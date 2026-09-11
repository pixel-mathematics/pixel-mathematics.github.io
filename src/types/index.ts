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
  updated_on: Date
}

export interface Chapter {
  id: string
  title: string
  start_date: string
  sort_order: number
}

export interface Lesson {
  id: string
  title: string
  class_date: Date
  updated_on: Date
  deadline: Date
  sort_order: number
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
}

export interface LessonAttachment {
  id: string
  file_name: string
  file_url: string
  file_type: string
}

export interface Document {
  id: string
  file_name: string
  file_url: string
  file_type: string
}

export interface SubjectWithCourses extends Subject {
  courses: Course[]
}

export interface CourseWithSubject extends Course {
  subjects: Subject
}
export interface LessonWithAttachments extends Lesson {
  lesson_attachments: LessonAttachment[]
}

export interface LessonWithCourseAndChapter extends Omit<
  Lesson,
  "deadline" | "sort_order"
> {
  chapters: Pick<Chapter, "id" | "title"> & {
    courses: Pick<Course, "id" | "title">
  }
}

export interface FullCourse extends Course {
  chapters: Array<
    Chapter & {
      lessons: Array<
        Lesson & {
          lesson_attachments: LessonAttachment[]
        }
      >
    }
  >
  documents: Array<Document>
}

export interface MessageWithCourse extends Message {
  courses: Pick<Course, "id" | "title">[]
}
