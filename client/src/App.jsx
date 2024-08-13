import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useMemo, lazy, Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import ProfilePage from "./scenes/profilePage";
import ProductDetail from "./scenes/productDetailPage";
import ProductListing from "./scenes/ProductListingPage";
import MyProductPage from "./scenes/myProductPage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>

          <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
          <Route
            path="/employee/:userId"
            element={isAuth ? <ProfilePage></ProfilePage> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/supplier/productlisting"
            element={isAuth ? <ProductListing></ProductListing> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/orderedproducts"
            element={isAuth ? <MyProductPage></MyProductPage> : <Navigate to="/" />}
          ></Route>
           <Route
            path="/products/:productId/product"
            element={isAuth ? <ProductDetail></ProductDetail> : <Navigate to="/" />}
          ></Route>

        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;