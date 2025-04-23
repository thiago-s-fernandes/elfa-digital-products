import { cn } from "@/lib/utils";

export default function Footer(): React.JSX.Element {
  return (
    <footer
      className={cn(
        "flex w-full justify-between z-[1] h-16 relative",
        "before:absolute before:top-0 before:h-[1px] before:left-0 before:transition-all before:duration-300 before:ease-in before:w-full before:bg-radial-[60%_100%_at_50%_100%] before:from-foreground/10 before:to-foreground/0",
      )}
      role="contentinfo"
    >
      <div className={cn("elfa-container flex justify-center items-center")}>
        <div className={cn("flex w-full items-center justify-center")}>
          <p className={cn("text-sm text-muted-foreground text-center")}>
            © {new Date().getFullYear()} Elfa - Digital Products. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
