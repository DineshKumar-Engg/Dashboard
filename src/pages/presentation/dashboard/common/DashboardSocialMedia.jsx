import React, { FC, useCallback, useEffect, useState } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import Avatar, { AvatarGroup } from '../../../../components/Avatar';
import USERS from '../../../../common/data/userDummyData';
import { useNavigate } from 'react-router-dom';
import { demoPagesMenu } from '../../../../menu';
import useDarkMode from '../../../../hooks/useDarkMode';
import { TColor } from '../../../../type/color-type';
import Chart, { IChartOptions } from '../../../../components/extras/Chart';
import Popovers from '../../../../components/bootstrap/Popovers';
import axios from 'axios';
import Icon from '../../../../components/icon/Icon';
import classNames from 'classnames';
import Insta from '../../../../assets/insta.svg'
import Facebook from '../../../../assets/facebook.svg'
import YouTubeImage from '../../../../assets/youtube.svg'



const DashboardSocialMedia = () => {
	const { darkModeStatus } = useDarkMode();

	const [FbFollower, SetFbFollower] = useState('')
	const [InstaFollower, SetInstaFollower] = useState('')
	const [YouTube, SetYouTube] = useState('')
	const [FbAccess, SetFbAccess] = useState(localStorage.getItem('FbAccess') || '')

	useEffect(() => {
		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = 'https://connect.facebook.net/en_US/sdk.js';
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		window.fbAsyncInit = function () {
			window.FB.init({
				appId: '227901136576839',
				autoLogAppEvents: true,
				xfbml: true,
				version: 'v12.0',
			});
		};
	}, []);

	useEffect(() => {
		const token = localStorage.getItem('FbAccess');
		const expireTime = localStorage.getItem('FbExpire');

		if (token && expireTime) {
			const currentTime = Math.floor(Date.now() / 1000);
			const expireSeconds = parseInt(expireTime, 10);

			if (currentTime >= expireSeconds) {
				localStorage.removeItem('token');
				localStorage.removeItem('expire');
				console.log('Token has expired and been removed.');
			} else {
				console.log('Token is still valid.');
			}
		}
	}, []);

	const handleFacebookLogin = () => {
		window.FB.login(function (response) {
			if (response.authResponse) {

				console.log(response);
				const url = `https://graph.facebook.com/v12.0/oauth/access_token`;
				const params = {
					grant_type: 'fb_exchange_token',
					client_id: "227901136576839",
					client_secret: "956723963665e8e399715e294f094167",
					fb_exchange_token: response.authResponse.accessToken,
				};
				axios.post(url, null, { params })
					.then((response) => {
						console.log("Access", response);
						SetFbAccess(response?.data?.access_token)
						localStorage.setItem('FbAccess', response?.data?.access_token)
						localStorage.setItem('FbExpire', response?.data?.expires_in)
					})
					.catch((error) => {
						console.error('Error exchanging token:', error);
					});
			}
		},
			{
				config_id: '139896299145906'
			}
		);
	};

	const APIKey = 'AIzaSyAlYcqrgGeahMnOnLDkq3FvVGe3QFht7LM';
	const Userid = 'UCtE3jUi5ZCTWH5MOgmnIcrQ';

	let getdata = () => {
		fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Userid}&key=${APIKey}`)
			.then(response => {
				return response.json()
			})
			.then(data => {
				SetYouTube(data["items"][0]?.statistics?.subscriberCount);
			})
		//   axios.get(`https://graph.facebook.com/v18.0/107485985269530?fields=followers_count,fan_count,instagram_business_account{followers_count}&access_token=${Accesstoken}`)
		// .then((res)=>{

		// 	SetFbFollower( res.data.followers_count)
		// 	SetInstaFollower(res.data.instagram_business_account.followers_count)
		// })
	}

	let getFBdata = () => {

		axios.get(`https://graph.facebook.com/v18.0/107485985269530?fields=followers_count,fan_count,instagram_business_account{followers_count}&access_token=${FbAccess}`)
			.then((res) => {

				SetFbFollower(res.data.followers_count)
				SetInstaFollower(res.data.instagram_business_account.followers_count)
			})
	}

	useEffect(() => {
		getFBdata();
	}, [FbAccess])

	useEffect(() => {
		getdata();
		if (FbAccess == '') {
			handleFacebookLogin()
		}
	}, [])


	return (
		<Card stretch>
			<CardHeader className='bg-transparent'>
				<CardLabel>
					<CardTitle tag='h4' className='h5'>
						Top Social Media Followers
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<div className='row g-3 socialImg w-100'>
					{/* <button className='fbLogin' > Login</button> */}

					<Card stretch>
						<CardBody>
							<div className='d-flex justify-content-between align-items-center w-100'>
								<div className='d-flex justify-content-start align-items-center w-100'>
									<div>
										<img src={Facebook} alt="" />
									</div>
									<div className='mx-3'>
										<h5>Facebook </h5>
									</div>
								</div>
								<div>
									<h5>{FbFollower}</h5>
								</div>
							</div>
						</CardBody>
					</Card>
					<Card stretch>
						<CardBody>
							<div className='d-flex justify-content-between align-items-center w-100'>
								<div className='d-flex justify-content-start align-items-center w-100'>
									<div>
										<img src={Insta} alt="" />
									</div>
									<div className='mx-3'>
										<h5>Instagram </h5>
									</div>

								</div>
								<div>
									<h5>{InstaFollower}</h5>
								</div>

							</div>
						</CardBody>
					</Card>
					<Card stretch>
						<CardBody>
							<div className='d-flex justify-content-between align-items-center'>
								<div className='d-flex justify-content-start align-items-center'>
									<div>
										<img src={YouTubeImage} alt="" />
									</div>
									<div className='mx-3'>
										<h5>YouTube </h5>
									</div>
								</div>
								<div>
									<h5>{YouTube}</h5>
								</div>

							</div>
						</CardBody>
					</Card>
				</div>
			</CardBody>
		</Card>
	);
};

export default DashboardSocialMedia;
