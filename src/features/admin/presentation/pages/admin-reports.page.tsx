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
  const [
    openGeneratePopClubStoreVisitModal,
    setOpenGeneratePopClubStoreVisitModal,
  ] = useState<boolean>(false);
  const [
    openGeneratePopClubSnacksDeliveredModal,
    setOpenGeneratePopClubSnacksDeliveredModal,
  ] = useState<boolean>(false);
  const [
    openGenerateCustomerFeedbackModal,
    setOpenGenerateCustomerFeedbackModal,
  ] = useState<boolean>(false);

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
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-1 text-secondary">
          Reports
        </h1>
        <main>
          <h1 className="text-lg font-bold ml-4 mt-1 mb-1 text-secondary">
            Snackshop
          </h1>
          <div className="flex px-4 pb-4 flex-wrap justify-start items-start space-x-4">
            <button
              onClick={() => {
                setOpenGeneratePmixModal(true);
              }}
            >
              <div className="p-4 border shadow-xl border-secondary">
                <GrDocumentConfig className="text-5xl" />
              </div>
              <div className="flex items-center justify-center mt-2 space-x-1">
                <GrAttachment className="text-xs font-semibold" />
                <span className="text-xs font-semibold">PMIX</span>
              </div>
            </button>

            <button
              onClick={() => {
                setOpenGenerateTransactionModal(true);
              }}
            >
              <div className="p-4 border flex justify-center items-center shadow-xl border-secondary">
                <GrDocumentConfig className="text-5xl" />
              </div>
              <div className="flex items-center justify-center mt-2 space-x-1">
                <GrAttachment className="text-xs font-semibold" />
                <span className="text-xs font-semibold">Transaction</span>
              </div>
            </button>
          </div>

          <h1 className="text-lg font-bold ml-4 mt-1 mb-1 text-secondary">
            PopClub
          </h1>

          <div className="flex px-4 pb-4  flex-wrap justify-start items-start space-x-4">
            <button
              onClick={() => {
                setOpenGeneratePopClubStoreVisitModal(true);
              }}
            >
              <div className="p-4 border flex justify-center items-center shadow-xl border-secondary">
                <GrDocumentConfig className="text-5xl" />
              </div>
              <div className="flex items-start justify-center mt-2 space-x-1">
                <GrAttachment className="text-xs font-semibold" />
                <span className="text-xs font-semibold">Store Visit</span>
              </div>
            </button>

            <button
              onClick={() => {
                setOpenGeneratePopClubSnacksDeliveredModal(true);
              }}
            >
              <div className="p-4 border flex justify-center items-center shadow-xl border-secondary">
                <GrDocumentConfig className="text-5xl" />
              </div>
              <div className="flex items-start justify-center mt-2 ">
                <GrAttachment className="text-xs font-semibold" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">Snacks</span>
                  <span className="text-xs font-semibold">Delivered</span>
                </div>
              </div>
            </button>
          </div>

          <h1 className="text-lg font-bold ml-4 mt-1 mb-1 text-secondary">
            Survey
          </h1>

          <div className="flex px-4 pb-4  flex-wrap justify-start items-start space-x-4">
            <button
              onClick={() => {
                setOpenGenerateCustomerFeedbackModal(true);
              }}
            >
              <div className="p-4 border flex justify-center items-center shadow-xl border-secondary">
                <GrDocumentConfig className="text-5xl" />
              </div>
              <div className="flex items-start justify-center mt-2 space-x-1">
                <GrAttachment className="text-xs font-semibold" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">Customer</span>
                  <span className="text-xs font-semibold">Feedback</span>
                </div>
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

      <AdminGenerateReportModal
        open={openGeneratePopClubStoreVisitModal}
        title="Generate PopClub Store Visit Report"
        onClickGenerate={(startDate, endDate) => {
          window.location.href =
            REACT_APP_DOMAIN_URL +
            "api/admin/report-popclub-store-visit/" +
            startDate +
            "/" +
            endDate;
          setOpenGeneratePopClubStoreVisitModal(false);
          dispatch(
            popUpSnackBar({
              message: "Successfully generate PopClub Store Visit report!",
              severity: "success",
            })
          );
        }}
        onClose={() => {
          setOpenGeneratePopClubStoreVisitModal(false);
        }}
      />

      <AdminGenerateReportModal
        open={openGeneratePopClubSnacksDeliveredModal}
        title="Generate PopClub Snacks Delivered Report"
        onClickGenerate={(startDate, endDate) => {
          window.location.href =
            REACT_APP_DOMAIN_URL +
            "api/admin/report-popclub-snacks-delivered/" +
            startDate +
            "/" +
            endDate;
          setOpenGeneratePopClubSnacksDeliveredModal(false);
          dispatch(
            popUpSnackBar({
              message: "Successfully generate PopClub Snacks Delivered report!",
              severity: "success",
            })
          );
        }}
        onClose={() => {
          setOpenGeneratePopClubSnacksDeliveredModal(false);
        }}
      />

      <AdminGenerateReportModal
        open={openGenerateCustomerFeedbackModal}
        title="Generate Customer Feedback"
        onClickGenerate={(startDate, endDate) => {
          window.location.href =
            REACT_APP_DOMAIN_URL +
            "api/admin/report-customer-feedback/" +
            startDate +
            "/" +
            endDate;
          setOpenGenerateCustomerFeedbackModal(false);
          dispatch(
            popUpSnackBar({
              message: "Successfully generate customer feedback report!",
              severity: "success",
            })
          );
        }}
        onClose={() => {
          setOpenGenerateCustomerFeedbackModal(false);
        }}
      />
    </>
  );
}
