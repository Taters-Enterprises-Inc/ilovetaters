import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { SearchAddress } from "features/shared/presentation/components/search-address";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import {
  selectSetStoreAndAddress,
  setStoreAndAddress,
  SetStoreAndAddressState,
} from "features/shared/presentation/slices/set-store-and-address.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { CateringStoreList } from "../components";
import { getStoresAvailableCatering } from "../slices/get-stores-available-catering.slice";
import moment from "moment";
import {
  selectCateringHomePage,
  setEventEndDateCateringHomePage,
  setEventStartDateCateringHomePage,
  setAddressCateringHomePage,
} from "../slices/catering-home-page.slice";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { CateringHeroCarousel } from "../components/catering-hero.carousel";
import { MaterialDateTimeInput } from "features/shared/presentation/components";

export function CateringHome() {
  const dispatch = useAppDispatch();
  const cateringHomePageState = useAppSelector(selectCateringHomePage);
  const [openStartEventCalendar, setOpenStartEventCalendar] = useState(false);
  const [openEndEventCalendar, setOpenEndEventCalendar] = useState(false);

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

  const disableDates = (date: Date) => {
    return moment(date) <= moment().add(13, "days");
  };

  const eventDateOnChangeValidations = (param: {
    state: "start" | "end";
    start: Date | null;
    end: Date | null;
    setCurrentCalendarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    validCallBack: () => void;
  }) => {
    if (param.start === null && param.end) {
      dispatch(
        setEventStartDateCateringHomePage({
          eventStartDate: moment(param.end).subtract(3, "hours").toDate(),
        })
      );
    }

    if (param.start && param.end && param.state === "end") {
      const startDateTime = moment(param.start);
      const endDateTime = moment(param.end);

      const _3hoursBeforeTheStartDate = startDateTime
        .add(2, "hours")
        .add(59, "minutes");

      if (_3hoursBeforeTheStartDate.isSameOrAfter(endDateTime)) {
        dispatch(
          popUpSnackBar({
            message:
              "Please select valid end date. Event must be 3 hours and beyond",
            severity: "error",
          })
        );
        param.setCurrentCalendarModalOpen(false);
        return;
      }
    }

    param.validCallBack();
  };

  const handleEventDateChange = (param: {
    state: "start" | "end";
    value: Date;
  }) => {
    switch (param.state) {
      case "start":
        eventDateOnChangeValidations({
          state: param.state,
          start: param.value,
          end: cateringHomePageState.eventEndDate,
          setCurrentCalendarModalOpen: setOpenStartEventCalendar,
          validCallBack: () => {
            dispatch(
              setEventStartDateCateringHomePage({
                eventStartDate: param.value,
              })
            );

            dispatch(
              setEventEndDateCateringHomePage({
                eventEndDate: moment(param.value).add(3, "hours").toDate(),
              })
            );
          },
        });
        break;
      case "end":
        eventDateOnChangeValidations({
          state: param.state,
          start: cateringHomePageState.eventStartDate,
          end: param.value,
          setCurrentCalendarModalOpen: setOpenEndEventCalendar,
          validCallBack: () => {
            dispatch(
              setEventEndDateCateringHomePage({
                eventEndDate: param.value,
              })
            );
          },
        });
        break;
    }
  };

  return (
    <main className="min-h-screen bg-primary">
      <CateringHeroCarousel />
      <section className="container pb-96">
        <h1 className='text-white text-lg pt-4 pb-2 font-["Bebas_Neue"] tracking-[2px] text-center leading-tight'>
          Thank you for considering Taters for your celebration.{" "}
          <span className="block lg:inline">
            {" "}
            Kindly key in your event details.{" "}
          </span>
        </h1>

        <div className="space-y-4">
          <div className="flex justify-center">
            <label className="pure-material-textfield-outlined w-[100%]">
              <SearchAddress
                value={
                  cateringHomePageState.address
                    ? cateringHomePageState.address
                    : ""
                }
                onDenied={() => {
                  dispatch(
                    getStoresAvailableCatering({
                      address: null,
                      service: "CATERING",
                    })
                  );
                }}
                onPrompt={() => {
                  dispatch(
                    getStoresAvailableCatering({
                      address: null,
                      service: "CATERING",
                    })
                  );
                }}
                onLocateCurrentAddress={(place: string) => {
                  dispatch(setAddressCateringHomePage({ address: place }));
                  dispatch(
                    getStoresAvailableCatering({
                      address: place,
                      service: "CATERING",
                    })
                  );
                }}
                onChange={(value: string) => {
                  dispatch(setAddressCateringHomePage({ address: value }));
                }}
                onPlaceSelected={(place: string) => {
                  dispatch(setAddressCateringHomePage({ address: place }));
                }}
              />
              <span>Search Address</span>
            </label>
          </div>
          <div className="space-y-4 lg:space-y-0 lg:space-x-4 flex flex-col sm:flex-row">
            <MaterialDateTimeInput
              label="Select Event Start Date"
              colorTheme="white"
              openCalendar={openStartEventCalendar}
              setOpenCalendar={(val) => {
                setOpenStartEventCalendar(val);
              }}
              shouldDisableDate={disableDates}
              defaultCalendarMonth={moment().add(14, "days").toDate()}
              value={cateringHomePageState.eventStartDate}
              onChange={(val) => {
                if (val) handleEventDateChange({ state: "start", value: val });
              }}
            />

            <MaterialDateTimeInput
              label="Select Event End Date"
              colorTheme="white"
              openCalendar={openEndEventCalendar}
              setOpenCalendar={(val) => {
                setOpenEndEventCalendar(val);
              }}
              shouldDisableDate={disableDates}
              defaultCalendarMonth={moment().add(14, "days").toDate()}
              value={cateringHomePageState.eventEndDate}
              onChange={(val) => {
                if (val) handleEventDateChange({ state: "end", value: val });
              }}
            />
          </div>

          <button
            onClick={() => {
              if (cateringHomePageState.address === null) {
                dispatch(
                  popUpSnackBar({
                    message: "Please input an address",
                    severity: "error",
                  })
                );
                return;
              }

              if (cateringHomePageState.eventStartDate === null) {
                dispatch(
                  popUpSnackBar({
                    message: "Please select a event end date",
                    severity: "error",
                  })
                );
                return;
              }

              if (cateringHomePageState.eventEndDate === null) {
                dispatch(
                  popUpSnackBar({
                    message: "Please select a event end date",
                    severity: "error",
                  })
                );
                return;
              }

              dispatch(
                getStoresAvailableCatering({
                  address: cateringHomePageState.address,
                  service: "CATERING",
                })
              );
            }}
            className="flex items-center justify-center px-4 py-2 space-x-2 text-lg font-bold text-white border border-white bg-button rounded-xl"
          >
            <FaSearchLocation />
            <span>Check Availability</span>
          </button>

          <CateringStoreList
            onClickStore={(storeId: number, regionId: number) => {
              if (
                cateringHomePageState &&
                cateringHomePageState.address &&
                cateringHomePageState.eventStartDate &&
                cateringHomePageState.eventEndDate
              ) {
                dispatch(
                  setStoreAndAddress({
                    address: cateringHomePageState.address,
                    storeId,
                    regionId,
                    cateringEndDate: cateringHomePageState.eventEndDate,
                    cateringStartDate: cateringHomePageState.eventStartDate,
                    service: "CATERING",
                  })
                );
              } else {
                if (cateringHomePageState.eventStartDate === null) {
                  dispatch(
                    popUpSnackBar({
                      message: "Please select valid start date.",
                      severity: "error",
                    })
                  );
                } else if (cateringHomePageState.eventStartDate === null) {
                  dispatch(
                    popUpSnackBar({
                      message: "Please select valid end date. ",
                      severity: "error",
                    })
                  );
                } else if (cateringHomePageState.address === null) {
                  dispatch(
                    popUpSnackBar({
                      message: "Please select valid address.",
                      severity: "error",
                    })
                  );
                }
              }
            }}
            address={cateringHomePageState.address}
          />
        </div>
      </section>
    </main>
  );
}
