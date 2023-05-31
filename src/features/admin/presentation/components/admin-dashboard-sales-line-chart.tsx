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
import { selectGetAdminDashboardShopSalesHistory } from "../slices/get-admin-dashboard-shop-sales-history.slice";
import moment from "moment";
import NumberFormat from "react-number-format";
import { intToShortString } from "features/config/helpers";

export function AdminDashboardSalesLineChart() {
  const getAdminDashboardShopSalesHistoryState = useAppSelector(
    selectGetAdminDashboardShopSalesHistory
  );

  return (
    <ResponsiveContainer width="100%">
      <AreaChart data={getAdminDashboardShopSalesHistoryState.data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a21013" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#a21013" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="purchase_amount"
          stroke="#a21013"
          fill="url(#color)"
          fillOpacity={1}
        />

        <XAxis
          dataKey="dateadded"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = moment(str);

            return date.format("dddd").substring(0, 3);
          }}
          style={{
            fontSize: "0.7rem",
          }}
        />

        <YAxis
          dataKey="purchase_amount"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => intToShortString(parseInt(value))}
          width={25}
          padding={{ bottom: 15 }}
          style={{
            fontSize: "0.7rem",
          }}
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
  payload?: Array<{ value: number; payload: { purchase_amount: number } }>;
  label?: string;
}) {
  if (active && label && payload) {
    return (
      <div className="p-2 bg-white tooltip">
        <span className="text-xl">
          <NumberFormat
            value={payload[0].value.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₱"}
          />
        </span>
        <h4>{moment(label).format("LL")}</h4>
      </div>
    );
  }
  return null;
}
