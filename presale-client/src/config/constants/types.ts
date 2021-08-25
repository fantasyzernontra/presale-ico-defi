export type PageMeta = {
	title: string
	description?: string
	image?: string
}

export enum ConnectorNames {
	Injected = 'Injected',
}

export type connectorLocalStorageKey = {
	key: string
	value?: any
}