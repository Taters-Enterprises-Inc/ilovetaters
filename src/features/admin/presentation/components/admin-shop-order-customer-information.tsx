import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  getAdminShopOrder,
  GetAdminShopOrderState,
  selectGetAdminShopOrder,
} from "../slices/get-admin-shop-order.slice";
import {
  ADMIN_SNACKSHOP_MOP_STATUS,
  ADMIN_SNACKSHOP_ORDER_STATUS,
  ORDER_STATUS,
  REACT_APP_DOMAIN_URL,
} from "features/shared/constants";
import NumberFormat from "react-number-format";
import { AdminShopOrderCustomerInformationButtons } from "./admin-shop-order-customer-information-buttons";
import MenuItem from "@mui/material/MenuItem";
import { FormEvent, useEffect, useState } from "react";
import {
  selectUploadProofOfPaymentAdmin,
  uploadProofOfPaymentAdmin,
} from "../slices/upload-proof-of-payment-admin.slice";
import {
  selectValidateReferenceNumberAdmin,
  validateReferenceNumberAdmin,
} from "../slices/validate-reference-number.slice";
import { AdminPasswordModal } from "../modals";
import {
  adminPrivilege,
  AdminPrivilegeState,
  selectAdminPrivilege,
  resetAdminPrivilege,
} from "../slices/admin-privilege.slice";
import { MaterialInput } from "features/shared/presentation/components";
import {
  getAdminSnackshopStores,
  selectGetAdminSnackshopStores,
} from "../slices/get-admin-snackshop-stores.slice";

