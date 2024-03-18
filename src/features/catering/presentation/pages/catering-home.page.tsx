import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { MaterialInputAddress } from "features/shared/presentation/components";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import {
  resetCateringStoreAndAddress,
  selectSetCateringStoreAndAddress,
  setCateringStoreAndAddress,
  SetCateringStoreAndAddressState,
} from "features/catering/presentation/slices/set-catering-store-and-address.slice";
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
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";

export function CateringHome() {
  const dispatch = useAppDispatch();
  const [openStartEventCalendar, setOpenStartEventCalendar] = useState(false);
  const [openEndEventCalendar, setOpenEndEventCalendar] = useState(false);

  const setCateringStoreAndAddressState = useAppSelector(
    selectSetCateringStoreAndAddress
  );
  const cateringHomePageState = useAppSelector(selectCateringHomePage);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(storeReset());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (
      setCateringStoreAndAddressState.status ===
      SetCateringStoreAndAddressState.success
    ) {
      dispatch(getSession());
      navigate("products");
      dispatch(resetCateringStoreAndAddress());
      document.body.classList.remove("overflow-hidden");
    }
  }, [setCateringStoreAndAddressState, navigate, dispatch]);

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
      <section className="lg:container">
        <CateringHeroCarousel />
      </section>
      <section className="container pb-96">
        <h1 className='text-white text-lg pt-4 pb-6 font-["Bebas_Neue"] tracking-[2px] text-center leading-tight'>
          Thank you for considering Taters for your celebration.{" "}
          <span className="block lg:inline">
            {" "}
            Kindly key in your event details.{" "}
          </span>
        </h1>

        <div className="space-y-4">
          <MaterialInputAddress
            geolocate={true}
            colorTheme="white"
            value={
              cateringHomePageState.address ? cateringHomePageState.address : ""
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
            onLocateCurrentAddress={(location) => {
              dispatch(
                setAddressCateringHomePage({
                  address: location.formattedAddress,
                })
              );
              dispatch(
                getStoresAvailableCatering({
                  address: location.formattedAddress,
                  service: "CATERING",
                })
              );
            }}
            onChange={(value: string) => {
              dispatch(setAddressCateringHomePage({ address: value }));
            }}
            onPlaceSelected={(location) => {
              dispatch(
                setAddressCateringHomePage({
                  address: location.formattedAddress,
                })
              );

              dispatch(
                getStoresAvailableCatering({
                  address: location.formattedAddress,
                  service: "CATERING",
                })
              );
            }}
          />
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:space-x-4 sm:flex-row">
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

          <CateringStoreList
            onClickStore={(
              storeId: number,
              regionId: number,
              type: "catering" | "bulk-order-pickup" | "bulk-order-delivery"
            ) => {
              if (
                cateringHomePageState &&
                cateringHomePageState.address &&
                cateringHomePageState.eventStartDate &&
                cateringHomePageState.eventEndDate
              ) {
                dispatch(
                  setCateringStoreAndAddress({
                    address: cateringHomePageState.address,
                    storeId,
                    regionId,
                    cateringEndDate: cateringHomePageState.eventEndDate,
                    cateringStartDate: cateringHomePageState.eventStartDate,
                    cateringType: type,
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
