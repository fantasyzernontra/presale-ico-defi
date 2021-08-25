import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
	title: 'NON TOKEN | Crowed Sale',
	description:
		'NON Token, Non Notra Cyptocurrency which based on Binance Smart Chain network. Everyone are allowed to buy NON Token in this website !!!',
	image: '',
}

export const getCustomMeta = (path: string): PageMeta => {
	switch (path) {
		case '/':
			return {
				title: 'NON TOKEN | Crowed Sale',
			}
		case '/pre-sale':
			return {
				title: 'NON TOKEN | Crowed Sale',
			}
		default:
			return {
				title: 'NON TOKEN | Crowed Sale',
			}
	}
}
