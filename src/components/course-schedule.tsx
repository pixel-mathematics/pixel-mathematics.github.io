import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import viLocale from "@fullcalendar/core/locales/vi"
import { useState } from "react"
import { type EventClickArg } from "@fullcalendar/core"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import type { ScheduleEvent } from "@/types"
import { Button } from "@/components/ui/button"
import {
  CalendarIcon,
  ClockArrowLeftIcon,
  ClockArrowRightIcon,
  GraduationCapIcon,
} from "lucide-react"
import { getDayOfWeek } from "@/lib/utils"

interface Props {
  scheduleEvents: ScheduleEvent[]
}

export function CourseSchedule({ scheduleEvents }: Props) {
  const [open, setOpen] = useState(false)

  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)

  function handleEventClick(info: EventClickArg) {
    setSelectedEvent(
      scheduleEvents.find((se) => se.id === info.event.id) ?? null
    )
    setOpen(true)
  }

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={scheduleEvents.map((event) => ({
          id: event.id,
          title: event.title,
          startTime: event.start_time,
          endTime: event.end_time,
          daysOfWeek: [event.dayOfWeek],
          backgroundColor: event.background_color,
          textColor: event.text_color ?? "#000",
          borderColor: event.background_color,
        }))}
        slotMinTime="07:00:00" // Thời gian bắt đầu trong ngày
        slotMaxTime="22:00:00" // Thời gian kết thúc trong ngày
        allDaySlot={false} // Ẩn hàng "Cả ngày"
        headerToolbar={{
          left: "",
          center: "",
          right: "",
        }}
        height="auto"
        buttonText={{
          today: "Hôm nay",
          week: "Tuần",
          day: "Ngày",
        }}
        locale={viLocale}
        dayHeaderFormat={{
          weekday: "short",
        }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
        }}
        eventClick={handleEventClick}
      />
      {/* Drawer */}
      <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
        <DrawerContent>
          {selectedEvent && (
            <>
              <DrawerHeader>
                <DrawerTitle>
                  <div className="flex flex-col items-start gap-2">
                    <div className="self-stretch truncate text-lg">
                      {selectedEvent.title}
                    </div>
                  </div>
                </DrawerTitle>
                <DrawerDescription>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      Mã lớp:
                      <div className="flex h-6 items-center rounded-sm bg-primary/10 px-1.5 text-sm font-semibold text-primary uppercase">
                        {selectedEvent.id}
                      </div>
                    </div>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-col gap-4 p-4 text-base">
                <div className="rounded-md border border-primary p-4">
                  <div className="mb-1 flex items-center gap-1 font-medium text-primary">
                    <CalendarIcon size={18} />
                    <span>Ngày học trong tuần</span>
                  </div>
                  <div className="ml-6">
                    {getDayOfWeek(selectedEvent.dayOfWeek)}
                  </div>
                </div>

                <div className="rounded-md border border-primary p-4">
                  <div className="mb-1 flex items-center gap-1 font-medium text-primary">
                    <ClockArrowLeftIcon size={18} />
                    <span>Giờ vào lớp</span>
                  </div>
                  <div className="ml-6">
                    {selectedEvent.start_time.slice(0, 5)}
                  </div>
                </div>

                <div className="rounded-md border border-destructive p-4">
                  <div className="mb-1 flex items-center gap-1 font-medium text-destructive">
                    <ClockArrowRightIcon size={18} />
                    <span>Giờ kết thúc</span>
                  </div>
                  <div className="ml-6">
                    {selectedEvent.end_time.slice(0, 5)}
                  </div>
                </div>

                <div className="rounded-md border border-primary p-4">
                  <div className="mb-1 flex items-center gap-1 font-medium text-primary">
                    <GraduationCapIcon size={18} />
                    <span>Học sinh</span>
                  </div>
                  <div className="ml-6">{selectedEvent.students}</div>
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>
                  Trở lại
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
