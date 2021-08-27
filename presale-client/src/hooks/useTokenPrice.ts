import { useState, useEffect } from 'react'

export const useTokenPrice = (bnb_amount: string) => {
	const [non, setNON] = useState<string>('0.0')

	useEffect(() => setNON(bnb_amount !== '' ? (parseFloat(bnb_amount) / 0.25).toString() : '0'), [bnb_amount])

	return { non }
}
