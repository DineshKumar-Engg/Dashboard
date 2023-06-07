import React, { useEffect, useState } from 'react';
import OffCanvas, { OffCanvasBody, OffCanvasHeader } from '../../../components/bootstrap/OffCanvas';
// import Chat, { ChatGroup, ChatHeader } from '../../../components/Chat';
import InputGroup from '../../../components/bootstrap/forms/InputGroup';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import Button from '../../../components/bootstrap/Button';
import USERS from '../../../common/data/userDummyData';
import Avatar from '../../../components/Avatar';
import showNotification from '../../../components/extras/showNotification';
import CHATS from '../../../common/data/chatDummyData';
import UserOne from '../../../assets/img/user5.png'
import Dropdown, { DropdownToggle } from '../../../components/bootstrap/Dropdown';


const CommonHeaderChat = () => {
	// const [state, setState] = useState<boolean>(false);
	// const [msgCount, setMsgCount] = useState<number>(0);

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		setMsgCount(1);
	// 		showNotification(
	// 			<span className='d-flex align-items-center'>
	// 				<Avatar
	// 					srcSet={USERS.CHLOE.srcSet}
	// 					src={USERS.CHLOE.src}
	// 					size={36}
	// 					color={USERS.CHLOE.color}
	// 					className='me-3'
	// 				/>
	// 				<span>{USERS.CHLOE.name} sent a message.</span>
	// 			</span>,
	// 			<div onClick={() => setState(!state)} role='presentation'>
	// 				<p>I think it's really starting to shine.</p>
	// 			</div>,
	// 		);
	// 	}, 30000);
	// 	return () => {
	// 		clearTimeout(timeout);
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// useEffect(() => {
	// 	setMsgCount(0);
	// }, [state]);

	return (
		<>
			<div
				className='col d-flex align-items-center cursor-pointer'
				// onClick={() => setState(!state)}
				role='presentation'>
				<div className='me-3'>
					<div className='text-end'>
						{/* <div className='fw-bold fs-6 mb-0'>
							{`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
						</div>
						<div className='text-muted'>
							<small>{USERS.CHLOE.position}</small>
							
						</div> */}
						<div className='fw-bold fs-6 mb-0'>
							
						</div>
					</div>
				</div>
				<div className='position-relative'>
					
					
						<Avatar
						// srcSet={USERS.CHLOE.srcSet}
						src={UserOne}
						size={48}
						// color={USERS.CHLOE.color}
					/>
					
				</div>
			</div>
			
		</>
	);
};

export default CommonHeaderChat;
