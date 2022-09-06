import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getCateringOrders,
  selectGetCateringOrders,
} from "../slices/get-catering-orders.slice";

export function CateringContractViewer() {
  let { hash } = useParams();
  const dispatch = useAppDispatch();
  const getCateringOrdersState = useAppSelector(selectGetCateringOrders);

  useEffect(() => {
    if (hash !== undefined) {
      dispatch(getCateringOrders({ hash }));
    }
  }, [dispatch, hash]);

  return (
    <>
      {getCateringOrdersState.data ? (
        <section className="p-4 bg-white rounded-lg">
          <div id="contract_paper" style={{ marginBottom: 10 }}>
            <div id="title_wrapper">
              <img
                src={require("assets/contract_logo.png")}
                width="250"
                alt="Taters Contract Logo"
              />
              <br />
              <span style={{ fontSize: 20 }}>
                Operated by:{" "}
                {getCateringOrdersState.data.order.clients_info.store_name}
              </span>
              <br />
              <h1>CATERING AND PARTY RESERVATIONS CONTRACT</h1>
            </div>
            <table style={{ width: "100%" }}>
              <tr
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <th colSpan={4}>FUNCTIONAL DETAILS</th>
              </tr>
              <tr>
                <td>Company Name:</td>
                <td colSpan={3}>
                  {getCateringOrdersState.data.order.clients_info.company_name}
                </td>
              </tr>
              <tr>
                <td>Contact Person:</td>
                <td>
                  {getCateringOrdersState.data.order.clients_info.add_name}
                </td>
                <td>Contact Number:</td>
                <td>
                  {
                    getCateringOrdersState.data.order.clients_info
                      .contact_number
                  }
                </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{getCateringOrdersState.data.order.clients_info.email}</td>
                <td>Tracking Number:</td>
                <td>
                  {getCateringOrdersState.data.order.clients_info.tracking_no}
                </td>
              </tr>
              <tr>
                <td>Venue:</td>
                <td colSpan={3}>
                  {getCateringOrdersState.data.order.clients_info.address}
                </td>
              </tr>
              <tr>
                <td>Type of function:</td>
                <td>
                  {getCateringOrdersState.data.order.clients_info.event_class}
                </td>
                <td>No. of Pax:</td>
                <td>{getCateringOrdersState.data.no_of_pax}</td>
              </tr>
              <tr>
                <td>Date of Event:</td>
                <td>{getCateringOrdersState.data.date_of_event}</td>
                <td>Event Time:</td>
                <td>{getCateringOrdersState.data.event_date_and_time}</td>
              </tr>
              <tr>
                <td rowSpan={2}>Special Arrangements:</td>
                <td rowSpan={2}>
                  {getCateringOrdersState.data.order.clients_info.message}
                </td>
                <td>Serving Time:</td>
                <td>{getCateringOrdersState.data.serving_time}</td>
              </tr>
              <tr>
                <td>Payment Terms:</td>
                <td>
                  {getCateringOrdersState.data.order.clients_info.payment_plan}
                </td>
              </tr>

              <tr
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <th colSpan={4}>PACKAGE SELECTION</th>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                  Quantity
                </td>
                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                  Food Item
                </td>
                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                  Price
                </td>
                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                  Total Cost
                </td>
              </tr>
              {/* For Loop HERE: */}
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  4
                </td>
                <td style={{ fontWeight: "bold", textAlign: "center" }}>4</td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: "DejaVu Sans; sans-serif;" }}>
                    &#8369;
                  </span>{" "}
                  20
                </td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: "DejaVu Sans; sans-serif;" }}>
                    &#8369;
                  </span>{" "}
                  20
                </td>
              </tr>

              {/* If statement here */}
              <tr>
                <td></td>
                <td
                  style={{
                    color: "rgb(0, 110, 255)",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Available Flavors:
                </td>
                <td></td>
                <td></td>
              </tr>

              {/* Another for loop here */}
              <tr>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>4</td>
                <td style={{ textAlign: "center", color: "rgb(0, 110, 255)" }}>
                  Flavor Name
                </td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
              </tr>

              <tr>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
              </tr>

              <tr>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>Package Price:</td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: "DejaVu Sans; sans-serif;" }}>
                    &#8369;
                  </span>{" "}
                  20
                </td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td>10% Service Charge:</td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: "DejaVu Sans; sans-serif;" }}>
                    &#8369;
                  </span>{" "}
                  20
                </td>
              </tr>

              <tr
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <th colSpan={4}>ADDITIONAL CHARGE</th>
              </tr>
              <tr>
                <td></td>
                <td>Transportation Fee:</td>
                <td></td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: "DejaVu Sans; sans-serif;" }}>
                    &#8369;
                  </span>{" "}
                  20
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Additional Hour Fee:</td>
                <td></td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: "DejaVu Sans; sans-serif;" }}>
                    &#8369;
                  </span>{" "}
                  20
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Night Differential Fee:</td>
                <td></td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: "DejaVu Sans; sans-serif;" }}>
                    &#8369;
                  </span>{" "}
                  20
                </td>
              </tr>

              <tr>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
                <td style={{ height: 40 }}></td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Package Total:
                </td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: "DejaVu Sans; sans-serif;" }}>
                    &#8369;
                  </span>{" "}
                  20
                </td>
              </tr>

              <tr>
                <td colSpan={4}>**Package price is inclusive of VAT</td>
              </tr>
            </table>

            <div
              style={{
                height: 15,
                backgroundColor: "black",
                margin: "0 5px 0 5px",
              }}
            ></div>
          </div>
        </section>
      ) : null}
    </>
  );
}
