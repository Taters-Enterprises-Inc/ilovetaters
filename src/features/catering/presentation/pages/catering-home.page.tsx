import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { SearchAddress } from "features/shared/presentation/components/search-address";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { FaSearchLocation } from "react-icons/fa";
import {
  selectSetStoreAndAddress,
  setStoreAndAddress,
  SetStoreAndAddressState,
} from "features/shared/presentation/slices/set-store-and-address.slice";
import { useNavigate } from "react-router-dom";
import { CateringStoreList } from "../components";
import { getStoresAvailableCatering } from "../slices/get-stores-available-catering.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export function CateringHome() {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState<any>("");
  const getSessionState = useAppSelector(selectGetSession);

  const [eventStartDate, setEventStartDate] = useState<Date | null>(null);
  const [eventEndDate, setEventEndDate] = useState<Date | null>(null);

  const setStoreAndAddressState = useAppSelector(selectSetStoreAndAddress);

  const navigate = useNavigate();

  useEffect(() => {
    if (setStoreAndAddressState.status === SetStoreAndAddressState.success) {
      navigate("products");
      document.body.classList.remove("overflow-hidden");
    }
  }, [setStoreAndAddressState, navigate]);

  useEffect(() => {
    dispatch(getSession());
    dispatch(storeReset());
  }, [dispatch]);

  useEffect(() => {
    if (getSessionState.data?.customer_address !== null) {
      setAddress(getSessionState.data?.customer_address);
    }
  }, [dispatch, getSessionState]);

  return (
    <>
      <img
        className="lg:hidden"
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/catering/hero/mobile/catering_landing_page.webp"
        }
        alt="The best pop corn in town"
      ></img>
      <img
        className="hidden lg:block"
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/catering/hero/desktop/catering_landing_page.webp"
        }
        alt="The best pop corn in town"
      ></img>

      <section className="container pb-96">
        <h1 className='text-white text-lg pt-4 pb-2 font-["Bebas_Neue"] tracking-[2px]'>
          Thank you for considering Taters for your celebration. Kindly key in
          your event details.
        </h1>

        <div className="space-y-4">
          <div className="flex justify-center">
            <label className="pure-material-textfield-outlined w-[100%]">
              <SearchAddress
                onPlaceSelected={(place: string) => {
                  setAddress(place);
                }}
              />
              <span>Search Address</span>
            </label>
          </div>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="space-y-4 lg:space-y-0 lg:space-x-4">
              <DateTimePicker
                label="Select Event Start Date"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      svg: { color: "white" },
                      input: { color: "white" },
                      label: { color: "white" },
                    }}
                    className="w-full lg:w-fit"
                  />
                )}
                value={eventStartDate}
                onChange={(newValue) => {
                  setEventStartDate(newValue);
                }}
              />

              <DateTimePicker
                label="Select Event End Date"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      svg: { color: "white" },
                      input: { color: "white" },
                      label: { color: "white" },
                    }}
                    className="w-full lg:w-fit"
                  />
                )}
                value={eventEndDate}
                onChange={(newValue) => {
                  setEventEndDate(newValue);
                }}
              />
            </div>
          </LocalizationProvider>

          <button
            onClick={() => {
              dispatch(getStoresAvailableCatering({ address }));
            }}
            className="flex items-center justify-center px-4 py-2 space-x-2 text-lg font-bold text-white bg-button rounded-xl"
          >
            <FaSearchLocation />
            <span>Check Availability</span>
          </button>

          <CateringStoreList
            onClickStore={(storeId: number, regionId: number) => {
              dispatch(
                setStoreAndAddress({
                  address,
                  storeId,
                  regionId,
                })
              );
            }}
            address={address}
          />
        </div>
      </section>
    </>
  );
}
