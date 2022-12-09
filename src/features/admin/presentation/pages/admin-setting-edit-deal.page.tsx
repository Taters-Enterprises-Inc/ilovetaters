import { AdminHead } from "../components";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAdminGroups,
  selectGetAdminGroups,
} from "../slices/get-admin-groups.slice";
import Checkbox from "@mui/material/Checkbox";
import { MaterialInput } from "features/shared/presentation/components";
import {
  getAdminStoreDealById,
  selectGetAdminStoreDealById,
} from "../slices/get-admin-setting-deal-by-id.slices";
import { UploadImageInput } from "../../../shared/presentation/components";

export function AdminSettingEditDeal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const getAdminSettingStoreDealById = useAppSelector(
    selectGetAdminStoreDealById
  );

  const [formState, setFormState] = useState<{
    alias: string;
    name: string;
    product_image: any;
    original_price: string;
    promo_price: string;
    promo_discount_percentage: string;
    minimum_purchase: string;
    description: string;
    seconds_before_expiration: string;
    available_start_time: string;
    available_end_time: string;
    available_start_datetime: string;
    available_end_datetime: string;
    available_days: string;
    status: string;
  }>({
    alias: "",
    name: "",
    product_image: "",
    original_price: "",
    promo_price: "",
    promo_discount_percentage: "",
    minimum_purchase: "",
    description: "",
    seconds_before_expiration: "",
    available_start_time: "",
    available_end_time: "",
    available_start_datetime: "",
    available_end_datetime: "",
    available_days: "",
    status: "",
  });

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(getAdminStoreDealById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!id || getAdminSettingStoreDealById.data === undefined) {
      return;
    }

    setFormState({
      alias: getAdminSettingStoreDealById.data.deals[0].alias || "",
      name: getAdminSettingStoreDealById.data.deals[0].name || "",
      product_image:
        getAdminSettingStoreDealById.data.deals[0].product_image || "",
      original_price:
        getAdminSettingStoreDealById.data.deals[0].original_price || "",
      promo_price: getAdminSettingStoreDealById.data.deals[0].promo_price || "",
      promo_discount_percentage:
        getAdminSettingStoreDealById.data.deals[0].promo_discount_percentage ||
        "",
      minimum_purchase:
        getAdminSettingStoreDealById.data.deals[0].minimum_purchase || "",
      description: getAdminSettingStoreDealById.data.deals[0].description || "",
      seconds_before_expiration:
        getAdminSettingStoreDealById.data.deals[0].seconds_before_expiration ||
        "",
      available_start_time:
        getAdminSettingStoreDealById.data.deals[0].available_start_time || "",
      available_end_time:
        getAdminSettingStoreDealById.data.deals[0].available_end_time || "",
      available_start_datetime:
        getAdminSettingStoreDealById.data.deals[0].available_start_datetime ||
        "",
      available_end_datetime:
        getAdminSettingStoreDealById.data.deals[0].available_end_datetime || "",
      available_days:
        getAdminSettingStoreDealById.data.deals[0].available_days || "",
      status: getAdminSettingStoreDealById.data.deals[0].status || "",
    });
  }, [getAdminSettingStoreDealById]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (id) {
    //   dispatch(
    //     editAdminUser({
    //       userId: id,
    //       body: formState,
    //     })
    //   );
    // }
  };
  console.log(formState);
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
            { name: "Edit Deal", url: location.pathname },
          ],
        }}
      />

      <div className="px-4">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Edit Deal
        </span>

        <div className="pb-10 space-y-6">
          <span>Please enter the user's information below.</span>

          <form onSubmit={onSubmit} className="flex flex-col space-y-4">
            <div className="flex lg:flex-row flex-col lg:gap-x-4">
              <div className="block">
                <div className="relative w-full l h-auto  overflow-hidden">
                  <UploadImageInput
                    name="product_image"
                    setFormState={setFormState}
                    defaultValue={
                      "api/assets/images/shared/products/500/" +
                      getAdminSettingStoreDealById.data?.deals[0].product_image
                    }
                  />
                </div>
              </div>
              <div className="w-full h-auto flex flex-col gap-y-2 mt-2">
                <div className="w-full h-auto flex lg:flex-row flex-col lg:gap-y-0 gap-y-2 lg:gap-x-2 gap-x-0">
                  <MaterialInput
                    colorTheme="black"
                    fullWidth
                    required
                    label="Alias"
                    name="alias"
                    value={formState.alias}
                    onChange={handleInputChange}
                  />
                  <MaterialInput
                    colorTheme="black"
                    fullWidth
                    required
                    label="Name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full h-auto flex lg:flex-row flex-col lg:gap-y-0 gap-y-2 lg:gap-x-2 gap-x-0">
                  <MaterialInput
                    fullWidth
                    colorTheme="black"
                    required
                    label="Original Price"
                    name="original_price"
                    value={formState.original_price}
                    onChange={handleInputChange}
                  />
                  <MaterialInput
                    fullWidth
                    colorTheme="black"
                    required
                    label="Promo Price "
                    name="promo_price"
                    value={formState.promo_price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full h-auto flex lg:flex-row flex-col lg:gap-y-0 gap-y-2 lg:gap-x-2 gap-x-0">
                  <MaterialInput
                    fullWidth
                    colorTheme="black"
                    required
                    label="Promo Discount Percentage"
                    name="promo_discount_percentage"
                    value={formState.promo_discount_percentage}
                    onChange={handleInputChange}
                  />
                  <MaterialInput
                    fullWidth
                    colorTheme="black"
                    required
                    label="Minimum Purchase "
                    name="minimum_purchase"
                    value={formState.minimum_purchase}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full h-auto flex lg:flex-row flex-col lg:gap-y-0 gap-y-2 lg:gap-x-2 gap-x-0">
                  <MaterialInput
                    fullWidth
                    colorTheme="black"
                    required
                    label="Seconds Before Expiration"
                    name="seconds_before_expiration"
                    value={formState.seconds_before_expiration}
                    onChange={handleInputChange}
                  />
                  <MaterialInput
                    fullWidth
                    colorTheme="black"
                    required
                    label="Available Start Time "
                    name="available_start_time"
                    value={formState.available_start_time}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full h-auto flex lg:flex-row flex-col lg:gap-y-0 gap-y-2 lg:gap-x-2 gap-x-0">
                  <MaterialInput
                    fullWidth
                    colorTheme="black"
                    required
                    label="Available Start Datetime "
                    name="available_start_datetime"
                    value={formState.available_start_datetime}
                    onChange={handleInputChange}
                  />

                  <MaterialInput
                    fullWidth
                    colorTheme="black"
                    required
                    label="Available End Datetime "
                    name="available_end_datetime"
                    value={formState.available_end_datetime}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full h-auto flex lg:flex-row flex-col lg:gap-y-0 gap-y-2 lg:gap-x-2 gap-x-0">
                  <MaterialInput
                    fullWidth
                    colorTheme="black"
                    required
                    label="Available Days"
                    name="available_days"
                    value={formState.available_days}
                    onChange={handleInputChange}
                  />
                  <MaterialInput
                    fullWidth
                    colorTheme="black"
                    required
                    label="Status"
                    name="status"
                    value={formState.status}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="block">
                  <MaterialInput
                    fullWidth
                    colorTheme="black"
                    required
                    label="Description"
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-button w-fit"
            >
              Edit User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
