import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import {
  getCateringOrders,
  selectGetCateringOrders,
} from "../slices/get-catering-orders.slice";
import { CateringContractViewer } from "./catering-contract-viewer";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { uploadContract } from "../slices/upload-contract.slice";
import { FaFileContract } from "react-icons/fa";

export function CateringSignedContractIsOnVerification() {
  const dispatch = useAppDispatch();
  const { hash } = useParams();
  const getCateringOrdersState = useAppSelector(selectGetCateringOrders);
  const [uploadedFile, setUploadedFile] = useState<any>([]);
  const [contract, setContract] = useState<{ id: number; name: string }>();

  const onDrop = useCallback((acceptedFiles: any) => {
    setUploadedFile(acceptedFiles[0]);

    acceptedFiles.map((file: any, index: any) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setContract({ id: index, name: file.name });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  useEffect(() => {
    if (hash !== undefined) {
      dispatch(getCateringOrders({ hash }));
    }
  }, [dispatch, hash]);

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

  const handleContract = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uploadedFile) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      formData.append("uploaded_file", uploadedFile);
      dispatch(uploadContract({ formData }));
    }
  };

  return (
    <div className="container flex flex-col justify-between space-y-4 lg:flex-row lg:py-16 ">
      <div className="lg:flex-[0_0_57%] lg:max-w-[57%] order-2 lg:order-1 lg:mt-0 mt-4">
        <div
          className="hidden px-4 py-3 mb-4 text-orange-900 bg-orange-100 border-t-4 border-orange-500 rounded-b shadow-md lg:block"
          role="alert"
        >
          <div className="relative flex">
            <div className="py-1">
              <svg
                className="w-6 h-6 mr-4 text-orange-500 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="m-0 font-bold">
                Signed contract is on verification
              </p>
              <p className="text-xs">
                We are verifying your signed contract, kindly expect a call from
                one of our friendly Taters representatives within 48 hours to
                assist you in finalizing your order.
              </p>
            </div>
          </div>
        </div>
        <CateringContractViewer />
      </div>
      {getCateringOrdersState.data &&
      getCateringOrdersState.data.order.order_details ? (
        <div className="lg:flex-[0_0_40%] lg:max-w-[40%] order-1 space-y-4  lg:order-2">
          <div
            className="px-4 py-3 mb-4 text-orange-900 bg-orange-100 border-t-4 border-orange-500 rounded-b shadow-md lg:hidden"
            role="alert"
          >
            <div className="relative flex">
              <div className="py-1">
                <svg
                  className="w-6 h-6 mr-4 text-orange-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="m-0 font-bold">
                  Signed contract is on verification
                </p>
                <p className="text-xs">
                  We are verifying your signed contract, kindly expect a call
                  from one of our friendly Taters representatives within 48
                  hours to assist you in finalizing your order.
                </p>
              </div>
            </div>
          </div>
          <h2 className="font-['Bebas_Neue'] text-3xl  text-secondary tracking-[3px] text-center">
            Order Summary
          </h2>

          <div className="max-h-[400px] overflow-y-auto space-y-4 px-[4px] py-[10px]">
            {getCateringOrdersState.data.order.order_details.map((order, i) => (
              <div
                key={i}
                className="flex bg-secondary shadow-md rounded-[10px]"
              >
                <img
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${order.product_image}`}
                  className="rounded-[10px] w-[92px] h-[92px]"
                  alt=""
                />
                <div className="flex flex-col flex-1 px-3 py-2 text-white">
                  <h3 className="text-sm w-[90%]">{order.name}</h3>
                  <h3 className="text-xs">
                    Quantity:{" "}
                    <span className="text-tertiary">{order.quantity}</span>
                  </h3>

                  <h3 className="text-xs">
                    Flavor: <br />
                    <span
                      className="text-tertiary"
                      dangerouslySetInnerHTML={{
                        __html: order.remarks,
                      }}
                    />
                  </h3>

                  <h3 className="flex items-end justify-end flex-1 text-base">
                    {parseInt(order.calc_price) > 0 ? (
                      <NumberFormat
                        value={parseInt(order.calc_price).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    ) : (
                      <span className="font-bold text-tertiary">FREE</span>
                    )}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <hr className="mt-1 mb-2" />
          <div className="grid grid-cols-2 text-secondary">
            <span>Subtotal:</span>
            <span className="text-end">{calculateSubTotalPrice()}</span>
            {getCateringOrdersState.data.service_fee ? (
              <>
                <span>10% Service Charge:</span>
                <span className="text-end">
                  <NumberFormat
                    value={getCateringOrdersState.data.service_fee.toFixed(2)}
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
                value={getCateringOrdersState.data.night_diff_charge.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </span>
          </div>

          <h1 className="text-4xl text-center text-secondary">
            <NumberFormat
              value={getCateringOrdersState.data.grand_total.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₱"}
            />
          </h1>

          <div className="flex items-center justify-center pt-4">
            <a
              href={`${REACT_APP_DOMAIN_URL}api/download/contract/${hash}`}
              className="flex items-center justify-center px-4 py-2 space-x-2 text-lg text-white border rounded-md border-secondary bg-button"
            >
              <FiDownload className="text-2xl" />{" "}
              <span className="text-base font-bold">
                Download and Review Contract
              </span>
            </a>
          </div>

          <div className="pt-4">
            <h2 className="font-['Bebas_Neue'] text-xl lg:text-3xl  text-secondary tracking-[3px] text-center mb-4">
              Upload Signed Contract
            </h2>

            <form onSubmit={handleContract}>
              <input
                type="text"
                className="hidden"
                name="hash_key"
                value={hash}
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
                      {contract ? (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <FaFileContract className="text-6xl text-secondary" />
                          <span className="text-sm text-white truncate w-36">
                            {contract.name}
                          </span>
                        </div>
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
                  Re-upload Contract
                </button>

                <h4 className="mt-1 text-sm leading-5 text-secondary">
                  <strong>Note:</strong> Supported file types: JPG, JPEG, PNG
                  and GIF. Maximum file size is 2MB.
                </h4>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
