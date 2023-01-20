import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { SearchAddress } from "features/shared/presentation/components/search-address";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectCateringHomePage,
  setAddressCateringHomePage,
  setEventEndDateCateringHomePage,
  setEventStartDateCateringHomePage,
} from "../slices/catering-home-page.slice";
import { selectGetCateringPackageDetails } from "../slices/get-catering-package-details.slice";
import { getStoresAvailableCateringModal } from "../slices/get-stores-available-catering-modal.slice";
import {
  selectSetCateringPackageStoreAndAddress,
  setCateringPackageStoreAndAddress,
  SetCateringPackageStoreAndAddressState,
} from "../slices/set-catering-package-store-and-address.slice";
import { CateringStoreCluster } from "./catering-store-cluster";

const DateTimeTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  "& input": {
    color: "white !important",
    WebkitTextFillColor: "white !important",
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

export function CateringStoreChooser() {
  const dispatch = useAppDispatch();
  const cateringHomePageState = useAppSelector(selectCateringHomePage);
  const [openStartEventCalendar, setOpenStartEventCalendar] = useState(false);
  const [openEndEventCalendar, setOpenEndEventCalendar] = useState(false);

  const setCateringPackageStoreAndAddressState = useAppSelector(
    selectSetCateringPackageStoreAndAddress
  );

  const getCateringPackageDetailsState = useAppSelector(
    selectGetCateringPackageDetails
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (
      setCateringPackageStoreAndAddressState.status ===
      SetCateringPackageStoreAndAddressState.success
    ) {
      dispatch(getSession());
      document.body.classList.remove("overflow-hidden");
    }
  }, [setCateringPackageStoreAndAddressState, navigate, dispatch]);

  useEffect(() => {
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
      <section className=" pb-96">
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
                  if (
                    getCateringPackageDetailsState.data?.product.product_hash
                  ) {
                    dispatch(
                      getStoresAvailableCateringModal({
                        address: null,
                        service: "CATERING",
                        hash: getCateringPackageDetailsState.data.product
                          .product_hash,
                      })
                    );
                  }
                }}
                onPrompt={() => {
                  if (
                    getCateringPackageDetailsState.data?.product.product_hash
                  ) {
                    dispatch(
                      getStoresAvailableCateringModal({
                        address: null,
                        service: "CATERING",
                        hash: getCateringPackageDetailsState.data.product
                          .product_hash,
                      })
                    );
                  }
                }}
                onLocateCurrentAddress={(place: string) => {
                  if (
                    getCateringPackageDetailsState.data?.product.product_hash
                  ) {
                    dispatch(setAddressCateringHomePage({ address: place }));
                    dispatch(
                      getStoresAvailableCateringModal({
                        address: place,
                        service: "CATERING",

                        hash: getCateringPackageDetailsState.data.product
                          .product_hash,
                      })
                    );
                  }
                }}
                onChange={(value: string) => {
                  dispatch(setAddressCateringHomePage({ address: value }));
                }}
                onPlaceSelected={(place: string) => {
                  if (
                    getCateringPackageDetailsState.data?.product.product_hash
                  ) {
                    dispatch(setAddressCateringHomePage({ address: place }));
                    dispatch(
                      getStoresAvailableCateringModal({
                        address: place,
                        service: "CATERING",

                        hash: getCateringPackageDetailsState.data.product
                          .product_hash,
                      })
                    );
                  }
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
                getStoresAvailableCateringModal({
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

          <CateringStoreCluster
            onClickStore={(storeId: number, regionId: number) => {
              if (
                cateringHomePageState &&
                cateringHomePageState.address &&
                cateringHomePageState.eventStartDate &&
                cateringHomePageState.eventEndDate
              ) {
                dispatch(
                  setCateringPackageStoreAndAddress({
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
