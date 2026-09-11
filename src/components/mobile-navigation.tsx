import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer"

export function MobileNavigation() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger>
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-muted focus:bg-muted">
          <MenuIcon className="size-6" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="px-6 py-8">
          <nav>
            <ul className="flex flex-col items-stretch gap-2">
              <li>
                <a
                  href="/"
                  className="flex h-12 items-center text-2xl font-semibold"
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  className="flex h-12 items-center text-2xl font-semibold"
                >
                  Khóa PIXEL2027
                </a>
              </li>
              <li>
                <a
                  href="/schedule"
                  className="flex h-12 items-center text-2xl font-semibold"
                >
                  Lịch học
                </a>
              </li>
              <li>
                <a
                  href="/posts"
                  className="flex h-12 items-center text-2xl font-semibold"
                >
                  Bài viết
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Đóng</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
