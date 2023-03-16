import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiOutlineCloudUpload,
  AiOutlineCreditCard,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  getDealOrder,
  selectGetDealOrder,
} from "../slices/get-deal-order.slice";
import NumberFormat from "react-number-format";
import { useDropzone } from "react-dropzone";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import {
  selectUploadProofOfPayment,
  uploadProofOfPayment,
} from "features/shared/presentation/slices/upload-proof-of-payment.slice";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { getLatestUnexpiredRedeem } from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ADMIN_POPCLUB_REDEEM_STATUS } from "features/shared/constants";

export function PopclubOrder() {
  const getDealOrderState = useAppSelector(selectGetDealOrder);
  const uploadProofOfPaymentState = useAppSelector(selectUploadProofOfPayment);

  const [images, setImages] = useState<any>();
  const dispatch = useAppDispatch();
  let { hash } = useParams();
  const [uploadedFile, setUploadedFile] = useState<any>([]);
  const location = useLocation();

  const onDrop = useCallback((acceptedFiles: any) => {
    setUploadedFile(acceptedFiles[0]);

    acceptedFiles.map((file: any, index: any) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setImages({ id: index, src: e.target.result });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    dispatch(getLatestUnexpiredRedeem());
    dispatch(getSession());
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  useEffect(() => {
    if (hash !== undefined) {
      dispatch(getDealOrder(hash));
    }
  }, [uploadProofOfPaymentState, dispatch, hash]);

  const handleProofOfPayment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uploadedFile) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      formData.append("uploaded_file", uploadedFile);
      dispatch(uploadProofOfPayment({ formData }));
    }
  };

  return (
    <main className="bg-paper">
      <PageTitleAndBreadCrumbs
        home={{
          title: "Poplcub",
          url: "/popclub",
        }}
        title="Oder View"
        className="lg:h-[200px]"
        pageTitles={[
          { name: "Products", url: "/delivery/products" },
          { name: "Order View" },
        ]}
      />

      <div className="flex lg:hidden">
        <div className="flex-1">
          <div className="bg-green-700 h-[0.25rem] relative">
            <div className="absolute rounded-[50%] bg-green-700 text-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
              1
            </div>
          </div>
          <div className="flex items-center justify-center pl-4 mt-5 space-x-1 text-xs text-secondary lg:pl-0">
            <BiUserCircle className="text-2xl" /> <span>Your Details</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-green-700 h-[0.25rem] relative">
            <div className="absolute rounded-[50%] text-white font-bold bg-green-700  h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
              2
            </div>
          </div>
          <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-secondary">
            <AiOutlineCreditCard className="text-2xl" /> <span>Payment</span>
          </div>
        </div>

        <div className="flex-1">
          <div
            className={`${
              getDealOrderState.data?.deals_redeems.status === 6
                ? "bg-green-700"
                : "bg-[#424242]"
            } h-[0.25rem] relative`}
          >
            <div
              className={`absolute text-white rounded-[50%]  font-bold ${
                getDealOrderState.data?.deals_redeems.status === 6
                  ? "bg-green-700"
                  : "bg-[#424242]"
              }  h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]`}
            >
              3
            </div>
          </div>
          <div className="flex items-center justify-center pr-4 mt-5 space-x-1 text-xs text-secondary lg:pr-0">
            <AiOutlineCheckCircle className="text-2xl" /> <span>Complete</span>
          </div>
        </div>
      </div>

      <section className="container min-h-screen lg:space-x-4 pb-36">
        <div className="lg:mt-[-80px]">
          <div className="flex flex-col items-start justify-between lg:flex-row">
            <div className="space-y-8 lg:flex-[0_0_60%] lg:max-w-[60%]">
              <div className="hidden pb-8 lg:flex">
                <div className="flex-1">
                  <div className="bg-green-700 h-[0.25rem] relative">
                    <div className="absolute rounded-[50%] bg-green-700 text-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                      1
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-white">
                    <BiUserCircle className="text-2xl" />{" "}
                    <span>Your Details</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="bg-green-700 h-[0.25rem] relative">
                    <div className="absolute rounded-[50%] text-white font-bold bg-green-700 h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                      2
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-white">
                    <AiOutlineCreditCard className="text-2xl" />{" "}
                    <span>Payment</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div
                    className={`${
                      getDealOrderState.data?.deals_redeems.status === 6
                        ? "bg-green-700"
                        : "bg-[#424242]"
                    } h-[0.25rem] relative`}
                  >
                    <div
                      className={`absolute rounded-[50%] font-bold text-white ${
                        getDealOrderState.data?.deals_redeems.status === 6
                          ? "bg-green-700"
                          : "bg-[#424242]"
                      } h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]`}
                    >
                      3
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-white">
                    <AiOutlineCheckCircle className="text-2xl" />{" "}
                    <span>Complete</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-4">
                <div className="flex-1 space-y-2 text-secondary">
                  <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">
                    From:{" "}
                  </h2>
                  <h3 className="text-xs font-semibold">
                    {getDealOrderState.data?.clients_info.store_name}
                  </h3>
                  <h3 className="text-xs">
                    {getDealOrderState.data?.clients_info.store_address}
                  </h3>
                  <div className="text-xs">
                    <strong>Contact #</strong>{" "}
                    {getDealOrderState.data?.clients_info.store_contact_number}
                  </div>
                  <div className="text-xs">
                    <strong>Email :</strong>{" "}
                    {getDealOrderState.data?.clients_info.store_email}
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-secondary">
                  <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">
                    Redeem Information
                  </h2>
                  <div className="text-xs">
                    <strong>Redeem Code:</strong>{" "}
                    {getDealOrderState.data?.deals_redeems.redeem_code}
                  </div>

                  {getDealOrderState.data ? (
                    <div className="space-x-2 text-xs">
                      <strong>Status:</strong>{" "}
                      <span
                        style={{
                          backgroundColor:
                            ADMIN_POPCLUB_REDEEM_STATUS[
                              getDealOrderState.data.deals_redeems.status
                            ].color,
                        }}
                        className="rounded-full text-white px-2 py-1 text-[10px]"
                      >
                        {
                          ADMIN_POPCLUB_REDEEM_STATUS[
                            getDealOrderState.data.deals_redeems.status
                          ].name
                        }
                      </span>
                    </div>
                  ) : null}

                  <div className="text-xs">
                    <strong>Mode of handling:</strong> Store Visit
                  </div>
                </div>
              </div>
              <div className="text-secondary">
                <h2 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-2xl mb-2">
                  DealOrder
                </h2>

                <hr className="mt-1 mb-4 border-secondary" />

                <div className="space-y-6">
                  {getDealOrderState.data?.deal_order_items.map(
                    (deal, index) => (
                      <div
                        key={index}
                        className="flex bg-secondary shadow-md rounded-[10px]"
                      >
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${deal.product_image}`}
                          className="rounded-[10px] w-[92px] h-[92px]"
                          alt={deal.name}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                          }}
                        />
                        <div className="flex flex-col flex-1 px-3 py-2 text-white">
                          <h3 className="text-sm">{deal.name}</h3>
                          <h3 className="text-xs">
                            Quantity:{" "}
                            <span className="text-tertiary">
                              {deal.quantity}
                            </span>
                          </h3>
                          {deal.deal_item_with_flavor ? (
                            <h3 className="text-xs">
                              Flavor: <br />
                              <span
                                className="text-tertiary"
                                dangerouslySetInnerHTML={{
                                  __html: deal.deal_item_with_flavor,
                                }}
                              />
                            </h3>
                          ) : null}
                          <h3 className="flex items-end justify-end flex-1 text-base">
                            <NumberFormat
                              value={Number(deal.price).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₱"}
                            />
                          </h3>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:flex-[0_0_36%] w-full lg:max-w-[36%]  py-6 lg:px-4">
              <div className="space-y-4 lg:flex-w-full lg:max-w bg-paper lg:shadow-secondary lg:shadow-md lg:rounded-[30px] py-6 lg:px-4">
                <h2 className="font-['Bebas_Neue'] text-4xl text-secondary tracking-[3px] text-center">
                  Order Summary
                </h2>

                <div className="grid grid-cols-2 text-secondary">
                  <span>Subtotal:</span>
                  <span className="text-end">
                    <NumberFormat
                      value={
                        getDealOrderState.data?.deals_redeems.purchase_amount
                          ? parseInt(
                              getDealOrderState.data.deals_redeems
                                .purchase_amount
                            ).toFixed(2)
                          : 0.0
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  </span>
                </div>

                <hr className="mt-1 border-secondary" />

                <h1 className="text-3xl text-center text-secondary">
                  <NumberFormat
                    value={
                      getDealOrderState.data?.deals_redeems.purchase_amount
                        ? parseInt(
                            getDealOrderState.data.deals_redeems.purchase_amount
                          ).toFixed(2)
                        : 0.0
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                  />
                </h1>
              </div>
              <div className="flex justify-center py-6 space-y-4 lg:flex-w-full lg:max-w lg:px-4 ">
                <Link
                  to={`/survey?service=POPCLUB-STORE-VISIT&hash=${getDealOrderState.data?.clients_info.hash_key}`}
                  className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg`}
                >
                  <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                    RATE US
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
