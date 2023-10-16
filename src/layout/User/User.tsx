import React, { useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { demoPagesMenu } from '../../menu';
import { DropdownItem, DropdownMenu } from '../../components/bootstrap/Dropdown';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import Collapse from '../../components/bootstrap/Collapse';
import { NavigationLine } from '../Navigation/Navigation';
import Icon from '../../components/icon/Icon';
import useNavigationItemHandle from '../../hooks/useNavigationItemHandle';
// import AuthContext from '../../contexts/authContext';
import UserTwo from '../../assets/img/user2.webp'
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom';

const User = () => {
	// const { userData, setUser } = useContext(AuthContext);

	const navigate = useNavigate();
	const handleItem = useNavigationItemHandle();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	const [collapseStatus, setCollapseStatus] = useState<boolean>(false);

	const { t } = useTranslation(['translation', 'menu']);

	return (
		<>
		
			<div
				className={classNames('user', { open: collapseStatus })}
				role='presentation'
				onClick={() => setCollapseStatus(!collapseStatus)}>
				<div className='user-avatar'>
					<Avatar
						src={UserTwo}
						size={48}
					/>
				</div>
				<div className='user-info'>
					<Link to='https://festivtickets.com' target='blank' style={{textDecoration:'none',color:'#FFFFFF'}}>
					<h6>Help & Support</h6>
					</Link>
				</div>
			</div>
			
		</>
	);
};

export default User;
