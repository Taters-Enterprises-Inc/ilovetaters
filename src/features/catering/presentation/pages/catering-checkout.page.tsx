import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { AiOutlineCheckCircle, AiOutlineCreditCard } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import TextField from "@mui/material/TextField";
import { selectGetContacts } from "features/shared/presentation/slices/get-contacts.slice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PhoneInput from "react-phone-input-2";
import Select from "@mui/material/Select";
import { FormEvent, useEffect, useRef, useState } from "react";
import { CateringPaymentAccordion } from "../components/catering-payment-accordion";
import { MdDeliveryDining } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";
import { FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AddContactModal } from "features/shared/presentation/modals";
import NumberFormat from "react-number-format";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export function CateringCheckout() {
  const navigate = useNavigate();
  const [openAddContactModal, setOpenAddContactModal] = useState(false);

  const getSessionState = useAppSelector(selectGetSession);
  const getContactsState = useAppSelector(selectGetContacts);

  const phoneNumberRef = useRef(null);

  const calculateSubTotalPrice = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += orders[i].prod_calc_amount;
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
      return (
        <NumberFormat
          value={0}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    }
  };

  const calculateDeliveryFee = () => {
    if (getSessionState.data?.distance_rate_price) {
      return (
        <NumberFormat
          value={getSessionState.data.distance_rate_price.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    } else {
      return (
        <NumberFormat
          value={0}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    }
  };

  const calculateTotalPrice = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;

    if (orders && getSessionState.data?.distance_rate_price) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += orders[i].prod_calc_amount;
      }

      calculatedPrice += getSessionState.data.distance_rate_price;
      return (
        <NumberFormat
          value={calculatedPrice.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    } else {
      return (
        <NumberFormat
          value={0}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    }
  };
  const handleCheckout = () => {};

  return (
    <>
      <PageTitleAndBreadCrumbs
        home={{
          title: "Catering",
          url: "/catering",
        }}
        title="Checkout"
        pageTitles={[
          { name: "Products", url: "/catering/products" },
          { name: "Checkout" },
        ]}
      />

      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-8">
          <div className="flex lg:container">
            <div className="flex-1">
              <div className="bg-white h-[0.25rem] relative">
                <div className="absolute rounded-[50%] bg-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  1
                </div>
              </div>
              <div className="flex items-center justify-center pl-4 mt-5 space-x-1 text-xs text-white lg:pl-0">
                <BiUserCircle className="text-2xl" /> <span>Your Details</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#424242] h-[0.25rem] relative">
                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  2
                </div>
              </div>
              <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-white">
                <AiOutlineCreditCard className="text-2xl" />{" "}
                <span>Payment</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#424242] h-[0.25rem] relative">
                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  3
                </div>
              </div>
              <div className="flex items-center justify-center pr-4 mt-5 space-x-1 text-xs text-white lg:pr-0">
                <AiOutlineCheckCircle className="text-2xl" />{" "}
                <span>Complete</span>
              </div>
            </div>
          </div>

          <div className="container">
            <form
              onSubmit={handleCheckout}
              className="bg-primary py-6 lg:shadow-[#540808] lg:shadow-md w-full lg:rounded-[30px] mb-10 lg:p-10 flex justify-between flex-col lg:flex-row"
            >
              <div className="space-y-4 lg:flex-[0_0_55%] lg:max-w-[55%] order-2 lg:order-1 lg:mt-0 mt-4">
                {getSessionState.data?.userData.first_name ? (
                  <TextField
                    aria-readonly
                    value={getSessionState.data.userData.first_name}
                    variant="outlined"
                    className="w-full"
                    name="firstName"
                  />
                ) : (
                  <TextField
                    required
                    label="First Name"
                    variant="outlined"
                    className="w-full"
                    name="firstName"
                  />
                )}

                {getSessionState.data?.userData.last_name ? (
                  <TextField
                    aria-readonly
                    value={getSessionState.data.userData.last_name}
                    variant="outlined"
                    className="w-full"
                    name="lastName"
                  />
                ) : (
                  <TextField
                    required
                    label="Last Name"
                    variant="outlined"
                    className="w-full"
                    name="lastName"
                  />
                )}

                <div className="flex flex-col space-y-4 lg:space-x-4 lg:flex-row lg:space-y-0">
                  <div className="flex-1">
                    {getSessionState.data?.userData.email ? (
                      <TextField
                        autoComplete="off"
                        aria-readonly
                        value={getSessionState.data.userData.email}
                        variant="outlined"
                        className="w-full"
                        name="eMail"
                      />
                    ) : (
                      <TextField
                        required
                        autoComplete="off"
                        label="E-mail Address"
                        variant="outlined"
                        className="w-full"
                        name="eMail"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    {getContactsState?.data &&
                    getContactsState.data.length > 0 ? (
                      <FormControl className="w-full">
                        <InputLabel id="demo-simple-select-helper-label">
                          Contacts
                        </InputLabel>
                        <Select
                          className="w-full"
                          label="Contacts"
                          name="phoneNumber"
                          required
                          ref={phoneNumberRef}
                          autoComplete="off"
                        >
                          {getContactsState.data.map((val) => (
                            <MenuItem value={val.contact}>
                              {val.contact}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <PhoneInput
                        country={"ph"}
                        disableDropdown
                        inputClass="!bg-transparent !text-white !py-[27px] !w-full"
                        inputProps={{
                          name: "phoneNumber",
                          ref: phoneNumberRef,
                          required: true,
                        }}
                        isValid={(value, country: any) => {
                          if (value.match(/63/) || value.match(/09/)) {
                            return true;
                          } else {
                            return "Please use +63 or 09";
                          }
                        }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setOpenAddContactModal(true);
                      }}
                      className="text-xs underline text-tertiary underline-offset-4"
                    >
                      Setup your phone number
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-4 lg:space-x-4 lg:flex-row lg:space-y-0">
                  <div className="flex-1 space-y-2">
                    <span className="text-base text-white">
                      Event Start Date Time
                    </span>

                    <TextField
                      aria-readonly
                      variant="outlined"
                      className="w-full"
                      name="event_start_date_time"
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <span className="text-base text-white">
                      Event End Date Time
                    </span>

                    <TextField
                      aria-readonly
                      variant="outlined"
                      className="w-full"
                      name="event_end_date_time"
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-base text-white">Serving Time</span>

                  <TextField
                    aria-readonly
                    variant="outlined"
                    className="w-full"
                    name="serving_time"
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-base text-white">
                    Other event details or requests (optional)
                  </span>

                  <TextField
                    aria-readonly
                    variant="outlined"
                    className="w-full"
                    name="other_details"
                    autoComplete="off"
                    multiline
                    rows={4}
                    maxRows={5}
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-base text-white">Event Address</span>

                  <TextField
                    aria-readonly
                    value={getSessionState.data?.customer_address}
                    variant="outlined"
                    className="w-full"
                    name="address"
                    autoComplete="off"
                  />
                </div>

                <div className="mt-4 text-white lg:mt-0">
                  <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">
                    Choose payment method
                  </h2>
                  <CateringPaymentAccordion />
                </div>

                <div className="flex items-center justify-start space-x-1 text-sm text-white lg:text-base">
                  <Checkbox color="tertiary" required />
                  <span>I have read the full </span>
                  <Link
                    to="/shop/terms-and-conditions"
                    className="text-tertiary"
                  >
                    Catering FAQs
                  </Link>
                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-4">
                  <button
                    type="button"
                    className="order-2 w-full py-3 mt-4 font-bold text-black uppercase bg-white border border-white rounded-xl lg:order-1"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Go Back
                  </button>

                  <button
                    type="submit"
                    className="bg-[#CC5801] text-white py-3 w-full uppercase border rounded-xl mt-4 order-1 lg:order-2"
                  >
                    Initial Checkout
                  </button>
                </div>
              </div>

              <div className="space-y-4 lg:flex-[0_0_40%] lg:max-w-[40%] order-1 lg:order-2">
                <h2 className="font-['Bebas_Neue'] text-3xl  text-white tracking-[3px] text-center">
                  Order Summary
                </h2>

                <div className="max-h-[400px] overflow-y-auto space-y-4 px-[4px] py-[10px]">
                  {/* {getSessionState.data?.orders.map((order, i) => (
                      <div
                        key={i}
                        className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px]"
                      >
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${order.prod_image_name}`}
                          className="rounded-[10px] w-[92px] h-[92px]"
                          alt=""
                        />
                        <div className="flex flex-col flex-1 px-3 py-2 text-white">
                          <h3 className="text-sm">
                            {order.prod_size} {order.prod_name}
                          </h3>
                          <h3 className="text-xs">
                            Quantity:{" "}
                            <span className="text-tertiary">
                              {order.prod_qty}
                            </span>
                          </h3>

                          {order.prod_flavor ? (
                            <h3 className="text-xs">
                              Flavor:{" "}
                              <span className="text-tertiary">
                                {order.prod_flavor}
                              </span>
                            </h3>
                          ) : null}
                          <h3 className="flex items-end justify-end flex-1 text-base">
                            <NumberFormat
                              value={order.prod_calc_amount.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₱"}
                            />
                          </h3>
                        </div>
                      </div>
                    ))} */}
                </div>

                <hr className="mt-1 mb-2" />
                <div className="grid grid-cols-2 text-white">
                  <span>Subtotal:</span>
                  <span className="text-end">{calculateSubTotalPrice()}</span>
                  <span>10% Service Charge:</span>
                  <span className="text-end">₱0.00</span>
                  <span>Transportation Fee:</span>
                  <span className="text-end">₱0.00</span>
                  <span>Additional Hour Fee:</span>
                  <span className="text-end">₱0.00</span>
                  <span>Night Differential Fee:</span>
                  <span className="text-end">₱0.00</span>
                </div>

                <h1 className="text-4xl text-center text-white">₱0.00</h1>
              </div>
            </form>
          </div>
        </div>
      </section>

      <AddContactModal
        open={openAddContactModal}
        onClose={() => {
          setOpenAddContactModal(false);
        }}
      />
    </>
  );
}