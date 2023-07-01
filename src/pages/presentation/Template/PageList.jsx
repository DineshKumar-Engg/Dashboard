import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { useMeasure } from 'react-use';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTabItem,
	CardTitle,
} from '../../../components/bootstrap/Card';
import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import Alert from '../../../components/bootstrap/Alert';
import Avatar from '../../../components/Avatar';
import Progress from '../../../components/bootstrap/Progress';

import Pic from '../../../assets/img/wanna/richie/richie.png';
import Pic2 from '../../../assets/img/wanna/richie/richie2.png';
import Pic3 from '../../../assets/img/wanna/richie/richie3.png';
import Pic4 from '../../../assets/img/wanna/richie/richie4.png';
import Pic5 from '../../../assets/img/wanna/richie/richie5.png';
import Pic6 from '../../../assets/img/wanna/richie/richie6.png';
import Pic7 from '../../../assets/img/wanna/richie/richie7.png';
import Pic8 from '../../../assets/img/wanna/richie/richie8.png';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import { demoPagesMenu } from '../../../menu';
import WannaImg1 from '../../../assets/img/wanna/slide/scene-1.png';
import WannaImg2 from '../../../assets/img/wanna/slide/scene-2.png';
import WannaImg5 from '../../../assets/img/wanna/slide/scene-5.png';
import WannaImg6 from '../../../assets/img/wanna/slide/scene-6.png';
import Carousel from '../../../components/bootstrap/Carousel';
import CarouselSlide from '../../../components/bootstrap/CarouselSlide';
import useDarkMode from '../../../hooks/useDarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { getTemplateId, getTemplateList } from '../../../redux/Slice';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';

const PageList = () => {
	const{TemplateData,token,Loading,TemplateList}=useSelector((state)=>state.festiv)
	const { darkModeStatus } = useDarkMode();

	const dispatch = useDispatch()
	const [selectValue,SetSelectValue]=useState('')

	useEffect(()=>{
		dispatch(getTemplateList(token))
	},[dispatch,token])


	useEffect(() => {
		if (TemplateList?.length > 0 && TemplateList[0]?._id) {
		  SetSelectValue(TemplateList[0]._id);
		}
	  }, [TemplateList]);


	useEffect(()=>{
		dispatch(getTemplateId({token,selectValue}))
	},[dispatch,token,selectValue])

	console.log(selectValue);




	return (
		<PageWrapper title={demoPagesMenu.Template.subMenu.pageList.text}>
           			<Page>
				<Card>
				<CardHeader>	
						<CardLabel icon='Dvr' iconColor='info'>
							<CardTitle>Template List</CardTitle>
						</CardLabel>
						
						<CardActions>
							<div className='locationSelect'>
							<Select
								 placeholder='Select Your Template'
								onChange={(e)=>{SetSelectValue(e.target.value)}}
								value={selectValue}
								style={{padding:'0px 10px'}}
								ariaLabel='template'
							>
								{
                                TemplateList?.length>0 ?
                                (
                                    TemplateList.map((item, index) => (
                                        <Option key={index} value={item?._id}>{item?.templateName}</Option>
                                    ))
                                )
                                :
                                (
                                    <Option value=''>Please wait,Loading...</Option>
                                )
                            }
							</Select>
							</div>
						</CardActions>
				</CardHeader>
				<CardBody>
					<table className='table table-modern table-hover'>
					<thead>
								<tr>
									<th scope='col' className='text-center'>Template Name</th>
									<th scope='col' className='text-center'>
										Action
									</th>
									<th scope='col' className='text-center'>
										Preview
									</th>
									<th scope='col' className='text-center'>
										Edit
									</th>
								</tr>
							</thead>

					<tbody className='text-center'>
						{
							TemplateData.templatePages?.length > 0 ?
							(
								TemplateData.templatePages?.map((item)=>(
									<tr key={item?._id}>
									<td>
									{item?.name}
									</td>
									<td>
									<Link to={`/`}>
				<Button
				className='w-20 py-2 px-5 mx-3'
				color={'info'}
					isOutline={!darkModeStatus}
					icon='Website'
					// onClick={() => handleClick(item?.eventId,item?.uniqueId)}
				>
					Publish
				</Button>
				</Link>
									</td>
									<td>
									<Link to={`/`}>
				<Button
					isOutline={!darkModeStatus}
					icon='RemoveRedEye'
					// onClick={() => handleClick(item?.eventId,item?.uniqueId)}
				>
				</Button>
				</Link>
									</td>
									<td>
									<Link to={`/`}>
						<Button
							icon='Edit'
						>
						</Button>
					</Link>
									</td>
								</tr>
									)) 
							)
							:
							(
<>
								
								<tr>
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
			</Page>
		</PageWrapper>
	);
};

export default PageList;
