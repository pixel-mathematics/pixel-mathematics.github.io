import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/shared/hero";

export const Route = createFileRoute("/_public/contact")({
  component: Contact,
});

function Contact() {
  return (
    <>
      <section>
        <Hero text="Thông tin" highlightText="Liên hệ" />
      </section>
    </>
  );
}
