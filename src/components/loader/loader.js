import Loader from 'react-loader-spinner';

function LoaderComponent(props) {
	return (
		<div>
			<Loader
				className="text-center icon overlay "
				// style={{ position: 'absolute', left: ' 0px', top: '0px', zIndex: 100 }}
				type="TailSpin"
				color="#fc636b"
				height={400}
				width={200}
				visible={props.spinnerLoading}
			/>
		</div>
	);
}

export default LoaderComponent;
