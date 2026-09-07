import { Button } from "@/components/ui/button"
import {
  CalendarIcon,
  ClockIcon,
  HourglassIcon,
  MessageCircleIcon,
} from "lucide-react"
import { formatDate } from "@/lib/utils"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import type { MessageWithCourse } from "@/types"

interface Props {
  message: MessageWithCourse
}
export function MessageListItem({ message }: Props) {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger>
        <div className="flex flex-col items-start rounded-md border px-3 py-2.5 text-base md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
            <span className="flex h-6 items-center rounded-sm bg-primary/10 px-2 text-sm font-semibold text-primary uppercase">
              {message.courses.id}
            </span>
            <span className="max-w-[80vw] truncate text-left">
              {message.content}
            </span>
          </div>
          <div className="ml-0 flex items-center gap-4 text-sm md:ml-auto">
            <div className="flex items-center gap-1 text-foreground/60">
              <ClockIcon size={14} />
              <span>{formatDate(message.created_at)}</span>
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <div>Lời nhắn</div>
          </DrawerTitle>
          <DrawerDescription>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1">
                Khóa
                <div className="flex h-6 items-center rounded-sm bg-primary/10 px-1.5 text-sm font-semibold text-primary uppercase">
                  {message.courses.id}
                </div>
              </div>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 p-4 text-base">
          <div className="rounded-md border border-primary bg-primary p-4 text-primary-foreground">
            <div className="mb-1 flex items-center gap-1 font-medium">
              <MessageCircleIcon size={18} />
              <span>Nội dung</span>
            </div>
            <div className="ml-6">{message.content}</div>
          </div>

          <div className="rounded-md border border-primary p-4">
            <div className="mb-1 flex items-center gap-1 font-medium text-primary">
              <CalendarIcon size={18} />
              <span>Ngày gửi</span>
            </div>
            <div className="ml-6">
              {formatDate(message.created_at, "dd/MM/yyyy")}
            </div>
          </div>

          <div className="rounded-md border border-destructive p-4">
            <div className="mb-1 flex items-center gap-1 font-medium text-destructive">
              <HourglassIcon size={18} />
              <span>Ngày hết hạn</span>
            </div>
            <div className="ml-6">
              {formatDate(message.expired_at, "dd/MM/yyyy")}
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Trở lại
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
