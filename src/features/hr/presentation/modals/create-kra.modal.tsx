import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useState, useEffect } from "react";
import { selectSubmitKra, submitKra } from "../slices/submit-kra";
import {
  getHrKras,
  selectGetHrKras,
  updateGetHrKrasState,
} from "../slices/get-hr-kras.slice";
import {
  selectUpdateActionItem,
  updateActionItem,
} from "../slices/update-action-item";
import { selectUpdateKra, updateKra } from "../slices/update-kra";
import { getHrActionItems } from "../slices/get-hr-action-items.slice";

interface CreateKraModalProps {
  modal: boolean;
  item_id: number | null;
  action_item_id: number | null;
  action_item_status_id: number | null;
  closeModal: () => void;
}

export function CreateKraModal(props: CreateKraModalProps) {
  const dispatch = useAppDispatch();
  const submitKraState = useAppSelector(selectSubmitKra);
  const updateActionItemState = useAppSelector(selectUpdateActionItem);
  const updateKraState = useAppSelector(selectUpdateKra);
  const getKraState = useAppSelector(selectGetHrKras);

  const [kra, setKra] = useState({
    kra_1: "",
    kra_2: "",
    kra_3: "",
  });

  useEffect(() => {
    dispatch(getHrKras());
  }, [props.modal]);

  useEffect(() => {
    dispatch(getHrKras());
  }, [submitKraState, updateKraState]);

  useEffect(() => {
    dispatch(getHrKras());
    dispatch(getHrActionItems());
    props.closeModal();
  }, [updateActionItemState]);

  const handleSave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (props.action_item_id) {
      dispatch(
        submitKra({
          action_item_id: props.action_item_id,
          kra_1: kra.kra_1,
          kra_2: kra.kra_2,
          kra_3: kra.kra_3,
        })
      );
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (props.action_item_id && props.item_id) {
      dispatch(
        updateActionItem({
          item_id: props.item_id,
          action_item_id: props.action_item_id,
          status: 2,
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
          {getKraState.data?.kras && getKraState.data.kras.length > 0 ? (
            <form
              onSubmit={handleSubmit}
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
                            {getKraState.data?.kras.map((value, index) => (
                              <tr className="border-b ">
                                <td className="pl-8 py-2">KRA {index + 1}</td>
                                <td className="border-l ">
                                  <textarea
                                    required
                                    className="w-full min-h-[100px] flex-1 m-0 p-4"
                                    value={value.details}
                                    onChange={(element) => {
                                      let data = JSON.parse(
                                        JSON.stringify(getKraState.data)
                                      );
                                      data.kras[index].details =
                                        element.target.value;

                                      dispatch(
                                        updateGetHrKrasState({ data: data })
                                      );
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {props.action_item_status_id == 1 ? (
                  <>
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (getKraState.data?.kras) {
                          dispatch(
                            updateKra({
                              kras: getKraState.data.kras,
                            })
                          );
                          props.closeModal();
                        }
                      }}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Save
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
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      props.closeModal();
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Close
                  </button>
                )}
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSave}
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
                            <tr className="border-b ">
                              <td className="pl-8 py-2">KRA 1</td>
                              <td className="border-l ">
                                <textarea
                                  required
                                  className="w-full min-h-[100px] flex-1 m-0 p-4"
                                  value={kra.kra_1}
                                  onChange={(element) => {
                                    setKra({
                                      ...kra,
                                      kra_1: element.target.value,
                                    });
                                  }}
                                />
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="pl-8 py-2">KRA 2</td>
                              <td className="border-l ">
                                <textarea
                                  required
                                  className="w-full min-h-[100px] flex-1 m-0 p-4"
                                  value={kra.kra_2}
                                  onChange={(element) => {
                                    setKra({
                                      ...kra,
                                      kra_2: element.target.value,
                                    });
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="pl-8 py-2">KRA 3</td>
                              <td className="border-l ">
                                <textarea
                                  required
                                  className="w-full min-h-[100px] flex-1 m-0 p-4"
                                  value={kra.kra_3}
                                  onChange={(element) => {
                                    setKra({
                                      ...kra,
                                      kra_3: element.target.value,
                                    });
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Save
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
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
