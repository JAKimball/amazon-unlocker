// import type BwipJs from 'bwip-js'
// import { toCanvas } from 'bwip-js'
import { code128 } from 'bwip-js'
import type { ReactElement } from 'react'
import { useLayoutEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const toCanvas = code128 // : Function(canvas: String | HTMLElement, opt: any): HTMLCanvasElement>

// https://bwipjs-api.metafloor.com/?bcid=code128&text=AZ123678LK&rotate=N&scale=1

interface Properties {
	codeString: string
}

function pxPerMM(): number {
	const element = document.createElement('div')
	element.style.position = 'absolute'
	element.style.width = '100mm'
	document.body.append(element)
	// const rect = element.getBoundingClientRect()
	element.remove()
	// const oneH = 100
	const fake = 5.6
	return fake
	// 	return rect.width / oneH
}

export default function Barcode({ codeString }: Properties): ReactElement {
	useLayoutEffect(() => {
		// try {
		// const scale = 2
		const canvasElement = document.querySelector('#mycanvas')
		const widthRatio = 0.95
		const fallback = 60
		const width = Math.floor(
			((canvasElement?.parentElement?.clientWidth ?? fallback) / pxPerMM()) *
				widthRatio
		)
		const height = 20
		const opt = {
			bcid: 'code128', // Barcode type
			text: codeString, // Text to encode
			// scale, // 2x scaling factor
			width, // Library calculates scale for width
			height, // Bar height, in millimeters
			includetext: true, // Show human-readable text
			textxalign: 'center' // Always good to set this
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		toCanvas('mycanvas', opt)
		// code128('mycanvas', opt)
		// } catch (error) {
		// 	console.error(error)
		// 	throw error
		// }
		return (): void => {
			// cleanup
		}
	}, [codeString])

	return (
		<div className='select-none focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-gray-500 focus:border-gray-300 overflow-hidden shadow-lg dark:shadow-2xl rounded-lg bg-white text-black grid items-center justify-items-center'>
			<canvas id='mycanvas' className='pixelated' />
		</div>
	)
}

// class App extends Component {
// 	componentDidMount() {
// 		try {
// 			// The return value is the canvas element
// 			const canvas = bwipp_code128.toCanvas('mycanvas', {
// 				bcid: 'code128', // Barcode type
// 				text: '0123456789', // Text to encode
// 				scale: 3, // 3x scaling factor
// 				height: 10, // Bar height, in millimeters
// 				includetext: true, // Show human-readable text
// 				textxalign: 'center' // Always good to set this
// 			})
// 		} catch {
// 			// `e` may be a string or Error object
// 		}
// 	}

// 	render() {
// 		return (
// 			<div className='App'>
// 				<div className='App-header'>
// 					<img src={logo} className='App-logo' alt='logo' />
// 					<h2>Welcome to React</h2>
// 				</div>
// 				<canvas id='mycanvas' />
// 			</div>
// 		)
// 	}
// }
