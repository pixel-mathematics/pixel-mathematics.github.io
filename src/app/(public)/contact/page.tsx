import Image from "next/image";
import { MailIcon, MapPinHouseIcon, PhoneCallIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { Hero } from "@/components/shared/hero";

export default function Contact() {
  return (
    <>
      <section>
        <Hero highlightText="Liên hệ" />
      </section>
      <section className="my-12">
        <Container>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="overflow-hidden rounded-xl">
              <Image src="/avatar.png" alt="avatar" width="80" height="80" className="size-20" />
            </div>
            <div>
              <Heading className="mb-1 text-center md:text-left">Thông tin liên hệ</Heading>
              <p className="text-muted-foreground text-center text-lg md:text-left">
                [[ Làm sao để liên hệ với mình? ]]
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4">
            {contacts.map(({ icon: Icon, label, text }) => (
              <div
                key={label}
                className="border-border flex items-center gap-4 rounded-md border p-4"
              >
                <div className="text-primary bg-primary/20 grid size-14 shrink-0 place-items-center rounded-md">
                  <Icon className="size-6" />
                </div>
                <div>
                  <div className="text-primary font-medium uppercase">{label}</div>
                  <div>{text}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

const contacts = [
  {
    icon: PhoneCallIcon,
    label: "SĐT/Zalo",
    text: "0365530552",
  },
  {
    icon: MailIcon,
    label: "Email",
    text: "dangminhngo.dev@gmail.com",
  },
  {
    icon: MapPinHouseIcon,
    label: "Địa chỉ",
    text: "Đường Trần Quang Cơ, phường Phú Thạnh, TPHCM",
  },
];
