import { IoMdClose } from "react-icons/io";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { selectGetBscStores } from "../slices/get-bsc-stores.slice";
import {
  GetBscUserStoresState,
  selectGetBscUserStores,
  getBscUserStoresUpdateStores,
} from "../slices/get-bsc-user-stores.slice";
import { selectGetBscUser } from "../slices/get-bsc-user.slice";
import { FormEvent, useEffect } from "react";
import {
  resetUpdateBscUserStoresStatus,
  selectUpdateBscUserStores,
  updateBscUserStores,
  UpdateBscUserStoresState,
} from "../slices/bsc-update-user-stores.slice";

interface BscUpdateStatusModalProps {
  open: boolean;
  onClose: () => void;
}

export function BscUpdateUserStatusModal(props: BscUpdateStatusModalProps) {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const userId = query.get("user_id");

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  const handleUpdateStore = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">Update User Status</span>
          <button
            className="text-2xl text-white"
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          >
            <IoMdClose />
          </button>
        </div>
      </div>
    </div>
  );
}
