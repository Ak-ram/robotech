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
      "md:mr-5 text-xl underline underline-offset-4 decoration-[1px] group",
      className
    )}>
      <Image className="lg:hidden rounded-full w-16 sm:w-20" src={ShortLogo} alt="ShortLogo" width={70} height={70} />
      <Image className="hidden lg:inline-block  py-1 px-2 w-56" src={DetailedLogo} alt="DetailedLogo" width={200} height={50} />
    </Link>
  );
};

export default Logo;
