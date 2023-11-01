import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';

import { demoPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessage, getTemplateId, getTemplateList, loadingStatus, successMessage, updatePublishStatus, websiteSetting } from '../../../redux/Slice';
import { Link } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import Popovers from '../../../components/bootstrap/Popovers';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import Label from '../../../components/bootstrap/forms/Label';
import { DeviceFrameset, DeviceEmulator } from 'react-device-frameset'
import 'react-device-frameset/styles/marvel-devices.min.css'
import 'react-device-frameset/styles/device-emulator.min.css'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../redux/Action'
import Swal from 'sweetalert2'

const SettingPopup = ({ isOpen, setIsOpen }) => {
	const { token } = useSelector((state) => state.festiv)


	const [selectedFont, setSelectedFont] = useState('Arial');
	const [selectedColor, setSelectedColor] = useState('#000000');

	const dispatch = useDispatch()

	const handleStatus = () => {
		// dispatch(statusChange({ statusChanges, ids, token }))
		console.log(selectedFont, selectedColor);

		const value = {
			fontFamily: selectedFont,
			fontColor: selectedColor
		}
		dispatch(websiteSetting({ token, value }))
		setIsOpen(false)
	}

	const fontOptions = ['Arial', 'Helvetica', 'Times New Roman', 'Verdana'];
	const colorOptions = [
		{
			label: 'Grape',
			value: '#6527BE'
		},
		{
			label: 'Cetacean Blue',
			value: '#0C134F'
		},
		{
			label: 'Paradise Pink',
			value: '#EB455F '
		},
		{
			label: 'Dark Orchid',
			value: '#A31ACB'
		}
	];

	return (
		<>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' isCentered={true} isAnimation={true}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle  >Confirm status</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<Row>
						<Col lg={6}>
							<div>
								<Label>Choose your font-family</Label>
								<Select onChange={(e) => { setSelectedFont(event.target.value) }} value={selectedFont}>
									{fontOptions.map((font, id) => (
										<Option key={id} value={font}>
											{font}
										</Option>
									))}
								</Select>
							</div>
						</Col>
						<Col lg={6}>
							<div>
								<Label>Choose your font-color</Label>
								<Select id="color" onChange={(e) => { setSelectedColor(event.target.value) }} value={selectedColor}>
									{colorOptions.map((color, id) => (
										<Option key={id} value={color?.value} style={{ backgroundColor: `${color?.value}`, width: '100px', height: '20px', color: 'white' }}>
											{color?.label}
										</Option>
									))}
								</Select>
							</div>
						</Col>
					</Row>
				</ModalBody>
				<ModalFooter>
					<Button isLight color='dark' icon='Send'
						onClick={handleStatus}
					>
						submit
					</Button>
				</ModalFooter>
			</Modal>
		</>
	)
}





export const DevicePreview = ({ isOpen, setIsOpen,link }) => {

	
	return (
		<>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}  fullScreen={true} isCentered={true} isAnimation={true}>
			<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle  >Device Preview</ModalTitle>
				</ModalHeader>
	
				<DeviceEmulator  banDevices={["HTC One","iPhone 5s","iPhone 5c","iPhone 4s","Lumia 920","Samsung Galaxy S5","Nexus 5" ]}>
					{props => <DeviceFrameset 
					{...props} 					
					 >
						<iframe src={link} width="100%" style={{ height: "100%" }} />
					</DeviceFrameset>}
				</DeviceEmulator>
			</Modal>
		</>
	)

}











