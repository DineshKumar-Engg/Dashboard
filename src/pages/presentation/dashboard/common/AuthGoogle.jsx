import Reactl,{useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardPage from '../DashboardPage';
import axios from 'axios';
import App from '../../../../App/App';

const GOOGLE_OAUTH_CLIENT_ID = '947234227201-a7872f6e1p0e6emteic6s8odda3ut7o2.apps.googleusercontent.com';
const GOOGLE_OAUTH_REDIRECT_URI = 'https://dev-app.festivtickets.com/auth/callback'; // Update with your actual redirect URI

const AuthGoogle = () => {

    const location = useLocation();
	const navigate = useNavigate();

    useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const code = urlParams.get('code');
		if (code) {
            exchangeCodeForAccessToken(code)
		}else{
			navigate('/')
		}
	}, [location]);

	const exchangeCodeForAccessToken = async (code) => {
		try {
			const response = await axios.post(
				'https://oauth2.googleapis.com/token',
				{
				  code: code,
				  client_id: GOOGLE_OAUTH_CLIENT_ID,
				  client_secret: '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', // Replace with your actual client secret
				  redirect_uri: GOOGLE_OAUTH_REDIRECT_URI,
				  grant_type: 'authorization_code',
				}
			  );
			console.log("acess", response);
			const { access_token, expires_in } = response.data;
			localStorage.setItem('Statistic', access_token)
			localStorage.setItem('expires_in', expires_in);

			// Calculate and store the token's expiration time in milliseconds
			const now = new Date();
			const expirationTime = now.getTime() + expires_in * 1000; // Convert to milliseconds
			localStorage.setItem('expiration_time', expirationTime);
            navigate('/')
		} catch (error) {
			console.error('Error exchanging code for access token:', error);
		}
	};



  return (
   <>
   </>
  )
}

export default AuthGoogle

