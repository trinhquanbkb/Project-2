import index from "../pages/Dashboard";
import ProductPage from "../pages/Product/ProductPage";
import LoginPage from "../pages/auth/LoginPage";

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

const productRoute: RoutesProps[] = [
  {
    path: "/manager-product",
    name: "createProduct",
    component: ProductPage,
  },
];

const authRoutes: RoutesProps[] = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
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

const routes: any[] = [rootRoute, ...productRoute, ...authRoutes];

const mergePublicRoutes = mergeRoutes(routes);

export { mergePublicRoutes };
