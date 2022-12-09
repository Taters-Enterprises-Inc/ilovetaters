import { useAppDispatch, useAppSelector } from "features/config/hooks";
import React, { useEffect } from "react";
import { MdOutlineGroupAdd, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { Link } from "react-router-dom";
import { AdminHead } from "../components";
import {
  fetchAllCataringPackageListsStatus,
  getAllCataringPackageLists,
  selectAllCataringPackageLists,
} from "../slices/admin-setting-caters-package.slice";

export function AdminSettingCatersPackage() {
  const dispatch = useAppDispatch();

  const packages = useAppSelector(selectAllCataringPackageLists);

  const listPackageStatus = useAppSelector(fetchAllCataringPackageListsStatus);
  useEffect(() => {
    if (listPackageStatus === 0) {
      dispatch(getAllCataringPackageLists());
    }

    if (listPackageStatus === 2) {
      console.log(packages);
    }
  }, [dispatch, listPackageStatus, packages]);

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
          ],
        }}
      />

      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Caters Package
        </span>
        <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
          <div>
            <Link
              to="create-user"
              className="inline-flex items-center px-4 tracking-wide py-1  bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700"
            >
              <MdOutlinePersonAddAlt1 size={20} />
              <span>&nbsp;&nbsp;Create New Package</span>
            </Link>
          </div>
          <div>
            <Link
              to="create-group"
              className="inline-flex items-center px-4 tracking-wide bg-button font-['Varela_Round'] text-white py-1 text-xs rounded-md font-700"
            >
              <MdOutlineGroupAdd size={20} />
              <span>&nbsp;&nbsp;Create New Package Add-Ons</span>
            </Link>
          </div>
          <div>
            <Link
              to="create-group"
              className="inline-flex items-center px-4 tracking-wide bg-button font-['Varela_Round'] text-white py-1 text-xs rounded-md font-700"
            >
              <MdOutlineGroupAdd size={20} />
              <span>&nbsp;&nbsp;Create New Product Add-Ons</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
