import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useAppSelector } from "features/config/hooks";
import { selectGetAdminSales } from "../slices/get-admin-sales.slice";
import moment from "moment";
import { useState } from "react";
import NumberFormat from "react-number-format";

export function AdminDashboardSalesLineChart() {
  const getAdminSalesState = useAppSelector(selectGetAdminSales);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={getAdminSalesState.data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22201A" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#22201A" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="purchase_amount"
          stroke="#22201A"
          fill="url(#color)"
          fillOpacity={1}
        />

        <XAxis
          dataKey="dateadded"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = moment(str);

            return date.format("MMM D");
          }}
        />

        <YAxis
          dataKey="purchase_amount"
          axisLine={false}
          tickLine={false}
          width={80}
          padding={{ bottom: 15 }}
          tickFormatter={(number) =>
            `₱ ${new Intl.NumberFormat("en").format(number)}`
          }
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (active && label && payload) {
    return (
      <div className="p-2 bg-white tooltip">
        <h4>{moment(label).format("LL")}</h4>

        <NumberFormat
          value={payload[0].value.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      </div>
    );
  }
  return null;
}
