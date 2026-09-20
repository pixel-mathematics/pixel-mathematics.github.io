import { Fragment } from "react/jsx-runtime";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "../ui/button";

interface ReusableBreadcrumbProps {
  items: { href?: string; label: string }[];
}

export function ReusableBreadcrumb({ items }: ReusableBreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <BreadcrumbRoot className="hidden md:flex">
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
      {items.at(-2)?.href && (
        <Link href={items.at(-2)?.href ?? "#"} className="flex md:hidden">
          <Button variant="link" className="px-0 font-medium hover:no-underline">
            <ChevronLeftIcon /> {items.at(-1)?.label}
          </Button>
        </Link>
      )}
    </>
  );
}
