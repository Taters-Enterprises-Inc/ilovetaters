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
import { useNavigate, useParams } from "react-router-dom";
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
  selectGetAdminPackages,
} from "../slices/get-admin-packages.slice";
import { AdminPackageModel } from "features/admin/core/domain/admin-package.model";
import {
  getAdminSettingStore,
  GetAdminSettingStoreState,
  selectGetAdminSettingStore,
} from "../slices/get-admin-setting-store.slice";
import {
  resetEditAdminSettingStoreState,
  editAdminSettingStore,
  EditAdminSettingStoreState,
  selectEditAdminSettingStore,
} from "../slices/edit-admin-setting-store.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";

export function AdminSettingEditStore() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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
  const getAdminStoreLocalesState = useAppSelector(selectGetAdminStoreLocales);
  const getAdminSettingStoreState = useAppSelector(selectGetAdminSettingStore);
  const editAdminSettingStoreState = useAppSelector(
    selectEditAdminSettingStore
  );
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  useEffect(() => {
    dispatch(getAdminStoreMenus());
    dispatch(getAdminProducts());
    dispatch(getAdminPackages());
    dispatch(getAdminRegionStoreCombinations());
    dispatch(getAdminStoreLocales());
    if (id) {
      dispatch(
        getAdminSettingStore({
          storeId: id,
        })
      );
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      getAdminSettingStoreState.status === GetAdminSettingStoreState.success &&
      getAdminSettingStoreState.data
    ) {
      setFormState({
        storeMenu: getAdminSettingStoreState.data.store_menu_type_id.toString(),
        availableStartTime: moment(
          getAdminSettingStoreState.data.available_start_time,
          "HH:mm:ss"
        ),
        availableEndTime: moment(
          getAdminSettingStoreState.data.available_end_time,
          "HH:mm:ss"
        ),
        name: getAdminSettingStoreState.data.name,
        address: getAdminSettingStoreState.data.address,
        phoneNumber: getAdminSettingStoreState.data.contact_number,
        contactPerson: getAdminSettingStoreState.data.contact_person,
        email: getAdminSettingStoreState.data.email,
        deliveryHours: getAdminSettingStoreState.data.delivery_hours,
        operatingHours: getAdminSettingStoreState.data.operating_hours,
        lat: getAdminSettingStoreState.data.lat,
        lng: getAdminSettingStoreState.data.lng,
        deliveryRate: getAdminSettingStoreState.data.delivery_rate,
        minimumRate: getAdminSettingStoreState.data.minimum_rate,
        cateringDeliveryRate:
          getAdminSettingStoreState.data.catering_delivery_rate,
        cateringMinimumRate:
          getAdminSettingStoreState.data.catering_minimum_rate,
        storeHash: getAdminSettingStoreState.data.store_hash,
        locale: getAdminSettingStoreState.data.locale,
        region:
          getAdminSettingStoreState.data.region_store_combination_tb_id.toString(),
        image250x250: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/store_images/250/${getAdminSettingStoreState.data.store_image}`,
        services: getAdminSettingStoreState.data.services ?? [],
        products: getAdminSettingStoreState.data.products ?? [],
        packages: getAdminSettingStoreState.data.packages ?? [],
      });
    }
  }, [getAdminSettingStoreState]);

  useEffect(() => {
    if (
      editAdminSettingStoreState.status === EditAdminSettingStoreState.success
    ) {
      navigate("/admin/setting/store");
      dispatch(resetEditAdminSettingStoreState());
    }
  }, [editAdminSettingStoreState, dispatch, navigate, id]);

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

    if (id && formState.availableStartTime && formState.availableEndTime) {
      dispatch(
        editAdminSettingStore({
          storeId: id,
          ...formState,
          availableStartTime: formState.availableStartTime.format("HH:mm:ss"),
          availableEndTime: formState.availableEndTime.format("HH:mm:ss"),
          services: JSON.stringify(formState.services),
          products: JSON.stringify(formState.products),
          packages: JSON.stringify(formState.packages),
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
          Edit Store
        </span>
      </section>

      <form onSubmit={handleOnSubmit} className="p-4 space-y-3">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-3">
            {getAdminSessionState.data?.admin.is_admin ||
            getAdminSessionState.data?.admin.is_csr_admin ? (
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
            ) : null}
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
                  {region.region_name} / {region.region_store_name}
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
          geolocate={false}
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
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-lg bg-button w-fit"
          >
            Edit Store
          </button>

          <button
            type="button"
            onClick={() => {}}
            className="px-4 py-2 text-white rounded-lg bg-secondary w-fit"
          >
            Delete Store
          </button>
        </div>
      </form>
    </>
  );
}
