import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import {
  getSession,
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { AiOutlineCheckCircle, AiOutlineCreditCard } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getContacts,
  selectGetContacts,
} from "features/shared/presentation/slices/get-contacts.slice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormEvent, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import moment from "moment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { CateringFaqsModal } from "../modals/catering-faqs-modal";
import { FaFileContract } from "react-icons/fa";
import { selectAddContact } from "features/shared/presentation/slices/add-contact.slice";
import {
  cateringCheckoutOrders,
  CateringCheckoutOrdersState,
  resetCateringCheckoutOrders,
  selectCateringCheckoutOrders,
} from "../slices/catering-checkout-orders.slice";
import { PaymentMethod } from "features/shop/presentation/components";
import {
  MaterialInput,
  MaterialPhoneInput,
} from "features/shared/presentation/components";

export function CateringCheckout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [openCateringFaqsModal, setOpenCateringFaqsModal] = useState(false);
  const [enableCompanyName, setEnableCompanyName] = useState(false);
  const [cashOnDelivery, setCashOnDelivery] = useState<number>();

  const getSessionState = useAppSelector(selectGetSession);
  const addContactState = useAppSelector(selectAddContact);
  const cateringCheckoutOrdersState = useAppSelector(
    selectCateringCheckoutOrders
  );

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    eMail: "",
    phoneNumber: "",
    eventStartDate: "",
    eventEndDate: "",
    servingTime: "",
    eventClass: "",
    companyName: "",
    otherDetails: "",
    eventAddress: "",
    paymentPlan: "",
    payops: "",
  });

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data
    ) {
      setFormState({
        firstName: getSessionState.data.userData.first_name,
        lastName: getSessionState.data.userData.last_name,
        eMail: getSessionState.data.userData.email,
        eventAddress: getSessionState.data.customer_address,
        payops: "",
        phoneNumber: "",
        eventStartDate: moment
          .unix(parseInt(getSessionState.data.catering_start_date))
          .format("LLLL"),
        eventEndDate: moment
          .unix(parseInt(getSessionState.data.catering_end_date))
          .format("LLLL"),
        servingTime: moment
          .unix(parseInt(getSessionState.data.catering_start_date))
          .format("LLLL"),
        eventClass: "",
        companyName: "",
        otherDetails: "",
        paymentPlan: "",
      });
    }
  }, [getSessionState]);
  useEffect(() => {
    if (
      cateringCheckoutOrdersState.status ===
        CateringCheckoutOrdersState.success &&
      cateringCheckoutOrdersState.data
    ) {
      navigate(`/shop/contract/${cateringCheckoutOrdersState.data.hash}`);
      dispatch(resetCateringCheckoutOrders());
    }
  }, [cateringCheckoutOrdersState, dispatch, navigate]);

  useEffect(() => {
    dispatch(getSession());
    dispatch(getContacts());
  }, [addContactState, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

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
      return <>₱0.00</>;
    }
  };

  const calculateServiceCharge = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;
    const service_charge_percentage = 0.1;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += orders[i].prod_calc_amount;
      }

      return (
        <NumberFormat
          value={(calculatedPrice * service_charge_percentage).toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    } else {
      return <>₱0.00</>;
    }
  };

  const calculateNightDifferentialFee = () => {
    if (getSessionState.data?.catering_night_differential_fee) {
      return (
        <NumberFormat
          value={getSessionState.data.catering_night_differential_fee.toFixed(
            2
          )}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    } else {
      return <>₱0.00</>;
    }
  };

  const calculateSucceedingHourCharge = () => {
    if (getSessionState.data?.catering_succeeding_hour_charge) {
      return (
        <NumberFormat
          value={getSessionState.data.catering_succeeding_hour_charge.toFixed(
            2
          )}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    } else {
      return <>₱0.00</>;
    }
  };

  const calculateTransportationFee = () => {
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
      return <>₱0.00</>;
    }
  };

  const calculateTotalPrice = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;
    const service_charge_percentage = 0.1;

    if (orders && getSessionState.data?.distance_rate_price) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += orders[i].prod_calc_amount;
      }

      calculatedPrice += calculatedPrice * service_charge_percentage;
      calculatedPrice += getSessionState.data.distance_rate_price;
      calculatedPrice += getSessionState.data.catering_night_differential_fee;
      calculatedPrice += getSessionState.data.catering_succeeding_hour_charge;

      if (cashOnDelivery) {
        calculatedPrice += cashOnDelivery;
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

  const handleCheckout = (e: FormEvent<HTMLFormElement>) => {
    dispatch(cateringCheckoutOrders(formState));
    e.preventDefault();
  };

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

  return (
    <main className="bg-paper">
      <PageTitleAndBreadCrumbs
        home={{
          title: "Catering",
          url: "/shop",
        }}
        className="lg:h-[200px]"
        title="Checkout"
        pageTitles={[
          { name: "Products", url: "/shop/products" },
          { name: "Checkout" },
        ]}
      />

      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-8">
          <div className="flex lg:container">
            <div className="flex-1">
              <div className="bg-green-700 h-[0.25rem] relative">
                <div className="absolute rounded-[50%] bg-green-700 text-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  1
                </div>
              </div>
              <div className="flex items-center justify-center pl-4 mt-5 space-x-1 text-xs text-secondary lg:text-white lg:pl-0">
                <BiUserCircle className="hidden text-2xl sm:block" />{" "}
                <span>Your Details</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#424242] h-[0.25rem] relative">
                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  2
                </div>
              </div>
              <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-secondary lg:text-white">
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
              <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-secondary lg:text-white">
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
              <div className="flex items-center justify-center pr-4 mt-5 space-x-1 text-xs text-secondary lg:text-white lg:pr-0">
                <AiOutlineCheckCircle className="hidden text-2xl sm:block" />{" "}
                <span>Checkout Complete</span>
              </div>
            </div>
          </div>

          <div className="container">
            <form
              onSubmit={handleCheckout}
              className="flex flex-col justify-between w-full py-6 mb-10 lg:flex-row"
            >
              <div className="space-y-4 lg:flex-[0_0_55%] lg:max-w-[55%] order-2 lg:order-1 lg:mt-0 mt-4">
                <MaterialInput
                  colorTheme="black"
                  required
                  label="First Name"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleInputChange}
                  fullWidth
                />

                <MaterialInput
                  colorTheme="black"
                  required
                  label="Last Name"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleInputChange}
                  fullWidth
                />

                <div className="flex flex-col space-y-4 lg:space-x-4 lg:flex-row lg:space-y-0">
                  <div className="flex-1">
                    <MaterialInput
                      colorTheme="black"
                      required
                      label="E-mail Address"
                      name="eMail"
                      value={formState.eMail}
                      onChange={handleInputChange}
                      fullWidth
                      type="email"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex-1">
                    <MaterialPhoneInput
                      colorTheme="black"
                      onChange={handleInputChange}
                      value={formState.phoneNumber}
                      name="phoneNumber"
                      required
                      fullWidth
                    />
                  </div>
                </div>

                {getSessionState.data ? (
                  <div className="flex flex-col space-y-4 lg:space-x-4 lg:flex-row lg:space-y-0">
                    <div className="flex-1 space-y-2">
                      <span className="text-base text-secondary">
                        Event Start Date Time
                      </span>

                      <MaterialInput
                        colorTheme="black"
                        required
                        autoComplete="off"
                        name="eventStartDate"
                        value={formState.eventStartDate}
                        onChange={() => {}}
                        fullWidth
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <span className="text-base text-secondary">
                        Event End Date Time
                      </span>

                      <MaterialInput
                        colorTheme="black"
                        required
                        autoComplete="off"
                        name="eventEndDate"
                        value={formState.eventEndDate}
                        onChange={() => {}}
                        fullWidth
                      />
                    </div>
                  </div>
                ) : null}

                {getSessionState.data ? (
                  <div className="space-y-2">
                    <span className="text-base text-secondary">
                      Serving Time
                    </span>
                    <MaterialInput
                      required
                      autoComplete="off"
                      colorTheme="black"
                      name="servingTime"
                      value={formState.servingTime}
                      onChange={() => {}}
                      fullWidth
                    />
                  </div>
                ) : null}

                <div>
                  <MaterialInput
                    colorTheme="black"
                    select
                    fullWidth
                    label="Event Class"
                    name="eventClass"
                    onChange={(event) => {
                      if (event.target.value === "corporate") {
                        setEnableCompanyName(true);
                      } else {
                        setEnableCompanyName(false);
                      }
                      handleInputChange(event);
                    }}
                    value={formState.eventClass}
                    required
                    autoComplete="off"
                  >
                    <MenuItem value="personal">Personal</MenuItem>
                    <MenuItem value="corporate">Corporate</MenuItem>
                    <MenuItem value="party organizer">Party Organizer</MenuItem>
                  </MaterialInput>
                </div>

                {enableCompanyName ? (
                  <div className="space-y-2">
                    <span className="text-base text-black">Company Name</span>

                    <MaterialInput
                      required
                      colorTheme="black"
                      name="companyName"
                      value={formState.companyName}
                      onChange={handleInputChange}
                      autoComplete="off"
                      fullWidth
                    />
                  </div>
                ) : null}

                <div className="space-y-2">
                  <span className="text-base text-secondary">
                    Other event details or requests (optional)
                  </span>

                  <MaterialInput
                    required
                    colorTheme="black"
                    name="otherDetails"
                    value={formState.otherDetails}
                    onChange={handleInputChange}
                    autoComplete="off"
                    fullWidth
                    multiline
                    rows={4}
                    maxRows={5}
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-base text-secondary">
                    Event Address
                  </span>

                  <MaterialInput
                    required
                    aria-readonly
                    colorTheme="black"
                    name="eventAddress"
                    value={formState.eventAddress}
                    onChange={handleInputChange}
                    fullWidth
                    autoComplete="off"
                  />
                </div>

                <FormControl className="space-y-2">
                  <FormLabel id="payment_plan">Choose payment plan</FormLabel>
                  <RadioGroup
                    aria-labelledby="payment_plan"
                    defaultValue="full"
                    name="paymentPlan"
                    value={formState.paymentPlan}
                    onChange={handleInputChange}
                    className="space-y-4"
                  >
                    <FormControlLabel
                      value="full"
                      sx={{
                        alignItems: "start",
                      }}
                      control={
                        <Radio
                          color="primary"
                          sx={{
                            padding: "0 10px 0 10px",
                          }}
                          required
                        />
                      }
                      label=" Full Payment - 1 week before the event or earlier"
                    />
                    <FormControlLabel
                      value="half"
                      sx={{
                        alignItems: "start",
                      }}
                      control={
                        <Radio
                          color="primary"
                          sx={{
                            padding: "0 10px 0 10px",
                          }}
                        />
                      }
                      label="50% Payment - 50% down payment - 1 week before the event or earlier / 50% balance payment - on the day of the event"
                    />
                  </RadioGroup>
                </FormControl>
                <div className="mt-4 text-secondary lg:mt-0">
                  <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">
                    Choose payment method
                  </h2>
                  <PaymentMethod
                    onChange={(payment) => {
                      setFormState({
                        ...formState,
                        payops: payment,
                      });
                      if (
                        getSessionState.data &&
                        getSessionState.data.cash_delivery &&
                        payment === "3"
                      ) {
                        setCashOnDelivery(
                          parseInt(getSessionState.data.cash_delivery)
                        );
                      } else {
                        setCashOnDelivery(undefined);
                      }
                    }}
                  />
                  {/* <CateringPaymentAccordion /> */}
                </div>

                <div className="mt-4 text-secondary lg:mt-0">
                  <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">
                    Catering Reminders :
                  </h2>
                  <p className="text-sm text-primary">
                    A. Package Inclusions: Free use of table set-up / cart for 3
                    hours + 2 accommodating staff <br />
                    B. Apart from a 10% service fee, there are additional
                    charges for logistics (transpo, toll fee) and fees for
                    on-site cooking*
                  </p>
                  <div className="flex items-center justify-start space-x-1 text-sm text-secondary lg:text-base">
                    <Checkbox
                      color="primary"
                      required
                      sx={{ padding: "10px 10px 10px 0" }}
                    />
                    <span>I have read the full </span>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenCateringFaqsModal(true);
                      }}
                      className="text-primary"
                    >
                      Catering FAQs
                    </button>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-4">
                  <button
                    type="button"
                    className="order-2 w-full py-3 mt-4 font-bold text-white uppercase border bg-secondary border-secondary rounded-xl lg:order-1"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Go Back
                  </button>

                  <button
                    type="submit"
                    className="bg-[#CC5801] text-white py-3 w-full uppercase border border-secondary rounded-xl mt-4 order-1 lg:order-2"
                  >
                    Initial Checkout
                  </button>
                </div>
              </div>

              {getSessionState.data && getSessionState.data.orders ? (
                <div className="space-y-4 lg:flex-[0_0_40%] lg:max-w-[40%] order-1 lg:order-2">
                  <h2 className="font-['Bebas_Neue'] text-3xl  text-secondary tracking-[3px] text-center">
                    Order Summary
                  </h2>

                  <div className="max-h-[400px] overflow-y-auto space-y-4 px-[4px] py-[10px]">
                    {getSessionState.data.orders.map((order, i) => (
                      <div
                        key={i}
                        className="flex bg-secondary shadow-md  rounded-[10px]"
                      >
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${order.prod_image_name}`}
                          className="rounded-[10px] w-[92px] h-[92px]"
                          alt=""
                        />
                        <div className="flex flex-col flex-1 px-3 py-2 text-white">
                          <h3 className="text-sm w-[90%]">
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

                          {order.prod_multiflavors ? (
                            <h3 className="text-xs">
                              Flavor:
                              <br />
                              <span
                                className="text-tertiary"
                                dangerouslySetInnerHTML={{
                                  __html: order.prod_multiflavors,
                                }}
                              />
                            </h3>
                          ) : null}
                          <h3 className="flex items-end justify-end flex-1 text-base">
                            {order.prod_calc_amount > 0 ? (
                              <NumberFormat
                                value={order.prod_calc_amount.toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₱"}
                              />
                            ) : (
                              <span className="font-bold text-tertiary">
                                FREE
                              </span>
                            )}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="mt-1 mb-2 border-secondary" />
                  <div className="grid grid-cols-2 text-secondary">
                    <span>Subtotal:</span>
                    <span className="text-end">{calculateSubTotalPrice()}</span>
                    <span>10% Service Charge:</span>
                    <span className="text-end">{calculateServiceCharge()}</span>
                    <span>Transportation Fee:</span>
                    <span className="text-end">
                      {calculateTransportationFee()}
                    </span>
                    <span>Additional Hour Fee:</span>
                    <span className="text-end">
                      {calculateSucceedingHourCharge()}
                    </span>
                    <span>Night Differential Fee:</span>
                    <span className="text-end">
                      {calculateNightDifferentialFee()}
                    </span>
                  </div>

                  <h1 className="text-4xl font-bold text-center text-secondary">
                    {calculateTotalPrice()}
                  </h1>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </section>

      <CateringFaqsModal
        open={openCateringFaqsModal}
        onClose={() => {
          setOpenCateringFaqsModal(false);
        }}
      />
    </main>
  );
}
