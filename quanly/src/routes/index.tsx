import BusinessPage from "../pages/Business/BusinessPage";
import index from "../pages/Dashboard";
import OrderManagerPage from "../pages/Order.tsx/OrderManagerPage";
import ProductPage from "../pages/Product/ProductPage";
import LoginPage from "../pages/auth/LoginPage";
import SigninPage from "../pages/auth/SigninPage";

export interface RoutesProps {
  path: string;
  name: string;
  icon?: string;
  component?: () => React.ReactNode;
  layout?: () => React.ReactNode;
  pathLayout?: string;
  children?: RoutesProps[];
}

const rootRoute: RoutesProps = {
  path: "/",
  name: "index",
  component: index,
};

const managerRoute: RoutesProps[] = [
  {
    path: "/manager-product",
    name: "Product",
    component: ProductPage,
  },
  {
    path: "/manager-order",
    name: "Oder",
    component: OrderManagerPage,
  },
  {
    path: "/manager-business",
    name: "Business",
    component: BusinessPage,
  },
];

const authRoutes: RoutesProps[] = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/signin",
    name: "Signin",
    component: SigninPage,
  },
];

const mergeRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...mergeRoutes(item.children)];
    }
  });
  return flatRoutes;
};

const routes: any[] = [rootRoute, ...managerRoute, ...authRoutes];

const mergePublicRoutes = mergeRoutes(routes);

export { mergePublicRoutes };
