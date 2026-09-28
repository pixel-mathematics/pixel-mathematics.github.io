"use client";

import { useRouter } from "next/navigation";
import { useRootContext } from "@/providers/root-provider";

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
  const isMobile = useMobile();

  const { currentUser } = useRootContext();

  if (!currentUser) return null;

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Lỗi đăng xuất: ", error.message);
      return;
    }

    router.push("/sign-in");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {isMobile ? (
          <Button size="lg" variant="destructive" className="w-full">
            Đăng xuất
          </Button>
        ) : (
          <div className="text-primary flex cursor-pointer items-stretch overflow-hidden rounded-md">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground rounded-none font-medium">
                {getAvatarFallbackText(currentUser.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="bg-primary/10 grid place-items-center px-2 font-medium">
              {currentUser.full_name.split(" ").slice(-2).join(" ")}
            </div>
          </div>
        )}
      </AlertDialogTrigger>
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
