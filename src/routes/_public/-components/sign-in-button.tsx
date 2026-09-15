import { Link, useLoaderData } from "@tanstack/react-router";
import { LogInIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAvatarFallbackTextFromFullName } from "@/lib/utils";

export function SignInButton() {
  const { profile } = useLoaderData({ from: "/_public" });
  const isMobile = useIsMobile();

  return profile ? (
    <>
      {isMobile ? (
        <Link
          to="/dashboard"
          className="text-primary flex items-center px-4 py-2 text-xl font-semibold"
        >
          Bảng điều khiển
        </Link>
      ) : (
        <Link to="/dashboard">
          <div className="flex items-stretch overflow-hidden rounded-md">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary text-primary-foreground rounded-none">
                {getAvatarFallbackTextFromFullName(profile.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="bg-primary/10 text-primary flex flex-1 items-center gap-2 px-2.5 font-medium">
              <LogInIcon className="size-4" /> Bảng điều khiển
            </div>
          </div>
        </Link>
      )}
    </>
  ) : (
    <>
      {isMobile ? (
        <Link
          to="/auth/sign-in"
          className="text-primary flex items-center px-4 py-2 text-xl font-semibold"
        >
          Đăng nhập
        </Link>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Đăng nhập</Button>
        </Link>
      )}
    </>
  );
}
