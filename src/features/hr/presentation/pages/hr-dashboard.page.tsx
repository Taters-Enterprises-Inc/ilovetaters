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

  const [openApproveKraModal, setOpenApproveKraModal] = useState<{
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
                {getHrSessionState.data?.hr.user_details.first_name}
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
                  <th className="pl-8 py-2">Module</th>
                  <th className="py-2">Item</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {getHrActionItemsState.data?.action_items.map(
                  (value, index) => (
                    <tr
                      className={`${
                        getHrActionItemsState.data &&
                        index ==
                          getHrActionItemsState.data.action_items.length - 1
                          ? ""
                          : "border-b"
                      }`}
                    >
                      <td className="pl-8 py-2">{value.module}</td>
                      <td className="py-2">{value.item}</td>
                      <td className="py-2">{value.status}</td>
                      <td className="py-2">
                        <FaEye
                          onClick={() => {
                            if (
                              value.item_id == 1 &&
                              value.status_id != undefined
                            ) {
                              setOpenCreateKraModal({
                                item_id: value.item_id,
                                action_item_id: value.id,
                                action_item_status_id: value.status_id,
                                modal: true,
                              });
                            } else if (
                              value.item_id == 2 &&
                              value.status_id != undefined
                            ) {
                              setOpenApproveKraModal({
                                item_id: value.item_id,
                                action_item_id: value.id,
                                action_item_status_id: value.status_id,
                                modal: true,
                              });
                            } else if (
                              value.item_id == 3 &&
                              value.status_id != undefined
                            ) {
                              navigate("/hr/self-assessment");
                            }
                          }}
                          className="text-lg cursor-pointer"
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
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
        modal={openApproveKraModal.modal}
        item_id={openApproveKraModal.item_id}
        action_item_id={openApproveKraModal.action_item_id}
        action_item_status_id={openApproveKraModal.action_item_status_id}
        closeModal={() => {
          setOpenApproveKraModal({
            ...openApproveKraModal,
            modal: false,
          });
        }}
      />
    </>
  );
}
