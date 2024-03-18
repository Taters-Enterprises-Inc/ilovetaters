import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import moment from "moment";
import { MaterialDateTimeInput } from "features/shared/presentation/components";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { getAdminCateringBooking } from "../slices/get-admin-catering-booking.slice";
import { selectAdminCateringBookingOverrideEventDate } from "../slices/admin-catering-booking-override-event-date.slice";

interface AdminOverrideDateModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onClickOverride: (startDate: Date, endDate: Date) => void;
}

export function AdminOverrideDateModal(props: AdminOverrideDateModalProps) {
  const query = useQuery();
  const dispatch = useAppDispatch();

  const [openStartDateCalendar, setOpenStartDateCalendar] = useState(false);
  const [openEndDateCalendar, setOpenEndDateCalendar] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const trackingNo = query.get("tracking_no");

  const adminCateringBookingOverrideEventDateState = useAppSelector(
    selectAdminCateringBookingOverrideEventDate
  );

  useEffect(() => {
    if (trackingNo) {
      dispatch(getAdminCateringBooking(trackingNo));
    }
  }, [dispatch, trackingNo, adminCateringBookingOverrideEventDateState]);

  const disableDates = (date: Date) => {
    return moment(date) <= moment().add(13, "days");
  };

  if (props.open) {
    const shopOrderModal = document.getElementById("shop-order-modal");
    if (shopOrderModal) {
      shopOrderModal.classList.remove("overflow-auto");
    }
  } else {
    const shopOrderModal = document.getElementById("shop-order-modal");
    if (shopOrderModal) {
      shopOrderModal.classList.add("overflow-auto");
    }
    return null;
  }

  const eventDateOnChangeValidations = (param: {
    state: "start" | "end";
    start: Date | null;
    end: Date | null;
    setCurrentCalendarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    validCallBack: () => void;
  }) => {
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
          end: endDate,
          setCurrentCalendarModalOpen: setOpenStartDateCalendar,
          validCallBack: () => {
            setStartDate(param.value);
            setEndDate(moment(param.value).add(3, "hours").toDate());
          },
        });
        break;
      case "end":
        eventDateOnChangeValidations({
          state: param.state,
          start: startDate,
          end: param.value,
          setCurrentCalendarModalOpen: setOpenEndDateCalendar,
          validCallBack: () => {
            setEndDate(param.value);
          },
        });
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[600px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">{props.title}</span>
          <button
            className="text-2xl text-white"
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="px-4 pt-6 pb-2 space-y-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
          <div>
            <div className="flex items-center justify-center space-x-4">
              <MaterialDateTimeInput
                label="Start Date"
                colorTheme="black"
                openCalendar={openStartDateCalendar}
                setOpenCalendar={(val) => {
                  setOpenStartDateCalendar(val);
                }}
                defaultCalendarMonth={moment().add(14, "days").toDate()}
                shouldDisableDate={disableDates}
                value={startDate}
                onChange={(val) => {
                  if (val)
                    handleEventDateChange({ state: "start", value: val });
                }}
              />

              <MaterialDateTimeInput
                label="End Date"
                colorTheme="black"
                openCalendar={openEndDateCalendar}
                setOpenCalendar={(val) => {
                  setOpenEndDateCalendar(val);
                }}
                shouldDisableDate={disableDates}
                defaultCalendarMonth={moment().add(14, "days").toDate()}
                value={endDate}
                onChange={(val) => {
                  if (val) handleEventDateChange({ state: "end", value: val });
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => {
                if (startDate != null && endDate != null) {
                  props.onClickOverride(startDate, endDate);
                }
              }}
              className="w-[100px] py-1 text-white rounded-full bg-button"
            >
              Override
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
