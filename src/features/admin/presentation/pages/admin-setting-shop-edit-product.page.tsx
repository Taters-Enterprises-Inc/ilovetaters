import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  MaterialInput,
  MaterialInputAutoComplete,
  UploadFile,
} from "features/shared/presentation/components";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AdminHead } from "../components";
import {
  getAdminProductCategories,
  selectGetAdminProductCategories,
} from "../slices/get-admin-product-categories.slice";
import {
  getAdminSettingShopProduct,
  GetAdminSettingShopProductState,
  resetGetAdminSettingShopProductState,
  selectGetAdminSettingShopProduct,
} from "../slices/get-admin-setting-shop-product.slice";
import {
  getAdminStores,
  selectGetAdminStores,
} from "../slices/get-admin-stores.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  editAdminSettingShopProduct,
  EditAdminSettingShopProductState,
  resetEditAdminSettingShopProductState,
  selectEditAdminSettingShopProduct,
} from "../slices/edit-admin-setting-shop-product.slice";
import {
  deleteAdminSettingShopProduct,
  DeleteAdminSettingShopProductState,
  resetDeleteAdminSettingShopProductState,
  selectDeleteAdminSettingShopProduct,
} from "../slices/delete-admin-setting-shop-product.slice";
import { MessageModal } from "features/shared/presentation/modals";
import {
  getAdminSettingShopProductTypes,
  selectGetAdminSettingShopProductTypes,
} from "../slices/get-admin-setting-shop-product-types.slice";
import {
  getAdminProducts,
  selectGetAdminProducts,
} from "../slices/get-admin-products.slice";
import { AdminProductModel } from "features/admin/core/domain/admin-product.model";

export interface Variant {
  name: string;
  options: Array<VariantOption>;
}

interface VariantOption {
  name: string;
  sku: string | null;
  price: string | null;
}

