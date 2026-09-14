import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/lib/supabase";
import { getAvatarFallbackTextFromFullName } from "@/lib/utils";
import type { UserProfile } from "@/queries/auth";

interface CurrentUserProps {
  profile: UserProfile;
  setMobileDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CurrentUser({
  profile,
  setMobileDrawerOpen,
}: CurrentUserProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Lỗi đăng xuất: ", error.message);
      return;
    }

    queryClient.clear();

    navigate({
      to: "/",
      replace: true,
    });
  };
  return isMobile ? (
    <div className="grid grid-cols-1 gap-2">
      <div className="bg-primary/10 flex items-center justify-between gap-2 rounded-md px-3 py-2">
        <div className="text-primary flex h-11 items-center gap-2 rounded-md">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {getAvatarFallbackTextFromFullName(profile.full_name)}
            </AvatarFallback>
          </Avatar>
          <span className="text-lg font-medium">
            {profile.full_name.split(" ").slice(-2).join(" ")}
          </span>
        </div>
        <div>#{profile.user_id}</div>
      </div>
      <Link to="/dashboard/account">
        <Button
          size="lg"
          variant="outline"
          className="flex h-12 w-full flex-row items-center justify-start text-lg"
          onClick={() => {
            if (setMobileDrawerOpen) {
              setMobileDrawerOpen(false);
            }
          }}
        >
          Tài khoản
        </Button>
      </Link>
      <Button
        size="lg"
        variant="destructive"
        className="flex h-12 flex-row items-center justify-start text-lg"
        onClick={handleLogout}
      >
        Đăng xuất
      </Button>
    </div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="text-primary flex h-11 items-center gap-2 rounded-md px-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {getAvatarFallbackTextFromFullName(profile.full_name)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">
            {profile.full_name.split(" ").slice(-2).join(" ")}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[240px] p-0" side="bottom">
        <div className="bg-primary/10 flex flex-col gap-2 p-3">
          <div className="text-primary flex h-11 items-center gap-2 rounded-md">
            <Avatar size="lg">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {getAvatarFallbackTextFromFullName(profile.full_name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium">
              {profile.full_name.split(" ").slice(-2).join(" ")}
            </span>
          </div>
          <div>Mã: {profile.user_id}</div>
        </div>
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex p-0">
            <Link to="/dashboard/account" className="flex-1 p-3">
              Tài khoản
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer p-3"
            onClick={handleLogout}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
