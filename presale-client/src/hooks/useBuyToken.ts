import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useCrowedSale } from './useContract'

export const useBuyToken = async (bnb_amount: string) => {
	// const [isSuccess, setIsSuccess] = useState<boolean>(false)
    let isSuccess
	const crowedSaleContract = useCrowedSale()

	// useEffect(() => {
	// 	const buying = async () => {
	try {
		await crowedSaleContract.purchaseToken({
			value: ethers.utils.parseUnits(bnb_amount),
		})
		isSuccess =(true)
	} catch (err) {
		console.log(err)
		isSuccess =(false)
	}

	// 	buying()
	// }, [crowedSaleContract, bnb_amount])

	return isSuccess
}
