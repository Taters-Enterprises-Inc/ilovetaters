import {
  Column,
  Row,
  DataTable,
} from "../../../shared/presentation/components/data-table";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { SnackShopOrderModel } from "features/shop/core/domain/snackshop-order.model";
import { UserBtn } from "../components/create-user-btn";
import { GrpBtn } from "../components/create-grp-btn";

const columns: Array<Column> = [
  { id: "firstname", label: "First Name" },
  { id: "lastname", label: "Last Name" },
  { id: "email", label: "Email Address" },
  { id: "groups", label: "Groups" },
  { id: "status", label: "Status" },
  { id: "action", label: "Action" },
  { id: "store", label: "Store" },
];

const rows: Array<Row> = [];

export function AdminSettingUserTable() {
  return (
    <section className="max-h-screen rounded-md bg-paper lg:space-x-4">
      <div className="lg:space-y-6 ">
        <div className="container">
          <div className="space-y-2"></div>
          <div className="flex justify-between">
            <h1 className="pt-4 lg:-ml-12 text-secondary">
              Below is a list of the users
            </h1>
            <div className="flex lg:-mr-12">
              <UserBtn />
              <GrpBtn />
            </div>
          </div>

          <div className="pb-6 mt-4 lg:-mr-12 lg:-ml-12">
            <DataTable
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
            />
          </div>
        </div>
      </div>
    </section>
  );
}
