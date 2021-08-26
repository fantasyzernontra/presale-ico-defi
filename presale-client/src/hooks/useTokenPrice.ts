import React, { useState, useEffect } from 'react'

export const useTokenPrice = (bnb_amount: number, non_amount: number) => {
	const [bnb, setBNB] = useState<number>(0)
	const [non, setNON] = useState<number>(0)

	useEffect(() => {
		const tempBNB = bnb_amount / 0.25
		const tempNON = non_amount * 0.25

		setBNB(tempBNB)
		setNON(tempNON)
	}, [bnb_amount, non_amount])

	return { bnb, non }
}
