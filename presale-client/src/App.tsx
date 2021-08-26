// Components
import React, { lazy } from 'react'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import Spinner from './components/Loader/Spinner'

// Style Component
import GlobalStyle from './styles/Global'

// State and Function
import { Router, Route, Switch } from 'react-router-dom'
import history from './routerHistory'

// Views
const Home = lazy(() => import('./views/home'))
const PreSell = lazy(() => import('./views/pre-sell'))
const NotFound = lazy(() => import('./views/NotFound'))

const App: React.FC = () => {
	return (
		<Router history={history}>
			<GlobalStyle />
			<SuspenseWithChunkError fallback={<Spinner />}>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/pre-sale' component={PreSell} />
					<Route component={NotFound} />
				</Switch>
			</SuspenseWithChunkError>
		</Router>
	)
}

export default React.memo(App)
