import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useState, useEffect } from "react";
import {
  getHrDirectReportStaffActionItems,
  selectGetHrDirectReportStaffActionItems,
} from "../slices/get-hr-direct-report-staff-action-items.slice";
import { FaEye } from "react-icons/fa";
import { ApproveKraModal } from "./approve-kra.modal";
import { selectUpdateActionItem } from "../slices/update-action-item";
import { useNavigate } from "react-router-dom";

interface ViewDirectReportStaffActionItemsModalProps {
  modal: boolean;
  item_id: number | null;
  action_item_id: number | null;
  action_item_status_id: number | null;
  fetch_item_id: number | null;
  closeModal: () => void;
}

export function ViewDirectReportStaffActionItemsModal(
  props: ViewDirectReportStaffActionItemsModalProps
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const updateActionItemState = useAppSelector(selectUpdateActionItem);

  const [openApproveKraModal, setOpenApproveKraModal] = useState<{
    item_id: number | null;
    status_id: number | null;
    action_item_id: number | null;
    modal: boolean;
  }>({
    item_id: null,
    action_item_id: null,
    status_id: null,
    modal: false,
  });

  const getHrDirectReportStaffActionItemsState = useAppSelector(
    selectGetHrDirectReportStaffActionItems
  );

  useEffect(() => {
    if (props.fetch_item_id) {
      dispatch(getHrDirectReportStaffActionItems(props.fetch_item_id));
    }
  }, [props.modal, updateActionItemState]);

  return (
    <>
      {" "}
      <div
        className={`relative z-10 ${props.modal ? "" : "hidden"}`}
        aria-labelledby="dashboard-modal"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <form className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[80vw]">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="mt-2">
                      <div className="w-[75vw] border border-radius rounded-[10px]">
                        <table className="w-full text-left text-sm font-light">
                          <thead className="border-b">
                            <tr>
                              <th className="pl-8 py-2 text-white">Stuff</th>
                              <th className="py-2 px-4">Item</th>
                              <th className="py-2 px-4">Status</th>
                              <th className="py-2 px-4 text-white">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getHrDirectReportStaffActionItemsState.data?.action_items.map(
                              (value, index) => (
                                <tr
                                  className={`${
                                    getHrDirectReportStaffActionItemsState.data &&
                                    index >=
                                      getHrDirectReportStaffActionItemsState
                                        .data.action_items.length -
                                        1
                                      ? null
                                      : "border-b"
                                  }`}
                                >
                                  <td className="pl-8 py-2">
                                    {value.staff_name}
                                  </td>
                                  <td className="py-2 px-4">
                                    {value.item_name}
                                  </td>
                                  <td className="py-2 px-4">{value.status}</td>
                                  <td>
                                    <FaEye
                                      className={`text-lg cursor-pointer ${
                                        value.status_id == 1 ? "hidden" : ""
                                      }`}
                                      onClick={() => {
                                        if (props.fetch_item_id == 1) {
                                        }

                                        switch (props.fetch_item_id) {
                                          case 1:
                                            setOpenApproveKraModal({
                                              modal: true,
                                              action_item_id: value.id,
                                              item_id: value.item_id,
                                              status_id: value.status_id,
                                            });
                                            break;
                                          case 3:
                                            navigate(
                                              `/hr/management-assessment?staff_id=${value.staff_id}&staff_action_item_id=${value.id}`
                                            );
                                            break;
                                        }
                                      }}
                                    />
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    props.closeModal();
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ApproveKraModal
        item_id={openApproveKraModal.item_id}
        action_item_id={openApproveKraModal.action_item_id}
        modal={openApproveKraModal.modal}
        status_id={openApproveKraModal.status_id}
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
