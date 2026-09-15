import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
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

export function CurrentUser({ profile }: CurrentUserProps) {
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
              {getAvatarFallbackTextFromFullName(profile.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="bg-primary/10 grid place-items-center px-2 font-medium">
            {profile.full_name.split(" ").slice(-2).join(" ")}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[240px] p-0" side="bottom">
        <div className="flex items-center gap-2 p-2.5">
          <div className="">
            <Avatar className="size-12">
              <AvatarFallback className="bg-primary text-primary-foreground rounded-md text-2xl font-medium">
                {getAvatarFallbackTextFromFullName(profile.full_name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="text-primary text-lg font-medium">
              {profile.full_name.split(" ").slice(-2).join(" ")}
            </div>
            <div className="text-muted-foreground -mt-0.5 text-sm">
              {profile.user_id}
            </div>
          </div>
        </div>
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="px-2.5"
            onClick={handleLogout}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
