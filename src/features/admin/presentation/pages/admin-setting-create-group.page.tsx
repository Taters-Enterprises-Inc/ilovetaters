import { AdminHead } from "../components";
import TextField from "@mui/material/TextField";
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  createAdminGroup,
  CreateAdminGroupState,
  resetCreateAdminGroup,
  selectCreateAdminGroup,
} from "../slices/create-admin-group.slice";
import { useNavigate } from "react-router-dom";

export function AdminSettingCreateGroup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createAdminGroupState = useAppSelector(selectCreateAdminGroup);

  useEffect(() => {
    if (createAdminGroupState.status === CreateAdminGroupState.success) {
      dispatch(resetCreateAdminGroup());
      navigate("/admin/setting/user");
    }
  }, [createAdminGroupState, navigate, dispatch]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    dispatch(createAdminGroup(formData));
  };
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "User", url: "/admin/setting/user" },
            { name: "Create User", url: "/admin/setting/user/create-group" },
          ],
        }}
      />

      <div className="px-4">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Create Group
        </span>

        <div className="space-y-6 pb-10">
          <span>Please enter the group information below.</span>

          <form onSubmit={onSubmit} className="flex flex-col space-y-4">
            <TextField label="Group Name" name="group_name" />
            <TextField label="Description" name="description" />
            <button
              type="submit"
              className="bg-button rounded-lg py-2 px-4 text-white w-fit"
            >
              Create Group
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
