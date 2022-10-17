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
  CateringCheckout,
  CateringContract,
  CateringOrder,
  CateringProduct,
  CateringProducts,
} from "features/catering/presentation/pages";
import { Franchising } from "features/franchising/presentation/pages";
import { Reseller } from "features/reseller/presentation/pages";
import { Branches } from "features/branches/presentation/pages";
import {
  AdminShopOrder,
  AdminLogin,
  AdminCateringBooking,
  AdminPopclub,
  AdminRaffleInstore,
  AdminRaffleSnackshop,
  AdminReport,
  AdminFaq,
  AdminCFaq,
  AdminSettingCategory,
  AdminProduct,
  AdminSettingUser,
  AdminSettingVoucher,
  AdminSettingStore,
  AdminSettingCreateUser,
  AdminSettingCreateGroup,
  AdminSettingEditUser,
  AdminAvailabilityDeal,
  AdminAvailabilityProduct,
  AdminAvailabilityCatersPackage,
  AdminAvailabilityCatersPackageAddon,
  AdminAvailabilityCatersProductAddon,
  ScPwd,
} from "features/admin/presentation/pages";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { CateringHome } from "features/catering/presentation/pages/catering-home.page";
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
import { ProfileGuard } from "features/profile/presentation/guards";

import { Admin } from "features/admin/presentation/pages/admin.page";
import { AdminSidebarWrapper } from "features/admin/presentation/components/admin-sidebar-wrapper";
import { AdminGuard } from "features/admin/presentation/guards/admin.guard";
import {
  Profile,
  ProfileCateringBookings,
  ProfileHome,
  ProfileSnackshopOrders,
  ProfilePopclubRedeems,
} from "features/profile/presentation/pages";
import { PopClubGuard } from "features/popclub/presentation/guards";
import { Bsc } from "features/bsc/presentation/pages/bsc.page";
import { BSCLogin } from "features/bsc/presentation/pages";
import { ProfileCsPwd } from "features/profile/presentation/pages/profile-cs-pwd.page";
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
            <Route element={<ConsentWrapper />}>
              <Route element={<LoadingAndSnackbarWrapper />}>
                <Route element={<UserNotificationWrapper />}>
                  <Route path="/" element={<Home />} />
                  <Route path="branches" element={<Branches />} />
                  <Route path="franchising" element={<Franchising />} />
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />

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

                      <Route path="popclub-sc-pwd" element={<ProfileCsPwd />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  <Route path="popclub" element={<PopClub />}>
                    <Route index element={<PopClubIndexPage />} />
                    <Route element={<PopClubGuard />}>
                      <Route path=":platform" element={<PopClubHome />} />
                      <Route path="deal/:hash" element={<PopClubDeal />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  <Route path="delivery" element={<Shop />}>
                    <Route index element={<ShopHome />} />
                    <Route
                      path="products/cart/:cart_id"
                      element={<ShopEditCartItem />}
                    />
                    <Route path="products/:hash" element={<ShopProduct />} />
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

                  <Route path="catering" element={<Navigate to={"/shop"} />} />
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
                        <Route path="scpwd" element={<ScPwd />} />
                        <Route path="product" element={<AdminProduct />} />
                        <Route path="report" element={<AdminReport />} />
                        <Route path="faq">
                          <Route index element={<AdminFaq />} />
                          <Route path="store" element={<AdminFaq />} />
                          <Route path="customer" element={<AdminCFaq />} />
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
                            element={<AdminAvailabilityCatersPackageAddon />}
                          />
                          <Route
                            path="caters-product-addon"
                            element={<AdminAvailabilityCatersProductAddon />}
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
                          <Route path="store" element={<AdminSettingStore />} />
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="bsc" element={<Bsc />}>
                  <Route index element={<BSCLogin />} />
                </Route>
              </Route>
            </Route>
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
