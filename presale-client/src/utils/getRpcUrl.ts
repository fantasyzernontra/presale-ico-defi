export const nodes = [process.env.REACT_APP_NETWORK_RPC_URL]

const getNodeUrl = () => {
	return nodes[0]
}

export default getNodeUrl
