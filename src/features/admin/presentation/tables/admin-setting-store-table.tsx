import {
  Column,
  Row,
  DataTable,
} from "../../../shared/presentation/components/data-table";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { SnackShopOrderModel } from "features/shop/core/domain/snackshop-order.model";
import { StoreBtn } from "../components/add-store-btn";

const columns: Array<Column> = [
  { id: "id", label: "id" },
  { id: "name", label: "Name" },
  { id: "address", label: "Address" },
  { id: "email", label: "Email Address" },
  { id: "contact", label: "Contact" },
  { id: "latitude", label: "Latitude" },
  { id: "longtitude", label: "Longtitude" },
  { id: "status", label: "Status" },
  { id: "action", label: "Action" },
];

const rows: Array<Row> = [];

export function AdminSettingStoreTable() {
  return (
    <section className="max-h-screen rounded-md lg:space-x-4 bg-paper">
      <div className="lg:space-y-6 ">
        <div className="container">
          <div className="space-y-2"></div>
          <div className="flex justify-between">
            <h1 className="pt-4 lg:-ml-12 text-secondary">List of Stores</h1>
            <div className="lg:-mr-12">
              <StoreBtn />
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
