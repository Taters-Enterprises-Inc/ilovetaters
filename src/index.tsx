import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {
  AdminAvailabilityCatersPackage,
  AdminAvailabilityCatersPackageAddon,
  AdminAvailabilityCatersProductAddon,
  AdminAvailabilityDeal,
  AdminAvailabilityProduct,
  AdminCateringBooking,
  AdminCFaq,
  AdminFaq,
  AdminLogin,
  AdminPopclub,
  AdminProduct,
  AdminRaffleInstore,
  AdminRaffleSnackshop,
  AdminReports,
  AdminSettingCategory,
  AdminSettingCreateGroup,
  AdminSettingCreateUser,
  AdminSettingEditUser,
  AdminSettingStore,
  AdminSettingUser,
  AdminSettingVoucher,
  AdminShopOrder,
  AdminSurveyVerification,
  AdminUserDiscount,
} from "features/admin/presentation/pages";
import { Branches, BranchesHome } from "features/branches/presentation/pages";
import {
  Catering,
  CateringCheckout,
  CateringContract,
  CateringOrder,
  CateringProduct,
  CateringProducts,
} from "features/catering/presentation/pages";
import { CateringHome } from "features/catering/presentation/pages/catering-home.page";
import { store } from "features/config/store";
import { Franchising } from "features/franchising/presentation/pages";
import {
  Home,
  NotFound,
  PrivacyPolicy,
} from "features/home/presentation/pages";
import {
  PopClub,
  PopClubDeal,
  PopClubHome,
  PopClubIndexPage,
  PopclubOrder,
} from "features/popclub/presentation/pages";
import { ProfileGuard } from "features/profile/presentation/guards";
import { REACT_APP_BASE_NAME, theme } from "features/shared/constants";
import {
  AdminNotificationWrapper,
  ConsentWrapper,
  LoadingAndSnackbarWrapper,
  UserNotificationWrapper,
} from "features/shared/presentation/components";
import {
  ShopCheckoutGuard,
  ShopProductsGuard,
} from "features/shop/presentation/guards";
import {
  Shop,
  ShopCheckout,
  ShopEditCartItem,
  ShopHome,
  ShopOrder,
  ShopPrivacyPolicy,
  ShopProduct,
  ShopProducts,
  ShopReturnPolicy,
  ShopTermsAndConditions,
} from "features/shop/presentation/pages";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { AdminSidebarWrapper } from "features/admin/presentation/components/admin-sidebar-wrapper";
import { AdminGuard } from "features/admin/presentation/guards/admin.guard";
import { Admin } from "features/admin/presentation/pages/admin.page";
import { Bsc } from "features/bsc/presentation/pages/bsc.page";
import {
  Profile,
  ProfileCateringBookings,
  ProfileHome,
  ProfilePopclubRedeems,
  ProfileSnackshopOrders,
  ProfileUserDiscount,
} from "features/profile/presentation/pages";

import { Survey, SurveyComplete } from "features/survey/presentation/pages";

import {
  PrivacyPolicyModal,
  ReturnPolicyModal,
  TermsAndConditionModal,
} from "features/bsc/presentation/modals";
import {
  BSCCreateGroup,
  BSCCreateUser,
  BscDashboard,
  BSCEditUser,
  BSCLogin,
  BscSignUp,
  BSCUser,
} from "features/bsc/presentation/pages";

