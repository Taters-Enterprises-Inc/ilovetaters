import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { InfluencerContractTermsAndConditions } from "./influencer-contract-terms-and-conditions";
import {
  getInfluencer,
  selectGetInfluencer,
} from "../slices/get-influencer.slice";
import { useEffect } from "react";

export function InfluencerContractViewer() {
  const dispatch = useAppDispatch();

  const getInfluencerState = useAppSelector(selectGetInfluencer);

  useEffect(() => {
    dispatch(getInfluencer());
  }, [dispatch]);

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
            <h1>INFLUENCER CONTRACT</h1>
          </div>
          <table style={{ width: "100%" }}>
            <tr
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
              }}
            >
              <th colSpan={4}>PERSONAL DETAILS</th>
            </tr>
            <tr>
              <td>Full Name:</td>
              <td colSpan={3}>
                {getInfluencerState.data?.first_name}{" "}
                {getInfluencerState.data?.middle_name}{" "}
                {getInfluencerState.data?.last_name}
              </td>
            </tr>
          </table>
        </div>
      </section>

      <div className="mb-6 page_break"></div>
      <InfluencerContractTermsAndConditions />
    </>
  );
}
