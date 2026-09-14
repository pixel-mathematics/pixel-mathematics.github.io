import { Link, useLoaderData } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CurrentUser } from "./current-user";

export function Nav() {
  const { profile } = useLoaderData({ from: "/dashboard" });

  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <Link to="/dashboard">
            <Button variant="ghost" size="lg">
              Bảng điều khiển
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/schedule">
            <Button variant="ghost" size="lg">
              Lịch học
            </Button>
          </Link>
        </li>
        <li>
          <CurrentUser profile={profile} />
        </li>
      </ul>
    </nav>
  );
}
