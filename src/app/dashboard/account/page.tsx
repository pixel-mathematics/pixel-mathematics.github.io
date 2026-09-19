import { redirect } from "next/navigation";
import { getUserProfile } from "@/data/auth/queries";

import { getAvatarFallbackText } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { Hero } from "@/components/shared/hero";

import { ChangePasswordForm } from "./_components/change-password-form";

export default async function DashboardAccount() {
  const profile = await getUserProfile();
  if (!profile) {
    redirect("/sign-in");
  }

  return (
    <>
      <section>
        <Hero highlightText="Tài khoản" />
      </section>
      <Container>
        <section className="my-6">
          <Heading>Thông tin tài khoản</Heading>
          <div>
            <div className="flex items-center gap-2">
              <Avatar className="size-14">
                <AvatarFallback className="text-primary-foreground bg-primary rounded-md text-3xl font-medium">
                  {getAvatarFallbackText(profile.full_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-primary text-lg font-semibold">{profile.full_name}</p>
                <p className="text-muted-foreground">#{profile.user_id}</p>
              </div>
            </div>
          </div>
        </section>
        <Separator />
        <section className="my-6">
          <Heading>Bảo mật và Xác thực</Heading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ChangePasswordForm />
          </div>
        </section>
      </Container>
    </>
  );
}
