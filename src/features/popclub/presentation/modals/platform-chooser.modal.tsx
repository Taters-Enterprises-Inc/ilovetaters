import { PlatformModel } from "features/popclub/core/domain/platform.model";
import { setPopClubData } from "../slices/set-popclub-data.slice";
import { useAppDispatch } from "features/config/hooks";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

interface PlatformChooserModalProps {
  open: boolean;
  onClose: () => void;
  platforms: Array<PlatformModel>;
  onSelectedPlatform: (platform: string) => void;
}

export function PlatformChooserModal(props: PlatformChooserModalProps) {
  const dispatch = useAppDispatch();

  const temp = ["visiting a store", "snacks delivered"];

  return (
    <div
      style={{ display: props.open ? "flex" : "none" }}
      className="fixed inset-0 z-30 flex items-center justify-center bg-secondary bg-opacity-30 backdrop-blur-sm "
    >
      <div className="bg-secondary p-4 round w-[80%] sm:w-[400px] rounded-2xl relative">
        <button
          className="absolute text-2xl text-white top-2 right-4"
          onClick={props.onClose}
        >
          <IoMdClose />
        </button>

        <h1 className="text-xs text-center text-white ">Are you?</h1>
        <ul className="space-y-1 ">
          {props.platforms.map((platform, i) => (
            <li
              key={i}
              className="flex flex-col items-center justify-center flex-1"
            >
              <button
                className=' text-sm w-full lg:text-base rounded-lg bg-transparent tracking-[3px] text-white py-3 px-10 border border-white mt-2  font-["Bebas_Neue"]'
                onClick={() => {
                  props.onSelectedPlatform(platform.url_name);
                  dispatch(setPopClubData({ platform: platform.url_name }));
                }}
              >
                {temp[i]}
              </button>
              {i === 0 ? (
                <h1 className="mt-3 text-xs text-center text-white">
                  or having your
                </h1>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
