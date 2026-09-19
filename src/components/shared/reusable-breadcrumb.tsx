import { Fragment } from "react/jsx-runtime";
import Link from "next/link";

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ReusableBreadcrumbProps {
  items: { href?: string; label: string }[];
}

export function ReusableBreadcrumb({ items }: ReusableBreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <BreadcrumbRoot>
      <BreadcrumbList className="text-primary gap-0.5 text-sm font-medium sm:gap-1 sm:text-base">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage className="line-clamp-1 max-w-[200px] md:max-w-none">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link href={item.href}>{item.label}</Link>} />
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}