export function AdminSettingShopEditProduct() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [openDeleteMessageModal, setOpenDeleteMessageModal] = useState(false);

  const getAdminProductCategoriesState = useAppSelector(
    selectGetAdminProductCategories
  );
  const getAdminStoresState = useAppSelector(selectGetAdminStores);
  const getAdminSettingShopProductState = useAppSelector(
    selectGetAdminSettingShopProduct
  );
  const getAdminProductsState = useAppSelector(selectGetAdminProducts);

  const editAdminSettingShopProductState = useAppSelector(
    selectEditAdminSettingShopProduct
  );

  const deleteAdminSettingShopProductState = useAppSelector(
    selectDeleteAdminSettingShopProduct
  );

  const getAdminSettingProductTypesState = useAppSelector(
    selectGetAdminSettingShopProductTypes
  );

  useEffect(() => {
    if (
      deleteAdminSettingShopProductState.status ===
      DeleteAdminSettingShopProductState.success
    ) {
      navigate("/admin/setting/product");
      dispatch(resetDeleteAdminSettingShopProductState());
    }
  }, [deleteAdminSettingShopProductState, dispatch, navigate, id]);

  useEffect(() => {
    if (
      editAdminSettingShopProductState.status ===
      EditAdminSettingShopProductState.success
    ) {
      navigate("/admin/setting/product");
      dispatch(resetEditAdminSettingShopProductState());
    }
  }, [editAdminSettingShopProductState, dispatch, navigate, id]);

  const [formState, setFormState] = useState<{
    name: string;
    description: string;
    deliveryDetails: string;
    addDetails: string;
    price: string;
    category: string;
    productType: string;
    uom: string;
    numFlavor: string;
    variants: Array<Variant>;
    stores: Array<AdminStoreModel>;
    products: Array<AdminProductModel>;
    image500x500: File | string;
    image250x250: File | string;
    image150x150: File | string;
    image75x75: File | string;
  }>({
    name: "",
    description: "",
    deliveryDetails: "",
    addDetails: "",
    price: "",
    category: "",
    productType: "",
    uom: "",
    variants: [],
    stores: [],
    products: [],
    numFlavor: "",
    image500x500: "",
    image250x250: "",
    image150x150: "",
    image75x75: "",
  });

  useEffect(() => {
    dispatch(getAdminProductCategories());
    dispatch(getAdminStores());
    dispatch(getAdminProducts());
    dispatch(getAdminSettingShopProductTypes());
    if (id) {
      dispatch(resetGetAdminSettingShopProductState());
      dispatch(getAdminSettingShopProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      getAdminSettingShopProductState.status ===
        GetAdminSettingShopProductState.success &&
      getAdminSettingShopProductState.data
    ) {
      setFormState({
        name: getAdminSettingShopProductState.data.name,
        description: getAdminSettingShopProductState.data.description,
        deliveryDetails: getAdminSettingShopProductState.data.delivery_details,
        addDetails: getAdminSettingShopProductState.data.add_details,
        price: getAdminSettingShopProductState.data.price.toString(),
        category: getAdminSettingShopProductState.data.category.toString(),
        productType:
          getAdminSettingShopProductState.data.product_type_id.toString(),
        uom: getAdminSettingShopProductState.data.uom,
        variants: getAdminSettingShopProductState.data.variants
          ? JSON.parse(
              JSON.stringify(getAdminSettingShopProductState.data.variants)
            )
          : [],
        stores: getAdminSettingShopProductState.data.stores ?? [],
        products: getAdminSettingShopProductState.data.products ?? [],
        numFlavor: getAdminSettingShopProductState.data.num_flavor.toString(),
        image500x500: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${getAdminSettingShopProductState.data.product_image}`,
        image250x250: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${getAdminSettingShopProductState.data.product_image}`,
        image150x150: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/150/${getAdminSettingShopProductState.data.product_image}`,
        image75x75: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${getAdminSettingShopProductState.data.product_image}`,
      });
    }
  }, [getAdminSettingShopProductState]);

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
              price: null,
              sku: null,
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
      price: null,
      sku: null,
    });

    setFormState({
      ...formState,
      variants: copyVariants,
    });
  };

  const handleAddProductVariantOptionWithPrice = (index: number) => {
    const copyVariants = [...formState.variants];

    copyVariants[index].options.push({
      name: "",
      sku: "",
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

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formState.image500x500 === "" ||
      formState.image250x250 === "" ||
      formState.image150x150 === "" ||
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
        editAdminSettingShopProduct({
          id,
          ...formState,
          stores: JSON.stringify(formState.stores),
          variants: JSON.stringify(formState.variants),
          products: JSON.stringify(formState.products),
        })
      );
    }
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
              name: "Edit Product",
              url: "/admin/setting/product/" + id,
            },
          ],
        }}
      />
      <section className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Edit Product
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

              {getAdminProductCategoriesState.data &&
              formState.productType === "1" ? (
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
                  {getAdminProductCategoriesState.data.map((category) => (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                  ))}
                </MaterialInput>
              ) : null}

              {getAdminSettingProductTypesState.data ? (
                <MaterialInput
                  colorTheme="black"
                  required
                  name="productType"
                  label="Product Type"
                  select
                  value={formState.productType}
                  onChange={handleInputChange}
                  className="flex-1"
                >
                  {getAdminSettingProductTypesState.data.map((productType) => (
                    <MenuItem value={productType.id.toString()}>
                      {productType.name}
                    </MenuItem>
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

            {formState.productType === "1" ? (
              <>
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
                            {option.sku !== null ? (
                              <MaterialInput
                                size="small"
                                required
                                colorTheme="blue"
                                onChange={(e) => {
                                  const copyVariants = [...formState.variants];
                                  copyVariants[variantIndex].options[
                                    optionIndex
                                  ].sku = e.target.value;
                                  setFormState({
                                    ...formState,
                                    variants: copyVariants,
                                  });
                                }}
                                value={option.sku}
                                name="sku"
                                label="SKU"
                                fullWidth
                              />
                            ) : null}
                            {option.price !== null ? (
                              <MaterialInput
                                size="small"
                                type="number"
                                required
                                colorTheme="blue"
                                onChange={(e) => {
                                  const copyVariants = [...formState.variants];
                                  copyVariants[variantIndex].options[
                                    optionIndex
                                  ].price = e.target.value;
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
                            ) : null}
                            <button
                              type="button"
                              onClick={(e) => {
                                const copyVariants = [...formState.variants];
                                copyVariants[variantIndex].options =
                                  copyVariants[variantIndex].options.filter(
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
                            handleAddProductVariantOptionWithPrice(variantIndex)
                          }
                          className="flex items-center text-[#003399] space-x-1"
                        >
                          <AiOutlinePlus className="text-sm" />
                          <span className="text-sm font-semibold ">
                            Add Product Variant Option with Price
                          </span>
                        </button>

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
                  <span className="text-sm font-semibold">
                    Add Product Variant
                  </span>
                </button>
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
                image={formState.image150x150}
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    image150x150: file,
                  });
                }}
                description="150x150"
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

        {getAdminStoresState.data && formState.productType === "1" ? (
          <>
            <h1 className="text-2xl font-bold text-secondary !my-2">
              Store Selection
            </h1>

            <MaterialInputAutoComplete
              label="Select Stores"
              colorTheme="black"
              multiple
              options={getAdminStoresState.data}
              getOptionLabel={(option) => option.name}
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

        {getAdminProductsState.data && formState.productType === "2" ? (
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

        {getAdminStoresState.data && formState.productType === "2" ? (
          <>
            <h1 className="text-2xl font-bold text-secondary !my-2">
              Catering Store Selection
            </h1>

            <MaterialInputAutoComplete
              label="Select Stores"
              colorTheme="black"
              multiple
              options={getAdminStoresState.data}
              getOptionLabel={(option) => option.name}
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

        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-lg bg-button w-fit"
          >
            Edit Product
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenDeleteMessageModal(true);
            }}
            className="px-4 py-2 text-white rounded-lg bg-secondary w-fit"
          >
            Delete Product
          </button>
        </div>
      </form>

      <MessageModal
        open={openDeleteMessageModal}
        onClose={() => {
          setOpenDeleteMessageModal(false);
        }}
        onYes={() => {
          if (id) {
            dispatch(deleteAdminSettingShopProduct(id));
          }
        }}
        message={`Are you sure you want to delete ${getAdminSettingShopProductState.data?.name} product?`}
      />
    </>
  );
}