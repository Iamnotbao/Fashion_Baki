import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Layout from "./layouts/Layout";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import ProductDetail from "./pages/product/ProductDetail";
import ProductList from "./pages/product/ProductList";
import { rootPaths } from "./routes/paths";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import UserProfile from "./sections/Profile/UserProfile";
import UserCart from "./sections/Profile/UserCart";
import { AuthProvider, useAuthentication } from "./pages/authentication/AuthProvider";
import Verify from "./pages/authentication/Verify";
import {Provider} from "react-redux"
import {store} from "./stores"
import Order from "./pages/order/Order";
import CartDetail from "./pages/cart/cartDetail";
import ProductAll from "./pages/product/ProductAll";
import UserTracking from "./sections/Profile/UserTracking";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import ResetPassword from "./pages/authentication/ResetPassword";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthentication();


  return isAuthenticated ? children : <Navigate to={`${rootPaths.authRoot}/signIn`} />;
};

const SharedLayout = () => (
  <>
    <Header />
    <Outlet /> 
    <Footer />
  </>
);

const App = () => (
  <Provider store={store}>
  <AuthProvider>
    <Router>
      <Routes>
        <Route path={rootPaths.root} element={<Layout />} />
        <Route path={rootPaths.authRoot}>
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="verify" element={<Verify />} />
          <Route path="forgot_password" element={<ForgotPassword />} />
          <Route path="reset_password" element={<ResetPassword />} />
        </Route>

        <Route element={<SharedLayout />}>
          <Route path={`${rootPaths.productRoot}/:id`} element={<ProductDetail />} />
          <Route path={`${rootPaths.productRoot}/all`} element={<ProductAll />} />
          <Route path={`${rootPaths.productRoot}/all/:categoryName`} element={<ProductList />} />
          <Route path={`${rootPaths.productRoot}/order`} element={<Order />} />
          <Route path={`${rootPaths.productRoot}/cart_detail`} element={<CartDetail />} />
        </Route>
        <Route element={<PrivateRoute><SharedLayout /></PrivateRoute>}>
          <Route path={`${rootPaths.profileRoot}/info`} element={<UserProfile />} />
          <Route path={`${rootPaths.profileRoot}/cart`} element={<UserCart />} />
          <Route path={`${rootPaths.profileRoot}/tracking-order`} element={<UserTracking />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
  </Provider>
);

export default App;
