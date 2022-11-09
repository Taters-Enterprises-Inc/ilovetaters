import { Tab } from "features/shared/presentation/components";
import { BSC_TERMS_AND_POLICY_TABS } from "features/shared/constants";
import { Link } from "react-router-dom";

import { IoMdClose } from "react-icons/io";

import useMediaQuery from "@mui/material/useMediaQuery";


export function ReturnPolicyModal() {


  return (
    <>
      <div
        style={{ display: "flex" }}
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm no-scrollbar no-scrollbar::-webkit-scrollbar"
      >
        <div className="md:w-[70%] w-[80%] bg-paper sm:h-[500px] h-[700px] mt-[3%] mb-[3%] add-extra-margin text-secondary">
          <Tab tabs={BSC_TERMS_AND_POLICY_TABS} activeTab="bsc-return-policy">
            <Link
              className="absolute sm:text-2xl text-xl text-black lg:top-[-9%] top-[-23%] md:right-[1vw] right-[2vw]"
              to={"/bsc/sign-up"}
            >
              <IoMdClose />
            </Link>

            <div className="lg:w-[95%] w-[90%] mx-auto lg:mt-[1%] mt-[0.5%] sm:mb-[2.5%] mb-[1.75%]">
              <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] lg:text-3xl md:text-2xl text-xl">
                Return Policy
              </h1>

              <hr className="mt-2 mb-4 border-secondary" />

              <div className="space-y-4 text-secondary w-[95%] mx-auto h-[425px] overflow-y-auto terms-scroll md:text-base text-sm">
                <p>
                  {" "}
                  Strictly no refund, change, or cancellation once the order has
                  been confirmed.{" "}
                </p>
                <p>
                  {" "}
                  If due to unforeseen circumstances committed by the store and
                  customer requests for a refund, a full refund will be
                  requested by Taters and will be processed by PayMaya
                  (Third-Party Payment Portal) to his/her respective bank and a
                  cancellation form will be given to the customer as a proof of
                  order cancellation.
                </p>
                <p>
                  {" "}
                  Customers can return a product if the store mistakenly
                  delivers a wrong order. Proof of order should be
                  presented/sent to Taters official accounts. Request for
                  product change is only valid 24 hours after purchasing.
                </p>
                <p className="mt-0">
                  <strong>
                    {" "}
                    For any inquiry regarding this return policy, please contact
                    us at:{" "}
                  </strong>
                </p>
                <p className="mt-0">Taters Snack Shop</p>
                <p className="mt-0">
                  Contact No: (+63) 949-889-9558 from Monday to Friday (9:30AM
                  to 7:30PM)
                </p>{" "}
              </div>
            </div>
          </Tab>
        </div>
      </div>
    </>
  );
}
