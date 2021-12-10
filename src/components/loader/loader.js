import Loader from 'react-loader-spinner';

function LoaderComponent(props) {
	return (
		<div>
			<Loader
				className="text-center icon overlay "
				type="TailSpin"
				color="#fc636b"
				height={200}
				width={200}
				visible={props.spinnerLoading}
			/>
		</div>
	);
}

export default LoaderComponent;
