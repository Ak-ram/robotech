import { cn } from "@/lib/utils";

type Props = {
  amount: number;
  className?: string;
};

const FormattedPrice = ({ amount, className }: Props) => {
  const formattedAmount = new Number(amount).toLocaleString("en", {
    style: "currency",
    currency: "EGP",
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    useGrouping: true,
  });
  return (
    <span className={cn("", className)}>
      {formattedAmount}
    </span>
  );
};

export default FormattedPrice;
