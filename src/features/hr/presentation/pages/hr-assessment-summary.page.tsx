import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { Helmet } from "react-helmet";
import {
  getHrSession,
  selectGetHrSession,
} from "../slices/get-hr-session.slice";
import {
  LogoutHrState,
  logoutHr,
  resetLogoutHr,
  selectLogoutHr,
} from "../slices/logout-hr.slice";
import { useEffect } from "react";
import {
  getHrAppraisalSummary,
  selectGetHrAppraisalSummary,
} from "../slices/get-hr-appraisal-summary.slice";

export function HrAssessmentSummary() {
  const dispatch = useAppDispatch();

  const logoutHrState = useAppSelector(selectLogoutHr);

  const getHrSessionState = useAppSelector(selectGetHrSession);
  const getHrAppraisalSummaryState = useAppSelector(
    selectGetHrAppraisalSummary
  );

  useEffect(() => {
    dispatch(getHrAppraisalSummary());
  }, [dispatch]);

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
        <title>Taters | Assessment Summary</title>
      </Helmet>

      <main className="min-h-screen text-[#242424] flex flex-col  border-b-[#F2F2F2]">
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

        <section className="flex-auto flex justify-center items-start py-8">
          <div className="w-[80vw] border border-radius rounded-[10px]">
            <table className="w-full text-left text-sm font-light">
              <thead className="border-b">
                <tr>
                  <th className="pl-8 py-2"></th>
                  <th className="py-2 border-r"></th>
                  <th className="py-2 text-center border-r" colSpan={2}>
                    Self Assessment
                  </th>
                  <th className="py-2 text-center border-r" colSpan={2}>
                    Manager Assessment
                  </th>
                  <th className="py-2 text-center">Overall Rating</th>
                </tr>
              </thead>

              <tbody>
                {getHrAppraisalSummaryState.data?.map((e) => (
                  <>
                    {e.columns.length == 3 ? (
                      <tr className="border-b">
                        <td
                          className="pl-8 py-2 border-r w-[250px]"
                          colSpan={2}
                        >
                          <span className="font-bold">{e.name}</span> <br />
                          <span>{e.description}</span>
                        </td>
                        {e.columns.map((col, index) => (
                          <td
                            className={`pl-8 py-2 text-center ${
                              index != e.columns.length - 1 ? " border-r" : null
                            } ${e.is_overall ? "font-bold" : null}`}
                            colSpan={2}
                          >
                            {col}
                          </td>
                        ))}
                      </tr>
                    ) : null}

                    {e.columns.length == 6 ? (
                      <tr className="border-b">
                        <td className="pl-8 py-2 w-[250px]">
                          <span className="font-bold">{e.name}</span>
                          <br />
                          <span>{e.description}</span>
                        </td>
                        {e.columns.map((col, index) => (
                          <td
                            className={`pl-8 py-2 text-center ${
                              index != e.columns.length - 1 ? " border-r" : null
                            }`}
                          >
                            {col}
                          </td>
                        ))}
                      </tr>
                    ) : null}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
