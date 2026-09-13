import { Container } from "@/components/container";
import { GithubIcon, ZaloIcon } from "@/components/custom-icons";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer>
      <Separator />
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">
            Make by <span className="text-primary font-semibold">dm1nh</span>{" "}
            without <span className="text-lg">☕</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://github.com/dm1nh" target="_blank">
              <GithubIcon size={32} />
            </a>
            <a href="https://zalo.me/0365530552" target="_blank">
              <ZaloIcon size={32} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
