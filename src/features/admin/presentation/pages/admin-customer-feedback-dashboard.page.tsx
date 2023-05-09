import { AdminHead } from "../components";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  getAdminDashboardCustomerFeedbackRatings,
  selectGetAdminDashboardCustomerFeedbackRatings,
} from "../slices/get-admin-dashboard-customer-feedback-ratings.slice";
import { MaterialInputAutoComplete } from "features/shared/presentation/components";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";
import { createQueryParams } from "features/config/helpers";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";

export function AdminCustomerFeedbackDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const query = useQuery();
  const storeId = query.get("store_id");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const getAdminDashboardCustomerFeedbackRatingsState = useAppSelector(
    selectGetAdminDashboardCustomerFeedbackRatings
  );

  console.log(getAdminDashboardCustomerFeedbackRatingsState.data);

  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  useEffect(() => {
    const defaultStoreId =
      getAdminSessionState.data?.admin.user_details.stores[0].store_id ?? 3;

    const startDateToString = moment(startDate).format("YYYY-MM-DD");
    const endDateToString = moment(endDate).format("YYYY-MM-DD");

    const query = createQueryParams({
      store_id: storeId ?? defaultStoreId,
      start_date: startDateToString,
      end_date: endDateToString,
    });

    dispatch(getAdminDashboardCustomerFeedbackRatings(query));
  }, [dispatch, storeId, getAdminSessionState, startDate, endDate]);

  return (
    <div className="flex flex-col h-full">
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Dashboard", url: "/admin/dashboard/customer-feedback" },
            {
              name: "Customer Feedback",
              url: "/admin/dashboard/customer-feedback",
            },
          ],
        }}
      />

      <div className="flex-1 px-4">
        <div className="space-y-4">
          {getAdminSessionState.data ? (
            <MaterialInputAutoComplete
              label="Select store"
              colorTheme="black"
              size="small"
              options={getAdminSessionState.data.admin.user_details.stores}
              value={
                storeId
                  ? getAdminSessionState.data.admin.user_details.stores.find(
                      (store) => store.store_id.toString() === storeId
                    )
                  : getAdminSessionState.data.admin.user_details.stores[0]
              }
              isOptionEqualToValue={(option, value) =>
                option.name + " (" + option.menu_name + ") " ===
                value.name + " (" + value.menu_name + ") "
              }
              getOptionLabel={(option) =>
                option.name + " (" + option.menu_name + ") "
              }
              onChange={(event, value) => {
                if (value) {
                  const params = {
                    store_id: value.store_id === -1 ? null : value.store_id,
                  };
                  const queryParams = createQueryParams(params);

                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
            />
          ) : null}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="flex items-start justify-start space-x-4">
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
          <div className="grid grid-cols-4 gap-4">
            {getAdminDashboardCustomerFeedbackRatingsState.data?.map(
              (dataSection) => (
                <div className="space-y-3">
                  <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] h-[100px] flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-secondary">
                      {parseFloat(dataSection.averages[1].avg).toFixed(2)}
                    </span>
                    <span className="text-sm text-secondary ">
                      {dataSection.section_name}
                    </span>
                  </div>

                  {dataSection.questions.map((question) => (
                    <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] h-[60px] mx-4 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-secondary">
                        {parseFloat(question.averages[1].avg).toFixed(2)}
                      </span>
                      <span className="text-sm text-secondary ">
                        {question.question_name}
                      </span>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="space-y-4 mt-4"></div>
      </div>
    </div>
  );
}
