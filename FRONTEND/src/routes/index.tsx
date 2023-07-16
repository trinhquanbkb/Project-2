import LoginPage from '../pages/auth/LoginPage'
import SigninPage from '../pages/auth/SigninPage'
import index from '../pages/dashboard'
import AllProductPage from '../pages/dashboard/Ecommerce/AllProductPage'
import CartPage from '../pages/dashboard/Ecommerce/CartPage'
import ProductPage from '../pages/dashboard/Ecommerce/ProductPage'
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

const routes = [rootRoute, ...authRoutes, ...publicRoutes]

const mergePublicRoutes = mergeRoutes(routes)

export { mergePublicRoutes }
