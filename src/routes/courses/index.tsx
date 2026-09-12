import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { fetchCoursesWithSubjectsQueryOptions } from "@/queries/courses";

export const Route = createFileRoute("/courses/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.query(fetchCoursesWithSubjectsQueryOptions),
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  component: CoursesIndex,
});

function CoursesIndex() {
  const { data: courses } = useSuspenseQuery(
    fetchCoursesWithSubjectsQueryOptions
  );

  return (
    <div className="p-2">
      <pre>{JSON.stringify(courses)}</pre>
    </div>
  );
}
