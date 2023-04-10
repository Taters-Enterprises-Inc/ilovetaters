import { ReactNode } from "react";
import NumberFormat from "react-number-format";

export interface AdminTotalSalesCardProps {
  totalCompletedTransaction: number | undefined;
  totalPurchaseAmount: number | undefined;
  icon: ReactNode;
  title: string;
  active?: boolean;
  onClick?: () => void;
}

export function AdminTotalSalesCard(props: AdminTotalSalesCardProps) {
  return (
    <div className="flex items-center cursor-pointer" onClick={props.onClick}>
      <div
        className={`bg-secondary w-full flex space-x-3 items-center justify-start p-4 ${
          props.active ? "" : "h-[80px]"
        } rounded-lg shadow-2xl text-white`}
      >
        {props.icon}
        <div className="flex flex-col">
          <span
            className={
              props.active
                ? "text-xs text-gray-300"
                : "text-[10px] text-gray-300"
            }
          >
            {props.title}
          </span>
          <span
            className={
              props.active
                ? "text-2xl font-semibold"
                : "text-base font-semibold"
            }
          >
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
          <span
            className={
              props.active ? "text-base font-semibold" : "text-xs font-semibold"
            }
          >
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
    </div>
  );
}
