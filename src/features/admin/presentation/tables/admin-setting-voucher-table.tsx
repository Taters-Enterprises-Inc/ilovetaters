import {
  Column,
  Row,
  DataTable,
} from "../../../shared/presentation/components/data-table";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { SnackShopOrderModel } from "features/shop/core/domain/snackshop-order.model";
import { VoucherBtn } from "../components/add-voucher-btn";

const columns: Array<Column> = [
  { id: "name", label: "Name" },
  { id: "desc", label: "Description" },
  { id: "status", label: "Status" },
  { id: "code", label: "Code" },
  { id: "ctype", label: "Code Type" },
  { id: "otype", label: "Offer Type" },
  { id: "dtype", label: "Discount Type" },
  { id: "value", label: "Voucher Value" },
  { id: "dstart", label: "Date Start" },
  { id: "dend", label: "Date End" },
  { id: "action", label: "Action" },
];

const rows: Array<Row> = [];

export function AdminSettingVoucherTable() {
  return (
    <section className="max-h-screen rounded-md lg:space-x-4 bg-paper">
      <div className="lg:space-y-6 ">
        <div className="container">
          <div className="space-y-2"></div>
          <div className="flex justify-between">
            <h1 className="pt-4 lg:-ml-12 text-secondary">List of Vouchers</h1>
            <div className="lg:-mr-12">
              <VoucherBtn />
            </div>
          </div>

          <div className="pb-6 mt-4 lg:-mr-12 lg:-ml-12">
            {/* <DataTable
              totalRows={0}
              perPage={0}
              rowsOrder={[
                {
                  rowKey: "dateadded",
                  align: "left",
                  rowComponent: (row: SnackShopOrderModel) => (
                    <Moment format="LLL">{row.dateadded}</Moment>
                  ),
                },
                {
                  rowKey: "tracking_no",
                  align: "left",
                },
                {
                  rowKey: "purchase_amount",
                  align: "left",
                  rowComponent: (row: SnackShopOrderModel) => (
                    <NumberFormat
                      value={(
                        parseInt(row.purchase_amount) +
                        parseInt(row.distance_price) +
                        parseInt(row.cod_fee)
                      ).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  ),
                },
                {
                  rowKey: "generated_raffle_code",
                  align: "left",
                },
                {
                  rowKey: "application_status",
                  align: "left",
                },
              ]}
              columns={columns}
              rows={rows}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
