import {
  AdminDashboardPieChart,
  AdminDashboardSalesLineChart,
  AdminHead,
} from "../components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getAdminDashboardShopSalesHistory } from "../slices/get-admin-dashboard-shop-sales-history.slice";
import NumberFormat from "react-number-format";
import {
  getAdminSnackshopTotalSales,
  selectGetAdminSnackshopTotalSales,
} from "../slices/get-admin-snackshop-total-sales.slice";
import {
  getAdminCateringTotalSales,
  selectGetAdminCateringTotalSales,
} from "../slices/get-admin-catering-total-sales.slice";
import {
  getAdminPopClubTotalSales,
  selectGetAdminPopClubTotalSales,
} from "../slices/get-admin-popclub-total-sales.slice";
import {
  getAdminOverallTotalSales,
  selectGetAdminOverallTotalSales,
} from "../slices/get-admin-overall-total-sales.slice";
import { GoPerson } from "react-icons/go";

enum SalesTab {
  Snackshop,
  Catering,
  Popclub,
  Performance,
}

export function AdminDashboard() {
  const dispatch = useAppDispatch();

  const [salesTab, setSalesTab] = useState<SalesTab>(SalesTab.Snackshop);

  const getAdminSnackshopTotalSalesState = useAppSelector(
    selectGetAdminSnackshopTotalSales
  );
  const getAdminCateringTotalSalesState = useAppSelector(
    selectGetAdminCateringTotalSales
  );
  const getAdminPopClubTotalSalesState = useAppSelector(
    selectGetAdminPopClubTotalSales
  );
  const getAdminOverallTotalSalesState = useAppSelector(
    selectGetAdminOverallTotalSales
  );

  useEffect(() => {
    dispatch(getAdminDashboardShopSalesHistory());
    dispatch(getAdminSnackshopTotalSales());
    dispatch(getAdminCateringTotalSales());
    dispatch(getAdminPopClubTotalSales());
    dispatch(getAdminOverallTotalSales());
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
              <span className="text-secondary text-4xl font-bold">0</span>
              <span className="text-secondary text-sm ">Transactions</span>
            </div>
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center">
              <span className="text-secondary text-4xl font-bold">0</span>
              <span className="text-secondary text-sm ">Completed Orders</span>
            </div>
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center">
              <span className="text-secondary text-4xl font-bold">0</span>
              <span className="text-secondary text-sm ">Add to Cart</span>
            </div>
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center">
              <span className="text-secondary text-4xl font-bold">0</span>
              <span className="text-secondary text-sm ">Product View</span>
            </div>
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center">
              <span className="text-secondary text-4xl font-bold">0</span>
              <span className="text-secondary text-sm ">Initial Checkouts</span>
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
                <div className="flex lg:shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
                  <img
                    src="https://www.ilovetaters.com/api/assets/images/shared/products/250/spiral-fryes-1678922962.jpg"
                    className="w-[60px] h-[60px]"
                  />

                  <div className="flex-1 px-2 py-1 flex flex-col justify-start items-start">
                    <span className="font-semibold text-secondary text-[11px]">
                      Spiral Fryes
                    </span>
                    <span className="text-[9px] text-secondary">
                      Price:{" "}
                      <NumberFormat
                        value={(0).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </span>
                    <span className="text-[9px] text-secondary">
                      Purchased: 30
                    </span>
                  </div>
                </div>
                <div className="flex lg:shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
                  <img
                    src="https://www.ilovetaters.com/api/assets/images/shared/products/250/spiral-fryes-1678922962.jpg"
                    className="w-[60px] h-[60px]"
                  />

                  <div className="flex-1 px-2 py-1 flex flex-col justify-start items-start">
                    <span className="font-semibold text-secondary text-[11px]">
                      Spiral Fryes
                    </span>
                    <span className="text-[9px] text-secondary">
                      Price:{" "}
                      <NumberFormat
                        value={(0).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </span>
                    <span className="text-[9px] text-secondary">
                      Purchased: 30
                    </span>
                  </div>
                </div>
                <div className="flex lg:shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
                  <img
                    src="https://www.ilovetaters.com/api/assets/images/shared/products/250/spiral-fryes-1678922962.jpg"
                    className="w-[60px] h-[60px]"
                  />

                  <div className="flex-1 px-2 py-1 flex flex-col justify-start items-start">
                    <span className="font-semibold text-secondary text-[11px]">
                      Spiral Fryes
                    </span>
                    <span className="text-[9px] text-secondary">
                      Price:{" "}
                      <NumberFormat
                        value={(0).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </span>
                    <span className="text-[9px] text-secondary">
                      Purchased: 30
                    </span>
                  </div>
                </div>
                <div className="flex lg:shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
                  <img
                    src="https://www.ilovetaters.com/api/assets/images/shared/products/250/spiral-fryes-1678922962.jpg"
                    className="w-[60px] h-[60px]"
                  />

                  <div className="flex-1 px-2 py-1 flex flex-col justify-start items-start">
                    <span className="font-semibold text-secondary text-[11px]">
                      Spiral Fryes
                    </span>
                    <span className="text-[9px] text-secondary">
                      Price:{" "}
                      <NumberFormat
                        value={(0).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </span>
                    <span className="text-[9px] text-secondary">
                      Purchased: 30
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] h-[150px] w-[300px] flex ">
              <div className=" w-[150px]">
                <AdminDashboardPieChart />
              </div>
              <div className="flex-1 py-4 flex flex-col justify-center space-y-2">
                <div className="flex space-x-2">
                  <div className="flex space-x-1 items-center justify-start">
                    <span className="w-[10px] h-[10px] bg-secondary"></span>
                    <span className="text-xs">Facebook</span>
                  </div>
                  <div className="flex space-x-1 items-center justify-start">
                    <span className="w-[10px] h-[10px] bg-primary"></span>
                    <span className="text-xs">Mobile</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs">
                    <b>0</b> Facebook Users
                  </span>
                  <span className="text-xs">
                    <b>0</b> Mobile Users
                  </span>
                  <span className="text-xs">
                    <b>0</b> Total Users
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
                  <div className="flex  flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex  flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex  flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex  flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex  flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex  flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex  flex-col items-center justify-center">
                    <GoPerson className="text-4xl text-yellow-600" />
                    <span className="text-[11px] font-bold">
                      Jerico C. Villaraza
                    </span>
                    <span className="text-[9px]">Purchased: 5</span>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="flex  flex-col items-center justify-center">
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
