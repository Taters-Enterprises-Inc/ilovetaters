import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiOutlineCloudUpload,
  AiOutlineCreditCard,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useLocation, useParams } from "react-router-dom";
import { getOrders, selectGetOrders } from "../slices/get-orders.slice";
import NumberFormat from "react-number-format";
import { useDropzone } from "react-dropzone";

import {
  selectUploadProofOfPayment,
  uploadProofOfPayment,
} from "features/shared/presentation/slices/upload-proof-of-payment.slice";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { getLatestUnexpiredRedeem } from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";

export function ShopOrder() {
  const getOrdersState = useAppSelector(selectGetOrders);
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
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  useEffect(() => {
    if (hash !== undefined) {
      dispatch(getOrders({ hash }));
    }
  }, [uploadProofOfPaymentState, dispatch, hash]);

  const getStatus = (
    status: number | undefined,
    payops: number | undefined
  ) => {
    switch (status) {
      case 0:
        return (
          <span className="rounded-full bg-[#a21013] text-white px-2 py-1 text-[10px]">
            Incomplete Transaction
          </span>
        );
      case 1:
        return (
          <span className="rounded-full bg-[#004d00] text-white px-2 py-1 text-[10px]">
            Order Placed In System
          </span>
        );
      case 2:
        return (
          <span className="rounded-full bg-[#cca300] text-white px-2 py-1 text-[10px]">
            Payment under Verification
          </span>
        );
      case 3:
        if (payops === 3) {
          return (
            <span className="rounded-full bg-[#004d00] text-white px-2 py-1 text-[10px]">
              Order Confirmed
            </span>
          );
        } else {
          return (
            <span className="rounded-full bg-[#004d00] text-white px-2 py-1 text-[10px]">
              Payment Confirmed
            </span>
          );
        }
      case 4:
        return (
          <span className="rounded-full bg-[#a21013] text-white px-2 py-1 text-[10px]">
            Order Declined
          </span>
        );
      case 5:
        return (
          <span className="rounded-full bg-[#a21013] text-white px-2 py-1 text-[10px]">
            Order Cancelled
          </span>
        );
      case 6:
        return (
          <span className="rounded-full bg-[#004d00] text-white px-2 py-1 text-[10px]">
            Product Received by Customer
          </span>
        );
      case 7:
        return (
          <span className="rounded-full bg-[#a21013] text-white px-2 py-1 text-[10px]">
            Order Rejected due to Incorrect/Incomplete Payment
          </span>
        );
      case 8:
        return (
          <span className="rounded-full bg-[#004d00] text-white px-2 py-1 text-[10px]">
            Product currently being prepared
          </span>
        );
      case 9:
        return (
          <span className="rounded-full bg-[#004d00] text-white px-2 py-1 text-[10px]">
            Product en route to Customer
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-[#a21013] text-white px-2 py-1 text-[10px]">
            Error Transaction
          </span>
        );
    }
  };

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
          title: "Snackshop",
          url: "/delivery",
        }}
        title="Order View"
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
              getOrdersState.data?.order.clients_info.status === 6
                ? "bg-green-700"
                : "bg-[#424242]"
            } h-[0.25rem] relative`}
          >
            <div
              className={`absolute text-white rounded-[50%]  font-bold ${
                getOrdersState.data?.order.clients_info.status === 6
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
                      getOrdersState.data?.order.clients_info.status === 6
                        ? "bg-green-700"
                        : "bg-[#424242]"
                    } h-[0.25rem] relative`}
                  >
                    <div
                      className={`absolute rounded-[50%] font-bold text-white ${
                        getOrdersState.data?.order.clients_info.status === 6
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
                    {getOrdersState.data?.order.clients_info.store_name}
                  </h3>
                  <h3 className="text-xs">
                    {getOrdersState.data?.order.clients_info.store_address}
                  </h3>
                  <div className="text-xs">
                    <strong>Contact #</strong>{" "}
                    {getOrdersState.data?.order.personnel.contact_number}
                  </div>
                  <div className="text-xs">
                    <strong>Email :</strong>{" "}
                    {getOrdersState.data?.order.clients_info.store_email}
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-secondary">
                  <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">
                    Deliver To Address:{" "}
                  </h2>
                  <h3 className="text-xs font-semibold">
                    {getOrdersState.data?.order.clients_info.add_name}
                  </h3>
                  <div className="text-xs">
                    <strong>Address:</strong>{" "}
                    {getOrdersState.data?.order.clients_info.address}
                  </div>
                  <div className="text-xs">
                    <strong>Email: </strong>{" "}
                    {getOrdersState.data?.order.clients_info.email}
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-secondary">
                  <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">
                    Tracking Information
                  </h2>
                  <div className="text-xs">
                    <strong>Tracking Number:</strong>{" "}
                    {getOrdersState.data?.order.clients_info.tracking_no}
                  </div>
                  <div className="space-x-2 text-xs">
                    <strong>Status:</strong>{" "}
                    {getStatus(
                      getOrdersState.data?.order.clients_info.status,
                      getOrdersState.data?.order.clients_info.payops
                    )}
                  </div>
                  <div className="text-xs">
                    <strong>Mode of handling:</strong> Delivery
                  </div>
                </div>
              </div>
              <div className="text-secondary">
                <h2 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-2xl mb-2">
                  Orders
                </h2>

                <hr className="mt-1 mb-4 border-secondary" />

                <div className="space-y-6">
                  {getOrdersState.data?.order.order_details.map(
                    (order, index) => (
                      <div
                        key={index}
                        className="flex bg-secondary shadow-md rounded-[10px]"
                      >
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${order.product_image}`}
                          className="rounded-[10px] w-[92px] h-[92px]"
                          alt=""
                        />
                        <div className="flex flex-col flex-1 px-3 py-2 text-white">
                          <h3 className="text-sm">
                            {order.product_label} {order.name}
                          </h3>
                          <h3 className="text-xs">
                            Quantity:{" "}
                            <span className="text-tertiary">
                              {order.quantity}
                            </span>
                          </h3>
                          {order.remarks ? (
                            <h3 className="text-xs">
                              Flavor: <br />
                              <span
                                className="text-tertiary"
                                dangerouslySetInnerHTML={{
                                  __html: order.remarks,
                                }}
                              />
                            </h3>
                          ) : null}
                          {order.promo_discount_percentage ? (
                            <div>
                              <br />
                              <span className=" !text-green-400 font-bold text-sm">
                                Deal Applied:{" "}
                              </span>
                              <br />
                              <span className="text-xs leading-3 whitespace-pre-wrap">
                                {order.deal_name}
                                {order.deal_description}
                              </span>
                              <br />

                              <h3 className="flex items-end justify-end flex-1 text-sm line-through">
                                <NumberFormat
                                  value={order.calc_price.toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₱"}
                                />
                              </h3>
                              <h3 className="flex items-end justify-end flex-1 text-base">
                                <NumberFormat
                                  value={(
                                    order.calc_price -
                                    order.calc_price *
                                      parseFloat(
                                        order.promo_discount_percentage
                                      )
                                  ).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₱"}
                                />
                              </h3>
                            </div>
                          ) : (
                            <h3 className="flex items-end justify-end flex-1 text-base">
                              <NumberFormat
                                value={Number(order.calc_price).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₱"}
                              />
                            </h3>
                          )}
                        </div>
                      </div>
                    )
                  )}

                  {getOrdersState.data?.order.deals_details.map(
                    (deal, index) => (
                      <div
                        key={index}
                        className="flex bg-secondary shadow-md rounded-[10px]"
                      >
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${deal.product_image}`}
                          className="rounded-[10px] w-[92px] h-[92px]"
                          alt=""
                        />
                        <div className="flex flex-col flex-1 px-3 py-2 text-white">
                          <h3 className="text-sm">{deal.name}</h3>
                          <h3 className="text-xs">
                            Quantity:{" "}
                            <span className="text-tertiary">
                              {deal.quantity}
                            </span>
                          </h3>
                          {deal.remarks ? (
                            <h3 className="text-xs">
                              Flavor: <br />
                              <span
                                className="text-tertiary"
                                dangerouslySetInnerHTML={{
                                  __html: deal.remarks,
                                }}
                              />
                            </h3>
                          ) : null}
                          <h3 className="flex items-end justify-end flex-1 text-base">
                            <NumberFormat
                              value={deal.price.toFixed(2)}
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

              <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
                <div className="text-secondary lg:flex-1">
                  <h2 className="text-2xl font-['Bebas_Neue'] tracking-[3px]">
                    Delivery Information
                  </h2>
                  <h3 className="text-lg font-semibold">
                    {getOrdersState.data?.order.clients_info.add_name}
                  </h3>
                  <h3 className="text-sm">
                    {getOrdersState.data?.order.clients_info.add_address}
                  </h3>
                  <h3 className="text-sm">
                    {getOrdersState.data?.order.clients_info.add_contact}
                  </h3>
                </div>

                <div className="text-secondary lg:flex-1">
                  <h2 className="text-2xl font-['Bebas_Neue'] tracking-[3px]">
                    Payment Options
                  </h2>

                  {getOrdersState.data?.order.bank.qr_code === "" ? (
                    <>
                      <img
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/payops/payops${getOrdersState.data?.order.bank.indicator}.png`}
                        alt=""
                      />

                      {getOrdersState.data?.order.clients_info.payops !== 3 ? (
                        <div>
                          <div>
                            <strong>Account Name:</strong>{" "}
                            {getOrdersState.data?.order.bank.bank_account_name}
                          </div>
                          <div>
                            <strong>Account #:</strong>{" "}
                            {getOrdersState.data?.order.bank.bank_account_num}
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <img
                      width="150"
                      height="150"
                      src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/qr_codes/${getOrdersState.data?.order.bank.qr_code}`}
                      alt="QR CODE"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:flex-[0_0_36%] w-full lg:max-w-[36%] lg:shadow-secondary lg:shadow-md lg:rounded-[30px] py-6 lg:px-4">
              <h2 className="font-['Bebas_Neue'] text-4xl text-secondary tracking-[3px] text-center">
                Order Summary
              </h2>

              <div className="grid grid-cols-2 text-secondary">
                <span>Subtotal:</span>
                <span className="text-end">
                  <NumberFormat
                    value={
                      getOrdersState.data?.subtotal
                        ? parseInt(getOrdersState.data.subtotal).toFixed(2)
                        : 0.0
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                  />
                </span>
                <span>Delivery Fee:</span>
                <span className="text-end">
                  +{" "}
                  <NumberFormat
                    value={
                      getOrdersState.data?.delivery_fee
                        ? parseInt(getOrdersState.data.delivery_fee).toFixed(2)
                        : 0.0
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                  />
                </span>

                {getOrdersState.data?.cod_fee !== "0" ? (
                  <>
                    <span>Cash on Delivery charge:</span>
                    <span className="text-end">
                      +{" "}
                      <NumberFormat
                        value={
                          getOrdersState.data?.cod_fee
                            ? parseInt(getOrdersState.data.cod_fee).toFixed(2)
                            : 0.0
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </span>
                  </>
                ) : null}
              </div>

              <hr className="mt-1 border-secondary" />

              <h1 className="text-3xl text-center text-secondary">
                <NumberFormat
                  value={
                    getOrdersState.data?.grand_total
                      ? getOrdersState.data.grand_total.toFixed(2)
                      : 0.0
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </h1>

              {/* Upload proof of payment will be deprecated once the payment gate away finished */}

              {getOrdersState.data?.order.clients_info.status === 1 &&
              getOrdersState.data?.order.clients_info.payops !== 3 ? (
                <>
                  <h2 className="font-['Bebas_Neue'] text-xl text-secondary tracking-[3px] text-center">
                    Upload Proof of Payment
                  </h2>

                  <form onSubmit={handleProofOfPayment}>
                    <input
                      type="text"
                      className="hidden"
                      name="tracking_no"
                      value={
                        getOrdersState.data?.order.clients_info.tracking_no
                      }
                      readOnly
                    />
                    <input
                      type="text"
                      className="hidden"
                      name="trans_id"
                      value={getOrdersState.data?.order.clients_info.id}
                      readOnly
                    />

                    <div>
                      <div
                        {...getRootProps()}
                        className="border-dashed border-t-2 border-l-2 border-r-2 border-secondary h-[200px] rounded-lg flex justify-center items-center flex-col space-y-2"
                      >
                        <input
                          type="file"
                          name="uploaded_file"
                          {...getInputProps()}
                        />

                        {isDragActive ? (
                          <span className="text-lg text-secondary">
                            Drop the files here ...
                          </span>
                        ) : (
                          <>
                            {images ? (
                              <img
                                src={images.src}
                                className="object-contain h-[150px] w-[150px]"
                                alt="upload file"
                              />
                            ) : (
                              <>
                                <AiOutlineCloudUpload className="text-5xl text-secondary" />
                                <span className="text-lg text-secondary">
                                  Drag and drop here to upload
                                </span>
                                <button
                                  type="button"
                                  className="px-3 py-1 text-lg text-white rounded-lg bg-secondary"
                                >
                                  Or select file
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="bg-button border-2 border-secondary w-full text-white font-['Bebas_Neue'] tracking-[2px] text-2xl py-2 rounded-b-lg mt-[-10px]"
                      >
                        Upload
                      </button>

                      <h4 className="mt-1 text-sm leading-5 text-secondary">
                        <strong>Note:</strong> Supported file types: JPG, JPEG,
                        PNG and GIF. Maximum file size is 2MB.
                      </h4>
                    </div>
                  </form>
                </>
              ) : getOrdersState.data?.order.clients_info.status === 2 ? (
                <h2 className="font-['Bebas_Neue'] text-xl flex justify-center items-center space-x-2 text-white rounded-xl bg-green-700 py-2 tracking-[3px] text-center">
                  <AiFillCheckCircle className="text-2xl" />
                  <span>Proof of Payment Uploaded</span>
                </h2>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
