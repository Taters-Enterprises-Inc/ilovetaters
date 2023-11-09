import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  getHrDirectReportStaffKras,
  selectGetHrDirectReportStaffKras,
} from "../slices/get-hr-direct-report-staff-kras.slice";
import {
  selectUpdateActionItem,
  updateActionItem,
} from "../slices/update-action-item";
interface ApproveKraModalProps {
  action_item_id: number | null;
  item_id: number | null;
  status_id: number | null;
  modal: boolean;
  closeModal: () => void;
}

export function ApproveKraModal(props: ApproveKraModalProps) {
  const dispatch = useAppDispatch();

  const getHrDirectReportStaffKrasState = useAppSelector(
    selectGetHrDirectReportStaffKras
  );

  const updateActionItemState = useAppSelector(selectUpdateActionItem);

  useEffect(() => {
    props.closeModal();
  }, [updateActionItemState]);

  useEffect(() => {
    if (props.action_item_id) {
      dispatch(getHrDirectReportStaffKras(props.action_item_id));
    }
  }, [props.action_item_id]);

  const handleApproved = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (props.action_item_id && props.item_id) {
      dispatch(
        updateActionItem({
          item_id: props.item_id,
          action_item_id: props.action_item_id,
          status: 3,
        })
      );
    }
  };

  return (
    <div
      className={`relative z-10 ${props.modal ? "" : "hidden"}`}
      aria-labelledby="dashboard-modal"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <form
            onSubmit={handleApproved}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <div className="w-[450px] border border-radius rounded-[10px]">
                      <table className="w-full text-left text-sm font-light">
                        <thead className="border-b">
                          <tr>
                            <th className="pl-8 py-2">Item</th>
                            <th className="py-2 px-4 border-l">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getHrDirectReportStaffKrasState.data?.kras.map(
                            (value, index) => (
                              <tr className="border-b">
                                <td className="pl-8 py-2">KRA {index + 1}</td>
                                <td className="border-l ">
                                  <textarea
                                    required
                                    readOnly={true}
                                    value={value.details}
                                    className="w-full min-h-[100px] flex-1 m-0 p-4"
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

            {props.status_id != 3 ? (
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => {
                    props.closeModal();
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            ) : (
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
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
