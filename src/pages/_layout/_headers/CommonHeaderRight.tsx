import React, { FC, ReactNode, useContext, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useTour } from '@reactour/tour';
import Button, { IButtonProps } from '../../../components/bootstrap/Button';
import { HeaderRight } from '../../../layout/Header/Header';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import Alert from '../../../components/bootstrap/Alert';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import ThemeContext from '../../../contexts/themeContext';
import LANG, { getLangWithKey, ILang } from '../../../lang';
import showNotification from '../../../components/extras/showNotification';
import useDarkMode from '../../../hooks/useDarkMode';
import Popovers from '../../../components/bootstrap/Popovers';
import Spinner from '../../../components/bootstrap/Spinner';
import Avatar from '../../../components/Avatar';
import UserOne from '../../../assets/img/user5.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginToken, loginState } from '../../../redux/Slice';

interface ICommonHeaderRightProps {
	beforeChildren?: ReactNode;
	afterChildren?: ReactNode;
}
const CommonHeaderRight: FC<ICommonHeaderRightProps> = ({ beforeChildren, afterChildren }) => {
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext);
	const styledBtn: IButtonProps = {
		color: darkModeStatus ? 'dark' : 'light',
		hoverShadow: 'default',
		isLight: !darkModeStatus,
		size: 'lg',
	};
const navigate=useNavigate()
	// const [offcanvasStatus, setOffcanvasStatus] = useState(false);

	const { i18n } = useTranslation();

	// const changeLanguage = (lng: ILang['key']['lng']) => {
	// 	i18n.changeLanguage(lng).then();
	// 	showNotification(
	// 		<span className='d-flex align-items-center'>
	// 			<Icon icon={getLangWithKey(lng)?.icon} size='lg' className='me-1' />
	// 			<span>{`Language changed to ${getLangWithKey(lng)?.text}`}</span>
	// 		</span>,
	// 		'You updated the language of the site. (Only "Aside" was prepared as an example.)',
	// 	);
	// };

	/**
	 * Language attribute
	 */
	// useLayoutEffect(() => {
	// 	document.documentElement.setAttribute('lang', i18n.language.substring(0, 2));
	// });

	// const { setIsOpen } = useTour();
const dispatch = useDispatch()

	const handleLogout =()=>{
		localStorage.removeItem('Token')
		dispatch(loginState({loginSet:false}))
		dispatch(LoginToken({tokenremove:null}))
		navigate('../auth-pages/login')
	}

	return (
		<HeaderRight>
			<div className='row g-3'>
				{beforeChildren}
				
				{/* Dark Mode */}
				<div className='col-auto'>
					<Popovers trigger='hover' desc='Dark / Light mode'>
						<Button
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...styledBtn}
							onClick={() => setDarkModeStatus(!darkModeStatus)}
							className='btn-only-icon'
							data-tour='dark-mode'>
							<Icon
								icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
								color={darkModeStatus ? 'info' : 'warning'}
								className='btn-icon'
							/>
						</Button>
					</Popovers>
				</div>

				{/*	Full Screen */}
				<div className='col-auto'>
					<Popovers trigger='hover' desc='Fullscreen'>
						<Button
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...styledBtn}
							icon={fullScreenStatus ? 'FullscreenExit' : 'Fullscreen'}
							onClick={() => setFullScreenStatus(!fullScreenStatus)}
							aria-label='Toggle dark mode'
						/>
					</Popovers>
				</div>

				<div className="col-auto position-relative profile">
					<Dropdown>
						<DropdownToggle>
						<Avatar
						// srcSet={USERS.CHLOE.srcSet}
						src={UserOne}
						size={48}
						// color={USERS.CHLOE.color}
					/>
						</DropdownToggle>
						<DropdownMenu className='bg-l25-info'>
						<div
									className={classNames(
										'col-12',
										// 'p-4',
										'd-flex justify-content-center',
										'fw-bold fs-5',
										'text-info',
										
										{
											'bg-l25-info': !darkModeStatus,
											'bg-lo25-info': darkModeStatus,
										},
									)}>
									<Button
							icon='Logout'
							onClick={handleLogout}
							>
								LogOut
							</Button>
								</div>
							
						</DropdownMenu>
					</Dropdown>
				</div>



				{/* {afterChildren} */}
			</div>

		</HeaderRight>
	);
};
CommonHeaderRight.propTypes = {
	beforeChildren: PropTypes.node,
	afterChildren: PropTypes.node,
};
CommonHeaderRight.defaultProps = {
	beforeChildren: null,
	afterChildren: null,
};

export default CommonHeaderRight;
