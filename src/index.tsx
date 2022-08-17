import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { Home } from 'features/home/presentation/pages';
import { REACT_APP_BASE_NAME, theme } from 'features/shared/constants';
import { store } from 'features/config/store';
import { PopClub } from 'features/popclub/presentation/pages/popclub.page';
import { PopClubDeal } from 'features/popclub/presentation/pages';
import { PopClubDealGuards } from 'features/popclub/presentation/pages/guards';
import { PopClubPlatformPicker } from 'features/popclub/presentation/pages/popclub-platform-picker.page';
import { Shop, ShopCheckout, ShopOrder, ShopProduct, ShopProducts } from 'features/shop/presentation/pages';
import { Catering } from 'features/catering/presentation/pages';
import { Franchising } from 'features/franchising/presentation/pages';
import { Reseller } from 'features/reseller/presentation/pages';
import { Branches } from 'features/branches/presentation/pages';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (window.location.hash === "#_=_"){
  window.location.replace(window.location.protocol + "//" + window.location.host + window.location.pathname);
}


root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter basename={REACT_APP_BASE_NAME}>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path="popclub" element={<PopClubPlatformPicker />}></Route>
            <Route path="popclub/:platform" element={<PopClub />}></Route>
            <Route path="popclub/deal" element={<PopClubDealGuards />}>
              <Route path=":hash" element={<PopClubDeal />}></Route>
            </Route>

            <Route path="shop" element={<Shop/>}></Route>
            <Route path="shop/products" element={<ShopProducts/>}></Route>
            <Route path="shop/products/:hash" element={<ShopProduct/>}></Route>
            <Route path="shop/checkout" element={<ShopCheckout/>}></Route>

            <Route path="shop/order/:hash" element={<ShopOrder/>}></Route>

            <Route path="catering" element={<Catering/>}></Route>
            <Route path="franchising" element={<Franchising/>}></Route>
            <Route path="reseller" element={<Reseller/>}></Route>
            <Route path="branches" element={<Branches/>}></Route>
            
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
