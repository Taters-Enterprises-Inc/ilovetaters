import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import {
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiOutlineCloudUpload,
  AiOutlineCreditCard,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FaFileContract } from "react-icons/fa";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import {
  getCateringOrders,
  selectGetCateringOrders,
} from "../slices/get-catering-orders.slice";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useDropzone } from "react-dropzone";
import {
  cateringUploadProofOfPayment,
  selectCateringUploadProofOfPayment,
} from "../slices/catering-upload-proof-of-payment.slice";

export function CateringOrder() {
  const dispatch = useAppDispatch();

  const getCateringOrdersState = useAppSelector(selectGetCateringOrders);
  const cateringUploadProofOfPaymentState = useAppSelector(
    selectCateringUploadProofOfPayment
  );

  const { hash } = useParams();
  const [images, setImages] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>([]);

  useEffect(() => {
    if (hash !== undefined) {
      dispatch(getCateringOrders({ hash }));
    }
  }, [cateringUploadProofOfPaymentState, dispatch, hash]);

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleProofOfPayment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uploadedFile) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      formData.append("uploaded_file", uploadedFile);
      dispatch(cateringUploadProofOfPayment({ formData }));
    }
  };

  const getStatus = (
    status: number | undefined,
    payops: number | undefined
  ) => {
    switch (status) {
      case 0:
        return (
          <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">
            Incomplete Transaction
          </span>
        );
      case 4:
        return (
          <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">
            Order Placed In System
          </span>
        );
      case 5:
        return (
          <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">
            Initial Payment under Verification
          </span>
        );
      case 6:
        return (
          <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">
            Initial Payment Verified
          </span>
        );
      case 7:
        return (
          <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">
            Final Payment under Verification
          </span>
        );
      case 8:
        return (
          <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">
            Final Payment Verified
          </span>
        );
      case 22:
        return (
          <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">
            Initial Payment Verified Denied
          </span>
        );
      case 23:
        return (
          <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">
            Final Payment Verified Denied
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">
            Error Transaction
          </span>
        );
    }
  };

  const calculateSubTotalPrice = () => {
    let calculatedPrice = 0;
    const orders = getCateringOrdersState.data?.order.order_details;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += parseInt(orders[i].calc_price);
      }
      return (
        <NumberFormat
          value={calculatedPrice.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    } else {
      return <>₱0.00</>;
    }
  };

  return (
    <>
      <PageTitleAndBreadCrumbs
        home={{
          title: "Catering",
          url: "/shop",
        }}
        className="lg:h-[200px]"
        title="Order View"
        pageTitles={[
          { name: "Products", url: "/shop/products" },
          { name: "Order View" },
        ]}
      />

      <div className="flex lg:hidden">
        <div className="flex-1">
          <div className="bg-green-700 h-[0.25rem] relative">
            <div className="absolute rounded-[50%] text-white bg-green-700 font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
              1
            </div>
          </div>
          <div className="flex items-center justify-center pl-4 mt-5 space-x-1 text-xs text-secondary lg:pl-0">
            <BiUserCircle className="hidden text-2xl sm:block" />{" "}
            <span>Your Details</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-green-700 h-[0.25rem] relative">
            <div className="absolute rounded-[50%] font-bold bg-green-700 text-white h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
              2
            </div>
          </div>
          <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-secondary ">
            <FaFileContract className="hidden text-2xl sm:block" />{" "}
            <span>Contract</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-green-700 h-[0.25rem] relative">
            <div className="absolute rounded-[50%] font-bold bg-green-700 text-white h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
              3
            </div>
          </div>
          <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-secondary ">
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
          <div className="flex items-center justify-center pr-4 mt-5 space-x-1 text-xs text-secondary lg:pr-0">
            <AiOutlineCheckCircle className="hidden text-2xl sm:block" />{" "}
            <span>Checkout Complete</span>
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
                  <div className="flex items-center justify-center pl-4 mt-5 space-x-1 text-xs text-white lg:pl-0">
                    <BiUserCircle className="hidden text-2xl sm:block" />{" "}
                    <span>Your Details</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="bg-green-700 h-[0.25rem] relative">
                    <div className="absolute rounded-[50%] font-bold bg-green-700 text-white h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                      2
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-white">
                    <FaFileContract className="hidden text-2xl sm:block" />{" "}
                    <span>Contract</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="bg-green-700 h-[0.25rem] relative">
                    <div className="absolute rounded-[50%] font-bold bg-green-700 text-white h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
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
                    <span>Checkout Complete</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-4">
                <div className="flex-1 space-y-2 text-secondary">
                  <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">
                    From:{" "}
                  </h2>
                  <h3 className="text-xs font-semibold">
                    {getCateringOrdersState.data?.order.clients_info.store_name}
                  </h3>
                  <h3 className="text-xs">
                    {
                      getCateringOrdersState.data?.order.clients_info
                        .store_address
                    }
                  </h3>
                  <div className="text-xs">
                    <strong>Contact #</strong>{" "}
                    {
                      getCateringOrdersState.data?.order.personnel
                        .contact_number
                    }
                  </div>
                  <div className="text-xs">
                    <strong>Email :</strong>{" "}
                    {
                      getCateringOrdersState.data?.order.clients_info
                        .store_email
                    }
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-secondary">
                  <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">
                    Deliver To Address:{" "}
                  </h2>
                  <h3 className="text-xs font-semibold">
                    {getCateringOrdersState.data?.firstname +
                      " " +
                      getCateringOrdersState.data?.lastname}
                  </h3>
                  <div className="text-xs">
                    <strong>Address:</strong>{" "}
                    {getCateringOrdersState.data?.order.clients_info.address}
                  </div>
                  <div className="text-xs">
                    <strong>Email: </strong>{" "}
                    {getCateringOrdersState.data?.order.clients_info.email}
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-secondary">
                  <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">
                    Tracking Information
                  </h2>
                  <div className="text-xs">
                    <strong>Tracking Number:</strong>{" "}
                    {
                      getCateringOrdersState.data?.order.clients_info
                        .tracking_no
                    }
                  </div>
                  <div className="space-x-2 text-xs">
                    <strong>Status:</strong>{" "}
                    {getStatus(
                      getCateringOrdersState.data?.order.clients_info.status,
                      getCateringOrdersState.data?.order.clients_info.payops
                    )}
                  </div>
                  <div className="text-xs">
                    <strong>Mode of handling:</strong> Delivery
                  </div>
                  <div className="text-xs">
                    <strong>Gift Card Number:</strong> 0
                  </div>
                </div>
              </div>
              <div className="text-secondary">
                <h2 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-2xl mb-2">
                  Orders
                </h2>

                <hr className="mt-1 mb-4 border-secondary" />

                <div className="space-y-6">
                  {getCateringOrdersState.data?.order.order_details.map(
                    (order, index) => (
                      <div
                        key={index}
                        className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px]"
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
                          <h3 className="flex items-end justify-end flex-1 text-base">
                            <NumberFormat
                              value={parseInt(order.calc_price).toFixed(2)}
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
                    {getCateringOrdersState.data?.order.clients_info.add_name}
                  </h3>
                  <h3 className="text-sm">
                    {
                      getCateringOrdersState.data?.order.clients_info
                        .add_address
                    }
                  </h3>
                  <h3 className="text-sm">
                    {
                      getCateringOrdersState.data?.order.clients_info
                        .add_contact
                    }
                  </h3>
                </div>

                <div className="text-secondary lg:flex-1">
                  <h2 className="text-2xl font-['Bebas_Neue'] tracking-[3px]">
                    Payment Options
                  </h2>

                  {getCateringOrdersState.data?.order.bank.qr_code === "" ? (
                    <>
                      <img
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/payops/payops${getCateringOrdersState.data?.order.bank.indicator}.png`}
                        alt=""
                      />

                      {getCateringOrdersState.data?.order.clients_info
                        .payops !== 3 ? (
                        <div>
                          <div>
                            <strong>Account Name:</strong>{" "}
                            {
                              getCateringOrdersState.data?.order.bank
                                .bank_account_name
                            }
                          </div>
                          <div>
                            <strong>Account #:</strong>{" "}
                            {
                              getCateringOrdersState.data?.order.bank
                                .bank_account_num
                            }
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <img
                      width="150"
                      height="150"
                      src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/qr_codes/${getCateringOrdersState.data?.order.bank.qr_code}`}
                      alt="QR CODE"
                    />
                  )}
                </div>
              </div>
            </div>

            {getCateringOrdersState.data &&
            getCateringOrdersState.data.order.order_details ? (
              <div className="space-y-4 lg:flex-[0_0_36%] w-full lg:max-w-[36%] bg-paper lg:shadow-secondary lg:shadow-md lg:rounded-[30px] py-6 lg:px-4">
                <h2 className="font-['Bebas_Neue'] text-4xl  text-secondary tracking-[3px] text-center">
                  Order Summary
                </h2>
                <div className="grid grid-cols-2 text-secondary">
                  <span>Subtotal:</span>
                  <span className="text-end">{calculateSubTotalPrice()}</span>
                  {getCateringOrdersState.data.service_fee ? (
                    <>
                      <span>10% Service Charge:</span>
                      <span className="text-end">
                        <NumberFormat
                          value={getCateringOrdersState.data.service_fee.toFixed(
                            2
                          )}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>
                    </>
                  ) : null}
                  <span>Transportation Fee:</span>
                  <span className="text-end">
                    <NumberFormat
                      value={parseInt(
                        getCateringOrdersState.data.transportation_fee
                      ).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  </span>
                  <span>Additional Hour Fee:</span>
                  <span className="text-end">
                    <NumberFormat
                      value={parseInt(
                        getCateringOrdersState.data.additional_hour_fee
                      ).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  </span>
                  <span>Night Differential Fee:</span>
                  <span className="text-end">
                    <NumberFormat
                      value={getCateringOrdersState.data.night_diff_charge.toFixed(
                        2
                      )}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  </span>
                </div>
                <hr className="mt-1 border-secondary" />

                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-4xl text-center text-secondary">
                    <NumberFormat
                      value={getCateringOrdersState.data.grand_total.toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  </h1>

                  <span className="text-lg text-center text-secondary">
                    Final Payment
                  </span>
                </div>

                <hr className="mt-1 border-secondary" />

                <div className="grid grid-cols-2 text-secondary">
                  <span className="font-bold">Payment Plan :</span>
                  <span className="font-bold uppercase text-end">
                    {
                      getCateringOrdersState.data.order.clients_info
                        .payment_plan
                    }
                  </span>

                  {getCateringOrdersState.data.order.clients_info
                    .payment_plan === "half" ? (
                    <>
                      <span
                        className={`${
                          getCateringOrdersState.data.status === 6 ||
                          getCateringOrdersState.data.status === 8
                            ? "line-through"
                            : ""
                        }`}
                      >
                        Initial Payment :
                      </span>
                      <span
                        className={`text-end uppercase ${
                          getCateringOrdersState.data.status === 6 ||
                          getCateringOrdersState.data.status === 8
                            ? "line-through"
                            : ""
                        }`}
                      >
                        <NumberFormat
                          value={(
                            getCateringOrdersState.data.grand_total / 2
                          ).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>

                      <span
                        className={`${
                          getCateringOrdersState.data.status === 8
                            ? "line-through"
                            : ""
                        }`}
                      >
                        Final Payment :
                      </span>
                      <span
                        className={`text-end uppercase ${
                          getCateringOrdersState.data.status === 8
                            ? "line-through"
                            : ""
                        }`}
                      >
                        <NumberFormat
                          value={getCateringOrdersState.data.grand_total.toFixed(
                            2
                          )}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>

                      <span>Total :</span>
                      <span className="uppercase text-end">
                        <NumberFormat
                          value={getCateringOrdersState.data.grand_total.toFixed(
                            2
                          )}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>
                    </>
                  ) : null}

                  {getCateringOrdersState.data.order.clients_info
                    .payment_plan === "full" ? (
                    <>
                      <span
                        className={`${
                          getCateringOrdersState.data.status === 8
                            ? "line-through"
                            : ""
                        }`}
                      >
                        Final Payment :
                      </span>
                      <span
                        className={`text-end uppercase ${
                          getCateringOrdersState.data.status === 8
                            ? "line-through"
                            : ""
                        }`}
                      >
                        <NumberFormat
                          value={getCateringOrdersState.data.grand_total.toFixed(
                            2
                          )}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>
                    </>
                  ) : null}
                </div>

                {getCateringOrdersState.data?.order.clients_info.status === 4 ||
                getCateringOrdersState.data?.order.clients_info.status === 6 ||
                getCateringOrdersState.data?.order.clients_info.status === 22 ||
                getCateringOrdersState.data?.order.clients_info.status ===
                  23 ? (
                  <>
                    <h2 className="font-['Bebas_Neue'] text-xl  text-white tracking-[3px] text-center">
                      {getCateringOrdersState.data?.order.clients_info.status ==
                        4 &&
                      getCateringOrdersState.data.order.clients_info
                        .payment_plan === "half"
                        ? "Upload Initial Proof of Payment"
                        : ""}
                      {getCateringOrdersState.data?.order.clients_info.status ==
                        4 &&
                      getCateringOrdersState.data.order.clients_info
                        .payment_plan === "full"
                        ? "Upload Proof of Payment"
                        : ""}

                      {getCateringOrdersState.data?.order.clients_info.status ==
                      6
                        ? "Upload Final Proof of Payment"
                        : ""}
                    </h2>

                    <form onSubmit={handleProofOfPayment}>
                      <input
                        type="text"
                        className="hidden"
                        name="tracking_no"
                        value={
                          getCateringOrdersState.data?.order.clients_info
                            .tracking_no
                        }
                        readOnly
                      />
                      <input
                        type="text"
                        className="hidden"
                        name="payment_plan"
                        value={
                          getCateringOrdersState.data?.order.clients_info
                            .payment_plan
                        }
                        readOnly
                      />

                      <input
                        type="text"
                        className="hidden"
                        name="status"
                        value={getCateringOrdersState.data?.status}
                        readOnly
                      />
                      <input
                        type="text"
                        className="hidden"
                        name="trans_id"
                        value={
                          getCateringOrdersState.data?.order.clients_info.id
                        }
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
                          className="bg-button border border-secondary w-full text-white font-['Bebas_Neue'] tracking-[2px] text-2xl py-2 rounded-b-lg mt-[-10px]"
                        >
                          Upload
                        </button>

                        <h4 className="mt-1 text-sm leading-5 text-secondary">
                          <strong>Note:</strong> Supported file types: JPG,
                          JPEG, PNG and GIF. Maximum file size is 2MB.
                        </h4>
                      </div>
                    </form>
                  </>
                ) : getCateringOrdersState.data?.order.clients_info.status ===
                  2 ? (
                  <h2 className="font-['Bebas_Neue'] text-xl flex justify-center items-center space-x-2 text-white rounded-xl bg-green-700 py-2 tracking-[3px] text-center">
                    <AiFillCheckCircle className="text-2xl" />
                    <span>Proof of Payment Uploaded</span>
                  </h2>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
