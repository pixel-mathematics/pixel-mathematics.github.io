import { createFileRoute } from "@tanstack/react-router";
import {
  AirVentIcon,
  BrainCircuitIcon,
  GaugeIcon,
  HeadsetIcon,
  LibraryIcon,
  MessageCircleIcon,
  MonitorSmartphoneIcon,
  PiggyBankIcon,
  PiIcon,
  PresentationIcon,
  UserPenIcon,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { Hero } from "@/components/shared/hero";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_public/")({
  component: Home,
});

function Home() {
  return (
    <>
      <section>
        <Hero
          text="Pixel"
          highlightText="Mathematics"
          quote="The more I learn, the less I realize I understand"
        />
      </section>
      <section className="my-12">
        <Container>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="overflow-hidden rounded-xl">
              <img src="/avatar.png" className="h-24 w-24" />
            </div>
            <div>
              <Heading className="mb-1 text-center md:text-left">
                Về bản thân
              </Heading>
              <p className="text-muted-foreground text-center text-lg md:text-left">
                [[ Mình là ai? Và mình đang làm gì? ]]
              </p>
            </div>
          </div>
          <div className="mt-6 text-justify text-xl leading-relaxed">
            <p>
              Chào các bạn học sinh! Mình là{" "}
              <span className="text-primary font-medium">Đăng Minh</span>. Mình
              không phải giáo viên sư phạm Toán. Mình tốt nghiệp đại học một
              chuyên ngành hoàn toàn khác nhưng mình đam mê việc dạy và học
              Toán. Vâng, các bạn nghe không nhầm đâu. Mình thích cả việc dạy và
              học Toán. Và mình đang và sẽ tiếp tục đi học Toán.
            </p>
            <p className="mt-3">
              Mình đang giảng dạy cho một số bạn học sinh cấp THCS và cấp THPT,
              không nhiều nhưng mong muốn của mình là giúp các bạn thích Toán
              học hơn. Không chỉ là giúp các bạn xây nền kiến thức, luyện tập tư
              duy Toán mà còn cả việc cải thiện điểm số trên trường lớp. Bạn có
              điểm số cao chưa chắc là bạn đã hiểu những gì bạn đã học, nhưng
              khi bạn hiểu chúng, bạn chắc chắn sẽ có điểm số cao. Việc của mình
              đang làm là hướng dẫn các bạn học Toán sao cho đúng, và tư duy bản
              chất nhiều nhất có thể.
            </p>
            <p className="mt-3">
              Rất hy vọng có thể gặp các bạn tại lớp học của mình!
            </p>
          </div>
        </Container>
      </section>
      <Separator />

      <section className="my-12">
        <Container>
          <div className="flex flex-col items-center gap-4 md:flex-row-reverse">
            <div className="border-border text-primary grid h-24 w-24 place-items-center rounded-md border-2">
              <PiIcon className="size-16" />
            </div>
            <div>
              <Heading className="mb-1 text-center md:text-right">
                Về Pixel Mathematics
              </Heading>
              <p className="text-muted-foreground text-center text-lg md:text-right">
                [[ Đây là đâu? ]]
              </p>
            </div>
          </div>
          <div className="mt-6 text-justify text-xl leading-relaxed">
            <p className="mt-3">
              <span className="text-primary font-medium">
                Pixel Mathematics
              </span>{" "}
              là cái tên hoàn toàn mới cho lớp học mình xây dựng từ năm 2023 đến
              nay, từ khi mới chỉ có những học sinh đầu tiên. Mình chọn cái tên
              này vì mình có niềm yêu thích với Pixel Art. Mặc dù hiện tại mình
              không có nhiều thời gian dành cho việc vẽ chúng. Và có thể là vì
              nó nghe hay và không đụng hàng với hàng trăm khóa học online khác
              đang tồn tại ngoài kia.
            </p>
            <p className="mt-3">
              Mình thừa nhận mình không phải là một người quá cao siêu về Toán.
              Hiểu biết của mình có hạn và mình đang cố gắng trau dồi thêm kiến
              thức Toán học. Nhưng mình thích truyền đạt chúng cho các bạn. Các
              bạn có quyền lựa chọn bất kỳ khóa học và thầy cô nào khác. Có rất
              nhiều thầy cô giỏi hơn và nổi tiếng hơn mình. Còn nếu các bạn chọn
              mình, hy vọng chúng ta sẽ có khoảng thời gian tốt đẹp với nhau.
            </p>
          </div>
        </Container>
      </section>

      <Separator />

      <section className="my-12">
        <Container>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="border-border text-primary grid h-24 w-24 place-items-center rounded-md border-2">
              <LibraryIcon className="size-16" />
            </div>
            <div>
              <Heading className="mb-1 text-center md:text-left">
                Lợi thế của Pixel Mathematics
              </Heading>
              <p className="text-muted-foreground text-center text-lg md:text-left">
                [[ Lớp học của mình có gì vậy? ]]
              </p>
            </div>
          </div>
          <div className="mt-6 text-justify text-xl leading-relaxed">
            <p>
              Giống như các thầy cô khác, mình cũng có phương pháp và công cụ
              giảng dạy của riêng mình. Mỗi học sinh sẽ phù hợp với các phương
              pháp khác nhau, dĩ nhiên là không ai giống ai. Hy vọng lớp học của
              mình sẽ phù hợp với bạn.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {methodItems.map(({ icon: Icon, title, description }) => (
              <div className="border-border flex flex-col items-center gap-4 rounded-xl border-2 p-8">
                <div>
                  <Icon className="text-primary size-12" />
                </div>
                <div className="self-start text-center">
                  <p className="text-primary text-xl font-semibold uppercase">
                    {title}
                  </p>
                  <p className="mt-2 text-center text-lg leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <Separator />
    </>
  );
}

const methodItems = [
  {
    icon: BrainCircuitIcon,
    title: "Tư duy bản chất",
    description:
      "Mình thường giảng bài với tốc độ phù hợp hơn ở trường và bạn hoàn toàn thoải mái đưa ra các câu hỏi.",
  },
  {
    icon: PresentationIcon,
    title: "Lớp học Hydrid",
    description:
      "Lớp học bao gồm hai hình thức online và offline. Hãy đưa ra lựa chọn phù hợp với cách bạn học!",
  },
  {
    icon: UserPenIcon,
    title: "Cá nhân hóa lộ trình",
    description:
      "Bạn khá giỏi, mình giúp bạn vận dụng kiến thức. Bạn trung bình, mình giúp bạn xây nền và lấy gốc.",
  },
  {
    icon: AirVentIcon,
    title: "Cơ sở vật chất đầy đủ",
    description:
      "Phòng học có đầy đủ điều hòa, bàn ghế. Mình sử dụng máy tính và màn hình TV lớn để giảng dạy hydrid.",
  },
  {
    icon: MonitorSmartphoneIcon,
    title: "Ứng dụng học tập",
    description:
      "Ứng dụng web dành cho học sinh tải tài nguyên học tập và phụ huynh theo dõi tiến độ học tập của con em mình.",
  },
  {
    icon: GaugeIcon,
    title: "Cập nhật nhanh chóng",
    description:
      "Bài giảng và tài liệu buổi học sẽ cập nhật chậm nhất là 12 giờ kể từ lúc kết thúc buổi học.",
  },
  {
    icon: MessageCircleIcon,
    title: "Trao đổi với phụ huynh",
    description:
      "Trao đổi liên tục với phụ huynh về cách các bạn học ở lớp và ở nhà để cải thiện kết quả của các bạn.",
  },
  {
    icon: PiggyBankIcon,
    title: "Học thử miễn phí",
    description:
      "Bạn có thể học thử 2 buổi học miễn phí. Nếu không thấy hợp, bạn có thể lựa chọn giáo viên khác.",
  },
  {
    icon: HeadsetIcon,
    title: "Hỗ trợ ngoài giờ",
    description:
      "Bạn có thể đặt ra các thắc mắc về bài tập qua ứng dụng nhắn tin. Mình sẽ giải đáp chậm nhất là 6 giờ.",
  },
];
