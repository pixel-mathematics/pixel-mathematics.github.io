import { useState } from "react";
import { type EventClickArg } from "@fullcalendar/core";
import viLocale from "@fullcalendar/core/locales/vi";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  CalendarIcon,
  ClockArrowLeftIcon,
  ClockArrowRightIcon,
  GraduationCapIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { getDayOfWeek } from "@/lib/utils";
import type { ScheduleEvent } from "@/queries/schedules";

interface Props {
  scheduleEvents: ScheduleEvent[];
}

export function CourseSchedule({ scheduleEvents }: Props) {
  const [open, setOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(
    null
  );

  function handleEventClick(info: EventClickArg) {
    setSelectedEvent(
      scheduleEvents.find((se) => se.id === info.event.id) ?? null
    );
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
              backgroundColor: event.background_color ?? "#000",
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
                      <div className="bg-primary/10 text-primary flex h-6 w-26 items-center justify-center rounded-sm text-sm font-semibold uppercase">
                        {selectedEvent.id}
                      </div>
                    </div>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-col gap-4 p-4 text-base">
                <div className="border-primary rounded-md border p-4">
                  <div className="text-primary mb-1 flex items-center gap-1 font-medium">
                    <CalendarIcon size={18} />
                    <span>Ngày học trong tuần</span>
                  </div>
                  <div className="ml-6">
                    {getDayOfWeek(selectedEvent.dayOfWeek)}
                  </div>
                </div>

                <div className="border-primary rounded-md border p-4">
                  <div className="text-primary mb-1 flex items-center gap-1 font-medium">
                    <ClockArrowLeftIcon size={18} />
                    <span>Giờ vào lớp</span>
                  </div>
                  <div className="ml-6">
                    {selectedEvent.start_time?.slice(0, 5)}
                  </div>
                </div>

                <div className="border-destructive rounded-md border p-4">
                  <div className="text-destructive mb-1 flex items-center gap-1 font-medium">
                    <ClockArrowRightIcon size={18} />
                    <span>Giờ kết thúc</span>
                  </div>
                  <div className="ml-6">
                    {selectedEvent.end_time?.slice(0, 5)}
                  </div>
                </div>

                <div className="border-primary rounded-md border p-4">
                  <div className="text-primary mb-1 flex items-center gap-1 font-medium">
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
  );
}
