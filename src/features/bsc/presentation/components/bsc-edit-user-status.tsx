import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FormEvent, useEffect, useState } from "react";
import {
  getBscUser,
  GetBscUserState,
  selectGetBscUser,
} from "../slices/get-bsc-user.slice";
import { useParams } from "react-router-dom";
import { updateBscUserStatus } from "../slices/update-bsc-user-status.slice";

export function BscEditUserStatus() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [status, setStatus] = useState<string>("");

  const getBscUserState = useAppSelector(selectGetBscUser);

  useEffect(() => {
    if (id) {
      dispatch(getBscUser(id));
    }
  }, []);

  useEffect(() => {
    if (
      getBscUserState.status === GetBscUserState.success &&
      getBscUserState.data
    ) {
      setStatus(getBscUserState.data.user_status_id.toString());
    }
  }, [getBscUserState]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (id)
      dispatch(
        updateBscUserStatus({
          user_id: id,
          status,
        })
      );
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex items-center justify-between"
    >
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="user-status"
          value={status}
          onChange={(e, val) => {
            setStatus(val);
          }}
        >
          <FormControlLabel
            value={1}
            control={<Radio required />}
            label="New"
          />
          <FormControlLabel
            value={2}
            control={<Radio required />}
            label="Verified"
          />
          <FormControlLabel
            value={3}
            control={<Radio required />}
            label="Rejected"
          />
        </RadioGroup>
      </FormControl>

      <button
        type="submit"
        className="px-4 py-2 text-white rounded-lg bg-button w-fit"
      >
        Save Status
      </button>
    </form>
  );
}
