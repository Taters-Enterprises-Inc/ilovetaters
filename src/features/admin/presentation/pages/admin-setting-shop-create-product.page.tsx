import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { MaterialInput } from "features/shared/presentation/components";
import { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlinePlus,
} from "react-icons/ai";
import { AdminHead } from "../components";
import {
  getAdminProductCategories,
  selectGetAdminProductCategories,
} from "../slices/get-admin-product-categories.slice";
import {
  getAdminStores,
  GetAdminStoresState,
  selectGetAdminStores,
} from "../slices/get-admin-stores.slice";

interface Variant {
  name: string;
  options: Array<VariantOption>;
}

interface VariantOption {
  name: string;
  price: string;
}

export function AdminSettingShopCreateProduct() {
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<{
    name: string;
    description: string;
    deliveryDetails: string;
    addDetails: string;
    price: string;
    category: string;
    uom: string;
    variants: Array<Variant>;
    stores: Array<AdminStoreModel>;
  }>({
    name: "",
    description: "",
    deliveryDetails: "",
    addDetails: "",
    price: "",
    category: "",
    uom: "",
    variants: [],
    stores: [],
  });

  const getAdminProductCategoriesState = useAppSelector(
    selectGetAdminProductCategories
  );

  const getAdminStoresState = useAppSelector(selectGetAdminStores);

  useEffect(() => {
    dispatch(getAdminProductCategories());
    dispatch(getAdminStores());
  }, [dispatch]);

  useEffect(() => {
    const stores = getAdminStoresState.data;
    if (getAdminStoresState.status === GetAdminStoresState.success && stores) {
      setFormState((f) => ({ ...f, stores }));
    }
  }, [getAdminStoresState]);

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
              price: "",
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
      price: "",
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
            { name: "Products", url: "/admin/setting/product" },
            {
              name: "Create Product",
              url: "/admin/setting/product/create-product",
            },
          ],
        }}
      />
      <section className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Create Product
        </span>
      </section>
      <form className="p-4 space-y-2">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-2">
            <div className="flex space-x-2">
              <MaterialInput
                colorTheme="black"
                name="uom"
                label="UOM"
                select
                value=""
                className="flex-1"
                onChange={() => {}}
              >
                <MenuItem value="PACK">PACK</MenuItem>
                <MenuItem value="SET">SET</MenuItem>
                <MenuItem value="BAG">BAG</MenuItem>
                <MenuItem value="BUNDLE">BUNDLE</MenuItem>
                <MenuItem value="DOZEN">DOZEN</MenuItem>
                <MenuItem value="CAN">CAN</MenuItem>
                <MenuItem value="BOTTLE">BOTTLE</MenuItem>
              </MaterialInput>
              {getAdminProductCategoriesState.data ? (
                <MaterialInput
                  colorTheme="black"
                  name="category"
                  label="Category"
                  select
                  value=""
                  className="flex-1"
                  onChange={() => {}}
                >
                  {getAdminProductCategoriesState.data.map((category) => (
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
              label="Price"
              fullWidth
            />

            {formState.variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="space-y-2">
                <div className="flex space-x-2">
                  <MaterialInput
                    size="small"
                    colorTheme="black"
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
                      colorTheme="black"
                      onChange={(e) => {
                        const copyVariants = [...formState.variants];
                        copyVariants[variantIndex].options[optionIndex].name =
                          e.target.value;
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
                    <MaterialInput
                      size="small"
                      type="number"
                      colorTheme="black"
                      onChange={(e) => {
                        const copyVariants = [...formState.variants];
                        copyVariants[variantIndex].options[optionIndex].price =
                          e.target.value;
                        setFormState({
                          ...formState,
                          variants: copyVariants,
                        });
                      }}
                      value={option.price}
                      name="price"
                      label="Price"
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
                  onClick={() => handleAddProductVariantOption(variantIndex)}
                  className="flex items-center text-secondary space-x-1"
                >
                  <AiOutlinePlus className="text-sm" />
                  <span className="text-sm font-semibold">
                    Add Product Variant Option
                  </span>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddProductVariant}
              className="flex items-center text-secondary space-x-1"
            >
              <AiOutlinePlus className="text-sm" />
              <span className="text-sm font-semibold">Add Product Variant</span>
            </button>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className=" border-dashed border-2 border-secondary h-[250px] rounded-lg flex justify-center items-center flex-col space-y-2">
                <AiOutlineCloudUpload className="text-5xl text-secondary" />{" "}
                <span className="text-sm text-secondary text-center">
                  Drag and drop here to upload <br /> 500x500
                </span>
                <button
                  type="button"
                  className="px-3 py-1 text-sm text-white rounded-lg bg-secondary"
                >
                  Or select file
                </button>
              </div>
              <div className=" border-dashed border-2 border-secondary h-[250px] rounded-lg flex justify-center items-center flex-col space-y-2">
                <AiOutlineCloudUpload className="text-5xl text-secondary" />
                <span className="text-sm text-secondary text-center">
                  Drag and drop here to upload <br /> 250x250
                </span>
                <button
                  type="button"
                  className="px-3 py-1 text-sm text-white rounded-lg bg-secondary"
                >
                  Or select file
                </button>
              </div>
              <div className=" border-dashed border-2 border-secondary h-[250px] rounded-lg flex justify-center items-center flex-col space-y-2">
                <AiOutlineCloudUpload className="text-5xl text-secondary" />
                <span className="text-sm text-secondary text-center">
                  Drag and drop here to upload <br /> 150x150
                </span>
                <button
                  type="button"
                  className="px-3 py-1 text-sm text-white rounded-lg bg-secondary"
                >
                  Or select file
                </button>
              </div>
              <div className=" border-dashed border-2 border-secondary h-[250px] rounded-lg flex justify-center items-center flex-col space-y-2">
                <AiOutlineCloudUpload className="text-5xl text-secondary" />
                <span className="text-sm text-secondary text-center">
                  Drag and drop here to upload <br /> 75x75
                </span>
                <button
                  type="button"
                  className="px-3 py-1 text-sm text-white rounded-lg bg-secondary"
                >
                  Or select file
                </button>
              </div>
            </div>
            <h4 className="mt-1 text-sm leading-5 text-secondary">
              <strong>Note:</strong> Supported file types: JPG, JPEG, PNG and
              GIF. Maximum file size is 2MB.
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {getAdminStoresState.data?.map((store, i) => {
            const isChecked = formState.stores.some((element) => {
              if (element.store_id === store.store_id) {
                return true;
              }

              return false;
            });
            return (
              <div
                key={i}
                className="flex items-center justify-start space-x-1 text-sm text-secondary lg:text-base"
              >
                <Checkbox
                  id={store.store_id.toString()}
                  color="primary"
                  checked={isChecked}
                  onChange={(event) => {
                    if (isChecked) {
                      const filteredStores = formState.stores.filter(
                        (e) => e.store_id !== store.store_id
                      );

                      setFormState({
                        ...formState,
                        stores: filteredStores,
                      });
                    } else {
                      const copyStores = [...formState.stores];
                      copyStores.push(store);
                      setFormState({
                        ...formState,
                        stores: copyStores,
                      });
                    }
                  }}
                />
                <label
                  className="cursor-pointer text-sm"
                  htmlFor={store.store_id.toString()}
                >
                  {store.name}
                </label>
              </div>
            );
          })}
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
