import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Home } from "features/home/presentation/pages";
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
  ShopProfile,
  ShopProfileCateringBookings,
  ShopProfileSnackshopOrders,
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
  AdminCateringOrder,
  AdminPopclub,
  AdminRaffleInstore,
  AdminRaffleSnackshop,
  AdminReport,
  AdminFaq,
  AdminAvailabilityCateringAddOn,
  AdminAvailabilityProductAddOn,
  AdminAvailabilityPackage,
  AdminAvailabilityProduct,
  AdminAvailabilityBanner,
  AdminSettingCategory,
  AdminProduct,
  AdminSettingUser,
  AdminSettingVoucher,
  AdminSettingStore,
} from "features/admin/presentation/pages";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { CateringHome } from "features/catering/presentation/pages/catering-home.page";
import {
  LoadingAndSnackbarWrapper,
  NotificationWrapper,
} from "features/shared/presentation/components";
import { ShopCheckoutGuard } from "features/shop/presentation/guards";

import { Admin } from "features/admin/presentation/pages/admin.page";
import { AdminSidebarWrapper } from "features/admin/presentation/components/admin-sidebar-wrapper";
import { AdminGuard } from "features/admin/presentation/guards/admin.guard";
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
            <Route element={<LoadingAndSnackbarWrapper />}>
              <Route element={<NotificationWrapper />}>
                <Route path="/" element={<Home />} />
                <Route path="reseller" element={<Reseller />} />
                <Route path="branches" element={<Branches />} />
                <Route path="franchising" element={<Franchising />} />

                <Route path="popclub" element={<PopClub />}>
                  <Route index element={<PopClubIndexPage />} />
                  <Route path=":platform" element={<PopClubHome />} />
                  <Route path="deal/:hash" element={<PopClubDeal />} />
                </Route>

                <Route path="shop" element={<Shop />}>
                  <Route index element={<ShopHome />} />
                  <Route path="products/:hash" element={<ShopProduct />} />
                  <Route path="order/:hash" element={<ShopOrder />} />
                  <Route path="products" element={<ShopProducts />} />
                  <Route element={<ShopCheckoutGuard />}>
                    <Route path="checkout" element={<ShopCheckout />} />
                  </Route>
                  <Route
                    path="/shop/products/cart/:cart_id"
                    element={<ShopEditCartItem />}
                  />

                  <Route
                    path="terms-and-conditions"
                    element={<ShopTermsAndConditions />}
                  />

                  <Route
                    path="privacy-policy"
                    element={<ShopPrivacyPolicy />}
                  />
                  <Route path="return-policy" element={<ShopReturnPolicy />} />

                  <Route path="profile">
                    <Route index element={<ShopProfile />} />
                    <Route
                      path="snackshop-orders"
                      element={<ShopProfileSnackshopOrders />}
                    />
                    <Route
                      path="catering-bookings"
                      element={<ShopProfileCateringBookings />}
                    />
                  </Route>
                </Route>

                <Route path="catering" element={<Catering />}>
                  <Route index element={<CateringHome />} />
                  <Route path="products/:hash" element={<CateringProduct />} />
                  <Route path="contract/:hash" element={<CateringContract />} />
                  <Route path="order/:hash" element={<CateringOrder />} />
                  <Route path="products" element={<CateringProducts />} />
                  <Route path="checkout" element={<CateringCheckout />} />
                </Route>
              </Route>
              <Route path="admin" element={<Admin />}>
                <Route index element={<AdminLogin />} />

                <Route element={<AdminGuard />}>
                  <Route element={<AdminSidebarWrapper />}>
                    <Route path="order" element={<AdminShopOrder />} />
                    <Route path="catering" element={<AdminCateringOrder />} />
                    <Route path="popclub" element={<AdminPopclub />} />
                    <Route path="product" element={<AdminProduct />} />
                    <Route path="report" element={<AdminReport />} />
                    <Route path="faq" element={<AdminFaq />} />

                    <Route path="raffle">
                      <Route
                        path="snackshop"
                        element={<AdminRaffleSnackshop />}
                      />
                      <Route path="instore" element={<AdminRaffleInstore />} />
                    </Route>

                    <Route path="availability">
                      <Route
                        path="catering-add-on"
                        element={<AdminAvailabilityCateringAddOn />}
                      />
                      <Route
                        path="product-add-on"
                        element={<AdminAvailabilityProductAddOn />}
                      />

                      <Route
                        path="package"
                        element={<AdminAvailabilityPackage />}
                      />
                      <Route
                        path="product"
                        element={<AdminAvailabilityProduct />}
                      />
                      <Route
                        path="banner"
                        element={<AdminAvailabilityBanner />}
                      />
                    </Route>

                    <Route path="setting">
                      <Route
                        path="category"
                        element={<AdminSettingCategory />}
                      />
                      <Route path="user" element={<AdminSettingUser />} />
                      <Route path="voucher" element={<AdminSettingVoucher />} />
                      <Route path="store" element={<AdminSettingStore />} />
                    </Route>
                  </Route>
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