const PageList = () => {

	const { TemplateData, token, Loading, TemplateList, success, error } = useSelector((state) => state.festiv)
	const { darkModeStatus } = useDarkMode();

	const dispatch = useDispatch()
	const [selectValue, SetSelectValue] = useState('')

	useEffect(() => {
		if (TemplateList?.length >= 0 && TemplateList[0]?.uniqueId) {
			SetSelectValue(TemplateList[0].uniqueId);
		}
	}, [TemplateList]);

	const Notification = (val,tit,pos,ico,btn) => {
		Swal.fire({
			position:`${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
			timer: 3000
		})
		
		clearErrors(); 
		clearSuccesses(); 
		setLoadingStatus(false); 
	}


	useEffect(() => {
		dispatch(getTemplateList(token))
	}, [dispatch, token])


	useEffect(() => {
		dispatch(getTemplateId({ token, selectValue }))
	}, [dispatch, token, selectValue, success])


	// useEffect(() => {
	// 	error && handleSave(error)
	// 	success && handleSave(success)
	// }, [success, error])

	useEffect(() => {
		error && Notification(error,errTitle,poscent,errIcon,BtnCanCel)
		success && Notification(success,scc,posTop,sccIcon,BtnGreat)
		
	}, [error, success, Loading]);

	// const handleStatus = (id, uid, status) => {
	// 	status = !status
	// 	dispatch(updatePublishStatus({ id, uid, status, token }))
	// }

	const [showModal, setModalshow] = useState(false);

	const [DeviceModal, setModalDevice] = useState(false);
	const [PreviewLink, setPreviewLink] = useState('');

	return (
		<PageWrapper title={demoPagesMenu.Template.subMenu.pageList.text}>
			<Page>
				<Card stretch>
					<CardHeader>
						<CardLabel icon='Dvr' iconColor='info'>
							<CardTitle>Page List</CardTitle>
						</CardLabel>
						<CardActions>
							<div className='d-flex flex-row justify-content-center align-items-center gap-5'>
								{/* <div>
									<Popovers title='Feature' trigger='hover' desc='Preview Website ' isDisplayInline={"true"}>
										<Icon icon='Devices' size='3x' className='me-1' onClick={() => setModalDevice(true)} />
									</Popovers>
								</div> */}
								<div className='settingDesign'>
									<Popovers title='Feature' trigger='hover' desc='Set Font-Family , Color ' isDisplayInline={"true"}>
										<Icon icon='Settings' size='3x' className='me-1' onClick={() => setModalshow(true)} />
									</Popovers>
								</div>
								<div className='locationSelect'>
									<Select
										placeholder='Select Template'
										onChange={(e) => { SetSelectValue(e.target.value) }}
										value={selectValue}
										style={{ padding: '0px 10px' }}
										ariaLabel='template'
									>
										{
											TemplateList?.length > 0 ?
												(
													TemplateList?.map((item, index) => (
														<Option key={index} value={item?.uniqueId}>{item?.templateName}</Option>
													))
												)
												:
												(
													<Option value=''>No Template List</Option>
												)
										}
									</Select>
								</div>
							</div>
						</CardActions>
					</CardHeader>
					<CardBody isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col' className='text-center'>Page Name</th>
									<th scope='col' className='text-center'>
										Website Preview
									</th>
									<th scope='col' className='text-center'>
										Edit
									</th>
									<th scope='col' className='text-center'>
										Deview Preview
									</th>
								</tr>
							</thead>

							<tbody className='text-center'>
								{
									TemplateData?.length > 0 ?
										(

											<>
												<tr >
													<td>
														<p className='h5'>Home</p>
													</td>
													<td>
														<Link to={`${TemplateData[0]?.templates[0]?.url}`} target='blank'>
															<Button
																isOutline={!darkModeStatus}
																icon='RemoveRedEye'
															>
															</Button>
														</Link>
													</td>
													<td>
														<Link to={`/hometemplate/${TemplateData[0]?.templates[0]?._id}`}>
															<Button
																icon='Edit'
															>
															</Button>
														</Link>
													</td>
													<td>
															<Button
															onClick={() => {
																setModalDevice(true)
																setPreviewLink('https://festivticketsdemo.com/')
															}}
															>
																<Icon icon='Devices' size='2x'  />
															</Button>
														
													</td>
												</tr>
												<tr >
													<td>
														<p className='h5' isOutline={!darkModeStatus}>Event</p>
													</td>
													<td>
														<Link to={`${TemplateData[0]?.templates[4]?.url}`} target='blank'>
															<Button
																isOutline={!darkModeStatus}
																icon='RemoveRedEye'
															>
															</Button>
														</Link>
													</td>
													<td>
														<Link to={`/eventtemplate/${TemplateData[0]?.templates[4]?._id}`}>
															<Button
																icon='Edit'
															>
															</Button>
														</Link>
													</td>
													<td>
													<Button
															onClick={() => {
																setModalDevice(true)
																setPreviewLink('https://festivticketsdemo.com/event')
															}}
															>
																<Icon icon='Devices' size='2x'  />
															</Button>
													</td>
												</tr>
												<tr >
													<td>
														<p className='h5'>Ticket</p>
													</td>
													<td>
														<Link to={`${TemplateData[0]?.templates[1]?.url}`} target='blank'>
															<Button
																isOutline={!darkModeStatus}
																icon='RemoveRedEye'
															>
															</Button>
														</Link>
													</td>
													<td>
														<Link to={`/tickettemplate/${TemplateData[0]?.templates[1]?._id}`}>
															<Button
																icon='Edit'
															>
															</Button>
														</Link>
													</td>
													<td>
													<Button
															onClick={() => {
																setModalDevice(true)
																setPreviewLink('https://festivticketsdemo.com/ticketdetail')
															}}
															>
																<Icon icon='Devices' size='2x'  />
															</Button>
													</td>
												</tr>
												<tr>
													<td>
														<p className='h5'>Sponsor</p>

													</td>
													<td>
														<Link to={`${TemplateData[0]?.templates[2]?.url}`} target='blank'>
															<Button
																isOutline={!darkModeStatus}
																icon='RemoveRedEye'
															>
															</Button>
														</Link>
													</td>
													<td>
														<Link to={`/sponsortemplate/${TemplateData[0]?.templates[2]?._id}`}>
															<Button
																icon='Edit'
															>
															</Button>
														</Link>
													</td>
													<td>
													<Button
															onClick={() => {
																setModalDevice(true)
																setPreviewLink('https://festivticketsdemo.com/sponsor')
															}}
															>
																<Icon icon='Devices' size='2x'  />
															</Button>
													</td>
												</tr>
												<tr >
													<td>
														<p className='h5'>Vendor</p>

													</td>
													<td>
														<Link to={`${TemplateData[0]?.templates[3]?.url}`} target='blank'>
															<Button
																isOutline={!darkModeStatus}
																icon='RemoveRedEye'
															>
															</Button>
														</Link>
													</td>
													<td>
														<Link to={`/vendortemplate/${TemplateData[0]?.templates[3]?._id}`}>
															<Button
																icon='Edit'
															>
															</Button>
														</Link>
													</td>
													<td>
													<Button
															onClick={() => {
																setModalDevice(true)
																setPreviewLink('https://festivticketsdemo.com/vendor')
															}}
															>
																<Icon icon='Devices' size='2x'  />
															</Button>
													</td>
												</tr>
												<tr >
													<td>
														<p className='h5'>About </p>
													</td>
													<td>
														<Link to={`${TemplateData[0]?.templates[5]?.url}`} target='blank'>
															<Button
																isOutline={!darkModeStatus}
																icon='RemoveRedEye'
															>
															</Button>
														</Link>
													</td>
													<td>
														<Link to={`/abouttemplate/${TemplateData[0]?.templates[5]?._id}`}>
															<Button
																icon='Edit'
															>
															</Button>
														</Link>
													</td>
													<td>
													<Button
															onClick={() => {
																setModalDevice(true)
																setPreviewLink('https://festivticketsdemo.com/about')
															}}
															>
																<Icon icon='Devices' size='2x'  />
															</Button>
													</td>
												</tr>
												<tr >
													<td>
														<p className='h5'>Festival Hours </p>
													</td>
													<td>
														<Link to={`${TemplateData[0]?.templates[6]?.url}`} target='blank'>
															<Button
																isOutline={!darkModeStatus}
																icon='RemoveRedEye'
															>
															</Button>
														</Link>
													</td>
													<td>
														<Link to={`/festivhourstemplate/${TemplateData[0]?.templates[6]?._id}`}>
															<Button
																icon='Edit'
															>
															</Button>
														</Link>
													</td>
													<td>
													<Button
															onClick={() => {
																setModalDevice(true)
																setPreviewLink('https://festivticketsdemo.com/festivalhours')
															}}
															>
																<Icon icon='Devices' size='2x'  />
															</Button>
													</td>
												</tr>
											</>
										)
										:
										(
											<>

												<tr>
													<td></td>
													<td></td>
													<td>{Loading && <Spinner color="dark" size="10" />}</td>
													<td></td>
												</tr>
											</>
										)
								}
							</tbody>
						</table>
					</CardBody>
				</Card>
				{
					<SettingPopup
						setIsOpen={setModalshow}
						isOpen={showModal}
					/>
				}
				{
					<DevicePreview
					setIsOpen={setModalDevice}
					isOpen={DeviceModal}
					link={PreviewLink}
					/>
				}
			</Page>
		</PageWrapper>
	);
};

export default PageList;
