import { cn } from "@/lib/utils";

type Props = {
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  as: Component = "div",
  children,
  className,
}: Props): React.JSX.Element {
  return (
    <Component
      className={cn(
        "flex justify-center min-h-[calc(100dvh-128px)] w-full",
        className
      )}
    >
      <div
        className={cn(
          "elfa-container flex flex-col items-center my-8",
          "lg:my-14"
        )}
      >
        {children}
      </div>
    </Component>
  );
}
