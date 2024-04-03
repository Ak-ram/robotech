import { cn } from "@/lib/utils";

type Props = {
  amount: number;
  className?: string;
};

const FormattedPrice = ({ amount, className }: Props) => {
  const formattedAmount = new Number(amount).toLocaleString("ar-EG", {
    style: "currency",
    currencyDisplay: "symbol",
    currency: "EGP",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    useGrouping: true,
  });
  return (
    <span className={cn("", className)} style={{ direction: "ltr" }}>
      {formattedAmount}
    </span>
  );
};

export default FormattedPrice;
