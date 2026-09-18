"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import type { ScheduleEvent } from "@/data/schedules/queries";
import { useDashboardContext } from "@/providers/dashboard-provider";
import { type EventClickArg } from "@fullcalendar/core";
import viLocale from "@fullcalendar/core/locales/vi";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarIcon, ClockArrowLeftIcon, ClockArrowRightIcon, UsersIcon } from "lucide-react";

import { getDayOfWeek } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Props {
  scheduleEvents: ScheduleEvent[];
}

export function CourseSchedule({ scheduleEvents }: Props) {
  const { profile } = useDashboardContext();
  if (!profile) {
    redirect("/sign-in");
  }

  const [open, setOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  function handleEventClick(info: EventClickArg) {
    setSelectedEvent(scheduleEvents.find((se) => se.id === info.event.id) ?? null);
    setOpen(true);
  }

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px]">
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            events={scheduleEvents.map((event) => ({
              id: event.id,
              title: event.title ?? "Môn học",
              startTime: event.start_time,
              endTime: event.end_time,
              daysOfWeek: [event.dayOfWeek],
              backgroundColor: event.student_schedule_events.some(
                ({ profiles }) => profiles?.user_id === profile.user_id
              )
                ? (event.background_color ?? "#000")
                : "#eee",
              textColor: event.text_color ?? "#000",
              borderColor: event.background_color ?? "#000",
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
        </div>
      </div>
      {/* Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          {selectedEvent && (
            <>
              <SheetHeader>
                <SheetTitle>
                  <div className="flex flex-col items-start gap-2">
                    <div className="self-stretch truncate text-lg">{selectedEvent.title}</div>
                  </div>
                </SheetTitle>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    Mã lớp:
                    <div className="bg-primary/10 text-primary flex h-7 w-26 items-center justify-center rounded-sm text-sm font-semibold uppercase">
                      {selectedEvent.id}
                    </div>
                  </div>
                </div>
              </SheetHeader>
              <div className="flex flex-col gap-4 p-4 text-base">
                <div className="border-primary rounded-md border p-4">
                  <div className="text-primary mb-1 flex items-center gap-2 text-lg font-medium">
                    <CalendarIcon className="size-4.5" />
                    <span>Ngày học trong tuần</span>
                  </div>
                  <div className="ml-6">{getDayOfWeek(selectedEvent.dayOfWeek)}</div>
                </div>

                <div className="border-primary rounded-md border p-4">
                  <div className="text-primary mb-1 flex items-center gap-2 text-lg font-medium">
                    <ClockArrowLeftIcon className="size-4.5" />
                    <span>Giờ vào lớp</span>
                  </div>
                  <div className="ml-6">{selectedEvent.start_time?.slice(0, 5)}</div>
                </div>

                <div className="border-destructive rounded-md border p-4">
                  <div className="text-destructive mb-1 flex items-center gap-2 text-lg font-medium">
                    <ClockArrowRightIcon className="size-4.5" />
                    <span>Giờ kết thúc</span>
                  </div>
                  <div className="ml-6">{selectedEvent.end_time?.slice(0, 5)}</div>
                </div>

                <div className="border-primary rounded-md border p-4">
                  <div className="text-primary mb-1 flex items-center gap-2 text-lg font-medium">
                    <UsersIcon className="size-4.5" />
                    <span>Học sinh</span>
                  </div>
                  <div className="ml-6 flex flex-col gap-1">
                    {selectedEvent.student_schedule_events.map(
                      ({ profiles }) =>
                        profiles && <div key={profiles.id}>{profiles?.full_name}</div>
                    )}
                  </div>
                </div>
              </div>
              <SheetFooter>
                <SheetClose render={<Button variant="outline" />}>Đóng</SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
