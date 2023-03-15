import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  MaterialInput,
  MaterialInputAutoComplete,
  MaterialSwitch,
  UploadFile,
} from "features/shared/presentation/components";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { AdminHead } from "../components";
import {
  getAdminPackageCategories,
  selectGetAdminPackageCategories,
} from "../slices/get-admin-package-categories.slice";
import {
  getAdminSettingCateringPackage,
  GetAdminSettingCateringPackageState,
  resetGetAdminSettingCateringPackageState,
  selectGetAdminSettingCateringPackage,
} from "../slices/get-admin-setting-catering-package.slice";
import {
  getAdminSnackshopStores,
  selectGetAdminSnackshopStores,
} from "../slices/get-admin-snackshop-stores.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  editAdminSettingCateringPackage,
  EditAdminSettingCateringPackageState,
  resetEditAdminSettingCateringPackageState,
  selectEditAdminSettingCateringPackage,
} from "../slices/edit-admin-setting-catering-package.slice";
import {
  closeMessageModal,
  openMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";
import { CateringStoreModel } from "features/admin/core/domain/catering-store.model";
import { AdminCateringDynamicPrice } from "features/admin/core/domain/admin-catering-dynamic-price.model";

interface Variant {
  name: string;
  options: Array<VariantOption>;
}

interface VariantOption {
  name: string;
}

export function AdminSettingCateringEditPackage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getAdminPackageCategoriesState = useAppSelector(
    selectGetAdminPackageCategories
  );
  const getAdminSnackshopStoresState = useAppSelector(
    selectGetAdminSnackshopStores
  );
  const getAdminSettingCateringPackageState = useAppSelector(
    selectGetAdminSettingCateringPackage
  );

  const editAdminSettingCateringPackageState = useAppSelector(
    selectEditAdminSettingCateringPackage
  );

  useEffect(() => {
    if (
      editAdminSettingCateringPackageState.status ===
      EditAdminSettingCateringPackageState.success
    ) {
      navigate("/admin/setting/package");
      dispatch(resetEditAdminSettingCateringPackageState());
    }
  }, [editAdminSettingCateringPackageState, dispatch, navigate, id]);

  const [formState, setFormState] = useState<{
    name: string;
    description: string;
    deliveryDetails: string;
    addDetails: string;
    price: string;
    category: string;
    uom: string;
    numFlavor: string;
    variants: Array<Variant>;
    freeThreshold: string;
    dynamicPrices: Array<AdminCateringDynamicPrice>;
    packageAvailability: boolean | "";
    stores: Array<CateringStoreModel>;
    image500x500: File | string;
    image250x250: File | string;
    image75x75: File | string;
  }>({
    name: "",
    description: "",
    deliveryDetails: "",
    addDetails: "",
    price: "",
    category: "",
    uom: "",
    variants: [],
    packageAvailability: "",
    freeThreshold: "",
    dynamicPrices: [],
    stores: [],
    numFlavor: "",
    image500x500: "",
    image250x250: "",
    image75x75: "",
  });

  useEffect(() => {
    dispatch(getAdminPackageCategories());
    dispatch(getAdminSnackshopStores());
    if (id) {
      dispatch(resetGetAdminSettingCateringPackageState());
      dispatch(getAdminSettingCateringPackage(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      getAdminSettingCateringPackageState.status ===
        GetAdminSettingCateringPackageState.success &&
      getAdminSettingCateringPackageState.data
    ) {
      setFormState({
        name: getAdminSettingCateringPackageState.data.name,
        description: getAdminSettingCateringPackageState.data.description,
        deliveryDetails:
          getAdminSettingCateringPackageState.data.delivery_details,
        addDetails: getAdminSettingCateringPackageState.data.add_details,
        price: getAdminSettingCateringPackageState.data.price.toString(),
        category: getAdminSettingCateringPackageState.data.category.toString(),
        uom: getAdminSettingCateringPackageState.data.uom,
        variants: getAdminSettingCateringPackageState.data.variants
          ? JSON.parse(
              JSON.stringify(getAdminSettingCateringPackageState.data.variants)
            )
          : [],
        packageAvailability: "",
        freeThreshold: "",
        dynamicPrices: getAdminSettingCateringPackageState.data.dynamic_prices
          ? JSON.parse(
              JSON.stringify(
                getAdminSettingCateringPackageState.data.dynamic_prices
              )
            )
          : [],
        stores: getAdminSettingCateringPackageState.data.stores ?? [],
        numFlavor:
          getAdminSettingCateringPackageState.data.num_flavor.toString(),
        image500x500: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${getAdminSettingCateringPackageState.data.product_image}`,
        image250x250: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${getAdminSettingCateringPackageState.data.product_image}`,
        image75x75: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${getAdminSettingCateringPackageState.data.product_image}`,
      });
    }
  }, [getAdminSettingCateringPackageState]);

  const handleAddProductVariant = () => {
    setFormState({
      ...formState,
      variants: [
        ...formState.variants,
        {
          name: "",
          options: [
            {
              name: "",
            },
          ],
        },
      ],
    });
  };

  const handleAddProductVariantOption = (index: number) => {
    const copyVariants = [...formState.variants];

    copyVariants[index].options.push({
      name: "",
    });

    setFormState({
      ...formState,
      variants: copyVariants,
    });
  };

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

    if (id) {
      dispatch(
        openMessageModal({
          message: "Are you sure you want to update the package ?",
          buttons: [
            {
              color: "#CC5801",
              text: "Yes",
              onClick: () => {
                dispatch(
                  editAdminSettingCateringPackage({
                    id,
                    ...formState,
                    stores: JSON.stringify(formState.stores),
                    variants: JSON.stringify(formState.variants),
                    dynamicPrices: JSON.stringify(formState.dynamicPrices),
                  })
                );
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
    }
  };

  const handleAddDynamicPrice = () => {
    setFormState({
      ...formState,
      dynamicPrices: [
        ...formState.dynamicPrices,
        {
          price: "",
          min_qty: "",
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
            { name: "Packages", url: "/admin/setting/package" },
            {
              name: "Edit Package",
              url: "/admin/setting/package/" + id,
            },
          ],
        }}
      />
      <section className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Edit Package
        </span>
      </section>
      <form onSubmit={handleOnSubmit} className="p-4 space-y-3">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-3">
            <div className="flex space-x-2">
              <MaterialInput
                colorTheme="black"
                name="uom"
                required
                label="UOM"
                select
                value={formState.uom}
                onChange={handleInputChange}
                className="flex-1"
              >
                <MenuItem value="PACK">PACK</MenuItem>
                <MenuItem value="SET">SET</MenuItem>
                <MenuItem value="BAG">BAG</MenuItem>
                <MenuItem value="BUNDLE">BUNDLE</MenuItem>
                <MenuItem value="DOZEN">DOZEN</MenuItem>
                <MenuItem value="CAN">CAN</MenuItem>
                <MenuItem value="BOTTLE">BOTTLE</MenuItem>
                <MenuItem value="EXTRA">EXTRA</MenuItem>
                <MenuItem value="LADDLE">LADDLE</MenuItem>
                <MenuItem value="SCOOP">SCOOP</MenuItem>
                <MenuItem value="BOUQUET">BOUQUET</MenuItem>
                <MenuItem value="STICK">STICK</MenuItem>
                <MenuItem value="SANDWICH">SANDWICH</MenuItem>
                <MenuItem value="CUP">CUP</MenuItem>
              </MaterialInput>

              {getAdminPackageCategoriesState.data ? (
                <MaterialInput
                  colorTheme="black"
                  required
                  name="category"
                  label="Category"
                  select
                  value={formState.category}
                  onChange={handleInputChange}
                  className="flex-1"
                >
                  {getAdminPackageCategoriesState.data.map((category) => (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                  ))}
                </MaterialInput>
              ) : null}
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
              value={formState.description}
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              maxRows={5}
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.deliveryDetails}
              name="deliveryDetails"
              label="Delivery Details"
              fullWidth
              multiline
              rows={4}
              maxRows={5}
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.addDetails}
              name="addDetails"
              label="Add Details"
              fullWidth
              multiline
              rows={4}
              maxRows={5}
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.price}
              name="price"
              type="number"
              label="Price"
              fullWidth
            />
            <MaterialInput
              required
              colorTheme="black"
              type="number"
              onChange={handleInputChange}
              value={formState.numFlavor}
              name="numFlavor"
              label="Number of Flavor"
              fullWidth
            />

            <MaterialInput
              colorTheme="black"
              type="number"
              onChange={handleInputChange}
              value={formState.freeThreshold}
              name="freeThreshold"
              label="Free Threshold"
              fullWidth
            />

            <h1 className="text-2xl font-bold text-secondary !my-2">
              Dynamic Price
            </h1>

            {formState.dynamicPrices.map((dynamicPrice, dynamicPriceIndex) => (
              <div className="flex space-x-2">
                <MaterialInput
                  colorTheme="black"
                  onChange={(e) => {
                    const copyDynamicPrices = [...formState.dynamicPrices];
                    copyDynamicPrices[dynamicPriceIndex].price = e.target.value;
                    setFormState({
                      ...formState,
                      dynamicPrices: copyDynamicPrices,
                    });
                  }}
                  value={dynamicPrice.price}
                  name="price"
                  required
                  label="Price"
                  fullWidth
                />
                <MaterialInput
                  colorTheme="black"
                  onChange={(e) => {
                    const copyDynamicPrices = [...formState.dynamicPrices];
                    copyDynamicPrices[dynamicPriceIndex].min_qty =
                      e.target.value;
                    setFormState({
                      ...formState,
                      dynamicPrices: copyDynamicPrices,
                    });
                  }}
                  value={dynamicPrice.min_qty}
                  name="min_qty"
                  required
                  label="Minimum Quantity"
                  fullWidth
                />
                <button
                  type="button"
                  onClick={(e) => {
                    let copyDynamicPrices = [...formState.dynamicPrices];
                    copyDynamicPrices = copyDynamicPrices.filter(
                      (value, index) => index !== dynamicPriceIndex
                    );
                    setFormState({
                      ...formState,
                      dynamicPrices: copyDynamicPrices,
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
              onClick={handleAddDynamicPrice}
              className="flex items-center space-x-1 text-[#006600]"
            >
              <AiOutlinePlus className="text-sm" />
              <span className="text-sm font-semibold">Add Dynamic Price</span>
            </button>

            <h1 className="text-2xl font-bold text-secondary !my-2">
              Product Variant Creator
            </h1>
            {formState.variants ? (
              <>
                {formState.variants.map((variant, variantIndex) => (
                  <div key={variantIndex} className="space-y-2">
                    <div className="flex space-x-2">
                      <MaterialInput
                        colorTheme="green"
                        onChange={(e) => {
                          const copyVariants = [...formState.variants];
                          copyVariants[variantIndex].name = e.target.value;
                          setFormState({
                            ...formState,
                            variants: copyVariants,
                          });
                        }}
                        value={variant.name}
                        name="variant"
                        required
                        label="Variant Name"
                        fullWidth
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          let copyVariants = [...formState.variants];
                          copyVariants = copyVariants.filter(
                            (value, index) => index !== variantIndex
                          );
                          setFormState({
                            ...formState,
                            variants: copyVariants,
                          });
                        }}
                        className="text-2xl"
                      >
                        <AiOutlineClose />
                      </button>
                    </div>

                    {variant.options.map((option, optionIndex) => (
                      <div className="flex space-x-2" key={optionIndex}>
                        <MaterialInput
                          size="small"
                          required
                          colorTheme="blue"
                          onChange={(e) => {
                            const copyVariants = [...formState.variants];
                            copyVariants[variantIndex].options[
                              optionIndex
                            ].name = e.target.value;
                            setFormState({
                              ...formState,
                              variants: copyVariants,
                            });
                          }}
                          value={option.name}
                          name="variant"
                          label="Variant Option Name"
                          fullWidth
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            const copyVariants = [...formState.variants];
                            copyVariants[variantIndex].options = copyVariants[
                              variantIndex
                            ].options.filter(
                              (value, index) => index !== optionIndex
                            );
                            setFormState({
                              ...formState,
                              variants: copyVariants,
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
                      onClick={() =>
                        handleAddProductVariantOption(variantIndex)
                      }
                      className="flex items-center space-x-1 text-[#003399]"
                    >
                      <AiOutlinePlus className="text-sm" />
                      <span className="text-sm font-semibold">
                        Add Product Variant Option
                      </span>
                    </button>
                  </div>
                ))}
              </>
            ) : null}
            <button
              type="button"
              onClick={handleAddProductVariant}
              className="flex items-center space-x-1 text-[#006600]"
            >
              <AiOutlinePlus className="text-sm" />
              <span className="text-sm font-semibold">Add Product Variant</span>
            </button>
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

        {getAdminSnackshopStoresState.data ? (
          <div>
            <h1 className="text-2xl font-bold text-secondary !my-2">
              Store Selection
            </h1>

            <h4 className="mt-1 text-sm leading-5 text-secondary">
              <strong className="text-yellow-600">Warning:</strong> If you click
              the button below it open the switch that will force the product to
              be available or not be available to all the listed stores below.
              Please always check this.
            </h4>
            {formState.packageAvailability === "" ? (
              <button
                type="button"
                onClick={() => {
                  dispatch(
                    openMessageModal({
                      message:
                        "Are you sure you want to open the availability switch, it will force the product to be available or not be available to all the listed stores below. Please always check this.",
                      buttons: [
                        {
                          color: "#CC5801",
                          text: "Yes",
                          onClick: () => {
                            setFormState({
                              ...formState,
                              packageAvailability: false,
                            });
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
                }}
                className="px-4 py-2 my-4 text-white rounded-lg bg-secondary w-fit"
              >
                Open Availability Switch
              </button>
            ) : (
              <div className="flex flex-col py-2 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setFormState({
                      ...formState,
                      packageAvailability: "",
                    });
                  }}
                  className="px-4 py-2 text-white rounded-lg bg-secondary w-fit"
                >
                  Close Availability Switch
                </button>

                <MaterialSwitch
                  label={
                    "Make the product available to store selected. ( If the switch is off the store will be the one who enable it )"
                  }
                  checked={formState.packageAvailability}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      packageAvailability: e.target.checked,
                    });
                  }}
                />
              </div>
            )}

            <MaterialInputAutoComplete
              label="Select Stores"
              colorTheme="black"
              multiple
              options={getAdminSnackshopStoresState.data}
              getOptionLabel={(option) => option.name}
              value={formState.stores ? [...formState.stores] : []}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              onChange={(e, stores) => {
                setFormState({
                  ...formState,
                  stores,
                });
              }}
              filterSelectedOptions
            />
          </div>
        ) : null}

        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-lg bg-button w-fit"
          >
            Update Package
          </button>
        </div>
      </form>
    </>
  );
}
