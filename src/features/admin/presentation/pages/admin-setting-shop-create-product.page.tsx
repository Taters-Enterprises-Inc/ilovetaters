import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { MaterialInput } from "features/shared/presentation/components";
import { useEffect } from "react";
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

export function AdminSettingShopCreateProduct() {
  const dispatch = useAppDispatch();
  const getAdminProductCategoriesState = useAppSelector(
    selectGetAdminProductCategories
  );

  useEffect(() => {
    dispatch(getAdminProductCategories());
  }, [dispatch]);

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
              onChange={() => {}}
              value=""
              name="Name"
              label="Name"
              fullWidth
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={() => {}}
              value=""
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
              onChange={() => {}}
              value=""
              name="delivery_details"
              label="Delivery Details"
              fullWidth
              multiline
              rows={4}
              maxRows={5}
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={() => {}}
              value=""
              name="add_details"
              label="Add Details"
              fullWidth
              multiline
              rows={4}
              maxRows={5}
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={() => {}}
              value=""
              name="price"
              label="Price"
              fullWidth
            />

            <div className="flex space-x-2">
              <MaterialInput
                size="small"
                colorTheme="black"
                onChange={() => {}}
                value=""
                name="variant"
                label="Variant Name"
                fullWidth
              />
              <button className="text-2xl">
                <AiOutlineClose />
              </button>
            </div>

            <div className="flex space-x-2">
              <MaterialInput
                size="small"
                colorTheme="black"
                onChange={() => {}}
                value=""
                name="variant"
                label="Variant Option Name"
                fullWidth
              />
              <MaterialInput
                size="small"
                colorTheme="black"
                onChange={() => {}}
                value=""
                name="price"
                label="Price"
                fullWidth
              />
              <button className="text-2xl">
                <AiOutlineClose />
              </button>
            </div>

            <button
              type="button"
              className="flex items-center text-secondary space-x-1"
            >
              <AiOutlinePlus className="text-sm" />
              <span className="text-sm font-semibold">
                Add Product Variant Option
              </span>
            </button>

            <button
              type="button"
              className="flex items-center text-secondary space-x-1"
            >
              <AiOutlinePlus className="text-sm" />
              <span className="text-sm font-semibold">Add Product Variant</span>
            </button>

            {/* <div className="flex space-x-2">
              <MaterialInput
                size="small"
                colorTheme="black"
                onChange={() => {}}
                value=""
                name="size"
                label="Size Name"
                fullWidth
              />
              <MaterialInput
                size="small"
                colorTheme="black"
                onChange={() => {}}
                value=""
                name="price"
                label="Price"
                fullWidth
              />
              <button className="text-2xl">
                <AiOutlineClose />
              </button>
            </div>

            <div className="flex items-center text-secondary space-x-1">
              <AiOutlinePlus className="text-sm" />
              <span className="text-sm font-semibold">Add Product Variant</span>
            </div> */}
          </div>

          <div>
            <div className=" border-dashed border-2 border-secondary w-[500px] h-[400px] rounded-lg flex justify-center items-center flex-col space-y-2">
              <AiOutlineCloudUpload className="text-5xl text-secondary" />
              <span className="text-lg text-secondary">
                Drag and drop here to upload
              </span>
              <button
                type="button"
                className="px-3 py-1 text-lg text-white rounded-lg bg-secondary"
              >
                Or select file
              </button>
            </div>
            <h4 className="mt-1 text-sm leading-5 text-secondary">
              <strong>Note:</strong> Supported file types: JPG, JPEG, PNG and
              GIF. Maximum file size is 2MB.
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
