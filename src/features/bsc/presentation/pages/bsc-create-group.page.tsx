import { BSCHead } from "../components";
import TextField from "@mui/material/TextField";
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  createBscGroup,
  CreateBscGroupState,
  resetCreateBscGroup,
  selectCreateBscGroup,
} from "../slices/bsc-create-group.slice";
import { useNavigate } from "react-router-dom";

export function BSCCreateGroup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createBscGroupState = useAppSelector(selectCreateBscGroup);

  useEffect(() => {
    if (createBscGroupState.status === CreateBscGroupState.success) {
      dispatch(resetCreateBscGroup());
      navigate("/admin/setting/user");
    }
  }, [createBscGroupState, navigate, dispatch]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    dispatch(createBscGroup(formData));
  };
  return (
    <>
      <BSCHead
        BSCBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/bsc",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "User", url: "/bsc/users" },
            { name: "Create User", url: "/bsc/users/create-group" },
          ],
        }}
      />

      <div className="px-4">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Create Group
        </span>

        <div className="pb-10 space-y-6">
          <span>Please enter the group information below.</span>

          <form onSubmit={onSubmit} className="flex flex-col space-y-4">
            <TextField label="Group Name" name="group_name" />
            <TextField label="Description" name="description" />
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-button w-fit"
            >
              Create Group
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
