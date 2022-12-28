import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import {
  getAdminCateringPackageFlavors,
  GetAdminCateringPackageFlavorsState,
  selectGetAdminCateringPackageFlavors,
} from "../slices/get-admin-catering-package-flavors.slice";
import {
  selectUpdateAdminCateringOrderItemRemarks,
  resetUpdateAdminCateringOrderItemRemarks,
  updateAdminCateringOrderItemRemarks,
  UpdateAdminCateringOrderItemRemarksState,
} from "../slices/update-admin-catering-order-item-remarks.slice";

export interface AdminCateringEditFlavorProps {
  orderItem: {
    id: number;
    product_id: number;
    product_price: string;
    quantity: number;
    remarks: string;
    name: string;
    description: string;
    add_details: string;
    product_label: string;
  };
}

interface CateringAdminFlavor {
  parent_name: string;
  flavors: Array<{
    quantity: string;
    name: string;
    parent_name: string;
  }>;
}

export function AdminCateringEditFlavor(props: AdminCateringEditFlavorProps) {
  const dispatch = useAppDispatch();

  const [editFlavors, setEditFlavors] = useState(false);
  const [flavors, setFlavors] = useState<Array<CateringAdminFlavor>>([]);

  const updateAdminCateringOrderItemRemarksState = useAppSelector(
    selectUpdateAdminCateringOrderItemRemarks
  );

  const getAdminCateringPackageFlavorsState = useAppSelector(
    selectGetAdminCateringPackageFlavors
  );

  useEffect(() => {
    dispatch(getAdminCateringPackageFlavors(props.orderItem.product_id));
  }, [dispatch]);

  useEffect(() => {
    if (
      getAdminCateringPackageFlavorsState.status ===
        GetAdminCateringPackageFlavorsState.success &&
      getAdminCateringPackageFlavorsState.data
    ) {
      const remarks = props.orderItem.remarks;
      const remarksToflavors = remarks.split("<br>");
      const currentFlavors: Array<{ quantity: string; name: string }> = [];
      for (let i = 0; i < remarksToflavors.length; i++) {
        const flavor = remarksToflavors[i];
        if (flavor === "") {
          continue;
        }
        const quantityAndName = flavor.substring(8);
        const nameIndex = quantityAndName.indexOf(" - ") + 3;
        const quantity = quantityAndName.split("<", 1)[0];
        const name = quantityAndName.substring(nameIndex);
        currentFlavors.push({ quantity, name });
      }

      const filteredPackageFlavors: Array<CateringAdminFlavor> = [];
      for (
        let i = 0;
        i < getAdminCateringPackageFlavorsState.data.length;
        i++
      ) {
        const oldPackageFlavor = getAdminCateringPackageFlavorsState.data[i];
        const newPackageFlavor: CateringAdminFlavor = {
          parent_name: oldPackageFlavor.parent_name,
          flavors: [],
        };

        for (let y = 0; y < oldPackageFlavor.flavors.length; y++) {
          const oldFlavor = oldPackageFlavor.flavors[y];
          const muchedFlavor = currentFlavors.filter(
            (val) => val.name === oldFlavor.name
          )[0];
          newPackageFlavor.flavors.push({
            name: oldFlavor.name,
            parent_name: oldFlavor.parent_name,
            quantity: muchedFlavor ? muchedFlavor.quantity : "0",
          });
        }

        filteredPackageFlavors.push(newPackageFlavor);
      }

      setFlavors(filteredPackageFlavors);
    }
  }, [getAdminCateringPackageFlavorsState]);

  useEffect(() => {
    if (
      updateAdminCateringOrderItemRemarksState.status ===
      UpdateAdminCateringOrderItemRemarksState.success
    ) {
      setEditFlavors(false);
      dispatch(resetUpdateAdminCateringOrderItemRemarks());
    }
  }, [updateAdminCateringOrderItemRemarksState, dispatch]);

  return (
    <>
      {editFlavors === false ? (
        <>
          {props.orderItem.remarks ? (
            <div className="flex justify-end px-2 py-2">
              <button
                onClick={() => {
                  setEditFlavors(true);
                }}
                className="flex items-center justify-center"
              >
                <BiEdit className="text-lg text-blue-600" />
                <span className="text-xs font-semibold text-blue-600 underline">
                  Edit flavor
                </span>
              </button>
            </div>
          ) : null}

          <span
            dangerouslySetInnerHTML={{
              __html: props.orderItem.remarks,
            }}
          />
        </>
      ) : (
        <>
          {props.orderItem.remarks ? (
            <div className="flex justify-end px-2 py-2">
              <button
                onClick={() => {
                  const remarksToflavors =
                    props.orderItem.remarks.split("<br>");
                  let oldTotalQuantity = 0;

                  for (let i = 0; i < remarksToflavors.length; i++) {
                    const flavor = remarksToflavors[i];

                    if (flavor === "") {
                      continue;
                    }

                    const quantityAndName = flavor.substring(8);

                    oldTotalQuantity += parseInt(
                      quantityAndName.split("<", 1)[0]
                    );
                  }

                  let remarks = "";
                  let newTotalQuantity = 0;

                  for (let i = 0; i < flavors.length; i++) {
                    const packageFlavor = flavors[i];

                    for (let y = 0; y < packageFlavor.flavors.length; y++) {
                      const flavor = packageFlavor.flavors[y];

                      if (flavor.quantity === "0") {
                        continue;
                      }

                      remarks += `<strong>${flavor.quantity}</strong> - ${flavor.name}<br>`;

                      newTotalQuantity += parseInt(flavor.quantity);
                    }
                  }

                  if (oldTotalQuantity === newTotalQuantity) {
                    dispatch(
                      updateAdminCateringOrderItemRemarks({
                        orderItemId: props.orderItem.id,
                        remarks,
                      })
                    );
                  } else {
                    dispatch(
                      popUpSnackBar({
                        message: "Number of flavors doesn't match.",
                        severity: "error",
                      })
                    );
                  }
                }}
                className="flex items-center justify-center space-x-1"
              >
                <FaSave className="text-red-600 " />
                <span className="text-xs font-semibold text-red-600 underline">
                  Save Edit
                </span>
              </button>
            </div>
          ) : null}

          {flavors.map((packageFlavor, packageFlavorIndex) => (
            <div className="mb-4" key={packageFlavorIndex}>
              <div className="mb-2 font-bold">{packageFlavor.parent_name}</div>

              {packageFlavor.flavors.map((flavor, flavorIndex) => (
                <div key={flavorIndex}>
                  <input
                    type="number"
                    value={
                      flavors[packageFlavorIndex].flavors[flavorIndex].quantity
                    }
                    onChange={(e) => {
                      const quantity = e.target.value;

                      const updateFlavors = [...flavors];

                      updateFlavors[packageFlavorIndex].flavors[
                        flavorIndex
                      ].quantity = quantity;

                      setFlavors(updateFlavors);
                    }}
                    className="w-[50px] border border-black px-2 font-bold text-blue-600"
                  />{" "}
                  - <span>{flavor.name}</span>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </>
  );
}
