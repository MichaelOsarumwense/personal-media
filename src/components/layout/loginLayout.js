import { Link, BrowserRouter } from 'react-router-dom';
import '../../components/layout/css/style.css';
import '../../components/layout/css/w3.css';

function LoginLayout(props) {
	return (
		<section className="main">
			<div className="layer">
				<div className="bottom-grid">
					<div className="logo">
						<h1>
							<BrowserRouter>
								<Link id="logo" to="/">
									Private Media
								</Link>
							</BrowserRouter>
						</h1>
					</div>
					<div className="links">
						<ul className="links-unordered-list">
							<li className="active">
								<BrowserRouter>
									<Link id="register" to={props.linkRoute} className="">
										{props.linkText}
									</Link>
								</BrowserRouter>
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
