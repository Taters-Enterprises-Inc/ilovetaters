import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  LogoutHrState,
  logoutHr,
  resetLogoutHr,
  selectLogoutHr,
} from "../slices/logout-hr.slice";
import {
  getHrSession,
  selectGetHrSession,
} from "../slices/get-hr-session.slice";
import { FaCircleUser } from "react-icons/fa6";
import { MaterialInput } from "features/shared/presentation/components/material-input";

export function HrJobDetails() {
  const dispatch = useAppDispatch();

  const logoutHrState = useAppSelector(selectLogoutHr);
  const getHrSessionState = useAppSelector(selectGetHrSession);

  useEffect(() => {
    if (logoutHrState.status === LogoutHrState.success) {
      dispatch(getHrSession());
      dispatch(resetLogoutHr());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutHrState]);

  return (
    <>
      <Helmet>
        <title>Taters | Human Resourcee</title>
      </Helmet>
      <main className="min-h-screen text-[#242424] flex flex-col items-stretch border-b-[#F2F2F2]">
        <div className="border-b h-[50px] px-[24px] flex items-center flex justify-between flex-initial">
          <img
            src="https://www.ilovetaters.com/api/assets/images/shared/logo/taters-logo.png"
            alt="Taters Logo"
            className="w-[80px] "
          />
          <div className="flex items-center space-x-8">
            <div className="flex flex-col justify-center items-center">
              <img
                alt=""
                className="rounded-[50%] w-[25px] h-[25px] bg-[#F2F2F2] border border-gray "
                src="https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png"
                loading="lazy"
                role="presentation"
              />
              <span className="text-[11px] text-[#6B6B6B] font-[400] hover:text-black cursor-pointer ">
                {getHrSessionState.data?.hr.user_personal_details?.first_name}
              </span>
            </div>

            <span
              onClick={() => {
                dispatch(logoutHr());
              }}
              className="text-[11px] font-[400] hover:text-black cursor-pointer bg-red-700 px-4 pt-[1px] pb-[2px] rounded-full text-white"
            >
              Logout
            </span>
          </div>
        </div>

        <div className="flex flex-col overflow-y-auto h-[1500px] pt-8">
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Hiring Date"
            name="hiring_date"
            defaultValue={
              getHrSessionState.data?.hr.user_job_details?.hiring_date
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Tenure"
            name="tenure"
            defaultValue={getHrSessionState.data?.hr.user_job_details?.tenure}
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Company"
            name="company"
            defaultValue={getHrSessionState.data?.hr.user_job_details?.company}
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Department"
            name="department"
            defaultValue={
              getHrSessionState.data?.hr.user_job_details?.department
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Position"
            name="position"
            defaultValue={getHrSessionState.data?.hr.user_job_details?.position}
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Employee Status"
            name="position"
            defaultValue={
              getHrSessionState.data?.hr.user_job_details?.employee_status
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
        </div>
      </main>
    </>
  );
}
