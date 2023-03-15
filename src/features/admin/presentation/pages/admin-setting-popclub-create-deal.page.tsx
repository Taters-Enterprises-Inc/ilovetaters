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
import { PopclubStoreModel } from "features/admin/core/domain/popclub-store.model";
import {
  selectGetAdminPopclubStores,
  getAdminPopclubStores,
  GetAdminPopclubStoresState,
} from "../slices/get-admin-popclub-stores.slice";
import {
  createAdminSettingPopclubDeal,
  CreateAdminSettingPopclubDealState,
  resetCreateAdminSettingPopclubDealState,
  selectCreateAdminSettingPopclubDeal,
} from "../slices/create-admin-setting-popclub-deal.slice";
import {
  getAdminProducts,
  selectGetAdminProducts,
} from "../slices/get-admin-products.slice";
import { AdminProductModel } from "features/admin/core/domain/admin-product.model";
import { AdminDealIncludedProductModel } from "features/admin/core/domain/admin-deal-include-product.model";
import { AdminDealProductModel } from "features/admin/core/domain/admin-deal-product.model";

export function AdminSettingPopclubCreateDeal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openStartEventCalendar, setOpenStartEventCalendar] = useState(false);
  const [openEndEventCalendar, setOpenEndEventCalendar] = useState(false);

  const [formState, setFormState] = useState<{
    alias: string;
    name: string;
    urlId: string;
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
    dealAvailability: boolean;
    availableDays: Array<string>;
    categories: Array<AdminPopclubCategory>;
    excludedProducts: Array<AdminProductModel>;
    includedProducts: Array<AdminDealIncludedProductModel>;
    products: Array<AdminDealProductModel>;
    stores: Array<PopclubStoreModel>;
    image500x500: File | string;
    image250x250: File | string;
    image75x75: File | string;
  }>({
    alias: "",
    name: "",
    urlId: "",
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
    dealAvailability: false,
    availableDays: [],
    products: [],
    stores: [],
    excludedProducts: [],
    includedProducts: [],
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

  const getAdminProductsState = useAppSelector(selectGetAdminProducts);
  const getAdminPopclubStoresState = useAppSelector(
    selectGetAdminPopclubStores
  );

  const createAdminSettingPopclubDealState = useAppSelector(
    selectCreateAdminSettingPopclubDeal
  );

  useEffect(() => {
    dispatch(getAdminPopclubCategories());
    dispatch(getAdminSettingDealProducts());
    dispatch(getAdminPopclubStores());
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (
      createAdminSettingPopclubDealState.status ===
      CreateAdminSettingPopclubDealState.success
    ) {
      navigate("/admin/setting/deal");
      dispatch(resetCreateAdminSettingPopclubDealState());
    }
  }, [createAdminSettingPopclubDealState, dispatch, navigate]);

  useEffect(() => {
    const stores = getAdminPopclubStoresState.data;
    if (
      getAdminPopclubStoresState.status ===
        GetAdminPopclubStoresState.success &&
      stores
    ) {
      setFormState((f) => ({ ...f, stores }));
    }
  }, [getAdminPopclubStoresState]);

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
        message: "Are you sure you want to create the deal ?",
        buttons: [
          {
            color: "#CC5801",
            text: "Yes",
            onClick: () => {
              if (
                formState.availableStartTime &&
                formState.availableEndTime &&
                formState.availableStartDateTime &&
                formState.availableEndDateTime
              ) {
                dispatch(
                  createAdminSettingPopclubDeal({
                    ...formState,
                    availableStartTime:
                      formState.availableStartTime.format("HH:mm:ss"),
                    availableEndTime:
                      formState.availableEndTime.format("HH:mm:ss"),
                    availableStartDateTime:
                      formState.availableStartDateTime.format(
                        "YYYY-MM-DD HH:mm:ss"
                      ),
                    availableEndDateTime: formState.availableEndDateTime.format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                    stores: JSON.stringify(formState.stores),
                    categories: JSON.stringify(formState.categories),
                    excludedProducts: JSON.stringify(
                      formState.excludedProducts
                    ),
                    includedProducts: JSON.stringify(
                      formState.includedProducts
                    ),
                    products: JSON.stringify(formState.products),
                    availableDays: formState.availableDays.toString(),
                  })
                );
              }
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

  const handleIncludedProducts = () => {
    setFormState({
      ...formState,
      includedProducts: [
        ...formState.includedProducts,
        {
          product: null,
          quantity: "",
          promo_discount_percentage: "",
          obtainable: [],
        },
      ],
    });
  };

  const handleAddObtainable = (index: number) => {
    const copyIncludedProducts = [...formState.includedProducts];

    copyIncludedProducts[index].obtainable.push({
      product: null,
      quantity: "",
      promo_discount_percentage: "",
    });

    setFormState({
      ...formState,
      includedProducts: copyIncludedProducts,
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
              value={formState.urlId}
              name="urlId"
              label="Url Id"
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

            <div className="flex space-x-2">
              <MaterialInput
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.originalPrice}
                name="originalPrice"
                label="Original Price"
                type="number"
                fullWidth
              />
              <MaterialInput
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.promoPrice}
                name="promoPrice"
                label="Promo Price"
                type="number"
                fullWidth
              />
            </div>

            <div className="flex space-x-2">
              <MaterialInput
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.promoDiscountPercentage}
                name="promoDiscountPercentage"
                label="Promo Discount Percentage"
                type="number"
                fullWidth
              />

              <MaterialInput
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.minimumPurchase}
                name="minimumPurchase"
                label="Minimum Purchase"
                fullWidth
                type="number"
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

            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.secondsBeforeExpiration}
              name="secondsBeforeExpiration"
              label="Seconds Before Expiration"
              type="number"
              fullWidth
            />

            <div className="flex space-x-2 ">
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
                fullWidth
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
                fullWidth
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
                fullWidth
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
                fullWidth
                value={formState.availableEndDateTime}
              />
            </div>

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
                    value={formState.products[productIndex].product}
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
                  type="number"
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

            <h1 className="text-2xl font-bold text-secondary !my-2">
              Included Products
            </h1>

            {formState.includedProducts.map(
              (includedProduct, includedProductIndex) => (
                <div key={includedProductIndex} className="space-y-2">
                  <div className="flex space-x-2">
                    {getAdminSettingDealProductsState.data ? (
                      <MaterialInputAutoComplete
                        label="Select Product"
                        fullWidth
                        colorTheme="green"
                        options={getAdminSettingDealProductsState.data}
                        getOptionLabel={(option) => option.name ?? ""}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        value={
                          formState.includedProducts[includedProductIndex]
                            .product
                        }
                        onChange={(e, product) => {
                          const copyIncludedProducts = [
                            ...formState.includedProducts,
                          ];
                          copyIncludedProducts[includedProductIndex].product =
                            product;
                          setFormState({
                            ...formState,
                            includedProducts: copyIncludedProducts,
                          });
                        }}
                      />
                    ) : null}

                    <MaterialInput
                      colorTheme="green"
                      onChange={(e) => {
                        const copyIncludedProducts = [
                          ...formState.includedProducts,
                        ];
                        copyIncludedProducts[includedProductIndex].quantity =
                          e.target.value;
                        setFormState({
                          ...formState,
                          includedProducts: copyIncludedProducts,
                        });
                      }}
                      value={includedProduct.quantity}
                      name="quantity"
                      required
                      label="Quantity"
                      type="number"
                      fullWidth
                    />

                    <MaterialInput
                      colorTheme="green"
                      onChange={(e) => {
                        const copyIncludedProducts = [
                          ...formState.includedProducts,
                        ];
                        copyIncludedProducts[
                          includedProductIndex
                        ].promo_discount_percentage = e.target.value;
                        setFormState({
                          ...formState,
                          includedProducts: copyIncludedProducts,
                        });
                      }}
                      value={includedProduct.promo_discount_percentage}
                      name="promo_discount_percentage"
                      required
                      label="Discount Percentage"
                      type="number"
                      fullWidth
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        let copyIncludedProducts = [
                          ...formState.includedProducts,
                        ];
                        copyIncludedProducts = copyIncludedProducts.filter(
                          (value, index) => index !== includedProductIndex
                        );
                        setFormState({
                          ...formState,
                          includedProducts: copyIncludedProducts,
                        });
                      }}
                      className="text-2xl"
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                  {includedProduct.obtainable.map(
                    (obtainableProduct, obtainableProductsIndex) => (
                      <div
                        key={obtainableProductsIndex}
                        className="flex space-x-2"
                      >
                        {getAdminSettingDealProductsState.data ? (
                          <MaterialInputAutoComplete
                            label="Select Product"
                            fullWidth
                            colorTheme="blue"
                            options={getAdminSettingDealProductsState.data}
                            getOptionLabel={(option) => option.name ?? ""}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            value={obtainableProduct.product}
                            onChange={(e, product) => {
                              const copyIncludedProducts = [
                                ...formState.includedProducts,
                              ];
                              copyIncludedProducts[
                                includedProductIndex
                              ].obtainable[obtainableProductsIndex].product =
                                product;
                              setFormState({
                                ...formState,
                                includedProducts: copyIncludedProducts,
                              });
                            }}
                          />
                        ) : null}

                        <MaterialInput
                          colorTheme="blue"
                          onChange={(e) => {
                            const copyIncludedProducts = [
                              ...formState.includedProducts,
                            ];
                            copyIncludedProducts[
                              includedProductIndex
                            ].obtainable[obtainableProductsIndex].quantity =
                              e.target.value;
                            setFormState({
                              ...formState,
                              includedProducts: copyIncludedProducts,
                            });
                          }}
                          value={obtainableProduct.quantity}
                          name="quantity"
                          required
                          label="Quantity"
                          type="number"
                          fullWidth
                        />

                        <MaterialInput
                          colorTheme="blue"
                          onChange={(e) => {
                            const copyIncludedProducts = [
                              ...formState.includedProducts,
                            ];
                            copyIncludedProducts[
                              includedProductIndex
                            ].obtainable[
                              obtainableProductsIndex
                            ].promo_discount_percentage = e.target.value;
                            setFormState({
                              ...formState,
                              includedProducts: copyIncludedProducts,
                            });
                          }}
                          value={obtainableProduct.promo_discount_percentage}
                          name="promo_discount_percentage"
                          required
                          label="Discount Percentage"
                          fullWidth
                        />

                        <button
                          type="button"
                          onClick={(e) => {
                            let copyIncludedProducts = [
                              ...formState.includedProducts,
                            ];
                            copyIncludedProducts[
                              includedProductIndex
                            ].obtainable = copyIncludedProducts[
                              includedProductIndex
                            ].obtainable.filter(
                              (value, index) =>
                                index !== obtainableProductsIndex
                            );
                            setFormState({
                              ...formState,
                              includedProducts: copyIncludedProducts,
                            });
                          }}
                          className="text-2xl"
                        >
                          <AiOutlineClose />
                        </button>
                      </div>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => handleAddObtainable(includedProductIndex)}
                    className="flex items-center text-[#003399] space-x-1"
                  >
                    <AiOutlinePlus className="text-sm" />
                    <span className="text-sm font-semibold ">
                      Add Obtainable
                    </span>
                  </button>
                </div>
              )
            )}

            <button
              type="button"
              onClick={handleIncludedProducts}
              className="flex items-center space-x-1 text-[#006600]"
            >
              <AiOutlinePlus className="text-sm" />
              <span className="text-sm font-semibold">
                Add Included Product
              </span>
            </button>

            {getAdminProductsState.data ? (
              <>
                <h1 className="text-2xl font-bold text-secondary !my-2">
                  Excluded Products
                </h1>

                <MaterialInputAutoComplete
                  label="Select Excluded Products"
                  colorTheme="black"
                  multiple
                  options={getAdminProductsState.data}
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

        {getAdminPopclubStoresState.data ? (
          <>
            <h1 className="text-2xl font-bold text-secondary !my-2">
              Store Selection
            </h1>
            <MaterialSwitch
              label={
                "Make the product available to store selected. ( If the switch is off the store will be the one who enable it )"
              }
              checked={formState.dealAvailability}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  dealAvailability: e.target.checked,
                });
              }}
            />

            <MaterialInputAutoComplete
              label="Select Stores"
              colorTheme="black"
              multiple
              options={getAdminPopclubStoresState.data}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              value={formState.stores ? [...formState.stores] : []}
              onChange={(e, stores) => {
                setFormState({
                  ...formState,
                  stores,
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
          Create Deal
        </button>
      </form>
    </>
  );
}
