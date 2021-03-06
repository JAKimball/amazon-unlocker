import getFruits from 'api/getFruits'
import BackIcon from 'components/BackIcon'
import Head from 'components/Head'
import ImageAttribution from 'components/ImageAttribution'
import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { useQuery } from 'react-query'
import type { RouteComponentProps } from 'react-router-dom'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useMediaQuery } from 'utils'

const DESKTOP_IMAGE_WIDTH_PERCENTAGE = 0.4
const MOBILE_IMAGE_HEIGHT_PERCENTAGE = 0.3

export default function DetailsPage({
	match
}: RouteComponentProps<{ fruitName: string }>): ReactElement {
	const isTabletAndUp = useMediaQuery('(min-width: 600px)')

	const history = useHistory()
	function onClick(): void {
		history.goBack()
	}

	const { isLoading, isError, error, data } = useQuery('fruits', getFruits)
	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />
	}

	const { fruitName } = match.params
	const fruit = data?.find(
		f => f.name.toLowerCase() === fruitName.toLowerCase()
	)
	if (!fruit) {
		return <Redirect to='/' />
	}

	const imageWidth =
		(isTabletAndUp
			? window.innerWidth * DESKTOP_IMAGE_WIDTH_PERCENTAGE
			: window.innerWidth) * window.devicePixelRatio
	const imageHeight =
		(isTabletAndUp
			? window.innerHeight
			: window.innerHeight * MOBILE_IMAGE_HEIGHT_PERCENTAGE) *
		window.devicePixelRatio

	return (
		<>
			<Head title={fruit.name} />
			<div className='min-h-screen flex flex-col sm:flex-row items-center'>
				<div className='relative'>
					<img
						data-cy='FruitImage'
						width={imageWidth}
						height={imageHeight}
						style={{
							backgroundColor: fruit.image.color
						}}
						src={`${fruit.image.url}&w=${imageWidth}&h=${imageHeight}`}
						alt={fruit.name}
					/>
					<ImageAttribution author={fruit.image.author} />
				</div>
				<div className='my-8 sm:my-0 sm:ml-16'>
					<Link
						onClick={onClick}
						data-cy='BackLink'
						to='/'
						className='flex items-center'
					>
						<BackIcon />
						<span className='ml-4 text-xl'>Back</span>
					</Link>

					<h1 data-cy='FruitName' className='mt-2 sm:mt-8 text-6xl font-bold'>
						The {fruit.name}
					</h1>
					<h2 className='mt-3 text-xl text-gray-500 dark:text-gray-400'>
						Vitamins per 100 g (3.5 oz)
					</h2>
					<table className='mt-8 text-lg'>
						<thead>
							<tr>
								<th className='px-4 py-2'>Vitamin</th>
								<th className='px-4 py-2'>Quantity</th>
							</tr>
						</thead>
						<tbody>
							{fruit.metadata.map(({ name, value }) => (
								<tr key={`FruitVitamin-${name}`} className='font-medium'>
									<td className='border border-gray-300 px-4 py-2'>{name}</td>
									<td className='border border-gray-300 px-4 py-2'>{value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}
