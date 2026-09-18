"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "@/providers/dashboard-provider";

import { createClient } from "@/lib/supabase/client";
import { getAvatarFallbackText } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function CurrentUser() {
  const router = useRouter();
  const isMobile = useMobile();

  const { profile } = useDashboardContext();
  if (!profile) {
    return <div>Lỗi</div>;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Lỗi đăng xuất: ", error.message);
      return;
    }

    router.push("/sign-in");
  };
  return isMobile ? (
    <Button
      size="lg"
      variant="destructive"
      className="mt-6 flex w-full items-center justify-start px-4 py-2 text-xl font-medium"
      onClick={handleLogout}
    >
      Đăng xuất
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="text-primary flex cursor-pointer items-stretch overflow-hidden rounded-md">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground rounded-none font-medium">
              {getAvatarFallbackText(profile.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="bg-primary/10 grid place-items-center px-2 font-medium">
            {profile.full_name.split(" ").slice(-2).join(" ")}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[240px] p-0" side="bottom" align="end">
        <div className="bg-primary/10 flex items-center gap-2 p-2.5">
          <div className="">
            <Avatar className="size-10">
              <AvatarFallback className="bg-primary text-primary-foreground rounded-md text-lg font-medium">
                {getAvatarFallbackText(profile.full_name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="text-primary font-medium">
              {profile.full_name.split(" ").slice(-2).join(" ")}
            </div>
            <div className="text-muted-foreground -mt-1 text-sm">{profile.user_id}</div>
          </div>
        </div>
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-base">
            <Link href="/dashboard/account">Tài khoản</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="px-2.5 text-base"
            onClick={handleLogout}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