export function AdminShopOrderCustomerInformation() {
  const query = useQuery();
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<string>("");
  const [store, setStore] = useState<string>("");

  const [
    openAdminPasswordStoreChangeModal,
    setOpenAdminPasswordStoreChangeModal,
  ] = useState<boolean>(false);
  const [
    openAdminPasswordStatusChangeModal,
    setOpenAdminPasswordStatusChangeModal,
  ] = useState<boolean>(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");

  const trackingNo = query.get("tracking_no");

  const getAdminShopOrderState = useAppSelector(selectGetAdminShopOrder);
  const getAdminSnackshopStoresState = useAppSelector(
    selectGetAdminSnackshopStores
  );
  const uploadProofOfPaymentAdminState = useAppSelector(
    selectUploadProofOfPaymentAdmin
  );
  const validateReferenceNumberAdminState = useAppSelector(
    selectValidateReferenceNumberAdmin
  );

  const adminPrivilegeState = useAppSelector(selectAdminPrivilege);

  useEffect(() => {
    if (
      getAdminShopOrderState.status === GetAdminShopOrderState.success &&
      getAdminShopOrderState.data
    ) {
      setStatus(getAdminShopOrderState.data.status.toString());
      setStore(getAdminShopOrderState.data.store.toString());
    }
  }, [getAdminShopOrderState]);

  useEffect(() => {
    if (adminPrivilegeState.status === AdminPrivilegeState.success) {
      dispatch(resetAdminPrivilege());
      setOpenAdminPasswordStoreChangeModal(false);
      setOpenAdminPasswordStatusChangeModal(false);
    }
  }, [adminPrivilegeState, dispatch]);

  useEffect(() => {
    if (trackingNo) {
      dispatch(getAdminShopOrder(trackingNo));
    }
  }, [
    dispatch,
    trackingNo,
    uploadProofOfPaymentAdminState,
    validateReferenceNumberAdminState,
    adminPrivilegeState,
  ]);

  useEffect(() => {
    dispatch(getAdminSnackshopStores());
  }, [dispatch]);

  const calculateWithZeroIfNoValue = (value: string | null) => {
    if (value)
      return (
        <NumberFormat
          value={parseFloat(value).toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );

    return "₱0.00";
  };

  const calculateSubTotal = () => {
    let calculatedPrice = 0;

    const orders = getAdminShopOrderState.data?.items;
    const deals = getAdminShopOrderState.data?.deal_items;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const discountPercentage = order.promo_discount_percentage;
        const discount = discountPercentage
          ? parseFloat(order.price) * parseFloat(discountPercentage)
          : 0;

        let deal_products_promo_includes = order.deal_products_promo_include;

        if (deal_products_promo_includes) {
          let deal_products_promo_include_match = null;

          for (let x = 0; x < deal_products_promo_includes.length; x++) {
            const deal_products_promo_include = deal_products_promo_includes[x];

            if (
              deal_products_promo_include.product_id === order.product_id &&
              deal_products_promo_include.product_variant_option_tb_id === null
            ) {
              deal_products_promo_include_match = deal_products_promo_include;

              break;
            } else if (
              deal_products_promo_include.product_id === order.product_id &&
              deal_products_promo_include.product_variant_option_tb_id
            ) {
              deal_products_promo_include_match = deal_products_promo_include;

              break;
            }
          }

          if (deal_products_promo_include_match) {
            let addedObtainable: Array<{
              product_id: number;
              price: number;
              product_variant_option_tb_id: number;
              promo_discount_percentage: string;
            }> = [];
            let obtainableDiscountedPrice = 0;
            let obtainablePrice = 0;

            for (
              let y = 0;
              y < deal_products_promo_include_match.obtainable.length;
              y++
            ) {
              const val = deal_products_promo_include_match.obtainable[y];

              if (
                val.price &&
                val.promo_discount_percentage &&
                val.product_id === order.product_id &&
                !addedObtainable.some(
                  (value) => value.product_id === val.product_id
                )
              ) {
                obtainableDiscountedPrice +=
                  val.price -
                  val.price * parseFloat(val.promo_discount_percentage);
                obtainablePrice += val.price;

                addedObtainable.push(val);
              }
            }

            if (
              deal_products_promo_include_match.obtainable.length > 0 &&
              deal_products_promo_include_match.quantity &&
              order.quantity >=
                deal_products_promo_include_match.quantity + 1 &&
              obtainableDiscountedPrice &&
              obtainablePrice
            ) {
              calculatedPrice +=
                obtainableDiscountedPrice +
                parseFloat(order.price) -
                obtainablePrice;
            } else {
              calculatedPrice +=
                parseFloat(order.price) -
                parseFloat(order.price) *
                  parseFloat(
                    deal_products_promo_include_match.promo_discount_percentage
                  );
            }
          } else {
            calculatedPrice += parseFloat(order.price) - discount;
          }
        } else {
          calculatedPrice += parseFloat(order.price) - discount;
        }
      }
    }

    if (deals) {
      for (let i = 0; i < deals.length; i++) {
        const deal = deals[i];

        if (deal.price) {
          calculatedPrice += parseFloat(deal.price);
        }
      }
    }

    if (getAdminShopOrderState.data?.reseller_discount) {
      calculatedPrice -= parseInt(
        getAdminShopOrderState.data?.reseller_discount
      );
    }

    return (
      <NumberFormat
        value={calculatedPrice.toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₱"}
      />
    );
  };

  const calculateOrderTotal = () => {
    let calculatedPrice = 0;

    const orders = getAdminShopOrderState.data?.items;
    const deals = getAdminShopOrderState.data?.deal_items;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const discountPercentage = order.promo_discount_percentage;
        const discount = discountPercentage
          ? parseFloat(order.price) * parseFloat(discountPercentage)
          : 0;
        let deal_products_promo_includes = order.deal_products_promo_include;

        if (deal_products_promo_includes) {
          let deal_products_promo_include_match = null;

          for (let x = 0; x < deal_products_promo_includes.length; x++) {
            const deal_products_promo_include = deal_products_promo_includes[x];

            if (
              deal_products_promo_include.product_id === order.product_id &&
              deal_products_promo_include.product_variant_option_tb_id === null
            ) {
              deal_products_promo_include_match = deal_products_promo_include;

              break;
            } else if (
              deal_products_promo_include.product_id === order.product_id &&
              deal_products_promo_include.product_variant_option_tb_id
            ) {
              deal_products_promo_include_match = deal_products_promo_include;

              break;
            }
          }

          if (deal_products_promo_include_match) {
            let addedObtainable: Array<{
              product_id: number;
              price: number;
              product_variant_option_tb_id: number;
              promo_discount_percentage: string;
            }> = [];
            let obtainableDiscountedPrice = 0;
            let obtainablePrice = 0;

            for (
              let y = 0;
              y < deal_products_promo_include_match.obtainable.length;
              y++
            ) {
              const val = deal_products_promo_include_match.obtainable[y];

              if (
                val.price &&
                val.promo_discount_percentage &&
                val.product_id === order.product_id &&
                !addedObtainable.some(
                  (value) => value.product_id === val.product_id
                )
              ) {
                obtainableDiscountedPrice +=
                  val.price -
                  val.price * parseFloat(val.promo_discount_percentage);
                obtainablePrice += val.price;

                addedObtainable.push(val);
              }
            }
            if (
              deal_products_promo_include_match.obtainable.length > 0 &&
              deal_products_promo_include_match.quantity &&
              order.quantity >=
                deal_products_promo_include_match.quantity + 1 &&
              obtainableDiscountedPrice &&
              obtainablePrice
            ) {
              calculatedPrice +=
                obtainableDiscountedPrice +
                parseFloat(order.price) -
                obtainablePrice;
            } else {
              calculatedPrice +=
                parseFloat(order.price) -
                parseFloat(order.price) *
                  parseFloat(
                    deal_products_promo_include_match.promo_discount_percentage
                  );
            }
          } else {
            calculatedPrice += parseFloat(order.price) - discount;
          }
        } else {
          calculatedPrice += parseFloat(order.price) - discount;
        }
      }
    }

    if (deals) {
      for (let i = 0; i < deals.length; i++) {
        const deal = deals[i];

        if (deal.price) {
          calculatedPrice += parseFloat(deal.price);
        }
      }
    }

    return (
      <NumberFormat
        value={calculatedPrice.toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₱"}
      />
    );
  };

  const calculateGrandTotal = () => {
    let calculatedPrice = 0;

    const orders = getAdminShopOrderState.data?.items;
    const deals = getAdminShopOrderState.data?.deal_items;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const discountPercentage = order.promo_discount_percentage;
        const discount = discountPercentage
          ? parseFloat(order.price) * parseFloat(discountPercentage)
          : 0;
        let deal_products_promo_includes = order.deal_products_promo_include;

        if (deal_products_promo_includes) {
          let deal_products_promo_include_match = null;

          for (let x = 0; x < deal_products_promo_includes.length; x++) {
            const deal_products_promo_include = deal_products_promo_includes[x];

            if (
              deal_products_promo_include.product_id === order.product_id &&
              deal_products_promo_include.product_variant_option_tb_id === null
            ) {
              deal_products_promo_include_match = deal_products_promo_include;

              break;
            } else if (
              deal_products_promo_include.product_id === order.product_id &&
              deal_products_promo_include.product_variant_option_tb_id
            ) {
              deal_products_promo_include_match = deal_products_promo_include;

              break;
            }
          }

          if (deal_products_promo_include_match) {
            let addedObtainable: Array<{
              product_id: number;
              price: number;
              product_variant_option_tb_id: number;
              promo_discount_percentage: string;
            }> = [];
            let obtainableDiscountedPrice = 0;
            let obtainablePrice = 0;

            for (
              let y = 0;
              y < deal_products_promo_include_match.obtainable.length;
              y++
            ) {
              const val = deal_products_promo_include_match.obtainable[y];

              if (
                val.price &&
                val.promo_discount_percentage &&
                val.product_id === order.product_id &&
                !addedObtainable.some(
                  (value) => value.product_id === val.product_id
                )
              ) {
                obtainableDiscountedPrice +=
                  val.price -
                  val.price * parseFloat(val.promo_discount_percentage);
                obtainablePrice += val.price;

                addedObtainable.push(val);
              }
            }
            if (
              deal_products_promo_include_match.obtainable.length > 0 &&
              deal_products_promo_include_match.quantity &&
              order.quantity >=
                deal_products_promo_include_match.quantity + 1 &&
              obtainableDiscountedPrice &&
              obtainablePrice
            ) {
              calculatedPrice +=
                obtainableDiscountedPrice +
                parseFloat(order.price) -
                obtainablePrice;
            } else {
              calculatedPrice +=
                parseFloat(order.price) -
                parseFloat(order.price) *
                  parseFloat(
                    deal_products_promo_include_match.promo_discount_percentage
                  );
            }
          } else {
            calculatedPrice += parseFloat(order.price) - discount;
          }
        } else {
          calculatedPrice += parseFloat(order.price) - discount;
        }
      }
    }

    if (deals) {
      for (let i = 0; i < deals.length; i++) {
        const deal = deals[i];

        if (deal.price) {
          calculatedPrice += parseFloat(deal.price);
        }
      }
    }

    if (getAdminShopOrderState.data?.discount) {
      calculatedPrice -= parseFloat(getAdminShopOrderState.data?.discount);
    }

    if (getAdminShopOrderState.data?.distance_price) {
      calculatedPrice += parseInt(getAdminShopOrderState.data?.distance_price);
    }

    if (getAdminShopOrderState.data?.cod_fee) {
      calculatedPrice += parseInt(getAdminShopOrderState.data?.cod_fee);
    }

    if (getAdminShopOrderState.data?.giftcard_discount) {
      calculatedPrice -= parseInt(
        getAdminShopOrderState.data?.giftcard_discount
      );
    }

    if (getAdminShopOrderState.data?.reseller_discount) {
      calculatedPrice -= parseInt(
        getAdminShopOrderState.data?.reseller_discount
      );
    }

    return (
      <NumberFormat
        value={calculatedPrice.toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₱"}
      />
    );
  };

  const calculateTotalPrice = (item: {
    order_item_id: number | null;
    product_id: number | null;
    price: string;
    product_price: string;
    quantity: number;
    remarks: string;
    name: string;
    description: string;
    add_details: string;
    product_label: string | null;

    promo_discount_percentage: string | null;

    deal_products_promo_include: Array<{
      id: number;
      quantity: number | null;
      product_id: number;
      product_hash: string;
      product_variant_option_tb_id: number | null;
      promo_discount_percentage: string;
      obtainable: Array<{
        product_id: number;
        price: number;
        product_variant_option_tb_id: number;
        promo_discount_percentage: string;
      }>;
    }>;
  }) => {
    const deal_products_promo_includes = item.deal_products_promo_include;

    if (deal_products_promo_includes) {
      let deal_products_promo_include_match = null;

      for (let i = 0; i < deal_products_promo_includes.length; i++) {
        const deal_products_promo_include = deal_products_promo_includes[i];

        if (
          deal_products_promo_include.product_id === item.product_id &&
          deal_products_promo_include.product_variant_option_tb_id === null
        ) {
          deal_products_promo_include_match = deal_products_promo_include;

          break;
        } else if (
          deal_products_promo_include.product_id === item.product_id &&
          deal_products_promo_include.product_variant_option_tb_id
        ) {
          deal_products_promo_include_match = deal_products_promo_include;

          break;
        }
      }

      if (deal_products_promo_include_match) {
        let addedObtainable: Array<{
          product_id: number;
          price: number;
          product_variant_option_tb_id: number;
          promo_discount_percentage: string;
        }> = [];
        let obtainableDiscountedPrice = 0;
        let obtainablePrice = 0;

        for (
          let y = 0;
          y < deal_products_promo_include_match.obtainable.length;
          y++
        ) {
          const val = deal_products_promo_include_match.obtainable[y];

          if (
            val.price &&
            val.promo_discount_percentage &&
            val.product_id === item.product_id &&
            !addedObtainable.some(
              (value) => value.product_id === val.product_id
            )
          ) {
            obtainableDiscountedPrice +=
              val.price - val.price * parseFloat(val.promo_discount_percentage);
            obtainablePrice += val.price;

            addedObtainable.push(val);
          }
        }

        if (
          deal_products_promo_include_match.obtainable.length > 0 &&
          deal_products_promo_include_match.quantity &&
          item.quantity >= deal_products_promo_include_match.quantity + 1 &&
          obtainableDiscountedPrice &&
          obtainablePrice
        ) {
          return (
            <>
              <span className="text-sm line-through">
                <NumberFormat
                  value={parseFloat(item.price).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </span>
              <br />
              <span>
                <NumberFormat
                  value={(
                    obtainableDiscountedPrice +
                    parseFloat(item.price) -
                    obtainablePrice
                  ).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </span>
            </>
          );
        } else {
          const deal_products_promo_include = deal_products_promo_includes[0];
          return (
            <>
              <span className="text-sm line-through">
                <NumberFormat
                  value={parseFloat(item.price).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </span>
              <br />
              <span>
                <NumberFormat
                  value={(
                    parseFloat(item.price) -
                    parseFloat(item.price) *
                      parseFloat(
                        deal_products_promo_include.promo_discount_percentage
                      )
                  ).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </span>
            </>
          );
        }
      } else {
        return (
          <NumberFormat
            value={parseFloat(item.price).toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₱"}
          />
        );
      }
    } else {
      return (
        <NumberFormat
          value={parseFloat(item.price).toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    }
  };

  const handleOnSubmitPayment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    dispatch(uploadProofOfPaymentAdmin(formData));
  };

  return (
    <>
      <div className="pt-1 text-secondary">
        <div className="space-y-1 ">
          <div className="grid-cols-3 gap-4 lg:grid ">
            <div>
              <strong>Tracking Number:</strong>{" "}
              <span className="font-semibold">
                {getAdminShopOrderState.data?.tracking_no ?? "N/A"}
              </span>
            </div>
            <div>
              <strong>Payment Status:</strong>{" "}
              {getAdminShopOrderState.data ? (
                <span
                  className="px-2 py-1 text-xs rounded-full "
                  style={{
                    color: "white",
                    backgroundColor:
                      ADMIN_SNACKSHOP_ORDER_STATUS[
                        getAdminShopOrderState.data.status
                      ].color,
                  }}
                >
                  {
                    ADMIN_SNACKSHOP_ORDER_STATUS[
                      getAdminShopOrderState.data.status
                    ].name
                  }
                </span>
              ) : null}
            </div>
            {getAdminShopOrderState.data ? (
              <div>
                <strong>Mode of Payment: </strong>
                <span className="font-semibold">
                  {
                    ADMIN_SNACKSHOP_MOP_STATUS[
                      getAdminShopOrderState.data.payops
                    ]
                  }
                </span>
              </div>
            ) : null}
          </div>

          <hr />

          <div className="grid-cols-3 gap-4 lg:grid">
            <div>
              <strong>Full Name:</strong>{" "}
              <span className="font-semibold">
                {getAdminShopOrderState.data?.client_name ?? "N/A"}
              </span>
            </div>
            <div>
              <strong>Contact Number:</strong>{" "}
              <span className="font-semibold">
                {getAdminShopOrderState.data?.contact_number ?? "N/A"}
              </span>
            </div>
            <div>
              <strong>Email:</strong>{" "}
              <span className="font-semibold">
                {getAdminShopOrderState.data?.email ?? "N/A"}
              </span>
            </div>
          </div>

          <hr />

          <div className="grid-cols-2 gap-4 space-y-2 lg:grid lg:space-y-0">
            <div>
              <strong>Order Status:</strong>{" "}
              {getAdminShopOrderState.data ? (
                <span
                  className="px-2 py-1 text-xs rounded-full "
                  style={{
                    color: "white",
                    backgroundColor:
                      ORDER_STATUS[getAdminShopOrderState.data.status].color,
                  }}
                >
                  {ORDER_STATUS[getAdminShopOrderState.data.status].name}
                </span>
              ) : null}
            </div>
            <div>
              <strong>Invoice Number:</strong>{" "}
              {getAdminShopOrderState.data?.invoice_num ? (
                <>{getAdminShopOrderState.data.invoice_num}</>
              ) : (
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    color: "white",
                    backgroundColor: "#b32400",
                  }}
                >
                  For Confirmation
                </span>
              )}
            </div>
          </div>

          {getAdminShopOrderState.data?.payops !== 3 ? (
            <>
              <hr />
              {getAdminShopOrderState.data?.payment_proof === "" ? (
                <form
                  onSubmit={handleOnSubmitPayment}
                  className="flex flex-col items-center justify-center space-x-2 space-y-2 lg:justify-start lg:space-y-0 lg:flex-row"
                >
                  <strong>Upload Payment:</strong>{" "}
                  <input type="file" name="payment_file" id="payment_file" />
                  <input
                    readOnly
                    hidden
                    name="trans_id"
                    value={getAdminShopOrderState.data?.id}
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
                  >
                    Upload
                  </button>
                  <span>(You can only upload .jpg and .png)</span>
                </form>
              ) : (
                <div className="flex flex-col space-x-2 lg:flex-row">
                  <strong>Attached Payment File:</strong>
                  <a
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                    href={`${REACT_APP_DOMAIN_URL}api/load-image/${getAdminShopOrderState.data?.payment_proof}`}
                  >
                    Click to view
                  </a>
                </div>
              )}
            </>
          ) : null}

          <hr />

          <div className="flex flex-col py-2 space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
            {getAdminShopOrderState.data?.payops !== 3 ? (
              <>
                {getAdminShopOrderState.data?.reference_num === "" ? (
                  <div className="flex flex-col flex-1 lg:flex-row">
                    <MaterialInput
                      colorTheme="black"
                      size="small"
                      label="Payment Ref. No"
                      name="referenceNumber"
                      value={referenceNumber}
                      onChange={(e) => {
                        setReferenceNumber(e.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        if (getAdminShopOrderState.data)
                          dispatch(
                            validateReferenceNumberAdmin({
                              transactionId: getAdminShopOrderState.data.id,
                              referenceNumber,
                            })
                          );
                      }}
                      className="px-3 py-1 text-base text-white bg-green-700 shadow-md lg:mb-0"
                    >
                      Validate
                    </button>
                  </div>
                ) : (
                  <div className="flex items-start justify-start flex-1 space-x-2">
                    <strong>Payment Ref. No: </strong>
                    <span>{getAdminShopOrderState.data?.reference_num}</span>
                    <span
                      className="px-2 py-1 text-xs rounded-full"
                      style={{
                        color: "white",
                        backgroundColor: "#004d00",
                      }}
                    >
                      Validated
                    </span>
                  </div>
                )}
              </>
            ) : null}
            <div className="flex flex-col flex-1 lg:flex-row">
              <MaterialInput
                colorTheme="black"
                size="small"
                select
                name="toStatusId"
                sx={{
                  "& fieldset": {
                    borderRadius: "0px",
                  },
                }}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as string);
                }}
              >
                {ADMIN_SNACKSHOP_ORDER_STATUS.map((value, index) => {
                  if (index === 0) {
                    return null;
                  }
                  return (
                    <MenuItem key={index} value={index}>
                      {value.name}
                    </MenuItem>
                  );
                })}
              </MaterialInput>
              <button
                onClick={() => {
                  setOpenAdminPasswordStatusChangeModal(true);
                }}
                className="px-3 py-1 text-base text-white bg-green-700 shadow-md lg:mb-0 lg:rounded-tr-md lg:rounded-br-md"
              >
                Change Order Status
              </button>
            </div>
          </div>

          <hr />

          <div className="flex flex-col flex-1 lg:flex-row">
            <MaterialInput
              colorTheme="black"
              size="small"
              select
              sx={{
                "& fieldset": {
                  borderRadius: "0px",
                },
              }}
              value={store}
              onChange={(e) => {
                setStore(e.target.value as string);
              }}
              name="toStoreId"
            >
              {getAdminSnackshopStoresState.data?.map((store, index) => (
                <MenuItem key={index} value={store.store_id}>
                  {store.name}
                </MenuItem>
              ))}
            </MaterialInput>
            <button
              onClick={() => {
                setOpenAdminPasswordStoreChangeModal(true);
              }}
              className="px-3 py-1 text-base text-white bg-green-700 shadow-md lg:mb-0 lg:rounded-tr-md lg:rounded-br-md"
            >
              Transfer to Store
            </button>
          </div>
        </div>

        <hr className="mt-1" />

        <div className="pt-2 pb-3">
          <span className="text-xl font-bold">Delivery Information</span>
          <div className="mt-1">
            <strong>Landmark Address:</strong>{" "}
            <span className="font-semibold">
              {getAdminShopOrderState.data?.address ?? "N/A"}
            </span>
          </div>
          <div className="mt-1">
            <strong>Complete Delivery Address:</strong>{" "}
            <span className="font-semibold">
              {getAdminShopOrderState.data?.add_address ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Contact Person:</strong>{" "}
            <span className="font-semibold">
              {" "}
              {getAdminShopOrderState.data?.add_name ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Contact Number:</strong>{" "}
            <span className="font-semibold">
              {" "}
              {getAdminShopOrderState.data?.contact_number ?? "N/A"}
            </span>
          </div>
        </div>

        <hr />

        <div className="pt-2 ">
          <span className="text-xl font-bold">Order Details</span>

          {getAdminShopOrderState.data ? (
            <>
              <table className="hidden w-full mt-3 text-sm text-left rounded-lg lg:table customer-information-table">
                <thead className="text-xs text-white uppercase bg-secondary ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Remarks
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getAdminShopOrderState.data.items.map((item, i) => (
                    <tr key={i}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-secondary"
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.product_label
                              ? item.product_label +
                                " " +
                                item.name +
                                (item.add_details
                                  ? " , " + item.add_details
                                  : "")
                              : item.name +
                                (item.add_details
                                  ? " , " + item.add_details
                                  : ""),
                          }}
                        />
                      </th>
                      <td className="px-6 py-4">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.remarks,
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4 text-end">
                        {item.promo_discount_percentage ? (
                          <>
                            <span className="text-sm line-through">
                              <NumberFormat
                                value={parseFloat(item.product_price).toFixed(
                                  2
                                )}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₱"}
                              />
                            </span>
                            <br />
                            <span>
                              <NumberFormat
                                value={(
                                  parseFloat(item.product_price) -
                                  parseFloat(item.product_price) *
                                    parseFloat(item.promo_discount_percentage)
                                ).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₱"}
                              />
                            </span>
                          </>
                        ) : item.deal_discount_percentage ? (
                          <>
                            <span className="text-sm line-through">
                              <NumberFormat
                                value={parseFloat(item.product_price).toFixed(
                                  2
                                )}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₱"}
                              />
                            </span>
                            <br />
                            <span>
                              <NumberFormat
                                value={(
                                  parseFloat(item.product_price) -
                                  parseFloat(item.product_price) *
                                    parseFloat(item.deal_discount_percentage)
                                ).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₱"}
                              />
                            </span>
                          </>
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.product_price).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 text-end">
                        {calculateTotalPrice(item)}
                      </td>
                    </tr>
                  ))}

                  {getAdminShopOrderState.data.deal_items.map((item, i) => (
                    <tr key={i}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-secondary"
                      >
                        <>
                          <span className=" !text-green-700 font-bold">
                            Deal Applied:{" "}
                          </span>
                          <br />
                          {item.alias ? (
                            <span className="font-bold">{item.alias}</span>
                          ) : null}
                          <br />
                          <span className="whitespace-pre-wrap">
                            {item.name}
                            <br />
                            {item.description}
                          </span>
                        </>
                      </th>
                      <td className="px-6 py-4">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.remarks,
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4 text-end">
                        {item.product_price ? (
                          <NumberFormat
                            value={parseFloat(item.product_price).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        ) : (
                          "₱0.00"
                        )}
                      </td>
                      <td className="px-6 py-4 text-end">
                        {item.price ? (
                          <NumberFormat
                            value={parseFloat(item.price).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        ) : (
                          "₱0.00"
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Total:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      {calculateOrderTotal()}
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold ">
                      Discount:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      -{" "}
                      {calculateWithZeroIfNoValue(
                        getAdminShopOrderState.data.discount
                      )}
                    </td>
                  </tr>

                  {getAdminShopOrderState.data.discount &&
                  getAdminShopOrderState.data.discount_percentage &&
                  getAdminShopOrderState.data.discount_name ? (
                    <tr className="text-end">
                      <td colSpan={4} className="px-6 py-2 font-bold ">
                        {parseFloat(
                          getAdminShopOrderState.data.discount_percentage
                        ) * 100}
                        % {getAdminShopOrderState.data.discount_name}
                      </td>
                      <td className="px-6 py-2 w-[150px]">
                        -{" "}
                        {calculateWithZeroIfNoValue(
                          getAdminShopOrderState.data.discount
                        )}
                      </td>
                    </tr>
                  ) : null}

                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Subtotal:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      {calculateSubTotal()}
                    </td>
                  </tr>

                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Delivery Fee:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      +{" "}
                      {calculateWithZeroIfNoValue(
                        getAdminShopOrderState.data.distance_price
                      )}
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      COD Additional Charges:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      +{" "}
                      {calculateWithZeroIfNoValue(
                        getAdminShopOrderState.data.cod_fee
                      )}
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Grand Total:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      {calculateGrandTotal()}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="lg:hidden">
                {getAdminShopOrderState.data.items.map((item, i) => (
                  <div className="py-2 border-b">
                    <p className="mb-2 text-xs leading-1 text-semibold">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.product_label
                            ? item.product_label +
                              " " +
                              item.name +
                              (item.add_details ? " , " + item.add_details : "")
                            : item.name +
                              (item.add_details
                                ? " , " + item.add_details
                                : ""),
                        }}
                      />
                    </p>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Remarks:</span>
                      <span className="text-xs">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.remarks,
                          }}
                        />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Quantity:</span>
                      <span className="text-xs">{item.quantity}</span>
                    </div>
                    {item.promo_discount_percentage && item.product_price ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-xs font-bold">Price:</span>
                          <span className="text-xs line-through">
                            <NumberFormat
                              value={parseFloat(item.product_price).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₱"}
                            />
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-xs font-bold">
                            Discounted Price:
                          </span>
                          <span className="text-xs">
                            <NumberFormat
                              value={(
                                parseFloat(item.product_price) -
                                parseFloat(item.product_price) *
                                  parseFloat(item.promo_discount_percentage)
                              ).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₱"}
                            />
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <span className="text-xs font-bold">Price:</span>
                        <span className="text-xs">
                          <NumberFormat
                            value={parseFloat(item.product_price).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Total:</span>
                      <span className="text-xs">
                        <NumberFormat
                          value={parseFloat(item.price).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>
                    </div>
                  </div>
                ))}

                {getAdminShopOrderState.data.deal_items.map((item, i) => (
                  <div className="py-2 border-b">
                    <p className="mb-2 text-xs leading-1 text-semibold">
                      <span className=" !text-green-700 font-bold">
                        Deal Applied:{" "}
                      </span>
                      <br />
                      {item.alias ? (
                        <span className="font-bold">{item.alias}</span>
                      ) : null}
                      <br />
                      <span className="whitespace-pre-wrap">
                        {item.name}
                        <br />
                        {item.description}
                      </span>
                    </p>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Remarks:</span>
                      <span className="text-xs">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.remarks,
                          }}
                        />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Quantity:</span>
                      <span className="text-xs">{item.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Price:</span>
                      <span className="text-xs">
                        {/* <NumberFormat
                          value={parseFloat(item.product_price).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        /> */}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Total:</span>
                      <span className="text-xs">
                        {/* <NumberFormat
                          value={parseFloat(item.price).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        /> */}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between mt-2">
                  <span className="text-sm font-bold">Total: </span>
                  <span className="text-sm text-end">
                    + {calculateOrderTotal()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Discount:</span>
                  <span className="text-sm text-end">
                    -{" "}
                    {calculateWithZeroIfNoValue(
                      getAdminShopOrderState.data.discount
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Subtotal:</span>
                  <span className="text-sm text-end">
                    + {calculateSubTotal()}
                  </span>
                </div>
                {getAdminShopOrderState.data.discount &&
                getAdminShopOrderState.data.discount_percentage &&
                getAdminShopOrderState.data.discount_name ? (
                  <div className="flex justify-between">
                    <span className="text-sm font-bold">
                      {parseFloat(
                        getAdminShopOrderState.data.discount_percentage
                      ) * 100}
                      % {getAdminShopOrderState.data.discount_name}:
                    </span>
                    <span className="text-sm text-end">
                      -{" "}
                      {calculateWithZeroIfNoValue(
                        getAdminShopOrderState.data.discount
                      )}
                    </span>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Delivery Fee:</span>
                  <span className="text-sm text-end">
                    +{" "}
                    {calculateWithZeroIfNoValue(
                      getAdminShopOrderState.data.distance_price
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">
                    COD Additional Charges:
                  </span>
                  <span className="text-sm text-end">
                    +{" "}
                    {calculateWithZeroIfNoValue(
                      getAdminShopOrderState.data.cod_fee
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Grand Total:</span>
                  <span className="text-sm text-end">
                    {calculateGrandTotal()}
                  </span>
                </div>
              </div>
            </>
          ) : null}

          <div className="flex flex-col items-start justify-between py-3 lg:flex-row">
            <div className="order-2 space-x-2 lg:order-1">
              <a
                target="_blank"
                rel="noreferrer"
                href={`${REACT_APP_DOMAIN_URL}api/admin/print_view/${
                  getAdminShopOrderState.data?.id
                }/${false}`}
                className="px-3 py-1 text-base text-white bg-blue-700 rounded-md shadow-md"
              >
                Print
              </a>
              <a
                href={`${REACT_APP_DOMAIN_URL}api/admin/print_asdoc/${
                  getAdminShopOrderState.data?.id
                }/${false}`}
                className="px-3 py-1 text-base text-white bg-orange-700 rounded-md shadow-md"
              >
                Download Document
              </a>
            </div>
            <div className="order-1 space-x-2 lg:order-2">
              <AdminShopOrderCustomerInformationButtons />
            </div>
          </div>
        </div>
      </div>

      <AdminPasswordModal
        open={openAdminPasswordStatusChangeModal}
        onEnterPassword={(password: string) => {
          if (getAdminShopOrderState.data)
            dispatch(
              adminPrivilege({
                password,
                fbUserId: getAdminShopOrderState.data.fb_user_id,
                mobileUserId: getAdminShopOrderState.data.mobile_user_id,
                transactionId: getAdminShopOrderState.data.id,
                transactionHash: getAdminShopOrderState.data.hash_key,
                fromStatusId: getAdminShopOrderState.data.status,
                toStatusId: status,
              })
            );
        }}
        onClose={() => {
          setOpenAdminPasswordStatusChangeModal(false);
        }}
      />

      <AdminPasswordModal
        open={openAdminPasswordStoreChangeModal}
        onEnterPassword={(password: string) => {
          if (getAdminShopOrderState.data)
            dispatch(
              adminPrivilege({
                password,
                fbUserId: getAdminShopOrderState.data.fb_user_id,
                mobileUserId: getAdminShopOrderState.data.mobile_user_id,
                transactionId: getAdminShopOrderState.data.id,
                transactionHash: getAdminShopOrderState.data.hash_key,
                fromStoreId: getAdminShopOrderState.data.store,
                toStoreId: store,
              })
            );
        }}
        onClose={() => {
          setOpenAdminPasswordStoreChangeModal(false);
        }}
      />
    </>
  );
}
