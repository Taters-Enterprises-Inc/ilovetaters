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
import { AdminHead, AdminSearchStoreCoordinates } from "../components";
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
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import {
  createAdminSettingStore,
  CreateAdminSettingStoreState,
  resetCreateAdminSettingStoreState,
  selectCreateAdminSettingStore,
} from "../slices/create-admin-setting-store.slice";
import { useNavigate } from "react-router-dom";
import {
  getAdminRegionStoreCombinations,
  selectGetAdminRegionStoreCombinations,
} from "../slices/get-admin-region-store-combinations.slice";
import {
  getAdminStoreLocales,
  selectGetAdminStoreLocales,
} from "../slices/get-admin-store-locales.slice";
import {
  getAdminPackages,
  GetAdminPackagesState,
  selectGetAdminPackages,
} from "../slices/get-admin-packages.slice";
import { AdminPackageModel } from "features/admin/core/domain/admin-package.model";

export function AdminSettingCreateStore() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<{
    name: string;
    address: string;
    storeMenu: string;
    availableStartTime: Moment | null;
    availableEndTime: Moment | null;
    phoneNumber: string;
    contactPerson: string;
    email: string;
    deliveryHours: string;
    operatingHours: string;
    region: string;
    lat: number;
    lng: number;
    deliveryRate: string;
    minimumRate: string;
    cateringDeliveryRate: string;
    cateringMinimumRate: string;
    storeHash: string;
    locale: string;
    image250x250: File | string;
    services: Array<string>;
    products: Array<AdminProductModel>;
    packages: Array<AdminPackageModel>;
  }>({
    storeMenu: "",
    availableStartTime: null,
    availableEndTime: null,
    name: "",
    address: "",
    phoneNumber: "",
    contactPerson: "",
    email: "",
    deliveryHours: "",
    operatingHours: "",
    lat: 14.660950420631163,
    lng: 121.0873865267099,
    deliveryRate: "",
    minimumRate: "",
    cateringDeliveryRate: "",
    cateringMinimumRate: "",
    storeHash: "",
    locale: "",
    region: "",
    image250x250: "",
    services: [
      "Snackshop",
      "Catering",
      "PopClub Store Visit",
      "PopClub Online Delivery",
    ],
    products: [],
    packages: [],
  });

  const getAdminStoreMenusState = useAppSelector(selectGetAdminStoreMenus);
  const getAdminProductsState = useAppSelector(selectGetAdminProducts);
  const getAdminPackagesState = useAppSelector(selectGetAdminPackages);
  const getAdminRegionStoreCombinationsState = useAppSelector(
    selectGetAdminRegionStoreCombinations
  );
  const createAdminSettingStoreState = useAppSelector(
    selectCreateAdminSettingStore
  );
  const getAdminStoreLocalesState = useAppSelector(selectGetAdminStoreLocales);

  useEffect(() => {
    dispatch(getAdminStoreMenus());
    dispatch(getAdminProducts());
    dispatch(getAdminPackages());
    dispatch(getAdminRegionStoreCombinations());
    dispatch(getAdminStoreLocales());
  }, [dispatch]);

  useEffect(() => {
    if (
      createAdminSettingStoreState.status ===
      CreateAdminSettingStoreState.success
    ) {
      navigate("/admin/setting/store");
      dispatch(resetCreateAdminSettingStoreState());
    }
  }, [createAdminSettingStoreState, dispatch, navigate]);

  useEffect(() => {
    const products = getAdminProductsState.data;
    if (
      getAdminProductsState.status === GetAdminProductsState.success &&
      products
    ) {
      setFormState((f) => ({ ...f, products }));
    }
  }, [getAdminProductsState]);

  useEffect(() => {
    const packages = getAdminPackagesState.data;
    if (
      getAdminPackagesState.status === GetAdminPackagesState.success &&
      packages
    ) {
      setFormState((f) => ({ ...f, packages }));
    }
  }, [getAdminPackagesState]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.image250x250 === "") {
      dispatch(
        popUpSnackBar({
          message:
            "Please insure that all the required size image has been filled out",
          severity: "error",
        })
      );
      return;
    }

    if (formState.availableStartTime && formState.availableEndTime) {
      dispatch(
        createAdminSettingStore({
          ...formState,
          availableStartTime: formState.availableStartTime.format("HH:mm:ss"),
          availableEndTime: formState.availableEndTime.format("HH:mm:ss"),
          services: JSON.stringify(formState.services),
          products: formState.services.some(
            (service) => service === "Snackshop"
          )
            ? JSON.stringify(formState.products)
            : "",
          packages: formState.services.some((service) => service === "Catering")
            ? JSON.stringify(formState.packages)
            : "",
        })
      );
    }
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
            { name: "Stores", url: "/admin/setting/store" },
            {
              name: "Create new store",
              url: "/admin/setting/store/create-store",
            },
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
              isOptionEqualToValue={(option, value) => option === value}
              value={formState.services}
              onChange={(e, services) => {
                setFormState({
                  ...formState,
                  services,
                });
              }}
              filterSelectedOptions
            />
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
              label="Address to display"
              fullWidth
              multiline
              placeholder="Eg. 3rd Floor SM City Grand Central Rizal Ave. Ext, East Grace Park, Caloocan"
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
              placeholder="Eg. Same day delivery 5:00PM cut-off"
              fullWidth
            />

            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.operatingHours}
              name="operatingHours"
              label="Operating Hours"
              placeholder="Eg. MON - SUN (10AM - 7PM)"
              fullWidth
            />

            <div className="flex space-x-4">
              <MaterialInput
                required
                type="number"
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.deliveryRate}
                name="deliveryRate"
                label="Delivery Rate"
                className="flex-1"
                fullWidth
              />
              <MaterialInput
                required
                type="number"
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.minimumRate}
                name="minimumRate"
                label="Minimum Rate"
                className="flex-1"
                fullWidth
              />

              {formState.services.some((service) => service === "Catering") ? (
                <>
                  <MaterialInput
                    required
                    type="number"
                    colorTheme="black"
                    onChange={handleInputChange}
                    value={formState.cateringDeliveryRate}
                    name="cateringDeliveryRate"
                    label="Catering Delivery Rate"
                    className="flex-1"
                    fullWidth
                  />
                  <MaterialInput
                    required
                    type="number"
                    colorTheme="black"
                    onChange={handleInputChange}
                    value={formState.cateringMinimumRate}
                    name="cateringMinimumRate"
                    label="Catering Minimum Rate"
                    className="flex-1"
                    fullWidth
                  />
                </>
              ) : null}
            </div>

            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.storeHash}
              name="storeHash"
              label="Store hash"
              fullWidth
              placeholder="Eg. TSS0191"
            />

            <MaterialInput
              colorTheme="black"
              name="locale"
              required
              label="Locale"
              select
              fullWidth
              value={formState.locale}
              onChange={handleInputChange}
            >
              {getAdminStoreLocalesState.data?.map((locale) => (
                <MenuItem value={locale.id}>{locale.name}</MenuItem>
              ))}
            </MaterialInput>

            <MaterialInput
              colorTheme="black"
              name="region"
              required
              label="Region"
              select
              fullWidth
              value={formState.region}
              onChange={handleInputChange}
            >
              {getAdminRegionStoreCombinationsState.data?.map((region) => (
                <MenuItem value={region.id}>
                  {region.region_name} / {region.region_store_name}{" "}
                </MenuItem>
              ))}
            </MaterialInput>
          </div>

          <div>
            <UploadFile
              image={formState.image250x250}
              onChange={(file) => {
                setFormState({
                  ...formState,
                  image250x250: file,
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
        <AdminSearchStoreCoordinates
          geolocate={true}
          lat={formState.lat}
          lng={formState.lng}
          onLatLngChanged={(coordinates) => {
            setFormState((val) => ({
              ...val,
              lat: coordinates.lat,
              lng: coordinates.lng,
            }));
          }}
        />

        {getAdminProductsState.data &&
        formState.services.some((service) => service === "Snackshop") ? (
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
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
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

        {getAdminPackagesState.data &&
        formState.services.some((service) => service === "Catering") ? (
          <>
            <h1 className="text-2xl font-bold text-secondary !my-2">
              Package Selection
            </h1>

            <MaterialInputAutoComplete
              label="Select Packages"
              colorTheme="black"
              multiple
              options={getAdminPackagesState.data}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              value={formState.packages ? [...formState.packages] : []}
              onChange={(e, packages) => {
                setFormState({
                  ...formState,
                  packages,
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
