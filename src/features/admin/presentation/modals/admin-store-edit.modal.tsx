import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  getAdminStore,
  GetAdminStoreState,
  selectGetAdminStore,
} from "../slices/get-admin-store.slice";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment, { Moment } from "moment";
import { updateAdminSettingStore } from "../slices/update-setting-store.slice";
import {
  resetUpdateAdminSettingStoreOperatingHours,
  selectUpdateAdminSettingStoreOperatingHours,
  updateAdminSettingStoreOperatingHours,
  UpdateAdminSettingStoreOperatingHoursState,
} from "../slices/update-setting-store-operating-hours.slice";

interface AdminStoreEditModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminStoreEditModal(props: AdminStoreEditModalProps) {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const getAdminStoreState = useAppSelector(selectGetAdminStore);

  const [availableStartTime, setAvailableStartTime] = useState<Moment | null>();
  const [availableEndTime, setAvailableEndTime] = useState<Moment | null>();

  const updateAdminSettingStoreOperatingHoursState = useAppSelector(
    selectUpdateAdminSettingStoreOperatingHours
  );
  const storeId = query.get("store_id");

  useEffect(() => {
    if (
      updateAdminSettingStoreOperatingHoursState.status ===
      UpdateAdminSettingStoreOperatingHoursState.success
    ) {
      props.onClose();
      dispatch(resetUpdateAdminSettingStoreOperatingHours());
    }
  }, [updateAdminSettingStoreOperatingHoursState, props, dispatch]);

  useEffect(() => {
    if (
      getAdminStoreState.status === GetAdminStoreState.success &&
      getAdminStoreState.data
    ) {
      setAvailableStartTime(
        moment(getAdminStoreState.data.available_start_time, "HH:mm:ss")
      );
      setAvailableEndTime(
        moment(getAdminStoreState.data.available_end_time, "HH:mm:ss")
      );
    }
  }, [getAdminStoreState, dispatch]);

  useEffect(() => {
    if (storeId) dispatch(getAdminStore(storeId));
  }, [storeId, dispatch]);

  const handleOnEdit = () => {
    if (storeId && availableStartTime && availableEndTime) {
      dispatch(
        updateAdminSettingStoreOperatingHours({
          store_id: storeId,
          available_start_time: availableStartTime.format("HH:mm:ss"),
          available_end_time: availableEndTime.format("HH:mm:ss"),
        })
      );
    }
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[400px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">Edit Store</span>
          <button className="text-2xl text-white" onClick={props.onClose}>
            <IoMdClose />
          </button>
        </div>

        {getAdminStoreState.data ? (
          <div className="px-4 py-2 space-y-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
            <span>
              {getAdminStoreState.data.name} ({" "}
              {getAdminStoreState.data.menu_name} )
            </span>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileTimePicker
                label="Available Start Time"
                value={availableStartTime}
                onChange={(newValue) => {
                  if (newValue)
                    setAvailableStartTime(moment(newValue, "HH:mm:ss"));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <MobileTimePicker
                label="Available End Time"
                value={availableEndTime}
                onChange={(newValue) => {
                  if (newValue)
                    setAvailableEndTime(moment(newValue, "HH:mm:ss"));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={props.onClose}
                className="w-[100px] py-1 text-white rounded-full bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleOnEdit}
                className="w-[100px] py-1 text-white rounded-full bg-button"
              >
                Edit
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
