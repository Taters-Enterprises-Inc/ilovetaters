import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {
  Home,
  NotFound,
  PrivacyPolicy,
} from "features/home/presentation/pages";
import { REACT_APP_BASE_NAME, theme } from "features/shared/constants";
import { store } from "features/config/store";
import {
  PopClub,
  PopClubDeal,
  PopClubHome,
  PopClubIndexPage,
  PopclubOrder,
} from "features/popclub/presentation/pages";
import {
  Shop,
  ShopCheckout,
  ShopHome,
  ShopOrder,
  ShopPrivacyPolicy,
  ShopProduct,
  ShopProducts,
  ShopReturnPolicy,
  ShopTermsAndConditions,
  ShopEditCartItem,
} from "features/shop/presentation/pages";
import {
  Catering,
  CateringBuildYourOwnPackage,
  CateringCheckout,
  CateringContract,
  CateringOrder,
  CateringProduct,
  CateringProducts,
} from "features/catering/presentation/pages";
import { Franchising } from "features/franchising/presentation/pages";
import { Branches, BranchesHome } from "features/branches/presentation/pages";
import {
  AdminShopOrder,
  AdminLogin,
  AdminCateringBooking,
  AdminPopclub,
  AdminReports,
  AdminFaq,
  AdminCFaq,
  AdminSettingUser,
  AdminSettingStore,
  AdminSettingCreateUser,
  AdminSettingCreateGroup,
  AdminSettingEditUser,
  AdminAvailabilityDeal,
  AdminAvailabilityProduct,
  AdminAvailabilityCatersPackage,
  AdminAvailabilityCatersPackageAddon,
  AdminAvailabilityCatersProductAddon,
  AdminUserDiscount,
  AdminSurveyVerification,
  AdminSettingShopProduct,
  AdminSettingShopCreateProduct,
  AdminSettingShopCopyProduct,
  AdminSettingShopEditProduct,
  AdminSettingCreateStore,
  AdminAvailabilityCatersProduct,
  AdminSettingEditStore,
  AdminSettingCateringPackage,
  AdminSettingCateringCreatePackage,
  AdminSettingCateringEditPackage,
  AdminSettingCateringCopyPackage,
  AdminSettingPopClubDeal,
  AdminSettingPopclubCreateDeal,
  AdminSettingPopclubEditDeal,
  AdminInfluencerApplication,
  AdminInfluencerPromo,
  AdminInfluencerCreatePromo,
  AdminInfluencerCashout,
  AdminSnackshopDashboard,
  AdminCustomerFeedbackDashboard,
  AdminLandingPage,
} from "features/admin/presentation/pages";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { CateringHome } from "features/catering/presentation/pages/catering-home.page";
import {
  ConsentWrapper,
  LoadingAndSnackbarWrapper,
  UserNotificationWrapper,
  AnalyticsWrapper,
  SessionWrapper,
  LoginChooserWrapper,
  MessageModalWrapper,
} from "features/shared/presentation/wrappers";
import {
  ShopCheckoutGuard,
  ShopProductsGuard,
} from "features/shop/presentation/guards";
import { ProfileGuard } from "features/profile/presentation/guards";

import { Admin } from "features/admin/presentation/pages/admin.page";
import { AdminGuard } from "features/admin/presentation/guards/admin.guard";
import {
  Profile,
  ProfileCateringBookings,
  ProfileHome,
  ProfileSnackshopOrders,
  ProfilePopclubRedeems,
  ProfileInbox,
  ProfileInfluencer,
} from "features/profile/presentation/pages";
import { ProfileUserDiscount } from "features/profile/presentation/pages";
import { Bsc } from "features/bsc/presentation/pages/bsc.page";

import {
  Survey,
  SurveyLogin,
  SurveyComplete,
  SurveySnackshop,
  SurveySnackshopComplete,
} from "features/survey/presentation/pages";

