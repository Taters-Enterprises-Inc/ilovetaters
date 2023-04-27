import {
  AdminDashboardPieChart,
  AdminDashboardSalesLineChart,
  AdminHead,
} from "../components";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getAdminDashboardShopSalesHistory } from "../slices/get-admin-dashboard-shop-sales-history.slice";
import NumberFormat from "react-number-format";
import { GoPerson } from "react-icons/go";
import {
  getAdminDashboardShopTransactionTotal,
  selectGetAdminDashboardShopTransactionTotal,
} from "../slices/get-admin-dashboard-shop-transaction-total.slice";
import {
  getAdminDashboardShopCompletedTransactionTotal,
  selectGetAdminDashboardShopCompletedTransactionTotal,
} from "../slices/get-admin-dashboard-shop-completed-transaction-total.slice";
import { intToShortString } from "features/config/helpers";
import {
  getAdminDashboardShopAddToCartTotal,
  selectGetAdminDashboardShopAddToCartTotal,
} from "../slices/get-admin-dashboard-shop-add-to-cart-total.slice";
import {
  getAdminDashboardShopProductViewTotal,
  selectGetAdminDashboardShopProductViewTotal,
} from "../slices/get-admin-dashboard-shop-product-view-total.slice";
import {
  getAdminDashboardShopInitialCheckoutTotal,
  selectGetAdminDashboardShopInitialCheckoutTotal,
} from "../slices/get-admin-dashboard-shop-initial-checkout-total.slice";
import {
  getAdminDashboardShopUsersTotal,
  selectGetAdminDashboardShopUsersTotal,
} from "../slices/get-admin-dashboard-shop-users-total.slice";
import {
  getAdminDashboardShopFeaturedProducts,
  selectGetAdminDashboardShopFeaturedProducts,
} from "../slices/get-admin-dashboard-shop-featured-products.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { Media } from "features/shared/presentation/components";

