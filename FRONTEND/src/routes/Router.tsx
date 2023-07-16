import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Routes } from 'react-router'
import { mergePublicRoutes } from './index'
import ScrollToTop from '../components/ScrollToTop'

function Router() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				{mergePublicRoutes.map((route: any, index: number) => {
					const component = route.component as React.ComponentType
					return (
						<Route
							key={index}
							path={route.path}
							element={React.createElement(component)}
						/>
					)
				})}
			</Routes>
		</BrowserRouter>
	)
}

export default Router
