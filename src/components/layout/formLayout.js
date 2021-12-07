import { Link } from 'react-router-dom';
import '../../components/layout/css/w3.css';
import '../../components/layout/css/style.css';

function LoginLayout(props) {
	return (
		<section className="main">
			<div className="layer">
				<div className="bottom-grid">
					<div className="logo">
						<h1>
							<Link id="logo" to="/">
								Private Media
							</Link>
						</h1>
					</div>
					<div className="links">
						<ul className="links-unordered-list">
							<li className="active">
								<Link id="register" to={props.linkRoute} className="">
									{props.linkText}
								</Link>
							</li>
						</ul>
					</div>
				</div>
				{props.children}
			</div>
		</section>
	);
}

export default LoginLayout;
