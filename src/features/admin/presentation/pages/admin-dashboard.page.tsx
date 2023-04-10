import {
  AdminDashboardSalesLineChart,
  AdminHead,
  AdminTotalSalesCard,
} from "../components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getAdminSales } from "../slices/get-admin-sales.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
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
    dispatch(getAdminSales({ service: "overall" }));
    dispatch(getAdminSnackshopTotalSales());
    dispatch(getAdminCateringTotalSales());
    dispatch(getAdminPopClubTotalSales());
    dispatch(getAdminOverallTotalSales());
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
          pageTitles: [{ name: "Dashboard", url: "/admin/dashboard" }],
        }}
      />

      <div className="px-4 ">
        <div className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Dashboard
        </div>
        <div className="grid grid-cols-1 gap-4 mt-2 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <AdminTotalSalesCard
            title="Snackshop Sales"
            onClick={() => {
              setSalesTab(SalesTab.Snackshop);
            }}
            totalCompletedTransaction={
              getAdminSnackshopTotalSalesState.data?.total_completed_transaction
            }
            totalPurchaseAmount={
              getAdminSnackshopTotalSalesState.data?.total_purchase_amount
            }
            active={salesTab === SalesTab.Snackshop}
            icon={
              <img
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/snackshop-active.png`}
                className={
                  salesTab === SalesTab.Snackshop
                    ? `w-[65px]`
                    : `w-[15%] lg:w-[20%]`
                }
                alt="Entertainment Snacks est. 1994."
              />
            }
          />

          <AdminTotalSalesCard
            title="Catering Sales"
            onClick={() => {
              setSalesTab(SalesTab.Catering);
            }}
            totalCompletedTransaction={
              getAdminCateringTotalSalesState.data?.total_completed_transaction
            }
            totalPurchaseAmount={
              getAdminCateringTotalSalesState.data?.total_purchase_amount
            }
            active={salesTab === SalesTab.Catering}
            icon={
              <img
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/catering-active.png`}
                className={
                  salesTab === SalesTab.Catering
                    ? `w-[65px]`
                    : `w-[15%] lg:w-[20%]`
                }
                alt="Entertainment Snacks est. 1994."
              />
            }
          />

          <AdminTotalSalesCard
            title="PopClub Sales"
            onClick={() => {
              setSalesTab(SalesTab.Popclub);
            }}
            totalCompletedTransaction={
              getAdminPopClubTotalSalesState.data?.total_completed_transaction
            }
            totalPurchaseAmount={
              getAdminPopClubTotalSalesState.data?.total_purchase_amount
            }
            active={salesTab === SalesTab.Popclub}
            icon={
              <img
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/popclub-active.png`}
                className={
                  salesTab === SalesTab.Popclub
                    ? `w-[60px]`
                    : `w-[12%] lg:w-[18%]`
                }
                alt="Entertainment Snacks est. 1994."
              />
            }
          />

          <AdminTotalSalesCard
            title="Overall Sales"
            onClick={() => {
              setSalesTab(SalesTab.Performance);
            }}
            totalCompletedTransaction={
              getAdminOverallTotalSalesState.data?.total_completed_transaction
            }
            totalPurchaseAmount={
              getAdminOverallTotalSalesState.data?.total_purchase_amount
            }
            active={salesTab === SalesTab.Performance}
            icon={
              <img
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/home-active.png`}
                className={
                  salesTab === SalesTab.Performance
                    ? `w-[65px]`
                    : `w-[15%] lg:w-[20%]`
                }
                alt="Entertainment Snacks est. 1994."
              />
            }
          />
        </div>
        <AdminDashboardSalesLineChart />
      </div>
    </>
  );
}
