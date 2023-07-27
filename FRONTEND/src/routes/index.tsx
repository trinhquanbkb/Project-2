import LoginPage from '../pages/auth/LoginPage'
import SigninPage from '../pages/auth/SigninPage'
import index from '../pages/dashboard'
import AllProductPage from '../pages/dashboard/Ecommerce/AllProductPage'
import CartPage from '../pages/dashboard/Ecommerce/CartPage'
import OrderPage from '../pages/dashboard/Ecommerce/OrderPage'
import Ordermanager from '../pages/dashboard/Ecommerce/Ordermanager'
import ProductPage from '../pages/dashboard/Ecommerce/ProductPage'
import PageFuture from '../pages/dashboard/Support/PageFuture'
import PolicyPurchasePage from '../pages/dashboard/Support/PolicyPurchasePage'

export interface RoutesProps {
	path: string
	name: string
	icon?: string
	component?: () => React.ReactNode
	layout?: () => React.ReactNode
	pathLayout?: string
	children?: RoutesProps[]
}

const rootRoute: RoutesProps = {
	path: '/',
	name: 'index',
	component: index
}

const pageUpdateRoute: RoutesProps = {
	path: '/page-update',
	name: 'PageUpdate',
	component: PageFuture
}

const authRoutes: RoutesProps[] = [
	{
		path: '/login',
		name: 'Login',
		component: LoginPage
	},
	{
		path: '/signin',
		name: 'Signin',
		component: SigninPage
	}
]

const publicRoutes: RoutesProps[] = [
	{
		path: '/product/:product-detail',
		name: 'Product',
		component: ProductPage
	},
	{
		path: '/cart',
		name: 'Cart',
		component: CartPage
	},
	{
		path: '/order-product',
		name: 'OrderProduct',
		component: OrderPage
	},
	{
		path: '/order-manager',
		name: 'OrderManager',
		component: Ordermanager
	},
	{
		path: '/policy-purchase',
		name: 'PolicyPurchase',
		component: PolicyPurchasePage
	},
	{
		path: '/:list-product',
		name: 'AllProduct',
		component: AllProductPage
	}
]

const mergeRoutes = (routes: RoutesProps[]) => {
	let flatRoutes: RoutesProps[] = []

	routes = routes || []
	routes.forEach((item: RoutesProps) => {
		flatRoutes.push(item)

		if (typeof item.children !== 'undefined') {
			flatRoutes = [...flatRoutes, ...mergeRoutes(item.children)]
		}
	})
	return flatRoutes
}

const routes = [rootRoute, ...authRoutes, ...publicRoutes, pageUpdateRoute]

const mergePublicRoutes = mergeRoutes(routes)

export { mergePublicRoutes }
