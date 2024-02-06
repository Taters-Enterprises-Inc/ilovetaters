import { Button } from "@mui/material";
import { updateAdminSettingShopProductStatus } from "features/admin/presentation/slices/update-admin-setting-shop-product-status.slice";
import { useAppDispatch } from "features/config/hooks";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import {
  openMessageModal,
  closeMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import React, { useEffect, useState } from "react";
import { confirmNewOrder } from "../slices/confirm-new-order.slice";
import { ConfirmOrdersModal } from "../modals/confirm-order.modal";
import { createQueryParams } from "features/config/helpers";
import { getStockOrderStores } from "../slices/get-store.slice";
import { ProductParam } from "features/stock-ordering/core/stock-ordering.params";
import { getStockOrderProducts } from "../slices/get-products.slice";

interface StockOrderProcessCommpletedProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}
export function StockOrderProcessCompleted(
  props: StockOrderProcessCommpletedProps
) {
  const dispatch = useAppDispatch();
  const [openOrderConfirmation, setOpenOrderConfirmation] = useState(false);

  const orderProductData: OrderTableData[] = props.rows.product_data.map(
    (product) => ({
      productId: product.id,
      productName: product.product_name,
      uom: product.uom,
      cost: product.cost,
      orderQty: product.order_qty !== null ? product.order_qty : "",
    })
  );

  const storeId = props.rows.order_information.store_id;
  const storeName = props.rows.order_information.store_name;
  const categoryId = props.rows.order_information.category_id;
  const categoryName = props.rows.order_information.category_name;

  return (
    <>
      <div>
        <Button
          fullWidth
          variant="contained"
          sx={STOCK_ORDERING_BUTTON_STYLE}
          onClick={() => {
            dispatch(
              openMessageModal({
                message: `Are you sure you want to use this order as reference for new order?`,
                buttons: [
                  {
                    color: "#CC5801",
                    text: "Yes & Edit",
                    onClick: () => {
                      const productParams: ProductParam = {
                        category: categoryId,
                        store_information: {
                          store_id: storeId,
                          store_name: storeName,
                        },
                      };

                      dispatch(getStockOrderProducts(productParams));

                      dispatch(
                        confirmNewOrder({
                          data: {
                            selectedStoreId: storeId,
                            selectedAddress: storeName,
                            category: {
                              category_id: categoryId,
                              category_name: categoryName,
                            },
                            OrderData: orderProductData,
                          },
                        })
                      );
                      setOpenOrderConfirmation(true);
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
        >
          Order Again
        </Button>
      </div>
      <ConfirmOrdersModal
        open={openOrderConfirmation}
        onClose={() => setOpenOrderConfirmation(false)}
      />
    </>
  );
}
