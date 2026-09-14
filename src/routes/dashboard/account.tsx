import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { Container } from "@/components/shared/container";
import { ErrorMessage } from "@/components/shared/error-message";
import { Heading } from "@/components/shared/heading";
import { Hero } from "@/components/shared/hero";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getAvatarFallbackTextFromFullName } from "@/lib/utils";
import { ChangePassword } from "./-components/change-password";

export const Route = createFileRoute("/dashboard/account")({
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ErrorMessage,
  component: DashboardAccount,
});

function DashboardAccount() {
  const { profile } = useLoaderData({ from: "/dashboard" });

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
              <Avatar className="h-18 w-18">
                <AvatarFallback className="text-primary-foreground bg-primary text-3xl font-semibold">
                  {getAvatarFallbackTextFromFullName(profile.full_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-primary text-xl font-semibold">
                  {profile.full_name}
                </p>
                <p>Mã: {profile.user_id}</p>
              </div>
            </div>
          </div>
        </section>
        <Separator />
        <section className="my-6">
          <Heading>Bảo mật và Xác thực</Heading>
          <div className="grid grid-cols-2 gap-4">
            <ChangePassword />
          </div>
        </section>
      </Container>
    </>
  );
}
