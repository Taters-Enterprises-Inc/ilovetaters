import MenuItem from "@mui/material/MenuItem";
import { CateringStoreModel } from "features/admin/core/domain/catering-store.model";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  MaterialDateTimeInput,
  MaterialInput,
  MaterialInputAutoComplete,
  MaterialSwitch,
  MaterialTimeInput,
  UploadFile,
} from "features/shared/presentation/components";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AdminHead } from "../components";
import {
  closeMessageModal,
  openMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";
import moment, { Moment } from "moment";
import {
  getAdminPopclubCategories,
  GetAdminPopclubCategoriesState,
  selectGetAdminPopclubCategories,
} from "../slices/get-admin-popclub-categories.slice";
import { AdminPopclubCategory } from "features/admin/core/domain/admin-popclub-category.model";
import {
  getAdminSettingDealProducts,
  selectGetAdminSettingDealProducts,
} from "../slices/get-admin-setting-deal-products.slice";
import { AdminPopclubProduct } from "features/admin/core/domain/admin-popclub-product.model";

interface ExcludedProduct {
  product: AdminPopclubProduct | null;
}

interface DealProduct {
  product: AdminPopclubProduct | null;
  quantity: string;
}

export function AdminSettingPopclubCreateDeal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openStartEventCalendar, setOpenStartEventCalendar] = useState(false);
  const [openEndEventCalendar, setOpenEndEventCalendar] = useState(false);

  const [formState, setFormState] = useState<{
    alias: string;
    name: string;
    originalPrice: string;
    promoPrice: string;
    promoDiscountPercentage: string;
    minimumPurchase: string;
    isFreeDelivery: boolean;
    description: string;
    secondsBeforeExpiration: string;
    availableStartTime: Moment | null;
    availableEndTime: Moment | null;
    availableStartDateTime: Moment | null;
    availableEndDateTime: Moment | null;
    availableDays: Array<string>;
    categories: Array<AdminPopclubCategory>;
    excludedProducts: Array<ExcludedProduct>;
    products: Array<DealProduct>;
    image500x500: File | string;
    image250x250: File | string;
    image75x75: File | string;
  }>({
    alias: "",
    name: "",
    originalPrice: "",
    promoPrice: "",
    promoDiscountPercentage: "",
    minimumPurchase: "",
    isFreeDelivery: false,
    description: "",
    secondsBeforeExpiration: "",
    availableStartTime: null,
    availableEndTime: null,
    availableStartDateTime: null,
    availableEndDateTime: null,
    availableDays: [],
    products: [],
    excludedProducts: [],
    categories: [],
    image500x500: "",
    image250x250: "",
    image75x75: "",
  });

  const getAdminPopclubCategoriesState = useAppSelector(
    selectGetAdminPopclubCategories
  );

  const getAdminSettingDealProductsState = useAppSelector(
    selectGetAdminSettingDealProducts
  );

  useEffect(() => {
    dispatch(getAdminPopclubCategories());
    dispatch(getAdminSettingDealProducts());
  }, [dispatch]);

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formState.image500x500 === "" ||
      formState.image250x250 === "" ||
      formState.image75x75 === ""
    ) {
      dispatch(
        popUpSnackBar({
          message:
            "Please insure that all the required size image has been filled out",
          severity: "error",
        })
      );
      return;
    }

    dispatch(
      openMessageModal({
        message: "Are you sure you want to create the package ?",
        buttons: [
          {
            color: "#CC5801",
            text: "Yes",
            onClick: () => {
              dispatch(closeMessageModal());
            },
          },
          {
            color: "#22201A",
            text: "No",
            onClick: () => {
              dispatch(closeMessageModal());
            },
          },
        ],
      })
    );
  };

  const handleProducts = () => {
    setFormState({
      ...formState,
      products: [
        ...formState.products,
        {
          product: null,
          quantity: "",
        },
      ],
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
            { name: "Deals", url: "/admin/setting/deal" },
            {
              name: "Create Deal",
              url: "/admin/setting/deal/create-deal",
            },
          ],
        }}
      />
      <section className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Create Deal
        </span>
      </section>
      <form onSubmit={handleOnSubmit} className="p-4 space-y-3">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-3">
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.alias}
              name="alias"
              label="Alias"
              fullWidth
            />

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
              value={formState.description}
              name="description"
              label="Description"
              fullWidth
            />

            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.originalPrice}
              name="originalPrice"
              label="Original Price"
              fullWidth
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.promoPrice}
              name="promoPrice"
              label="Promo Price"
              fullWidth
            />

            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.promoDiscountPercentage}
              name="promoDiscountPercentage"
              label="Promo Discount Percentage"
              fullWidth
            />

            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.minimumPurchase}
              name="minimumPurchase"
              label="Minimum Purchase"
              fullWidth
            />

            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.secondsBeforeExpiration}
              name="secondsBeforeExpiration"
              label="Seconds Before Expiration"
              fullWidth
            />

            <div className="space-x-2">
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

            <div className="flex space-x-2">
              <MaterialDateTimeInput
                colorTheme="black"
                label="Available Start Date Time"
                openCalendar={openStartEventCalendar}
                setOpenCalendar={(val) => {
                  setOpenStartEventCalendar(val);
                }}
                onChange={(newValue) => {
                  if (newValue)
                    setFormState({
                      ...formState,
                      availableStartDateTime: moment(newValue, "HH:mm:ss"),
                    });
                }}
                value={formState.availableStartDateTime}
              />

              <MaterialDateTimeInput
                colorTheme="black"
                label="Available End Date Time"
                openCalendar={openEndEventCalendar}
                setOpenCalendar={(val) => {
                  setOpenEndEventCalendar(val);
                }}
                onChange={(newValue) => {
                  if (newValue)
                    setFormState({
                      ...formState,
                      availableEndDateTime: moment(newValue, "HH:mm:ss"),
                    });
                }}
                value={formState.availableEndDateTime}
              />
            </div>

            <MaterialInputAutoComplete
              label="Select Available Days"
              colorTheme="black"
              multiple
              options={[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ]}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              value={formState.availableDays}
              onChange={(e, availableDays) => {
                setFormState({
                  ...formState,
                  availableDays,
                });
              }}
              filterSelectedOptions
            />

            <MaterialSwitch
              label="Is Free Delivery"
              onChange={(e) => {
                setFormState({
                  ...formState,
                  isFreeDelivery: e.target.checked,
                });
              }}
              checked={formState.isFreeDelivery}
            />
            {getAdminPopclubCategoriesState.data ? (
              <MaterialInputAutoComplete
                label="Select Categories"
                colorTheme="black"
                multiple
                options={getAdminPopclubCategoriesState.data}
                getOptionLabel={(option) =>
                  option.name + " (" + option.platform_name + ")"
                }
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                value={formState.categories ? [...formState.categories] : []}
                onChange={(e, categories) => {
                  setFormState({
                    ...formState,
                    categories,
                  });
                }}
                filterSelectedOptions
              />
            ) : null}

            <h1 className="text-2xl font-bold text-secondary !my-2">
              Products
            </h1>

            {formState.products.map((product, productIndex) => (
              <div className="flex space-x-2">
                {getAdminSettingDealProductsState.data ? (
                  <MaterialInputAutoComplete
                    label="Select Product"
                    fullWidth
                    colorTheme="black"
                    options={getAdminSettingDealProductsState.data}
                    getOptionLabel={(option) => option.name ?? ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    value={formState.products[productIndex]}
                    onChange={(e, product) => {
                      const copyProducts = [...formState.products];
                      copyProducts[productIndex].product = product;
                      setFormState({
                        ...formState,
                        products: copyProducts,
                      });
                    }}
                  />
                ) : null}

                <MaterialInput
                  colorTheme="black"
                  onChange={(e) => {
                    const copyProducts = [...formState.products];
                    copyProducts[productIndex].quantity = e.target.value;
                    setFormState({
                      ...formState,
                      products: copyProducts,
                    });
                  }}
                  value={product.quantity}
                  name="quantity"
                  required
                  label="Quantity"
                  fullWidth
                />
                <button
                  type="button"
                  onClick={(e) => {
                    let copyProducts = [...formState.products];
                    copyProducts = copyProducts.filter(
                      (value, index) => index !== productIndex
                    );
                    setFormState({
                      ...formState,
                      products: copyProducts,
                    });
                  }}
                  className="text-2xl"
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleProducts}
              className="flex items-center space-x-1 text-[#006600]"
            >
              <AiOutlinePlus className="text-sm" />
              <span className="text-sm font-semibold">Add Product</span>
            </button>

            {getAdminSettingDealProductsState.data ? (
              <>
                <h1 className="text-2xl font-bold text-secondary !my-2">
                  Excluded Products
                </h1>

                <MaterialInputAutoComplete
                  label="Select Excluded Products"
                  colorTheme="black"
                  multiple
                  options={getAdminSettingDealProductsState.data}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  value={formState.excludedProducts}
                  onChange={(e, excludedProducts) => {
                    setFormState({
                      ...formState,
                      excludedProducts,
                    });
                  }}
                  filterSelectedOptions
                />
              </>
            ) : null}
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              <UploadFile
                image={formState.image500x500}
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    image500x500: file,
                  });
                }}
                description="500x500"
              />
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
              <UploadFile
                image={formState.image75x75}
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    image75x75: file,
                  });
                }}
                description="75x75"
              />
            </div>
            <h4 className="mt-1 text-sm leading-5 text-secondary">
              <strong>Note:</strong> JPG is the only supported file type.
              Maximum file size is 2MB.
            </h4>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white rounded-lg bg-button w-fit"
        >
          Create Product
        </button>
      </form>
    </>
  );
}
