import { Layout, Menu, Spin } from "antd";
import "antd/dist/antd.min.css";
import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import "./App.css";
import Grid from "./components/main/Grid";
import MainCarousel from "./components/main/MainCarousel";
import DateChoice from "./components/main/DateChoice";
import MainLayout from "./components/main/MainLayout";
import ManagerMyPage from "./components/managerMyPage/ManagerMyPage";
import BuyerMyPage from "./components/buyerMyPage/BuyerMyPage";
import SellerMyPage from "./components/sellerMyPage/SellerMyPage";
import SaleHistory from "./components/sellerMyPage/SaleHistory";
import SaleDataGraph from "./components/sellerMyPage/SaleDataGraph";
import BusinessApplicationInquiry from "./components/managerMyPage/BusinessApplicationInquiry";
import MemberInquiry from "./components/buyerMyPage/MemberInquiry";
import MemberEdit from "./components/buyerMyPage/MemberEdit";
import Cart from "./components/buyerMyPage/Cart";
import PaymentHistory from "./components/buyerMyPage/PaymentHistory.js";
import PaymentHistoryGraph from "./components/buyerMyPage/PaymentHistoryGraph.js";
import BusinessApplication from "./components/buyerMyPage/BusinessApplication";
import BusinessApplicationList from "./components/buyerMyPage/BusinessApplicationList";
import BusinessDefault from "./components/managerMyPage/BusinessDefault";
import Shop from "./components/shop-list/Shop";
import LoginModal from "./components/login/LoginModal";
import CreateWriting from "./components/writing/CreateWriting";
import SellerCreateWriting from "./components/sellerMyPage/SellerCreateWriting";
import SellerModifyWriting from "./components/sellerMyPage/SellerModifyWriting";
import OrderModal from "./components/order/OrderModal";
import MarketCondition from "./components/marketCondition/MarketCondition";
import DailyPriceInquiry from "./components/marketCondition/DailyPriceInquiry";
import MonthlyPriceInquiry from "./components/marketCondition/MonthlyPriceInquiry";
import YearlyPriceInquiry from "./components/marketCondition/YearlyPriceInquiry";
import ModifyWritng from "./components/writing/ModifyWriting";
import ShopContent from "./components/shop-detail/ShopContent";
import MainContent from "./components/main/MainContent";
import RegisteredProduct from "./components/sellerMyPage/RegisteredProduct";
import SellerGrade from "./components/sellerMyPage/SellerGrade";

var cloudServerIP = 'http://34.64.178.90:8080';

function App() {
  return (
    <BrowserRouter>
      <MainLayout></MainLayout>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <MainContent />
            </div>
          }
        ></Route>
        <Route path="/marketCondition" element={<MarketCondition />}></Route>
        <Route
          path="/marketCondition/DailyPriceInquiry"
          element={<DailyPriceInquiry />}
        ></Route>
        <Route
          path="/marketCondition/MonthlyPriceInquiry"
          element={<MonthlyPriceInquiry />}
        ></Route>
        <Route
          path="/marketCondition/YearlyPriceInquiry"
          element={<YearlyPriceInquiry />}
        ></Route>
        <Route path="/shop-list" element={<Shop />}></Route>
        {/*---관리자 마이 페이지--- */}
        <Route path="/ManagerMyPage" element={<ManagerMyPage />}></Route>
        <Route
          path="/ManagerMyPage/BusinessApplicationInquiry"
          element={<BusinessApplicationInquiry />}
        ></Route>
        <Route
          path="/ManagerMyPage/BusinessApplicationInquiry/business-detail/:businessId"
          element={<BusinessDefault />}
        ></Route>
        {/*---구매자 마이 페이지--- */}
        <Route path="/BuyerMyPage" element={<BuyerMyPage />}></Route>
        <Route
          path="/BuyerMyPage/MemberInquiry"
          element={<MemberInquiry />}
        ></Route>
        <Route
          path="/BuyerMyPage/MemberInquiry/memberEidt"
          element={<MemberEdit />}
        ></Route>
        <Route path="/BuyerMyPage/Cart" element={<Cart />}></Route>
        <Route path="/BuyerMyPage/PaymentHistory" element={<PaymentHistory />}></Route>
        <Route path="/BuyerMyPage/PaymentHistoryGraph" element={<PaymentHistoryGraph />}></Route>
        <Route path="/BuyerMyPage/BusinessApplication" element={<BusinessApplication />}></Route>
        <Route path="/BuyerMyPage/BusinessApplicationList" element={<BusinessApplicationList />}></Route>
        {/*---판매자 마이 페이지--- */}
        <Route path="/SellerMyPage" element={<SellerMyPage />}></Route>
        <Route path="/SellerMyPage/SaleHistory" element={<SaleHistory />}></Route>
        <Route path="/SellerMyPage/SaleDataGraph" element={<SaleDataGraph />}></Route>
        <Route path="/SellerMyPage/SellerGrade" element={<SellerGrade />}></Route>
  
        <Route
          path="/SellerMyPage/RegisteredProduct"
          element={<RegisteredProduct />}
        ></Route>
        <Route
          path="/shop-list/shop-detail/:productNum"
          element={<ShopContent></ShopContent>}
        />

        <Route
          path="/SellerMyPage/SellerCreateWriting"
          element={
            <div>
              <SellerCreateWriting />
            </div>
          }
        ></Route>

        <Route
          path="/SellerMyPage/SellerModifyWriting/:productId"
          element={
            <div>
              <SellerModifyWriting />
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
export {App,cloudServerIP};
