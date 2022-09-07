import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCreditCard } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FaFileContract } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { useLocation, useParams } from "react-router-dom";
import {
  CateringContractViewer,
  CateringSignedContractIsOnVerification,
  CateringSignedContractIsRequired,
  CateringSignedContractVerified,
  CateringWaitingForBookingConfirmation,
} from "../components";
import {
  getCateringOrders,
  selectGetCateringOrders,
} from "../slices/get-catering-orders.slice";
import { selectUploadContract } from "../slices/upload-contract.slice";

export function CateringContract() {
  const location = useLocation();
  const { hash } = useParams();

  const dispatch = useAppDispatch();
  const getCateringOrdersState = useAppSelector(selectGetCateringOrders);
  const uploadContractState = useAppSelector(selectUploadContract);

  useEffect(() => {
    if (hash !== undefined) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      dispatch(getCateringOrders({ hash }));
    }
  }, [dispatch, hash, uploadContractState]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return (
    <>
      <PageTitleAndBreadCrumbs
        home={{
          title: "Catering",
          url: "/catering",
        }}
        title="Contract"
        pageTitles={[
          { name: "Products", url: "/catering/products" },
          { name: "Contract" },
        ]}
      />

      <section className="min-h-screen pb-36">
        <div className="lg:-mt-[80px] lg:space-y-8">
          <div className="flex lg:container">
            <div className="flex-1">
              <div className="bg-white h-[0.25rem] relative">
                <div className="absolute rounded-[50%] bg-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  1
                </div>
              </div>
              <div className="flex items-center justify-center pl-4 mt-5 space-x-1 text-xs text-white lg:pl-0">
                <BiUserCircle className="hidden text-2xl sm:block" />{" "}
                <span>Your Details</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-white h-[0.25rem] relative">
                <div className="absolute rounded-[50%] font-bold bg-white h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  2
                </div>
              </div>
              <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-white">
                <FaFileContract className="hidden text-2xl sm:block" />{" "}
                <span>Contract</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#424242] h-[0.25rem] relative">
                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  3
                </div>
              </div>
              <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-white">
                <AiOutlineCreditCard className="hidden text-2xl sm:block" />{" "}
                <span>Payment</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#424242] h-[0.25rem] relative">
                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  4
                </div>
              </div>
              <div className="flex items-center justify-center pr-4 mt-5 space-x-1 text-xs text-white lg:pr-0">
                <AiOutlineCheckCircle className="hidden text-2xl sm:block" />{" "}
                <span className="text-center">Checkout Complete</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-16">
          {getCateringOrdersState.data?.status === 1 ? (
            <CateringWaitingForBookingConfirmation />
          ) : null}
          {getCateringOrdersState.data?.status === 2 ? (
            <CateringSignedContractIsRequired />
          ) : null}
          {getCateringOrdersState.data?.status === 3 ? (
            <CateringSignedContractIsOnVerification />
          ) : null}
          {getCateringOrdersState.data?.status === 4 ? (
            <CateringSignedContractVerified />
          ) : null}
        </div>
      </section>
    </>
  );
}
