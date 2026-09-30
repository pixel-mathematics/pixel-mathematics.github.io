"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRootContext } from "@/providers/root-provider";
import { LogOutIcon } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { getAvatarFallbackText } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function CurrentUser() {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMobile();

  const isPublicRoute = !(pathname.startsWith("/dashboard") || pathname.startsWith("/admin"));
  const { currentUser } = useRootContext();

  if (!currentUser)
    return (
      <Link href="/sign-in" className="block flex-1">
        <Button size="lg" className="w-full">
          Đăng nhập
        </Button>
      </Link>
    );

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Lỗi đăng xuất: ", error.message);
      return;
    }

    router.push("/sign-in");
  };

  return isPublicRoute ? (
    <>
      {isMobile ? (
        <Link href="/dashboard" className="block flex-1">
          <Button size="lg" className="w-full">
            Góc học tập
          </Button>
        </Link>
      ) : (
        <Link href="/dashboard">
          <div className="flex items-stretch overflow-hidden rounded-md">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary text-primary-foreground rounded-none">
                {getAvatarFallbackText(currentUser.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="bg-primary/10 text-primary flex flex-1 items-center gap-2 px-2.5 font-medium">
              Góc học tập
            </div>
          </div>
        </Link>
      )}
    </>
  ) : (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          isMobile ? (
            <Button size="lg" variant="destructive" className="w-full">
              Đăng xuất
            </Button>
          ) : (
            <button className="text-primary flex cursor-pointer items-stretch overflow-hidden rounded-md">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground rounded-none font-medium">
                  {getAvatarFallbackText(currentUser.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="bg-primary/10 flex items-center gap-2 px-2 font-medium">
                {/* <div>{currentUser.full_name.split(" ").slice(-2).join(" ")}</div> */}
                Đăng xuất
                <LogOutIcon className="size-4" />
              </div>
            </button>
          )
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn vẫn có thể đăng nhập lại bất cứ lúc nào.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleLogout}>
            Rời đi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
