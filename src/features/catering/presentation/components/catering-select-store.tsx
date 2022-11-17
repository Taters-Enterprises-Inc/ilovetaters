import { styled, TextField, TextFieldProps } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { SearchAddress } from "features/shared/presentation/components";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { setStoreAndAddress } from "features/shared/presentation/slices/set-store-and-address.slice";
import moment from "moment";
import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import {
  selectCateringHomePage,
  setAddressCateringHomePage,
  setEventEndDateCateringHomePage,
  setEventStartDateCateringHomePage,
} from "../slices/catering-home-page.slice";
import { getStoresAvailableCatering } from "../slices/get-stores-available-catering.slice";
import { CateringStoreList } from "./catering-store-list";

const DateTimeTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  "& input": {
    color: "white !important",
    "-webkit-text-fill-color": "white !important",
  },
  "& label": {
    color: "white !important",
  },
  "& fieldset": {
    borderColor: "white !important",
  },
  "&:hover fieldset": {
    borderColor: "white !important",
  },
  "&.Mui-focused fieldset": {
    borderColor: "white !important",
  },
}));

export function CateringSelectStore() {
  const dispatch = useAppDispatch();
  const cateringHomePageState = useAppSelector(selectCateringHomePage);
  const [openStartEventCalendar, setOpenStartEventCalendar] = useState(false);
  const [openEndEventCalendar, setOpenEndEventCalendar] = useState(false);

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
    <>
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

                  dispatch(
                    getStoresAvailableCatering({
                      address: place,
                      service: "CATERING",
                    })
                  );
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
                defaultCalendarMonth={moment().add(14, "days").toDate()}
                onOpen={() => setOpenStartEventCalendar(true)}
                onClose={() => setOpenStartEventCalendar(false)}
                renderInput={(params) => (
                  <DateTimeTextField
                    {...params}
                    sx={{
                      svg: { color: "white" },
                      input: { color: "white" },
                      label: { color: "white" },
                      borderColor: "white !important",
                    }}
                    autoComplete="off"
                    onClick={() => {
                      setOpenStartEventCalendar(true);
                    }}
                    className="w-full lg:w-fit"
                  />
                )}
                value={cateringHomePageState.eventStartDate}
                onChange={(val) => {
                  if (val)
                    handleEventDateChange({ state: "start", value: val });
                }}
              />

              <DateTimePicker
                label="Select Event End Date"
                shouldDisableDate={disableDates}
                open={openEndEventCalendar}
                defaultCalendarMonth={moment().add(14, "days").toDate()}
                onOpen={() => setOpenEndEventCalendar(true)}
                onClose={() => setOpenEndEventCalendar(false)}
                renderInput={(params) => (
                  <DateTimeTextField
                    {...params}
                    sx={{
                      svg: { color: "white" },
                      input: { color: "white" },
                      label: { color: "white" },
                    }}
                    autoComplete="off"
                    className="w-full lg:w-fit"
                    onClick={() => {
                      setOpenEndEventCalendar(true);
                    }}
                  />
                )}
                value={cateringHomePageState.eventEndDate}
                onChange={(val) => {
                  if (val) handleEventDateChange({ state: "end", value: val });
                }}
              />
            </div>
          </LocalizationProvider>

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
    </>
  );
}
