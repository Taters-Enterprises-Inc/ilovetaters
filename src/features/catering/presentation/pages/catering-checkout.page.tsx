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

export function CateringCheckout() {
  const navigate = useNavigate();
  const [openAddContactModal, setOpenAddContactModal] = useState(false);

  const getSessionState = useAppSelector(selectGetSession);
  const getContactsState = useAppSelector(selectGetContacts);

  const phoneNumberRef = useRef(null);
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

                <TextField
                  aria-readonly
                  value={getSessionState.data?.customer_address}
                  variant="outlined"
                  className="w-full"
                  name="address"
                  autoComplete="off"
                />
                {getSessionState.data?.cache_data ? (
                  <>
                    <div className="mt-4 text-white lg:mt-0">
                      <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">
                        Handling Method
                      </h2>

                      <ul className="mt-2 space-y-1">
                        <li className="flex items-center space-x-2">
                          <MdDeliveryDining className="text-2xl text-tertiary" />
                          <h3 className="text-sm">Delivery</h3>
                        </li>
                        <li className="flex items-start space-x-3">
                          <FaStore className="text-lg text-tertiary" />
                          <h3 className="text-sm">
                            Store: {getSessionState.data.cache_data.store_name}
                          </h3>
                        </li>
                        <li className="flex items-start space-x-3 ">
                          <FaMapMarkerAlt className="text-lg text-tertiary" />
                          <h3 className="flex-1 text-sm">
                            Store Address:{" "}
                            {getSessionState.data.cache_data.store_address}
                          </h3>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-4 text-white lg:mt-0">
                      <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">
                        Note:
                      </h2>
                      <ul
                        className="mt-2 space-y-2 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: getSessionState.data.cache_data?.moh_notes
                            ? getSessionState.data.cache_data.moh_notes
                            : "",
                        }}
                      />
                    </div>
                  </>
                ) : null}

                <div className="mt-4 text-white lg:mt-0">
                  <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">
                    Choose payment method
                  </h2>
                  <CateringPaymentAccordion />
                </div>

                <div className="flex items-center justify-start space-x-1 text-sm text-white lg:text-base">
                  <Checkbox color="tertiary" required />
                  <span>I agree with the </span>
                  <Link
                    to="/shop/terms-and-conditions"
                    className="text-tertiary"
                  >
                    Terms & Conditions
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
                    Checkout
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
