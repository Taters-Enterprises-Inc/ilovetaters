import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { IoMdClose } from "react-icons/io";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import {
  closeCateringSelectTypeModal,
  selectCateringSelectTypeModal,
} from "../slices/catering-select-type.slice";

export function CateringSelectTypeModal() {
  const dispatch = useAppDispatch();

  const cateringSelectTypeModalState = useAppSelector(
    selectCateringSelectTypeModal
  );

  if (!cateringSelectTypeModalState.status) {
    return null;
  }

  const handleOnClick = (
    value: "catering" | "bulk-order-pickup" | "bulk-order-delivery"
  ) => {
    if (cateringSelectTypeModalState.data.onClick != null) {
      cateringSelectTypeModalState.data.onClick(value);
    }
    dispatch(closeCateringSelectTypeModal());
  };

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm no-scrollbar no-scrollbar::-webkit-scrollbar">
      <div className="bg-white px-3 py-[30px] round w-[90%] sm:w-[60%] lg:w-[20%] relative rounded-[10px] mt-10 mb-[150px]">
        <button
          className="absolute text-2xl text-secondary top-2 right-4 "
          onClick={() => {
            dispatch(closeCateringSelectTypeModal());
          }}
        >
          <IoMdClose />
        </button>
        <section className="px-2 py-4 space-y-3">
          <h1 className="mb-1 text-lg font-bold leading-5 mb-4">Select Type</h1>
          <div className="flex flex-col space-y-2 items-start justify-start">
            <button
              onClick={() => handleOnClick("catering")}
              className="text-white border border-white w-full hover:bg-[#CC5801] flex space-x-2 justify-center items-center bg-secondary py-2 px-4 rounded-lg shadow-lg"
            >
              <span className="text-lg font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                Catering
              </span>
            </button>
            <button
              onClick={() => handleOnClick("bulk-order-delivery")}
              className="text-white border border-white flex w-full hover:bg-[#CC5801]  space-x-2 justify-center items-center bg-secondary py-2 px-4 rounded-lg shadow-lg"
            >
              <span className="text-lg font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                Bulk-Order ( Delivery )
              </span>
            </button>
            <button
              onClick={() => handleOnClick("bulk-order-pickup")}
              className="text-white border border-white flex w-full hover:bg-[#CC5801] space-x-2 justify-center items-center bg-secondary py-2 px-4 rounded-lg shadow-lg"
            >
              <span className="text-lg font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                Bulk-Order ( Pick-up )
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
