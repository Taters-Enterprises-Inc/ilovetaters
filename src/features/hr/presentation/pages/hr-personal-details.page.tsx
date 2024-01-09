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
import { MaterialInput } from "features/shared/presentation/components";

export function HrPersonalDetails() {
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
          <FaCircleUser size={200} className="ml-8" />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Name"
            name="name"
            defaultValue={
              getHrSessionState.data?.hr.user_personal_details?.first_name +
              " " +
              getHrSessionState.data?.hr.user_personal_details?.last_name
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Gender"
            name="gender"
            defaultValue={
              getHrSessionState.data?.hr.user_personal_details?.gender
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Date of Birth"
            name="date_of_birth"
            defaultValue={
              getHrSessionState.data?.hr.user_personal_details?.date_of_birth
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Education"
            name="education"
            defaultValue={
              getHrSessionState.data?.hr.user_personal_details?.education
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Marital Status"
            name="marital_status"
            defaultValue={
              getHrSessionState.data?.hr.user_personal_details?.marital_status
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="SSS#"
            name="sss_no"
            defaultValue={
              getHrSessionState.data?.hr.user_personal_details?.sss_no
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="TIN"
            name="tin_no"
            defaultValue={
              getHrSessionState.data?.hr.user_personal_details?.tin_no
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="PhilHealth"
            name="phil_health"
            defaultValue={
              getHrSessionState.data?.hr.user_personal_details?.philhealth_no
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
          <MaterialInput
            onChange={() => {}}
            colorTheme="black"
            required
            label="Pag-ibig"
            name="pag_ibig_no"
            defaultValue={
              getHrSessionState.data?.hr.user_personal_details?.pagibig_no
            }
            style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
          />
        </div>
      </main>
    </>
  );
}
