import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AdminHead } from "../components";
import { GrDocumentConfig, GrAttachment } from "react-icons/gr";
import { AdminGenerateReportModal } from "../modals";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useAppDispatch } from "features/config/hooks";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";

export function AdminReports() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [openGeneratePmixModal, setOpenGeneratePmixModal] =
    useState<boolean>(false);
  const [openGenerateTransactionModal, setOpenGenerateTransactionModal] =
    useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "FAQS", url: "/admin/faq/store" }],
        }}
      />
      <div className="relative block h-screen">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-1 text-secondary max-h-screen">
          Reports
        </h1>
        <main>
          <div className="flex p-4 space-x-4">
            <button
              onClick={() => {
                setOpenGeneratePmixModal(true);
              }}
              className="flex flex-col items-center justify-center px-4 pt-4 pb-1 border-4 shadow-xl border-secondary"
            >
              <GrDocumentConfig className="text-6xl" />
              <div className="flex items-center justify-center mt-2 space-x-1">
                <GrAttachment className="text-lg font-semibold" />
                <span className="text-lg font-semibold">PMIX.xls</span>
              </div>
            </button>
            <button
              onClick={() => {
                setOpenGenerateTransactionModal(true);
              }}
              className="flex flex-col items-center justify-center px-4 pt-4 pb-1 border-4 shadow-xl border-secondary"
            >
              <GrDocumentConfig className="text-6xl" />
              <div className="flex items-center justify-center mt-2 space-x-1">
                <GrAttachment className="text-lg font-semibold" />
                <span className="text-lg font-semibold">Transaction.xls</span>
              </div>
            </button>
          </div>
        </main>
      </div>
      <AdminGenerateReportModal
        open={openGeneratePmixModal}
        title="Generate PMIX Report"
        onClickGenerate={(startDate, endDate) => {
          window.location.href =
            REACT_APP_DOMAIN_URL +
            "api/admin/report-pmix/" +
            startDate +
            "/" +
            endDate;
          setOpenGeneratePmixModal(false);

          dispatch(
            popUpSnackBar({
              message: "Successfully generate PMIX report!",
              severity: "success",
            })
          );
        }}
        onClose={() => {
          setOpenGeneratePmixModal(false);
        }}
      />
      <AdminGenerateReportModal
        open={openGenerateTransactionModal}
        title="Generate Transaction Report"
        onClickGenerate={(startDate, endDate) => {
          window.location.href =
            REACT_APP_DOMAIN_URL +
            "api/admin/report-transaction/" +
            startDate +
            "/" +
            endDate;
          setOpenGenerateTransactionModal(false);
          dispatch(
            popUpSnackBar({
              message: "Successfully generate Transaction report!",
              severity: "success",
            })
          );
        }}
        onClose={() => {
          setOpenGenerateTransactionModal(false);
        }}
      />
    </>
  );
}
