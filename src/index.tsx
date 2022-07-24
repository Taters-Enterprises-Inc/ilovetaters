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
import { REACT_APP_BASE_NAME } from 'features/shared/constants';
import { store } from 'features/config/store';
import { PopClub } from 'features/popclub/presentation/pages/popclub.page';
import { PopClubDeal } from 'features/popclub/presentation/pages';
import { PopClubDealGuards, PopClubGuards } from 'features/popclub/presentation/pages/guards';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={REACT_APP_BASE_NAME}>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path="popclub/deal" element={<PopClubDealGuards />}>
            <Route path=":hash" element={<PopClubDeal />}></Route>
          </Route>

          <Route path='popclub' element={<PopClubGuards />}>
            <Route path=":platform" element={<PopClub />}></Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
