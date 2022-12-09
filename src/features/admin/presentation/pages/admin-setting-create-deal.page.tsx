import { AdminHead } from "../components";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  createAdminUser,
  CreateAdminUserState,
  resetCreateAdminUser,
  selectCreateAdminUser,
} from "../slices/create-admin-user.slice";
import { useNavigate } from "react-router-dom";
import {
  MaterialInput,
  MaterialInputPassword,
  MaterialPhoneInput,
  UploadImageInput,
} from "features/shared/presentation/components";

import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";

export function AdminSettingCreateDeal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    store: "",
    size: "",
    flavor: "",
    photo: [],
  });

  const createAdminUserState = useAppSelector(selectCreateAdminUser);

  useEffect(() => {
    if (createAdminUserState.status === CreateAdminUserState.success) {
      dispatch(resetCreateAdminUser());
      navigate("/admin/setting/deals");
    }
  }, [createAdminUserState, navigate, dispatch]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
  };

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
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
            { name: "Deals", url: "/admin/setting/deals" },
            { name: "Create Deal", url: "/admin/setting/user/create-deal" },
          ],
        }}
      />

      <div className="px-4">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Create Deal
        </span>

        <div className="pb-10 space-y-6">
          <span>Please enter the user's information below.</span>

          <form onSubmit={onSubmit} className="relative">
            <div className="flex lg:flex-row flex-col lg:gap-x-2 gap-x-0 lg:gap-y-0 gap-y-2">
              <div className="block">
                <UploadImageInput setFormState={setFormState} name="photo" />
              </div>
              <div>
                <MaterialInput
                  colorTheme="black"
                  required
                  label="Store"
                  name="store"
                  value={formState.store}
                  onChange={handleInputChange}
                />
                <MaterialInput
                  colorTheme="black"
                  required
                  label="Size"
                  name="size"
                  value={formState.size}
                  onChange={handleInputChange}
                />
                <MaterialInput
                  colorTheme="black"
                  required
                  label="Flavor"
                  name="flavor"
                  value={formState.flavor}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-button w-fit"
            >
              Create Deal
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
