import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Header(): React.JSX.Element {
  return (
    <header
      className={cn(
        "flex w-full z-[1] h-16 sticky top-0 bg-background",
        "after:absolute after:bottom-0 after:h-[1px] after:left-0 after:transition-all after:duration-300 after:ease-in after:w-full after:bg-radial-[60%_100%_at_50%_100%] after:from-foreground/10 after:to-foreground/0"
      )}
      role="banner"
    >
      <div className={cn("elfa-container flex justify-between items-center")}>
        <div className={cn("flex")}>
          <Link className={cn("flex")} href={"/"} title="Grupo Elfa Logo">
            <Image
              src="/components/header/elfa-logo.svg"
              width={89}
              height={36}
              alt="Logo Elfa"
              loading="eager"
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
