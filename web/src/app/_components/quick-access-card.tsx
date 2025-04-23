import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  configs: {
    icon: React.JSX.Element;
    title: string;
    description: string;
    link: {
      text: string;
      attrHref: string;
      attrTitle: string;
    };
  };
};

export default function QuickAccessCard({ configs }: Props): React.JSX.Element {
  const {
    icon,
    title,
    description,
    link: { text, attrHref, attrTitle },
  } = configs;

  return (
    <Card
      className={cn(
        "flex w-full py-0 border-foreground/10 rounded-md",
        "md:w-1/2"
      )}
    >
      <CardHeader
        className={cn("px-6 py-4 bg-foreground rounded-t-md gap-0 border-0")}
      >
        <CardTitle
          className={cn(
            "flex items-center gap-2 text-background text-lg font-bold",
            "lg:text-2xl"
          )}
        >
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={cn("min-h-20", "lg:text-base")}>
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className={cn("flex items-center justify-center pb-4")}>
        <Link
          href={attrHref}
          title={attrTitle}
          className={cn(
            "flex gap-2 h-10 items-center justify-center w-full px-4 bg-foreground rounded-md text-base text-background font-bold transition-all ease-in duration-300 shadow-lg",
            "hover:bg-foreground/80",
            "active:bg-foreground/80"
          )}
        >
          {text}
        </Link>
      </CardFooter>
    </Card>
  );
}
