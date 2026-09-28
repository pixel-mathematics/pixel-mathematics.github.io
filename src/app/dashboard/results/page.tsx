import { getCurrentUser } from "@/data/auth/queries";
import { getStudentResults } from "@/data/results/queries";

import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { Hero } from "@/components/shared/hero";
import { ReusableBreadcrumb } from "@/components/shared/reusable-breadcrumb";

import { ResultItem } from "./_components/result-item";

export default async function DashboardResultsPage() {
  const currentUser = (await getCurrentUser())!;
  const resultsBySubject = await getStudentResults(currentUser.id);

  return (
    <>
      <section className="w-full overflow-hidden">
        <Hero
          text="Kết quả"
          highlightText="học tập"
          quote={`"The more I learn, the less I realize I know"`}
        />
      </section>
      <Container className="mt-6 flex flex-col gap-6">
        <ReusableBreadcrumb items={[{ href: "/dashboard", label: "Góc học tập" }]} />
        <Separator />
        <section>
          <div className="grid grid-cols-1 gap-12">
            {resultsBySubject.map((subject) => (
              <div key={subject.id}>
                <Heading>Kết quả môn {subject.title}</Heading>
                <div className="grid grid-cols-1 gap-2">
                  {subject.results.map((result) => (
                    <ResultItem key={result.id} result={result} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
