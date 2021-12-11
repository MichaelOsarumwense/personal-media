import HomePageLayout from '../components/layout/homeLayout';
import Posts from '../components/post/post';
import { UserInfoLeftColumn, UserInfoRightColumn } from '../components/userInfo/userInfo';

function HomePage(props) {
	return (
		<HomePageLayout>
			<UserInfoLeftColumn />
			<Posts></Posts>
			<UserInfoRightColumn />
		</HomePageLayout>
	);
}

export default HomePage;
