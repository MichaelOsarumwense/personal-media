import { Link } from 'react-router-dom';
import '../../components/layout/css/style.css';
import '../../components/layout/css/w3.css';
import { deleteToken } from '../../utils/windowsHelper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePageLayout(props) {
  const handleLogout = () => {
    deleteToken();
    toast.success('Logout successful!', {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <div className="w3-theme-l5">
      <div className="w3-top">
        <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
          <Link
            onClick={handleLogout}
            id="mlogout"
            to="/login"
            className="w3-bar-item w3-hide-medium w3-button w3-hide-large w3-right w3-padding-large w3-large w3-theme-d2 w3-hover-white"
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
          <Link to="/" className="w3-bar-item w3-button w3-padding-large w3-theme-d4">
            <i className="fa fa-home w3-margin-right"></i>Private Media
          </Link>
          <Link
            onClick={handleLogout}
            id="mLogout"
            to="/login"
            className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white"
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </div>
      </div>
      <div id="pageContainer" className="w3-container w3-content">
        <div className="ambient-panel ambient-panel--left" aria-hidden="true">
          <div className="ambient-card ambient-card--story">
            <span className="ambient-card__label">Stories</span>
            <p className="ambient-card__text">Share a bold moment</p>
          </div>
          <div className="ambient-card ambient-card--gradient"></div>
        </div>
        <div className="ambient-panel ambient-panel--right" aria-hidden="true">
          <div className="ambient-card ambient-card--pulse">
            <span className="ambient-card__label">Live Now</span>
            <p className="ambient-card__text">Hangout • Studio 4B</p>
          </div>
          <div className="ambient-card ambient-card--media">
            <span className="ambient-card__label">Reels</span>
            <p className="ambient-card__text">Fresh takes dropping hourly</p>
          </div>
        </div>
        <div className="w3-row">{props.children}</div>
      </div>
      <br />
      <footer className="w3-container w3-theme-d3 w3-padding-16">
        <h5> &copy; Private Media</h5>
      </footer>
    </div>
  );
}

export default HomePageLayout;
