import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div
    // max-w-screen-xl
      className={cn("mx-4 xl:px-0", className)}
    >
      {children}
    </div>
  );
};

export default Container;
