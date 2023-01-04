import {
  AdminDashboardSalesLineChart,
  AdminHead,
  AdminTotalSalesCard,
} from "../components";
import { useEffect } from "react";
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

export function AdminDashboard() {
  const dispatch = useAppDispatch();

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
          pageTitles: [{ name: "Orders", url: "/admin/order" }],
        }}
      />

      <div className="px-4 ">
        <div className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Dashboard
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 mb-8">
          <AdminTotalSalesCard
            title="Snackshop Sales"
            totalCompletedTransaction={
              getAdminSnackshopTotalSalesState.data?.total_completed_transaction
            }
            totalPurchaseAmount={
              getAdminSnackshopTotalSalesState.data?.total_purchase_amount
            }
            icon={
              <img
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/snackshop-active.png`}
                className="w-[65px]"
                alt="Entertainment Snacks est. 1994."
              />
            }
          />

          <AdminTotalSalesCard
            title="Catering Sales"
            totalCompletedTransaction={
              getAdminCateringTotalSalesState.data?.total_completed_transaction
            }
            totalPurchaseAmount={
              getAdminCateringTotalSalesState.data?.total_purchase_amount
            }
            icon={
              <img
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/catering-active.png`}
                className="w-[65px]"
                alt="Entertainment Snacks est. 1994."
              />
            }
          />

          <AdminTotalSalesCard
            title="PopClub Sales"
            totalCompletedTransaction={
              getAdminPopClubTotalSalesState.data?.total_completed_transaction
            }
            totalPurchaseAmount={
              getAdminPopClubTotalSalesState.data?.total_purchase_amount
            }
            icon={
              <img
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/popclub-active.png`}
                className="w-[60px]"
                alt="Entertainment Snacks est. 1994."
              />
            }
          />

          <AdminTotalSalesCard
            title="Overall Sales"
            totalCompletedTransaction={
              getAdminOverallTotalSalesState.data?.total_completed_transaction
            }
            totalPurchaseAmount={
              getAdminOverallTotalSalesState.data?.total_purchase_amount
            }
            icon={
              <img
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/home-active.png`}
                className="w-[65px]"
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
