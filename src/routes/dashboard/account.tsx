import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Container } from "@/components/shared/container";
import { ErrorMessage } from "@/components/shared/error-message";
import { Heading } from "@/components/shared/heading";
import { Hero } from "@/components/shared/hero";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvatarFallbackTextFromFullName } from "@/lib/utils";
import { ChangePassword } from "./-components/change-password";
import { HeadingSkeleton } from "./-components/skeletons/heading-skeleton";
import { HeroSkeleton } from "./-components/skeletons/hero-skeleton";

export const Route = createFileRoute("/dashboard/account")({
  pendingComponent: () => (
    <>
      <section>
        <HeroSkeleton />
      </section>
      <Container>
        <section className="my-6">
          <HeadingSkeleton />
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-14 rounded-md text-3xl font-medium text-transparent">
                M
              </Skeleton>
              <div>
                <Skeleton className="w-[160px] text-xl font-semibold text-transparent">
                  name
                </Skeleton>
                <Skeleton className="w-[240px] text-transparent">id</Skeleton>
              </div>
            </div>
          </div>
        </section>
        <Separator />
        <section className="my-6">
          <HeadingSkeleton />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }, (_, i) => i).map((i) => (
              <div
                className="border-border flex items-center gap-4 rounded-md border p-4 text-left"
                key={i}
              >
                <Skeleton className="size-8" />
                <div className="flex-1">
                  <Skeleton className="w-1/2 text-lg font-medium text-transparent">
                    title
                  </Skeleton>
                  <Skeleton className="text-transparent">description</Skeleton>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  ),
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
              <Avatar className="size-14">
                <AvatarFallback className="text-primary-foreground bg-primary rounded-md text-3xl font-medium">
                  {getAvatarFallbackTextFromFullName(profile.full_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-primary text-lg font-semibold">
                  {profile.full_name}
                </p>
                <p className="text-muted-foreground">#{profile.user_id}</p>
              </div>
            </div>
          </div>
        </section>
        <Separator />
        <section className="my-6">
          <Heading>Bảo mật và Xác thực</Heading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ChangePassword />
          </div>
        </section>
      </Container>
    </>
  );
}
