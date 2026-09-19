import Link from "next/link";
import { useRootContext } from "@/providers/root-provider";

import { getAvatarFallbackText } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AdminAuthButton() {
  const { profile } = useRootContext();
  const isMobile = useMobile();

  return profile ? (
    <>
      {isMobile ? (
        <Link href="/admin" className="block flex-1">
          <Button size="lg" className="w-full">
            Bảng điều khiển
          </Button>
        </Link>
      ) : (
        <Link href="/admin">
          <div className="flex items-stretch overflow-hidden rounded-md">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary text-primary-foreground rounded-none">
                {getAvatarFallbackText(profile.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="bg-primary/10 text-primary flex flex-1 items-center gap-2 px-2.5 font-medium">
              Bảng điều khiển
            </div>
          </div>
        </Link>
      )}
    </>
  ) : (
    <Link href="/sign-in" className="block flex-1">
      <Button size="lg" className="w-full">
        Đăng nhập
      </Button>
    </Link>
  );
}
