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
import { useLocation, useNavigate } from "react-router-dom";
import { CateringStoreList } from "../components";
import { getStoresAvailableCatering } from "../slices/get-stores-available-catering.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import moment from "moment";

export function CateringHome() {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState<any>("");
  const [openStartEventCalendar, setOpenStartEventCalendar] = useState(false);
  const [openEndEventCalendar, setOpenEndEventCalendar] = useState(false);
  const getSessionState = useAppSelector(selectGetSession);

  const [eventStartDate, setEventStartDate] = useState<Date>(
    moment().add(14, "days").toDate()
  );
  const [eventEndDate, setEventEndDate] = useState<Date>(
    moment().add(14, "days").add(3, "hours").toDate()
  );

  const setStoreAndAddressState = useAppSelector(selectSetStoreAndAddress);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

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

  function disableDates(date: Date) {
    return moment(date) <= moment().add(13, "days");
  }

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
                shouldDisableDate={disableDates}
                open={openStartEventCalendar}
                onOpen={() => setOpenStartEventCalendar(true)}
                onClose={() => setOpenStartEventCalendar(false)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      svg: { color: "white" },
                      input: { color: "white" },
                      label: { color: "white" },
                    }}
                    onClick={() => {
                      setOpenStartEventCalendar(true);
                    }}
                    className="w-full lg:w-fit"
                  />
                )}
                value={eventStartDate}
                onChange={(newValue) => {
                  if (newValue) {
                    setEventStartDate(newValue);
                    setEventEndDate(moment(newValue).add(3, "hours").toDate());
                  }
                }}
              />

              <DateTimePicker
                label="Select Event End Date"
                shouldDisableDate={disableDates}
                open={openEndEventCalendar}
                onOpen={() => setOpenEndEventCalendar(true)}
                onClose={() => setOpenEndEventCalendar(false)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled={true}
                    sx={{
                      svg: { color: "white" },
                      input: { color: "white" },
                      label: { color: "white" },
                    }}
                    className="w-full lg:w-fit"
                    onClick={() => {
                      setOpenEndEventCalendar(true);
                    }}
                  />
                )}
                value={eventEndDate}
                onChange={(newValue) => {
                  if (newValue) setEventEndDate(newValue);
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
                  cateringEndDate: eventEndDate,
                  cateringStartDate: eventStartDate,
                  service: "CATERING",
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
