import MenuItem from "@mui/material/MenuItem";
import {
  MaterialInput,
  UploadFile,
} from "features/shared/presentation/components";
import { FormEvent, useState } from "react";
import { AdminHead } from "../components";

export function AdminSettingCreateStore() {
  const [formState, setFormState] = useState<{
    name: string;
    address: string;
    storeMenu: string;
    availableStartTime: string;
    availableEndTime: string;
    contactNumber: string;
    contactPerson: string;
    email: string;
    mohNotes: string;
    deliveryHours: string;
    opertingHours: string;
    storeImage: File | string;
  }>({
    name: "",
    address: "",
    storeMenu: "",
    availableStartTime: "",
    availableEndTime: "",
    contactNumber: "",
    contactPerson: "",
    email: "",
    mohNotes: "",
    deliveryHours: "",
    opertingHours: "",
    storeImage: "",
  });

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            { name: "User", url: "/admin/setting/user" },
            { name: "Create User", url: "/admin/setting/user/create-user" },
          ],
        }}
      />
      <section className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Create Store
        </span>
      </section>

      <form onSubmit={handleOnSubmit} className="p-4 space-y-3">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-3">
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.name}
              name="name"
              label="Name"
              fullWidth
            />

            <MaterialInput
              colorTheme="black"
              name="storeMenu"
              required
              label="Store Menu"
              select
              value={formState.storeMenu}
              onChange={handleInputChange}
            >
              <MenuItem value="PACK">PACK</MenuItem>
              <MenuItem value="SET">SET</MenuItem>
              <MenuItem value="BAG">BAG</MenuItem>
            </MaterialInput>
          </div>

          <div>
            <UploadFile
              image={formState.storeImage}
              onChange={(file) => {
                setFormState({
                  ...formState,
                  storeImage: file,
                });
              }}
              description="250x250"
            />
            <h4 className="mt-1 text-sm leading-5 text-secondary">
              <strong>Note:</strong> JPG is the only supported file type.
              Maximum file size is 2MB.
            </h4>
          </div>
        </div>
      </form>
    </>
  );
}
