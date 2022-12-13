import React, { useEffect, useState } from "react";
import { AdminHead } from "../components";

import {
  MaterialInput,
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
} from "../slices/admin-setting-caters-package.slice";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
export function AdminSettingCreateCatersPackage() {
  const dispatch = useAppDispatch();
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
    category: string;
    num_flavor: string;
    add_remarks: string;
    note: string;
    tags: string;
    dateadded: string;
    product_code: string;
    report_status: number;
    free_threshold: string;
    package_type: string;
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
  });

  const getCatersPackageCategoriesState = useAppSelector(
    selectGetCatersPackageCategories
  );

  const CreateCatersStatus = useAppSelector(getCreateCatersStatus);
  const navigate = useNavigate();

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;

    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

  useEffect(() => {
    dispatch(getCatersPackageCategories());
  }, [dispatch]);
  const postUser = (event: any) => {
    event.preventDefault();

    if (typeof formState["product_image75x75"] !== "string")
      formState["product_image"] = formState["product_image75x75"].name;
    else if (typeof formState["product_image150x150"] !== "string")
      formState["product_image"] = formState["product_image150x150"].name;
    else if (typeof formState["product_image250x250"] !== "string")
      formState["product_image"] = formState["product_image250x250"].name;
    else if (typeof formState["product_image500x500"] !== "string")
      formState["product_image"] = formState["product_image500x500"].name;

    dispatch(createCataringPackage(formState));
  };
  //TODO clean up reset and fix it
  useEffect(() => {
    if (CreateCatersStatus === 2) {
      dispatch(resetCreateCaterPackageStatus());
      navigate("/admin/setting/caters-setting");
    }
  }, [navigate, dispatch, CreateCatersStatus]);
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
          Create Caters Package
        </span>
      </div>
      {/* onSubmit={handleOnSubmit} */}
      <form className="p-4 space-y-3" onSubmit={postUser} method="POST">
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
                  required
                  label="Category Package"
                  select
                  value={formState.category}
                  onChange={handleInputChange}
                  className="flex-1"
                >
                  {getCatersPackageCategoriesState.data?.map(
                    (category: any, key) => (
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

            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-button w-fit"
            >
              Create Package
            </button>
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
      </form>
    </>
  );
}
