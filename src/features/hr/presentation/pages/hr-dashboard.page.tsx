import { Helmet } from "react-helmet";
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CreateKraModal } from "../modals";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getHrKras, selectGetHrKras } from "../slices/get-hr-kras.slice";
import { useNavigate } from "react-router-dom";
import {
  getHrActionItems,
  selectGetHrActionItems,
} from "../slices/get-hr-action-items.slice";
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
import { ViewDirectReportStaffActionItemsModal } from "../modals/view-direct-report-staff-action-items.modal";

export function HrDashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openCreateKraModal, setOpenCreateKraModal] = useState<{
    modal: boolean;
    item_id: number | null;
    action_item_id: number | null;
    action_item_status_id: number | null;
  }>({
    modal: false,
    item_id: null,
    action_item_id: null,
    action_item_status_id: null,
  });

  const [openStaffActionItemModal, setOpenStaffActionItemModal] = useState<{
    modal: boolean;
    item_id: number | null;
    action_item_id: number | null;
    action_item_status_id: number | null;
    fetch_item_id: number | null;
  }>({
    modal: false,
    item_id: null,
    action_item_id: null,
    action_item_status_id: null,
    fetch_item_id: null,
  });

  const getHrActionItemsState = useAppSelector(selectGetHrActionItems);
  const logoutHrState = useAppSelector(selectLogoutHr);
  const getHrSessionState = useAppSelector(selectGetHrSession);

  useEffect(() => {
    dispatch(getHrKras());
    dispatch(getHrActionItems());
  }, []);

  useEffect(() => {
    if (logoutHrState.status === LogoutHrState.success) {
      dispatch(getHrSession());
      dispatch(resetLogoutHr());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutHrState]);

  const cardClicked = (value: any) => {
    if (value.item_id == 1 && value.status_id != undefined) {
      setOpenCreateKraModal({
        item_id: value.item_id,
        action_item_id: value.id,
        action_item_status_id: value.status_id,
        modal: true,
      });
    } else if (
      (value.item_id == 2 || value.item_id == 4 || value.item_id == 6) &&
      value.status_id != undefined
    ) {
      setOpenStaffActionItemModal({
        item_id: value.item_id,
        action_item_id: value.id,
        action_item_status_id: value.status_id,
        modal: true,
        fetch_item_id:
          value.item_id == 2
            ? 1
            : value.item_id == 4
            ? 3
            : value.item_id == 6
            ? 5
            : 0,
      });
    } else if (value.item_id == 3 && value.status_id != undefined) {
      navigate("/hr/self-assessment");
    } else if (value.item_id == 5 && value.status_id != undefined) {
      navigate("/hr/180-degree-assessment");
    } else if (value.item_id == 7 && value.status_id != undefined) {
      navigate("/hr/assessment-summary");
    }
  };

  return (
    <>
      <Helmet>
        <title>Taters | Human Resourcee</title>
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

        <section className="flex-auto flex justify-start items-start py-8 px-8 space-x-2">
          <div className="border border-[#D4D4D5] border-radius rounded-[5px] h-[600px] bg-[#F2F2F3] p-4 flex-1">
            <h1 className="font-bold text-lg mb-4">
              Todo 📝{" "}
              <span className="rounded-[10px] bg-white text-[12px]  border border-[#D4D4D5] font-semibold py-[2px] px-2">
                {
                  getHrActionItemsState.data?.action_items.filter(
                    (item) => item.status_id == 1
                  ).length
                }
              </span>
            </h1>

            <div className="space-y-2">
              {getHrActionItemsState.data?.action_items
                .filter((item) => item.status_id == 1)
                .map((value, index) => (
                  <div
                    className="bg-white  shadow-md flex flex-col px-2 pt-4  cursor-pointer"
                    onClick={() => cardClicked(value)}
                  >
                    <div className="flex-1 mb-4">
                      <h2>{value.item}</h2>
                    </div>

                    <div className="space-x-1 pb-2">
                      {/* <span className="text-[12px] font-semibold bg-[#61BD4F] rounded-[4px] text-white px-[5px] py-[2px]">
                  Needs review
                </span> */}

                      {value.status_id == 1 ? (
                        <span className="text-[12px] font-semibold bg-[#F2D600] rounded-[4px] text-white px-[5px] py-[2px]">
                          Pending
                        </span>
                      ) : null}
                      <span className="text-[12px] font-semibold bg-[#C377E0] rounded-[4px] text-white px-[5px] py-[2px]">
                        {value.module} 🚩
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="border border-[#D4D4D5] border-radius rounded-[5px] h-[600px] bg-[#F2F2F3] p-4 flex-1">
            <h1 className="font-bold text-lg mb-4">
              In Progress 🚀{" "}
              <span className="rounded-[10px] bg-white text-[12px]  border border-[#D4D4D5] font-semibold py-[2px] px-2">
                {
                  getHrActionItemsState.data?.action_items.filter(
                    (item) => item.status_id == 2
                  ).length
                }
              </span>
            </h1>

            <div className="space-y-2">
              {getHrActionItemsState.data?.action_items
                .filter((item) => item.status_id == 2)
                .map((value, index) => (
                  <div
                    className="bg-white  shadow-md flex flex-col px-2 pt-4  cursor-pointer"
                    onClick={() => cardClicked(value)}
                  >
                    <div className="flex-1 mb-4">
                      <h2>{value.item}</h2>
                    </div>

                    <div className="space-x-1 pb-2">
                      {value.status_id == 2 ? (
                        <span className="text-[12px] font-semibold bg-[#61BD4F] rounded-[4px] text-white px-[5px] py-[2px]">
                          Completed
                        </span>
                      ) : null}
                      <span className="text-[12px] font-semibold bg-[#C377E0] rounded-[4px] text-white px-[5px] py-[2px]">
                        {value.module} 🚩
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="border border-[#D4D4D5] border-radius rounded-[5px] h-[600px] bg-[#F2F2F3] p-4 flex-1">
            <h1 className="font-bold text-lg mb-4">
              Done ✅{" "}
              <span className="rounded-[10px] bg-white text-[12px]  border border-[#D4D4D5] font-semibold py-[2px] px-2">
                {
                  getHrActionItemsState.data?.action_items.filter(
                    (item) => item.status_id == 4
                  ).length
                }
              </span>
            </h1>

            <div className="space-y-2">
              {getHrActionItemsState.data?.action_items
                .filter((item) => item.status_id == 4)
                .map((value, index) => (
                  <div
                    className="bg-white  shadow-md flex flex-col px-2 pt-4  cursor-pointer"
                    onClick={() => cardClicked(value)}
                  >
                    <div className="flex-1 mb-4">
                      <h2>{value.item}</h2>
                    </div>

                    <div className="space-x-1 pb-2">
                      {value.status_id == 4 ? (
                        <span className="text-[12px] font-semibold bg-[#FF9F1A] rounded-[4px] text-white px-[5px] py-[2px]">
                          Manager Reviewed
                        </span>
                      ) : null}
                      <span className="text-[12px] font-semibold bg-[#C377E0] rounded-[4px] text-white px-[5px] py-[2px]">
                        {value.module} 🚩
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="border border-[#D4D4D5] border-radius rounded-[5px] h-[600px] bg-[#F2F2F3] p-4 flex-1">
            <h1 className="font-bold text-lg mb-4">
              Backlog ⌛{" "}
              <span className="rounded-[10px] bg-white text-[12px]  border border-[#D4D4D5] font-semibold py-[2px] px-2">
                {
                  getHrActionItemsState.data?.action_items.filter(
                    (item) => item.status_id == 3 || item.status_id == 5
                  ).length
                }
              </span>
            </h1>

            <div className="space-y-2">
              {getHrActionItemsState.data?.action_items
                .filter((item) => item.status_id == 3 || item.status_id == 5)
                .map((value, index) => (
                  <div
                    className="bg-white  shadow-md flex flex-col px-2 pt-4  cursor-pointer"
                    onClick={() => cardClicked(value)}
                  >
                    <div className="flex-1 mb-4">
                      <h2>{value.item}</h2>
                    </div>

                    <div className="space-x-1 pb-2">
                      {value.status_id == 5 ? (
                        <span className="text-[12px] font-semibold bg-[#009AA5] rounded-[4px] text-white px-[5px] py-[2px]">
                          Summary
                        </span>
                      ) : null}
                      {value.status_id == 3 ? (
                        <span className="text-[12px] font-semibold bg-[#EB5A46] rounded-[4px] text-white px-[5px] py-[2px]">
                          Approved
                        </span>
                      ) : null}
                      <span className="text-[12px] font-semibold bg-[#C377E0] rounded-[4px] text-white px-[5px] py-[2px]">
                        {value.module} 🚩
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>

      <CreateKraModal
        modal={openCreateKraModal.modal}
        item_id={openCreateKraModal.item_id}
        action_item_id={openCreateKraModal.action_item_id}
        action_item_status_id={openCreateKraModal.action_item_status_id}
        closeModal={() => {
          setOpenCreateKraModal({
            ...openCreateKraModal,
            modal: false,
          });
        }}
      />
      <ViewDirectReportStaffActionItemsModal
        modal={openStaffActionItemModal.modal}
        item_id={openStaffActionItemModal.item_id}
        action_item_id={openStaffActionItemModal.action_item_id}
        action_item_status_id={openStaffActionItemModal.action_item_status_id}
        fetch_item_id={openStaffActionItemModal.fetch_item_id}
        closeModal={() => {
          setOpenStaffActionItemModal({
            ...openStaffActionItemModal,
            modal: false,
          });
        }}
      />
    </>
  );
}
