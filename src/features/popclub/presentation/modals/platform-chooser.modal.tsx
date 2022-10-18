import { PlatformModel } from "features/popclub/core/domain/platform.model";
import { setPopClubData } from "../slices/set-popclub-data.slice";
import { useAppDispatch } from "features/config/hooks";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

interface PlatformChooserModalProps {
  open: boolean;
  hasCloseButton: boolean;
  onClose: () => void;
  onSelectedPlatform: (platform: string) => void;
}

export function PlatformChooserModal(props: PlatformChooserModalProps) {
  const dispatch = useAppDispatch();

  return (
    <div
      style={{ display: props.open ? "flex" : "none" }}
      className="fixed inset-0 z-30 flex items-center justify-center bg-secondary bg-opacity-30 backdrop-blur-sm "
    >
      <div className="bg-secondary p-4 round w-[80%] sm:w-[400px] rounded-2xl relative">
        {props.hasCloseButton ? (
          <button
            className="absolute text-2xl text-white top-2 right-4"
            onClick={props.onClose}
          >
            <IoMdClose />
          </button>
        ) : null}

        <h1 className="text-xs text-center text-white ">Are you?</h1>
        <ul className="space-y-1 ">
          <li className="flex flex-col items-center justify-center flex-1">
            <button
              className=' text-sm w-full lg:text-base rounded-lg bg-transparent tracking-[3px] text-white py-3 px-10 border border-white mt-2  font-["Bebas_Neue"]'
              onClick={() => {
                props.onClose();
                props.onSelectedPlatform("store-visit");
              }}
            >
              Visiting a store
            </button>
          </li>

          <h1 className="mt-3 text-xs text-center text-white">
            or having your
          </h1>
          <li className="flex flex-col items-center justify-center flex-1">
            <button
              className=' text-sm w-full lg:text-base rounded-lg bg-transparent tracking-[3px] text-white py-3 px-10 border border-white mt-2  font-["Bebas_Neue"]'
              onClick={() => {
                props.onClose();
                props.onSelectedPlatform("online-delivery");
              }}
            >
              Snacks Delivered
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
