import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/shared/container";
import { GithubIcon, ZaloIcon } from "@/components/shared/custom-icons";

export function AdminFooter() {
  return (
    <footer>
      <Separator />
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-sm md:text-base">
            Make by <span className="text-primary font-medium">dm1nh</span> without{" "}
            <span className="text-lg">☕</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://github.com/dm1nh" target="_blank">
              <GithubIcon className="size-6 md:size-8" />
            </a>
            <a href="https://zalo.me/0365530552" target="_blank">
              <ZaloIcon className="size-6 md:size-8" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
