import { ReactNode } from "react";
import NumberFormat from "react-number-format";

export interface AdminTotalSalesCardProps {
  totalCompletedTransaction: number | undefined;
  totalPurchaseAmount: number | undefined;
  icon: ReactNode;
  title: string;
}

export function AdminTotalSalesCard(props: AdminTotalSalesCardProps) {
  return (
    <div className="bg-secondary flex space-x-3 items-center justify-start  p-4 rounded-lg shadow-2xl text-white">
      {props.icon}
      <div className="flex flex-col">
        <span className="text-xs text-gray-300">{props.title}</span>
        <span className="text-2xl font-semibold">
          <NumberFormat
            value={
              props.totalCompletedTransaction
                ? props.totalCompletedTransaction
                : 0
            }
            displayType={"text"}
            thousandSeparator={true}
          />
        </span>
        <span className="text-base font-semibold">
          <NumberFormat
            value={(props.totalPurchaseAmount
              ? props.totalPurchaseAmount
              : 0
            ).toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₱"}
          />
        </span>
      </div>
    </div>
  );
}
