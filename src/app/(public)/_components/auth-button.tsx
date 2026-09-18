import Link from "next/link";
import { useRootContext } from "@/providers/root-provider";

import { getAvatarFallbackText } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const { profile } = useRootContext();
  const isMobile = useMobile();

  return profile ? (
    <>
      {isMobile ? (
        <Link
          href="/dashboard"
          className="text-primary flex items-center px-4 py-2 text-xl font-semibold"
        >
          Bảng điều khiển
        </Link>
      ) : (
        <Link href="/dashboard">
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
    <>
      {isMobile ? (
        <Link
          href="/auth/sign-in"
          className="text-primary flex items-center px-4 py-2 text-xl font-semibold"
        >
          Đăng nhập
        </Link>
      ) : (
        <Link href="/auth/sign-in">
          <Button>Đăng nhập</Button>
        </Link>
      )}
    </>
  );
}
