import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Nav() {
  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <Link to="/">
            <Button variant="ghost" size="lg">
              Trang chủ
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <Button variant="ghost" size="lg">
              Liên hệ
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
