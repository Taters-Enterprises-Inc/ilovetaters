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
} from "features/popclub/presentation/pages";
import { PopClubDealGuards } from "features/popclub/presentation/pages/guards";
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
  CateringProduct,
  CateringProducts,
} from "features/catering/presentation/pages";
import { Franchising } from "features/franchising/presentation/pages";
import { Reseller } from "features/reseller/presentation/pages";
import { Branches } from "features/branches/presentation/pages";
import {
  Admin,
  Banner,
  Category,
  Cater,
  CaterAdd,
  Instore,
  Login,
  Packages,
  Popclub,
  ProdAdd,
  ProdAvail,
  Products,
  Snackshop,
  Stores,
  Users,
  Vouchers,
} from "features/admin/presentation/pages";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { CateringHome } from "features/catering/presentation/pages/catering-home.page";
import { LoadingAndSnackbarWrapper } from "features/shared/presentation/components";
import { NearyouComponent } from "features/branches/presentation/component/near-you-component";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (window.location.hash === "#_=_") {
  window.location.replace(
    window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname
  );
}

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter basename={REACT_APP_BASE_NAME}>
          <Routes>
            <Route element={<LoadingAndSnackbarWrapper />}>
              <Route path="/" element={<Home />} />

              <Route path="popclub" element={<PopClub />}>
                <Route path=":platform" element={<PopClubHome />} />

                <Route path="deal" element={<PopClubDealGuards />}>
                  <Route path=":hash" element={<PopClubDeal />} />
                </Route>
              </Route>

              <Route path="shop" element={<Shop />}>
                <Route index element={<ShopHome />} />
                <Route path="products/:hash" element={<ShopProduct />} />
                <Route path="order/:hash" element={<ShopOrder />} />
                <Route path="products" element={<ShopProducts />} />
                <Route path="checkout" element={<ShopCheckout />} />
                <Route
                  path="/shop/products/cart/:cart_id"
                  element={<ShopEditCartItem />}
                />

                <Route
                  path="terms-and-conditions"
                  element={<ShopTermsAndConditions />}
                />

                <Route path="privacy-policy" element={<ShopPrivacyPolicy />} />
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
                <Route path="products" element={<CateringProducts />} />
                <Route path="checkout" element={<CateringCheckout />} />
              </Route>

              <Route path="franchising" element={<Franchising />} />

              <Route path="reseller" element={<Reseller />} />
              <Route path="branches" element={<Branches />} />
              <Route path="near-you" element={<NearyouComponent />} />

              <Route path="admin" element={<Login />}></Route>
              <Route path="orders" element={<Admin />}></Route>
              <Route path="catering-orders" element={<Cater />}></Route>
              <Route path="admin-popclub" element={<Popclub />}></Route>
              <Route path="raffles-snackshop" element={<Snackshop />}></Route>
              <Route path="raffles-instore" element={<Instore />}></Route>
              <Route path="catering-addons" element={<CaterAdd />}></Route>
              <Route path="product-addons" element={<ProdAdd />}></Route>
              <Route path="packages" element={<Packages />}></Route>
              <Route
                path="product-availability"
                element={<ProdAvail />}
              ></Route>
              <Route path="banner" element={<Banner />}></Route>
              <Route path="admin-products" element={<Products />}></Route>
              <Route path="category" element={<Category />}></Route>
              <Route path="users" element={<Users />}></Route>
              <Route path="vouchers" element={<Vouchers />}></Route>
              <Route path="stores" element={<Stores />}></Route>
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
