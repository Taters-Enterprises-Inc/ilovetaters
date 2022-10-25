import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { AdminPasswordTextFieldSecondaryColor } from "../components";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";

interface AdminGenerateReportModalProps {
  open: boolean;
  onClose: () => void;
  onClickGenerate: (startDate: string, endDate: string) => void;
}

export function AdminGenerateReportModal(props: AdminGenerateReportModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
          <span className="text-2xl text-white">Generate Report</span>
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="flex items-center justify-center space-x-4">
                <MobileDatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />

                <MobileDatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => {
                props.onClickGenerate(
                  moment(startDate).format("YYYY-MM-DD"),
                  moment(endDate).format("YYYY-MM-DD")
                );
              }}
              className="w-[100px] py-1 text-white rounded-full bg-button"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