import {
  BSCLogin,
  BscSignUp,
  BscDashboard,
  BSCEditUser,
  BSCCreateUser,
  BSCUser,
  BSCCreateGroup,
} from "features/bsc/presentation/pages";
import {
  TermsAndConditionModal,
  ReturnPolicyModal,
  PrivacyPolicyModal,
} from "features/bsc/presentation/modals";

import { BSCSidebarWrapper } from "features/bsc/presentation/components/bsc-sidebar-wrapper";
import { BscGuard } from "features/bsc/presentation/guards/bsc.guard";
import {
  SeeMeCatering,
  SeeMeSnackshop,
  SeeMePopClub,
} from "features/see-me/presentation/pages";
import { SeeMeReseller } from "features/see-me/presentation/pages/see-me-reseller.page";
import { ShopSurveyGuard } from "features/survey/presentation/guards";
import {
  CateringCheckoutGuard,
  CateringProductsGuard,
} from "features/catering/presentation/guards";
import {
  AdminNotificationWrapper,
  AdminSidebarWrapper,
} from "features/admin/presentation/wrapper";
import {
  Audit,
  AuditDashboard,
  AuditForm,
  AuditLogin,
  AuditResponseQualityAuditPage,
  AuditReview,
  AuditSettingsQuestions,
} from "features/audit/presentation/pages";
import {
  AuditFormSideStepper,
  AuditSidebarWrapper,
} from "features/audit/presentation/components";
import { AuditGuard } from "features/audit/presentation/guards/audit.guard";
import { ShopProductViewLog } from "features/shop/presentation/logs";
import {
  StockAuditSidebarWrapper,
  StockOrderingBadgeWrapper,
} from "features/stock-ordering/presentation/components";
import {
  ProfilePage,
  StockOrderDashboard,
  StockOrderOrders,
  StockOrderingSettingsCreateProductsPage,
  StockOrderingSettingsEditProductsPage,
  StockOrderingSettingsProductsPage,
} from "features/stock-ordering/presentation/pages";
import {
  Hr,
  Hr180DegreeAssessment,
  Hr180DegreeAssessmentAnswers,
  HrDashboard,
  HrEmployees,
  HrLogin,
  HrManagementAssessment,
  HrSelfAssessment,
  HrStaffAssessmentAnswers,
  HrUserEmployees,
} from "features/hr/presentation/pages";
import { HrGuard } from "features/hr/presentation/guards/hr.guard";
import { SalesSidebarWrapper } from "features/sales/presentation/components/sidebar";
import { SalesDashboard } from "features/sales/presentation/pages";
import { SalesProfile } from "features/sales/presentation/pages/profile.page";
import { HrSidebarWrapper } from "features/hr/presentation/components/hr-sidebar-wrapper";
import { HrJobDetails } from "features/hr/presentation/pages/hr-job-details.page";
import { HrContactDetails } from "features/hr/presentation/pages/hr-contact-details.page";
import { HrPersonalDetails } from "features/hr/presentation/pages/hr-personal-details.page";
import { HrEmergencyDetails } from "features/hr/presentation/pages/hr-emergency-details.page";
import { HrSalaryDetails } from "features/hr/presentation/pages/hr-salary-details.page";
import { HrTerminationDetails } from "features/hr/presentation/pages/hr-termination-details.page";
import { HrOtherDetails } from "features/hr/presentation/pages/hr-other-details.page";
import { HrAssessmentSummary } from "features/hr/presentation/pages/hr-assessment-summary.page";
import { HrImportUsers } from "features/hr/presentation/pages/hr-import-users.page";
import {
  SalesDashboard,
  SalesFormList,
  SalesSavedForm,
  SalesTask,
  SalesTaskForm,
} from "features/sales/presentation/pages";
import { SalesHistory } from "features/sales/presentation/pages/history.page";
import { SalesForm } from "features/sales/presentation/pages/form.page";
import { SalesRealtimeWrapper } from "features/sales/presentation/components";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (window.location.hash === "#_=_") {
  window.location.replace(
    window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      window.location.search
  );
}

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter basename={REACT_APP_BASE_NAME}>
          <Routes>
            <Route element={<AnalyticsWrapper />}>
              <Route element={<ConsentWrapper />}>
                <Route element={<SessionWrapper />}>
                  <Route element={<LoadingAndSnackbarWrapper />}>
                    <Route element={<MessageModalWrapper />}>
                      <Route element={<LoginChooserWrapper />}>
                        <Route element={<UserNotificationWrapper />}>
                          <Route path="/" element={<Home />} />
                          <Route path="branches" element={<Branches />}>
                            <Route index element={<BranchesHome />} />
                          </Route>

                          <Route path="franchising" element={<Franchising />} />

                          <Route path="see_me">
                            <Route index element={<SeeMeSnackshop />} />
                            <Route
                              path="catering"
                              element={<SeeMeCatering />}
                            />
                            <Route path="popclub" element={<SeeMePopClub />} />
                            <Route
                              path="reseller"
                              element={<SeeMeReseller />}
                            />
                          </Route>

                          <Route
                            path="privacy-policy"
                            element={<PrivacyPolicy />}
                          />

                          <Route path="profile" element={<Profile />}>
                            <Route element={<ProfileGuard />}>
                              <Route index element={<ProfileHome />} />
                              <Route path="inbox" element={<ProfileInbox />} />
                              <Route
                                path="snackshop-orders"
                                element={<ProfileSnackshopOrders />}
                              />
                              <Route
                                path="catering-bookings"
                                element={<ProfileCateringBookings />}
                              />
                              <Route
                                path="popclub-redeems"
                                element={<ProfilePopclubRedeems />}
                              />

                              <Route
                                path="user-discount"
                                element={<ProfileUserDiscount />}
                              />

                              <Route
                                path="influencer"
                                element={<ProfileInfluencer />}
                              />
                            </Route>
                          </Route>

                          <Route path="popclub" element={<PopClub />}>
                            <Route index element={<PopClubIndexPage />} />
                            <Route path=":platform" element={<PopClubHome />} />
                            <Route
                              path="deal/:hash"
                              element={<PopClubDeal />}
                            />
                            <Route
                              path="order/:hash"
                              element={<PopclubOrder />}
                            />
                          </Route>

                          <Route path="delivery" element={<Shop />}>
                            <Route index element={<ShopHome />} />

                            <Route path="products">
                              <Route element={<ShopProductsGuard />}>
                                <Route index element={<ShopProducts />} />
                              </Route>
                              <Route
                                path="cart/:cart_id"
                                element={<ShopEditCartItem />}
                              />
                              <Route element={<ShopProductViewLog />}>
                                <Route path=":hash" element={<ShopProduct />} />
                              </Route>
                            </Route>

                            <Route path="order/:hash" element={<ShopOrder />} />

                            <Route element={<ShopCheckoutGuard />}>
                              <Route
                                path="checkout"
                                element={<ShopCheckout />}
                              />
                            </Route>
                            <Route
                              path="terms-and-conditions"
                              element={<ShopTermsAndConditions />}
                            />

                            <Route
                              path="privacy-policy"
                              element={<ShopPrivacyPolicy />}
                            />
                            <Route
                              path="return-policy"
                              element={<ShopReturnPolicy />}
                            />
                          </Route>

                          <Route
                            path="catering"
                            element={<Navigate to={"/shop"} />}
                          />
                          <Route
                            path="shop/admin"
                            element={<Navigate to={"/admin"} />}
                          />
                          <Route
                            path="shop/login"
                            element={<Navigate to={"/admin"} />}
                          />

                          <Route path="shop" element={<Catering />}>
                            <Route index element={<CateringHome />} />

                            <Route path="products">
                              <Route element={<CateringProductsGuard />}>
                                <Route index element={<CateringProducts />} />
                                <Route
                                  path="build-your-own-package"
                                  element={<CateringBuildYourOwnPackage />}
                                />
                              </Route>

                              <Route
                                path=":hash"
                                element={<CateringProduct />}
                              />
                            </Route>

                            <Route
                              path="contract/:hash"
                              element={<CateringContract />}
                            />

                            <Route element={<CateringCheckoutGuard />}>
                              <Route
                                path="checkout"
                                element={<CateringCheckout />}
                              />
                            </Route>

                            <Route
                              path="order/:hash"
                              element={<CateringOrder />}
                            />
                          </Route>

                          <Route path="feedback">
                            <Route index element={<SurveyLogin />} />

                            <Route path="walk-in" element={<Survey />} />

                            <Route
                              path="complete/:hash"
                              element={<SurveyComplete />}
                            />

                            <Route
                              path="snackshop/complete/:hash"
                              element={<SurveySnackshopComplete />}
                            />

                            <Route element={<ShopSurveyGuard />}>
                              <Route
                                path="snackshop/:hash"
                                element={<SurveySnackshop />}
                              />
                            </Route>
                          </Route>
                        </Route>
                      </Route>

                      <Route path="admin" element={<Admin />}>
                        <Route index element={<AdminLogin />} />
                        <Route element={<AdminNotificationWrapper />}>
                          {/* <Route
                            path="landing"
                            element={<AdminLandingPage />}
                          /> */}

                          <Route element={<AdminGuard />}>
                            <Route
                              path="landing"
                              element={<AdminLandingPage />}
                            />

                            <Route element={<StockOrderingBadgeWrapper />}>
                              <Route path="stock-order">
                                <Route element={<StockAuditSidebarWrapper />}>
                                  <Route
                                    path="dashboard"
                                    element={<StockOrderDashboard />}
                                  />
                                  <Route
                                    path="order"
                                    element={<StockOrderOrders />}
                                  />

                                  <Route
                                    path="profile"
                                    element={<ProfilePage />}
                                  />

                                  <Route path="settings">
                                    <Route
                                      path="products"
                                      element={
                                        <StockOrderingSettingsProductsPage />
                                      }
                                    />
                                    <Route
                                      path="products/create"
                                      element={
                                        <StockOrderingSettingsCreateProductsPage />
                                      }
                                    />
                                    <Route
                                      path="products/edit/:id"
                                      element={
                                        <StockOrderingSettingsEditProductsPage />
                                      }
                                    />
                                  </Route>
                                </Route>
                              </Route>
                            </Route>

                            <Route element={<SalesRealtimeWrapper />}>
                              <Route path="sales">
                                <Route element={<SalesSidebarWrapper />}>
                                  <Route
                                    path="dashboard"
                                    element={<SalesDashboard />}
                                  />
                                  <Route path="form" element={<SalesForm />} />

                                  <Route
                                    path="form-list"
                                    element={<SalesFormList />}
                                  />
                                  <Route
                                    path="form-list/saved-form"
                                    element={<SalesSavedForm />}
                                  />

                                  <Route
                                    path="history"
                                    element={<SalesHistory />}
                                  />
                                  <Route path="task" element={<SalesTask />} />
                                  <Route
                                    path="task/task-form"
                                    element={<SalesTaskForm />}
                                  />
                                </Route>
                              </Route>
                            </Route>

                            <Route element={<AdminSidebarWrapper />}>
                              <Route path="dashboard">
                                <Route
                                  path="snackshop"
                                  element={<AdminSnackshopDashboard />}
                                />
                                <Route
                                  path="customer-feedback"
                                  element={<AdminCustomerFeedbackDashboard />}
                                />
                              </Route>
                              <Route
                                path="order"
                                element={<AdminShopOrder />}
                              />
                              <Route
                                path="catering"
                                element={<AdminCateringBooking />}
                              />
                              <Route
                                path="popclub"
                                element={<AdminPopclub />}
                              />

                              <Route
                                path="user-discount"
                                element={<AdminUserDiscount />}
                              />
                              <Route path="influencer">
                                <Route
                                  path="application"
                                  element={<AdminInfluencerApplication />}
                                />
                                <Route
                                  path="cashout"
                                  element={<AdminInfluencerCashout />}
                                />
                                <Route path="promo">
                                  <Route
                                    index
                                    element={<AdminInfluencerPromo />}
                                  />
                                  <Route
                                    path="create"
                                    element={<AdminInfluencerCreatePromo />}
                                  />
                                </Route>
                              </Route>

                              <Route
                                path="survey-verification"
                                element={<AdminSurveyVerification />}
                              />
                              <Route
                                path="reports"
                                element={<AdminReports />}
                              />
                              <Route path="faq">
                                <Route index element={<AdminFaq />} />
                                <Route path="store" element={<AdminFaq />} />
                                <Route
                                  path="customer"
                                  element={<AdminCFaq />}
                                />
                              </Route>
                              <Route path="availability">
                                <Route path="shop">
                                  <Route
                                    path="product"
                                    element={<AdminAvailabilityProduct />}
                                  />
                                </Route>

                                <Route path="catering">
                                  <Route
                                    path="package"
                                    element={<AdminAvailabilityCatersPackage />}
                                  />
                                  <Route
                                    path="build-your-own-package"
                                    element={<AdminAvailabilityCatersProduct />}
                                  />
                                  <Route
                                    path="package-addon"
                                    element={
                                      <AdminAvailabilityCatersPackageAddon />
                                    }
                                  />

                                  <Route
                                    path="product-addon"
                                    element={
                                      <AdminAvailabilityCatersProductAddon />
                                    }
                                  />
                                </Route>

                                <Route path="popclub">
                                  <Route
                                    path="deal"
                                    element={<AdminAvailabilityDeal />}
                                  />
                                </Route>
                              </Route>

                              <Route path="setting">
                                <Route path="user">
                                  <Route index element={<AdminSettingUser />} />
                                  <Route
                                    path="create-user"
                                    element={<AdminSettingCreateUser />}
                                  />
                                  <Route
                                    path="edit-user/:id"
                                    element={<AdminSettingEditUser />}
                                  />
                                  <Route
                                    path="create-group"
                                    element={<AdminSettingCreateGroup />}
                                  />
                                </Route>
                                <Route path="store">
                                  <Route
                                    index
                                    element={<AdminSettingStore />}
                                  />
                                  <Route
                                    path="create-store"
                                    element={<AdminSettingCreateStore />}
                                  />
                                  <Route
                                    path=":id"
                                    element={<AdminSettingEditStore />}
                                  />
                                </Route>
                                <Route path="product">
                                  <Route
                                    index
                                    element={<AdminSettingShopProduct />}
                                  />

                                  <Route
                                    path="create-product"
                                    element={<AdminSettingShopCreateProduct />}
                                  />

                                  <Route
                                    path="copy/:id"
                                    element={<AdminSettingShopCopyProduct />}
                                  />

                                  <Route
                                    path=":id"
                                    element={<AdminSettingShopEditProduct />}
                                  />
                                </Route>

                                <Route path="package">
                                  <Route
                                    index
                                    element={<AdminSettingCateringPackage />}
                                  />

                                  <Route
                                    path="create-package"
                                    element={
                                      <AdminSettingCateringCreatePackage />
                                    }
                                  />
                                  <Route
                                    path="copy/:id"
                                    element={
                                      <AdminSettingCateringCopyPackage />
                                    }
                                  />

                                  <Route
                                    path=":id"
                                    element={
                                      <AdminSettingCateringEditPackage />
                                    }
                                  />
                                </Route>

                                <Route path="deal">
                                  <Route
                                    index
                                    element={<AdminSettingPopClubDeal />}
                                  />
                                  <Route
                                    path="create-deal"
                                    element={<AdminSettingPopclubCreateDeal />}
                                  />

                                  <Route
                                    path=":id"
                                    element={<AdminSettingPopclubEditDeal />}
                                  />
                                </Route>
                              </Route>
                            </Route>
                          </Route>
                        </Route>
                      </Route>

                      <Route path="internal" element={<Audit />}>
                        <Route index element={<AuditLogin />} />

                        <Route element={<AuditGuard />}>
                          <Route element={<AuditSidebarWrapper />}>
                            <Route
                              path="dashboard/audit"
                              element={<AuditDashboard />}
                            />

                            <Route path="responses">
                              <Route
                                path="quality/audit"
                                element={<AuditResponseQualityAuditPage />}
                              />
                            </Route>

                            <Route path="settings">
                              <Route
                                path="questions"
                                element={<AuditSettingsQuestions />}
                              />
                            </Route>

                            <Route
                              path="form/review/:hash"
                              element={<AuditReview />}
                            />
                          </Route>
                          <Route element={<AuditFormSideStepper />}>
                            <Route path="audit/form" element={<AuditForm />} />
                          </Route>
                        </Route>
                      </Route>

                      <Route path="hr" element={<Hr />}>
                        <Route index element={<HrLogin />} />
                        <Route
                          path="import-users"
                          element={<HrImportUsers />}
                        />

                        <Route element={<HrGuard />}>
                          <Route element={<HrSidebarWrapper />}>
                            <Route path="dashboard" element={<HrDashboard />} />
                            <Route
                              path="user/job-details"
                              element={<HrJobDetails />}
                            />
                            <Route
                              path="user/contact-details"
                              element={<HrContactDetails />}
                            />
                            <Route
                              path="user/personal-details"
                              element={<HrPersonalDetails />}
                            />
                            <Route
                              path="user/emergency-details"
                              element={<HrEmergencyDetails />}
                            />
                            <Route
                              path="user/salary-details"
                              element={<HrSalaryDetails />}
                            />
                            <Route
                              path="user/termination-details"
                              element={<HrTerminationDetails />}
                            />
                            <Route
                              path="user/other-details"
                              element={<HrOtherDetails />}
                            />
                            <Route
                              path="self-assessment"
                              element={<HrSelfAssessment />}
                            />
                            <Route
                              path="180-degree-assessment"
                              element={<Hr180DegreeAssessment />}
                            />
                            <Route
                              path="management-assessment"
                              element={<HrManagementAssessment />}
                            />
                            <Route
                              path="staff-assessment-answer"
                              element={<HrStaffAssessmentAnswers />}
                            />
                            <Route
                              path="180-degree-assessment-answer"
                              element={<Hr180DegreeAssessmentAnswers />}
                            />
                            <Route path="employees" element={<HrEmployees />} />
                            <Route
                              path="user/employees"
                              element={<HrUserEmployees />}
                            />

                            <Route
                              path="assessment-summary"
                              element={<HrAssessmentSummary />}
                            />
                          </Route>
                        </Route>
                      </Route>

                      <Route path="bsc" element={<Bsc />}>
                        <Route index element={<BSCLogin />} />
                        <Route path="sign-up" element={<BscSignUp />} />

                        <Route
                          path="terms-and-condition"
                          element={<TermsAndConditionModal />}
                        />
                        <Route
                          path="privacy-policy"
                          element={<PrivacyPolicyModal />}
                        />
                        <Route
                          path="return-policy"
                          element={<ReturnPolicyModal />}
                        />

                        <Route element={<BscGuard />}>
                          <Route element={<BSCSidebarWrapper />}>
                            <Route
                              path="dashboard"
                              element={<BscDashboard />}
                            />
                            <Route path="users">
                              <Route index element={<BSCUser />} />
                              <Route
                                path="create-user"
                                element={<BSCCreateUser />}
                              />
                              <Route
                                path="create-group"
                                element={<BSCCreateGroup />}
                              />
                              <Route
                                path="edit-user/:id"
                                element={<BSCEditUser />}
                              />
                            </Route>
                          </Route>
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