export function AdminDashboard() {
  const dispatch = useAppDispatch();

  const getAdminDashboardShopTransactionTotalState = useAppSelector(
    selectGetAdminDashboardShopTransactionTotal
  );
  const getAdminDashboardShopCompletedTransactionTotalState = useAppSelector(
    selectGetAdminDashboardShopCompletedTransactionTotal
  );
  const getAdminDashboardShopAddToCartTotalState = useAppSelector(
    selectGetAdminDashboardShopAddToCartTotal
  );
  const getAdminDashboardShopProductViewTotalState = useAppSelector(
    selectGetAdminDashboardShopProductViewTotal
  );
  const getAdminDashboardShopInitialCheckoutTotalState = useAppSelector(
    selectGetAdminDashboardShopInitialCheckoutTotal
  );
  const getAdminDashboardShopUsersTotalState = useAppSelector(
    selectGetAdminDashboardShopUsersTotal
  );
  const getAdminDashboardShopFeaturedProductsState = useAppSelector(
    selectGetAdminDashboardShopFeaturedProducts
  );

  useEffect(() => {
    dispatch(getAdminDashboardShopSalesHistory());
    dispatch(getAdminDashboardShopTransactionTotal());
    dispatch(getAdminDashboardShopCompletedTransactionTotal());
    dispatch(getAdminDashboardShopAddToCartTotal());
    dispatch(getAdminDashboardShopProductViewTotal());
    dispatch(getAdminDashboardShopInitialCheckoutTotal());
    dispatch(getAdminDashboardShopUsersTotal());
    dispatch(getAdminDashboardShopFeaturedProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-full">
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Dashboard", url: "/admin/dashboard" }],
        }}
      />

      <div className="flex-1 px-4">
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-4 h-[100px]">
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-secondary">
                {getAdminDashboardShopTransactionTotalState.data
                  ? intToShortString(
                      getAdminDashboardShopTransactionTotalState.data
                    )
                  : 0}
              </span>
              <span className="text-sm text-secondary ">Transactions</span>
            </div>
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-secondary">
                {getAdminDashboardShopCompletedTransactionTotalState.data
                  ? intToShortString(
                      getAdminDashboardShopCompletedTransactionTotalState.data
                    )
                  : 0}
              </span>
              <span className="text-sm text-secondary ">Completed Orders</span>
            </div>
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-secondary">
                {getAdminDashboardShopAddToCartTotalState.data
                  ? intToShortString(
                      getAdminDashboardShopAddToCartTotalState.data
                    )
                  : 0}
              </span>
              <span className="text-sm text-secondary ">Add to Cart</span>
            </div>
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-secondary">
                {getAdminDashboardShopProductViewTotalState.data
                  ? intToShortString(
                      getAdminDashboardShopProductViewTotalState.data
                    )
                  : 0}
              </span>
              <span className="text-sm text-secondary ">Product View</span>
            </div>
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-secondary">
                {getAdminDashboardShopInitialCheckoutTotalState.data
                  ? intToShortString(
                      getAdminDashboardShopInitialCheckoutTotalState.data
                    )
                  : 0}
              </span>
              <span className="text-sm text-secondary ">Initial Checkouts</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] h-[315px] w-[700px] p-4 flex flex-col items-center justify-center">
              <AdminDashboardSalesLineChart />
            </div>
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] h-[315px] flex flex-col flex-1 p-4">
              <span className="text-2xl font-bold text-secondary font-['Bebas_Neue']">
                Featured Products
              </span>
              <div className="flex-1 space-y-3 overflow-y-auto h-[100px] py-1 pr-2">
                {getAdminDashboardShopFeaturedProductsState.data?.map(
                  (product) => (
                    <div className="flex lg:shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
                      <Media
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${product.product_image}`}
                        className="w-[60px] h-[60px]"
                        alt={product.product_name}
                      />

                      <div className="flex flex-col items-start justify-start flex-1 px-2 py-1">
                        <span className="font-semibold text-secondary text-[11px]">
                          {product.product_name}
                        </span>
                        <span className="text-[9px] text-secondary">
                          Price:{" "}
                          <NumberFormat
                            value={product.price.toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        </span>
                        <span className="text-[9px] text-secondary">
                          Purchased: {product.purchased}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] h-[150px] w-[300px] flex ">
              <div className=" w-[150px]">
                {getAdminDashboardShopUsersTotalState.data ? (
                  <AdminDashboardPieChart
                    data={getAdminDashboardShopUsersTotalState.data}
                  />
                ) : null}
              </div>
              <div className="flex flex-col justify-center flex-1 py-4 space-y-2">
                <div className="flex space-x-2">
                  <div className="flex items-center justify-start space-x-1">
                    <span className="w-[10px] h-[10px] bg-secondary"></span>
                    <span className="text-xs">Facebook</span>
                  </div>
                  <div className="flex items-center justify-start space-x-1">
                    <span className="w-[10px] h-[10px] bg-primary"></span>
                    <span className="text-xs">Mobile</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs">
                    <b>
                      {getAdminDashboardShopUsersTotalState.data
                        ? getAdminDashboardShopUsersTotalState.data[0].value
                        : 0}
                    </b>{" "}
                    Facebook Users
                  </span>
                  <span className="text-xs">
                    <b>
                      {getAdminDashboardShopUsersTotalState.data
                        ? getAdminDashboardShopUsersTotalState.data[1].value
                        : 0}
                    </b>{" "}
                    Mobile Users
                  </span>
                  <span className="text-xs">
                    <b>
                      {getAdminDashboardShopUsersTotalState.data
                        ? getAdminDashboardShopUsersTotalState.data[0].value +
                          getAdminDashboardShopUsersTotalState.data[1].value
                        : 0}
                    </b>{" "}
                    Total Users
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] h-[150px] flex-1 p-4 flex flex-col">
              <span className="text-2xl font-bold text-secondary font-['Bebas_Neue']">
                Top Users
              </span>
              <div className="flex-1 whitespace-nowrap overflow-x-auto overflow-y-hidden w-[700px] space-x-4">
                <div className="inline-block">
                  <div className="flex flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
