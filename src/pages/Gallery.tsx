import getFruits from 'api/getFruits'
import Barcode from 'components/Barcode'
import Fruit from 'components/Fruit'
import Head from 'components/Head'
import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

// const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%*+-./:'
const charSet = '0123456789'
const randChar = (): string =>
	charSet[Math.floor(Math.random() * charSet.length)]

const randWord = (wordLength: number): string => {
	let result = ''
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < wordLength; result += randChar(), index++);
	return result
}

const codeLength = 6
const randomCode = (): string => `AZ${randWord(codeLength)}LK`

export default function GalleryPage(): ReactElement {
	const [state, setState] = useState({ barcode: randomCode() })

	useEffect(() => {
		// effect
		const interval = 500
		const intervalID = setInterval(
			() => setState({ barcode: randomCode() }),
			interval
		)
		return (): void => {
			// cleanup
			clearInterval(intervalID)
		}
	}, [])

	const { isLoading, isError, error, data } = useQuery('fruits', getFruits)
	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />
	}

	return (
		<>
			<Head title='Amazon Un-locker' />
			<div className='m-2 md:m-0 min-h-screen grid gap-2 place-content-center grid-cols-[minmax(0,384px)] md:grid-cols-[repeat(2,minmax(0,384px))] xl:grid-cols-[repeat(3,384px)]'>
				<Barcode codeString={state.barcode} />
				{data?.map((fruit, index) => (
					<Fruit key={`FruitCard-${fruit.name}`} fruit={fruit} index={index} />
				))}
			</div>
		</>
	)
}
