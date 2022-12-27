import { useEffect, useState } from "react";
import { AdminHead } from "../components";

import {
  MaterialInput,
  MaterialInputAutoComplete,
  UploadFile,
} from "features/shared/presentation/components";
import { MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getCatersPackageCategories,
  selectGetCatersPackageCategories,
} from "../slices/get-caters-package-categories.slice";
import {
  createCataringPackage,
  getCreateCatersStatus,
  resetCreateCaterPackageStatus,
  selectCatersPackageByID,
  selectDynamicPricesBYPackageID,
  selectVariantsBYPackageID,
  updateCataringPackage,
} from "../slices/admin-setting-caters-package.slice";
import { useNavigate, useParams } from "react-router-dom";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { UpdateCatersPackageParam } from "features/admin/core/admin.params";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import {
  getAdminStores,
  selectGetAdminStores,
} from "../slices/get-admin-stores.slice";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";

export interface dynamicPriceParam {
  id: string;
  package_id: string;
  price: string;
  min_qty: string;
}

export interface variantParam {
  id: string;
  product_id: string;
  name: string;
  status: string;
  variantOption: Array<variantOptionParam>;
}
export interface variantOptionParam {
  id: string;
  product_variant_id: string;
  name: string;
  status: string;
}

export function AdminSettingCreateCatersPackage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentPackage = useAppSelector((state) =>
    selectCatersPackageByID(state, Number(id))
  );

  const currentPrices = useAppSelector((state) =>
    selectDynamicPricesBYPackageID(state, Number(id))
  );

  const currentVariants = useAppSelector((state) =>
    selectVariantsBYPackageID(state, Number(id))
  );
  // const currentVariantOptions = useAppSelector((state) =>
  //   selectDynamicPricesBYPackageID(state, Number(id))
  // );
  const [hasEditPackage, setHasEditPackage] = useState(false);
  const [hasEditDynamicPrices, setHasEditDynamicPrices] = useState(false);
  const [hasEditVariant, setHasEditVariant] = useState(false);

  const [storesState, setStoreState] = useState<{
    stores: Array<AdminStoreModel>;
  }>({
    stores: [],
  });

  const [formState, setFormState] = useState<{
    product_image75x75: File | string;
    product_image150x150: File | string;
    product_image250x250: File | string;
    product_image500x500: File | string;
    product_image: string;
    name: string;
    description: string;
    delivery_details: string;
    price: string;
    uom: string;
    add_details: string;
    status: string;
    category: string | null;
    num_flavor: string;
    add_remarks: string;
    note: string;
    tags: string;
    dateadded: string;
    product_code: string;
    report_status: number;
    free_threshold: string;
    package_type: string;
    dynamic_price: string;
    variants: string;
    stores: string;
  }>({
    product_image75x75: "",
    product_image150x150: "",
    product_image250x250: "",
    product_image500x500: "",
    product_image: "",
    name: "",
    description: "",
    delivery_details: "",
    price: "",
    uom: "",
    add_details: "",
    status: "",
    category: "",
    num_flavor: "",
    add_remarks: "",
    note: "",
    tags: "",
    dateadded: "",
    product_code: "",
    report_status: 0,
    free_threshold: "",
    package_type: "",
    dynamic_price: "",
    variants: "",
    stores: "",
  });

  const [dynamicPrices, setDynamicPrices] = useState(Array<dynamicPriceParam>);
  const [variants, setVariants] = useState(Array<variantParam>);

  const addMoreDynamicPrice = () => {
    setDynamicPrices([
      ...dynamicPrices,
      { id: "", package_id: "", price: "", min_qty: "" },
    ]);
  };
  const removeDynamicPrice = (index: number) => {
    const list = [...dynamicPrices];
    list.splice(index, 1);
    setDynamicPrices(list);
  };

  const addMoreVariant = () => {
    setVariants([
      ...variants,
      {
        id: "",
        product_id: "",
        name: "",
        status: "",
        variantOption: [
          { id: "", product_variant_id: "", name: "", status: "" },
        ],
      },
    ]);
  };

  const removeVariant = (index: number) => {
    const list = [...variants];
    list.splice(index, 1);
    setVariants(list);
  };

  const handleInputVariantOption = (
    parentIndex: any,
    childIndex: number,
    e: any
  ) => {
    const option = variants.filter((data, key) => key === parentIndex);
    if (option[0]) {
      option[0]["variantOption"][childIndex].name = e.target.value;
      const list = [...variants];
      list[parentIndex].variantOption = option[0]["variantOption"];
      setVariants(list);
    }
  };

  const addMoreVariantOption = (parentIndex: any) => {
    const filteredVariant = variants.filter((data, key) => key === parentIndex);
    if (filteredVariant[0]) {
      // console.log(test[0]["variantOption"]);
      filteredVariant[0]["variantOption"].push({
        id: "",
        product_variant_id: "",
        name: "",
        status: "",
      });

      const list = [...variants];
      list[parentIndex].variantOption = filteredVariant[0]["variantOption"];
      setVariants(list);
    }
  };

  const removeVariantOption = (parentIndex: number, childIndex: number) => {
    const filteredVariant = variants.filter((data, key) => key === parentIndex);
    if (filteredVariant[0]) {
      console.log(filteredVariant[0]["variantOption"]);
      filteredVariant[0]["variantOption"].splice(childIndex, 1);

      const list = [...variants];
      list[parentIndex].variantOption = filteredVariant[0]["variantOption"];
      setVariants(list);
    }
  };

  if (currentPackage === undefined && id) {
    navigate("/admin/setting/caters-setting");
  }

  const getCatersPackageCategoriesState = useAppSelector(
    selectGetCatersPackageCategories
  );

  const CreateCatersStatus = useAppSelector(getCreateCatersStatus);

  const getAdminStoresState = useAppSelector(selectGetAdminStores);

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;

    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };
  useEffect(() => {
    dispatch(getCatersPackageCategories());
    dispatch(getAdminStores());
  }, [dispatch]);

  useEffect(() => {
    const stores = getAdminStoresState.data;
    if (getAdminStoresState.status === 2 && stores) {
      setStoreState((f) => ({ ...f, stores }));
    }
  }, [getAdminStoresState]);

  useEffect(() => {
    if (!hasEditDynamicPrices) {
      setDynamicPrices(currentPrices);
      setHasEditDynamicPrices(true);
    }
  }, [currentPrices, hasEditDynamicPrices]);

  useEffect(() => {
    if (!hasEditVariant) {
      console.log(currentVariants);
      setVariants(currentVariants);
      setHasEditVariant(true);
    }
  }, [currentVariants, hasEditVariant]);
  useEffect(() => {
    if (CreateCatersStatus === 2) {
      dispatch(resetCreateCaterPackageStatus());
      navigate("/admin/setting/caters-setting");
    }

    if (currentPackage !== undefined && id && !hasEditPackage) {
      let picturename = currentPackage["product_image"];
      picturename = picturename.replaceAll(" ", "_");
      setFormState({
        ...formState,
        product_image: currentPackage["product_image"],
        name: currentPackage["name"],
        description: currentPackage["description"],
        delivery_details: currentPackage["delivery_details"],
        price: currentPackage["price"].toString(),
        uom: currentPackage["uom"],
        add_details: currentPackage["add_details"],
        status: currentPackage["status"].toString(),
        num_flavor: currentPackage["num_flavor"].toString(),
        add_remarks: currentPackage["add_remarks"].toString(),
        note: currentPackage["note"],
        tags: currentPackage["tags"],
        dateadded: currentPackage["dateadded"],
        product_code: currentPackage["product_code"],
        report_status: 0,
        free_threshold: currentPackage["free_threshold"].toString(),
        package_type: currentPackage["package_type"].toString(),
        product_image500x500: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${picturename}`,
        product_image250x250: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${picturename}`,
        product_image150x150: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/150/${picturename}`,
        product_image75x75: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${picturename}`,
      });
      setHasEditPackage(true);
    }
  }, [
    dispatch,
    navigate,
    CreateCatersStatus,
    currentPackage,
    formState,
    id,
    hasEditPackage,
  ]);

  const postPackage = (event: any) => {
    event.preventDefault();

    if (typeof formState["product_image75x75"] !== "string")
      formState["product_image"] = formState["product_image75x75"].name;
    else if (typeof formState["product_image150x150"] !== "string")
      formState["product_image"] = formState["product_image150x150"].name;
    else if (typeof formState["product_image250x250"] !== "string")
      formState["product_image"] = formState["product_image250x250"].name;
    else if (typeof formState["product_image500x500"] !== "string")
      formState["product_image"] = formState["product_image500x500"].name;
    formState["product_image"] = formState["product_image"].replaceAll(
      " ",
      "_"
    );

    if (formState["package_type"] === "1") formState["category"] = null;
    if (!hasEditPackage && !id) {
      formState["dynamic_price"] = JSON.stringify(dynamicPrices);
      formState["variants"] = JSON.stringify(variants);
      formState["stores"] = JSON.stringify(storesState.stores);
      // console.log(formState["stores"]);
      // console.log(storesState.stores);
      console.log(formState);
      // console.log(variants);
      dispatch(createCataringPackage(formState));
    } else if (id && hasEditPackage && currentPackage !== undefined) {
      //! Update variant missing in the php controller and model
      const updatedData: UpdateCatersPackageParam = {
        id: id.toString(),
        product_image: formState["product_image"],
        name: formState["name"],
        description: formState["description"],
        delivery_details: formState["delivery_details"],
        price: formState["price"].toString(),
        uom: formState["uom"],
        add_details: formState["add_details"],
        category: formState["category"],
        num_flavor: formState["num_flavor"],
        add_remarks: formState["add_remarks"],
        free_threshold: formState["free_threshold"],
        package_type: formState["package_type"],
        product_image500x500: formState["product_image500x500"],
        product_image250x250: formState["product_image250x250"],
        product_image150x150: formState["product_image150x150"],
        product_image75x75: formState["product_image75x75"],
        dynamic_price: JSON.stringify(dynamicPrices),
        // variants: JSON.stringify(variants),
        // stores: JSON.stringify(storesState.stores),
      };

      console.log(updatedData);
      dispatch(updateCataringPackage(updatedData));
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
            { name: "Cataring Packages", url: "/admin/setting/caters-setting" },
            {
              name: "Create Cataring Packages",
              url: "/admin/setting/caters-setting/create-caters-package",
            },
          ],
        }}
      />

      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          {currentPackage ? "Edit Caters Package" : "Create Caters Package"}
        </span>
      </div>
      {/* onSubmit={handleOnSubmit} */}
      <form className="p-4 space-y-3" onSubmit={postPackage} method="POST">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-3">
            <div className="flex space-x-2">
              <MaterialInput
                colorTheme="black"
                name="package_type"
                required
                label="Package Type"
                select
                value={formState.package_type}
                onChange={handleInputChange}
                className="flex-1"
              >
                <MenuItem value="0">Package</MenuItem>
                <MenuItem value="1">Add-ons</MenuItem>
              </MaterialInput>

              <MaterialInput
                colorTheme="black"
                name="uom"
                required
                label="Unit Of Measure"
                select
                value={formState.uom}
                onChange={handleInputChange}
                className="flex-1"
              >
                <MenuItem value="BUNDLE">BUNDLE</MenuItem>
                <MenuItem value="PC">PC</MenuItem>
              </MaterialInput>
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

            <div className="flex space-x-2">
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
                onChange={handleInputChange}
                value={formState.num_flavor}
                name="num_flavor"
                type="number"
                label="Number of Flavors"
                fullWidth
              />
            </div>

            <div className="flex space-x-2">
              {getCatersPackageCategoriesState.data ? (
                <MaterialInput
                  colorTheme="black"
                  name="category"
                  label="Category Package"
                  select
                  value={
                    Number(formState.package_type) === 0
                      ? formState.category
                      : "1"
                  }
                  onChange={handleInputChange}
                  className={
                    Number(formState.package_type) === 0
                      ? "flex-1"
                      : "flex-1 bg-gray-300 opacity-50"
                  }
                  disabled={Number(formState.package_type) === 0 ? false : true}
                  required={Number(formState.package_type) === 0 ? true : false}
                >
                  {getCatersPackageCategoriesState.data?.map(
                    (category: any, key: any) => (
                      <MenuItem key={key} value={category.id}>
                        <span className="text-xs lg:text-base">
                          {category.name}
                        </span>
                      </MenuItem>
                    )
                  )}
                </MaterialInput>
              ) : null}

              <MaterialInput
                required
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.free_threshold}
                name="free_threshold"
                type="number"
                label="Free threshold"
                fullWidth
                className="flex-1"
              />
            </div>

            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.description}
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={5}
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.delivery_details}
              name="delivery_details"
              label="Delivery Details"
              fullWidth
              multiline
              rows={4}
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.add_details}
              name="add_details"
              label="Add details"
              fullWidth
              multiline
              rows={4}
            />

            {Number(formState.package_type) === 0 ? (
              <>
                <h1 className="text-2xl font-bold text-secondary !my-2">
                  Package Dynamic Price Creator
                </h1>

                {dynamicPrices.map((currentPrice, index) => (
                  <div className="flex space-x-2" key={index}>
                    <MaterialInput
                      required
                      colorTheme="black"
                      onChange={(e) => {
                        const list = [...dynamicPrices];
                        list[index].price = e.target.value;
                        if (id) list[index].package_id = id;
                        setDynamicPrices(list);
                      }}
                      value={currentPrice.price}
                      name="dynamic_price"
                      type="number"
                      label="Dynamic Price"
                      fullWidth
                    />
                    <MaterialInput
                      required
                      colorTheme="black"
                      onChange={(e) => {
                        const list = [...dynamicPrices];
                        list[index].min_qty = e.target.value;
                        if (id) list[index].package_id = id;
                        setDynamicPrices(list);
                      }}
                      value={currentPrice.min_qty}
                      name="min_qty"
                      type="number"
                      label="Minimum Quantity"
                      fullWidth
                    />

                    <button
                      type="button"
                      className="text-2xl"
                      onClick={() => removeDynamicPrice(index)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addMoreDynamicPrice()}
                  className="flex items-center text-[#003399] space-x-1"
                >
                  <AiOutlinePlus className="text-sm" />
                  <span className="text-sm font-semibold ">
                    Add Dynamic Price
                  </span>
                </button>

                <h1 className="text-2xl font-bold text-secondary !my-2">
                  Package Variant Creator
                </h1>

                {variants.map((data, parentindex) => (
                  <div key={parentindex} className="space-y-3">
                    <div className="flex space-x-2" key={parentindex}>
                      <MaterialInput
                        required
                        colorTheme="black"
                        onChange={(e) => {
                          const list = [...variants];
                          list[parentindex].name = e.target.value;
                          setVariants(list);
                        }}
                        value={data.name}
                        name="variantName"
                        type="text"
                        label="Variant"
                        fullWidth
                      />

                      <button
                        type="button"
                        className="text-2xl"
                        onClick={() => removeVariant(parentindex)}
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                    {data["variantOption"].map((dataOption, childindex) => (
                      <div key={childindex}>
                        <div className="flex space-x-2">
                          <MaterialInput
                            required
                            colorTheme="black"
                            onChange={(e) => {
                              handleInputVariantOption(
                                parentindex,
                                childindex,
                                e
                              );
                            }}
                            value={dataOption.name}
                            name="variantOption"
                            type="text"
                            label="Variant Option"
                            fullWidth
                          />

                          <button
                            type="button"
                            className="text-2xl"
                            onClick={() =>
                              removeVariantOption(parentindex, childindex)
                            }
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                        {data["variantOption"].length - 1 === childindex ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              addMoreVariantOption(parentindex);
                            }}
                            className="flex items-center text-[#003399] space-x-1"
                          >
                            <AiOutlinePlus className="text-sm" />
                            <span className="text-sm font-semibold ">
                              Add Variang Option
                            </span>
                          </button>
                        ) : null}
                      </div>
                    ))}

                    {data["variantOption"].length < 1 ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          addMoreVariantOption(parentindex);
                        }}
                        className="flex items-center text-[#003399] space-x-1"
                      >
                        <AiOutlinePlus className="text-sm" />
                        <span className="text-sm font-semibold ">
                          Add Variang Option
                        </span>
                      </button>
                    ) : null}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addMoreVariant()}
                  className="flex items-center text-[#003399] space-x-1"
                >
                  <AiOutlinePlus className="text-sm" />
                  <span className="text-sm font-semibold ">Add Variant</span>
                </button>
              </>
            ) : null}
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <UploadFile
                image={formState.product_image75x75}
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    product_image75x75: file,
                  });
                }}
                description="75x75"
              />
              <UploadFile
                image={formState.product_image150x150}
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    product_image150x150: file,
                  });
                }}
                description="150x150"
              />
              <UploadFile
                image={formState.product_image250x250}
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    product_image250x250: file,
                  });
                }}
                description="250x250"
              />
              <UploadFile
                image={formState.product_image500x500}
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    product_image500x500: file,
                  });
                }}
                description="500x500"
              />
            </div>

            <h4 className="mt-1 text-sm leading-5 text-secondary">
              <strong>Note:</strong> JPG is the only supported file type.
              Maximum file size is 2MB.
            </h4>
          </div>
        </div>
        {/* && formState.productType === "1" */}
        {getAdminStoresState.data ? (
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
              value={storesState.stores ? [...storesState.stores] : []}
              onChange={(e, stores) => {
                setStoreState({
                  ...storesState.stores,
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
          {currentPackage ? "Save Caters Package" : "Create Package"}
        </button>
      </form>
    </>
  );
}
