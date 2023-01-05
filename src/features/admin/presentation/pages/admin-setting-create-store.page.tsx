import MenuItem from "@mui/material/MenuItem";
import { AdminProductModel } from "features/admin/core/domain/admin-product.model";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  MaterialInput,
  MaterialInputAutoComplete,
  MaterialPhoneInput,
  MaterialTimeInput,
  UploadFile,
} from "features/shared/presentation/components";
import { FormEvent, useState, useEffect } from "react";
import { AdminHead } from "../components";
import {
  getAdminProducts,
  GetAdminProductsState,
  selectGetAdminProducts,
} from "../slices/get-admin-products.slice";
import {
  getAdminStoreMenus,
  selectGetAdminStoreMenus,
} from "../slices/get-admin-store-menus.slice";
import moment, { Moment } from "moment";

export function AdminSettingCreateStore() {
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<{
    name: string;
    address: string;
    storeMenu: string;
    availableStartTime: Moment | string;
    availableEndTime: Moment | string;
    phoneNumber: string;
    contactPerson: string;
    email: string;
    deliveryHours: string;
    operatingHours: string;
    storeImage: File | string;
    services: Array<string>;
    products: Array<AdminProductModel>;
  }>({
    storeMenu: "",
    availableStartTime: "",
    availableEndTime: "",
    name: "",
    address: "",
    phoneNumber: "",
    contactPerson: "",
    email: "",
    deliveryHours: "",
    operatingHours: "",
    storeImage: "",
    services: [
      "Snackshop",
      "Catering",
      "PopClub Store Visit",
      "PopClub Online Delivery",
    ],
    products: [],
  });

  const getAdminStoreMenusState = useAppSelector(selectGetAdminStoreMenus);
  const getAdminProductsState = useAppSelector(selectGetAdminProducts);

  useEffect(() => {
    dispatch(getAdminStoreMenus());
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    const products = getAdminProductsState.data;
    if (
      getAdminProductsState.status === GetAdminProductsState.success &&
      products
    ) {
      setFormState((f) => ({ ...f, products }));
    }
  }, [getAdminProductsState]);

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
            <div className="grid grid-cols-3 gap-4">
              <MaterialInput
                colorTheme="black"
                name="storeMenu"
                required
                label="Store Menu"
                select
                fullWidth
                value={formState.storeMenu}
                onChange={handleInputChange}
              >
                {getAdminStoreMenusState.data?.map((storeMenu) => (
                  <MenuItem value={storeMenu.id}>{storeMenu.name}</MenuItem>
                ))}
              </MaterialInput>

              <MaterialTimeInput
                colorTheme="black"
                label="Available Start Time"
                onChange={(newValue) => {
                  if (newValue)
                    setFormState({
                      ...formState,
                      availableStartTime: moment(newValue, "HH:mm:ss"),
                    });
                }}
                value={formState.availableStartTime}
              />

              <MaterialTimeInput
                colorTheme="black"
                label="Available End Time"
                onChange={(newValue) => {
                  if (newValue)
                    setFormState({
                      ...formState,
                      availableEndTime: moment(newValue, "HH:mm:ss"),
                    });
                }}
                value={formState.availableEndTime}
              />
            </div>
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
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.address}
              name="address"
              label="Address"
              fullWidth
              multiline
              rows={4}
              maxRows={5}
            />

            <div className="grid grid-cols-3 gap-4">
              <MaterialPhoneInput
                required
                colorTheme="black"
                value={formState.phoneNumber}
                name="phoneNumber"
                fullWidth
                onChange={handleInputChange}
              />

              <MaterialInput
                required
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.contactPerson}
                name="contactPerson"
                label="Contact Person"
                fullWidth
              />

              <MaterialInput
                required
                type="email"
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.email}
                name="email"
                label="Email"
                fullWidth
              />
            </div>

            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.deliveryHours}
              name="deliveryHours"
              label="Delivery Hours"
              placeholder="Same day delivery 5:00PM cut-off"
              fullWidth
            />

            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.operatingHours}
              name="operatingHours"
              label="Operating Hours"
              placeholder="MON - SUN (10AM - 7PM)"
              fullWidth
            />
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

        <h1 className="text-2xl font-bold text-secondary !my-2">
          Service Selection
        </h1>

        <MaterialInputAutoComplete
          label="Select Services"
          colorTheme="black"
          multiple
          options={[
            "Snackshop",
            "Catering",
            "PopClub Store Visit",
            "PopClub Online Delivery",
          ]}
          getOptionLabel={(option) => option}
          value={formState.services ? [...formState.services] : []}
          onChange={(e, services) => {
            setFormState({
              ...formState,
              services,
            });
          }}
          filterSelectedOptions
        />

        {getAdminProductsState.data ? (
          <>
            <h1 className="text-2xl font-bold text-secondary !my-2">
              Product Selection
            </h1>

            <MaterialInputAutoComplete
              label="Select Products"
              colorTheme="black"
              multiple
              options={getAdminProductsState.data}
              getOptionLabel={(option) => option.name}
              value={formState.products ? [...formState.products] : []}
              onChange={(e, products) => {
                setFormState({
                  ...formState,
                  products,
                });
              }}
              filterSelectedOptions
            />
          </>
        ) : null}

        <button
          type="submit"
          className="px-4 py-2 text-white rounded-lg bg-button w-fit"
        >
          Create Store
        </button>
      </form>
    </>
  );
}
