import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image"; // Import the Image component
import ShortLogo from '@/assets/ShortLogo.png';
import DetailedLogo from '@/assets/DetailedLogo.png';

interface Props {
  className?: string;
  spanClassName?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Link href="/" className={cn(
      "text-zinc-950 text-xl underline underline-offset-4 decoration-[1px] group",
      className
    )}>
      <Image className="lg:hidden" src={ShortLogo} alt="ShortLogo" width={70} height={50} />
      <Image className="hidden lg:inline-block" src={DetailedLogo} alt="DetailedLogo" width={150} height={50} />
    </Link>
  );
};

export default Logo;