import { BSCSidebarWrapper } from "features/bsc/presentation/components/bsc-sidebar-wrapper";
import { BscGuard } from "features/bsc/presentation/guards/bsc.guard";
import { SessionWrapper } from "features/shared/presentation/wrapper/session.wrapper";
import { HelmetProvider } from "react-helmet-async";
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
          <HelmetProvider>
            <Routes>
              <Route element={<ConsentWrapper />}>
                <Route element={<SessionWrapper />}>
                  <Route element={<LoadingAndSnackbarWrapper />}>
                    <Route element={<UserNotificationWrapper />}>
                      <Route path="/" element={<Home />} />
                      <Route path="branches" element={<Branches />}>
                        <Route index element={<BranchesHome />} />
                      </Route>
                      <Route path="franchising" element={<Franchising />} />
                      <Route
                        path="privacy-policy"
                        element={<PrivacyPolicy />}
                      />
                      <Route path="profile" element={<Profile />}>
                        <Route element={<ProfileGuard />}>
                          <Route index element={<ProfileHome />} />
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
                        </Route>
                        <Route path="*" element={<NotFound />} />
                      </Route>
                      <Route path="popclub" element={<PopClub />}>
                        <Route index element={<PopClubIndexPage />} />
                        <Route path=":platform" element={<PopClubHome />} />
                        <Route path="deal/:hash" element={<PopClubDeal />} />
                        <Route path="order/:hash" element={<PopclubOrder />} />
                        <Route path="*" element={<NotFound />} />
                      </Route>
                      <Route path="delivery" element={<Shop />}>
                        <Route index element={<ShopHome />} />
                        <Route
                          path="products/cart/:cart_id"
                          element={<ShopEditCartItem />}
                        />
                        <Route
                          path="products/:hash"
                          element={<ShopProduct />}
                        />
                        <Route path="order/:hash" element={<ShopOrder />} />
                        <Route element={<ShopProductsGuard />}>
                          <Route path="products" element={<ShopProducts />} />
                        </Route>
                        <Route element={<ShopCheckoutGuard />}>
                          <Route path="checkout" element={<ShopCheckout />} />
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
                        <Route path="*" element={<NotFound />} />
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
                        <Route
                          path="products/:hash"
                          element={<CateringProduct />}
                        />
                        <Route
                          path="contract/:hash"
                          element={<CateringContract />}
                        />
                        <Route path="order/:hash" element={<CateringOrder />} />
                        <Route path="products" element={<CateringProducts />} />
                        <Route path="checkout" element={<CateringCheckout />} />
                        <Route path="*" element={<NotFound />} />
                      </Route>
                      <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="admin" element={<Admin />}>
                      <Route index element={<AdminLogin />} />
                      <Route element={<AdminNotificationWrapper />}>
                        <Route element={<AdminGuard />}>
                          <Route element={<AdminSidebarWrapper />}>
                            <Route path="order" element={<AdminShopOrder />} />
                            <Route
                              path="catering"
                              element={<AdminCateringBooking />}
                            />
                            <Route path="popclub" element={<AdminPopclub />} />
                            <Route
                              path="user-discount"
                              element={<AdminUserDiscount />}
                            />
                            <Route
                              path="survey-verification"
                              element={<AdminSurveyVerification />}
                            />
                            <Route path="product" element={<AdminProduct />} />
                            <Route path="reports" element={<AdminReports />} />
                            <Route path="faq">
                              <Route index element={<AdminFaq />} />
                              <Route path="store" element={<AdminFaq />} />
                              <Route path="" element={<AdminCFaq />} />
                            </Route>
                            <Route path="raffle">
                              <Route
                                path="snackshop"
                                element={<AdminRaffleSnackshop />}
                              />
                              <Route
                                path="instore"
                                element={<AdminRaffleInstore />}
                              />
                            </Route>
                            <Route path="availability">
                              <Route
                                path="deal"
                                element={<AdminAvailabilityDeal />}
                              />
                              <Route
                                path="product"
                                element={<AdminAvailabilityProduct />}
                              />
                              <Route
                                path="caters-package"
                                element={<AdminAvailabilityCatersPackage />}
                              />
                              <Route
                                path="caters-package-addon"
                                element={
                                  <AdminAvailabilityCatersPackageAddon />
                                }
                              />
                              <Route
                                path="caters-product-addon"
                                element={
                                  <AdminAvailabilityCatersProductAddon />
                                }
                              />
                            </Route>
                            <Route path="setting">
                              <Route
                                path="category"
                                element={<AdminSettingCategory />}
                              />
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
                              <Route
                                path="voucher"
                                element={<AdminSettingVoucher />}
                              />
                              <Route
                                path="store"
                                element={<AdminSettingStore />}
                              />
                            </Route>
                          </Route>
                        </Route>
                      </Route>
                      <Route path="*" element={<NotFound />} />
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
                          <Route path="dashboard" element={<BscDashboard />} />
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
                    <Route path="survey">
                      <Route index element={<Survey />} />
                      <Route path="complete" element={<SurveyComplete />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Routes>
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
