import { cn } from "@/lib/utils";
import Link from "next/link";
import Container from "@/components/layout/container";

export default function NotFound(): React.JSX.Element {
  return (
    <Container as="main">
      <div
        className={cn(
          "w-full flex flex-col items-center gap-8 justify-center py-2"
        )}
      >
        <span
          className={cn("text-6xl font-bold text-foreground", "lg:text-9xl")}
        >
          404
        </span>
        <h2
          className={cn(
            "text-2xl font-bold text-center text-muted-foreground",
            "lg:text-4xl"
          )}
        >
          Oops! A página que você procura não existe.
        </h2>
        <Link
          href="/"
          title="Voltar para a página inicial"
          className={cn(
            "flex gap-2 h-10 items-center justify-center px-4 bg-foreground rounded-md text-base text-background font-bold transition-all ease-in duration-300 shadow-lg",
            "hover:bg-foreground/80",
            "active:bg-foreground/80"
          )}
        >
          Página Inicial
        </Link>
      </div>
    </Container>
  );
}
