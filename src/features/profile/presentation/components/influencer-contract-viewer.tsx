import { useAppDispatch } from "features/config/hooks";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import { InfluencerContractTermsAndConditions } from "./influencer-contract-terms-and-conditions";

export function InfluencerContractViewer() {
  let { hash } = useParams();
  const dispatch = useAppDispatch();

  return (
    <>
      <section className="p-4 overflow-x-auto bg-white rounded-lg">
        <div
          id="contract_paper"
          className="!w-[1000px] lg:!w-full"
          style={{ marginBottom: 10 }}
        >
          <div id="title_wrapper" style={{ marginBottom: 20 }}>
            <img
              src={require("assets/contract_logo.png")}
              width="250"
              alt="Taters Contract Logo"
            />
            <br />
            <span style={{ fontSize: 20 }}>Operated by: SM Manila</span>
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
              <td colSpan={3}>Taters</td>
            </tr>
            <tr>
              <td>Contact Person:</td>
              <td>Eco Villaraza</td>
              <td>Contact Number:</td>
              <td>09084741500</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>test@test.com</td>
              <td>Tracking Number:</td>
              <td>#1FscWE34</td>
            </tr>
            <tr>
              <td>Venue:</td>
              <td colSpan={3}>Tondo Manila</td>
            </tr>
            <tr>
              <td>Type of function:</td>
              <td>Company</td>
              <td>No. of Pax:</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Date of Event:</td>
              <td>March 23, 2023</td>
              <td>Event Time:</td>
              <td>March 23, 2023</td>
            </tr>
            <tr>
              <td rowSpan={2}>Special Arrangements:</td>
              <td rowSpan={2}>Message</td>
              <td>Serving Time:</td>
              <td>10:00 PM</td>
            </tr>
            <tr>
              <td>Payment Terms:</td>
              <td>Full Payment</td>
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
              <td style={{ fontWeight: "bold", textAlign: "center" }}>Price</td>
              <td style={{ fontWeight: "bold", textAlign: "center" }}>
                Total Cost
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "red",
                }}
              >
                1
              </td>
              <td style={{ fontWeight: "bold", textAlign: "center" }}>
                Package
              </td>
              <td style={{ textAlign: "right" }}>
                <NumberFormat
                  value={0.0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </td>
              <td style={{ textAlign: "right" }}>
                <NumberFormat
                  value={0.0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </td>
            </tr>
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
            <tr>
              <td
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                1
              </td>
              <td
                style={{
                  textAlign: "center",
                  color: "rgb(0, 110, 255)",
                }}
              >
                Flavor
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
                <NumberFormat
                  value={0.0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </td>
            </tr>
            .discount_percentage ? (
            <tr>
              <td></td>
              <td></td>
              <td>0 % PWD Discount :</td>
              <td style={{ textAlign: "right" }}>
                <NumberFormat
                  value={0.0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>10% Service Charge:</td>
              <td style={{ textAlign: "right" }}>
                <NumberFormat
                  value={0.0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
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
                <NumberFormat
                  value={0.0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Additional Hour Fee:</td>
              <td></td>
              <td style={{ textAlign: "right" }}>
                <NumberFormat
                  value={0.0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Night Differential Fee:</td>
              <td></td>
              <td style={{ textAlign: "right" }}>
                <NumberFormat
                  value={0.0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Cash On Delivery Charge:</td>
              <td></td>
              <td style={{ textAlign: "right" }}>
                <NumberFormat
                  value={0.0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
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
                <NumberFormat
                  value={0.0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
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

      <div className="mb-6 page_break"></div>
      <InfluencerContractTermsAndConditions />
    </>
  );
}
