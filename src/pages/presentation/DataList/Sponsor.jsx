import { useEffect ,useState} from 'react';
import Button from '../../../components/bootstrap/Button';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { demoPagesMenu } from '../../../menu';
import { useDispatch, useSelector } from 'react-redux'
import { SponsorData, SubscribeList, getAssignedList } from '../../../redux/Slice';
import Spinner from '../../../components/bootstrap/Spinner';
import { canvaBoolean, canvaData } from '../../../redux/Slice';
import SponsorDetails from './SponsorDetails';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import Icon from '../../../components/icon/Icon';
import ResponsivePagination from 'react-responsive-pagination';
import Label from '../../../components/bootstrap/forms/Label';

const Sponsor = () => {


  const dispatch = useDispatch()
  const [Events,SetEvents] = useState('')
  const [date,setDate]=useState('')
  const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const { SponsorList, Loading,  canva, token ,AssignLists ,totalSponsorPage} = useSelector((state) => state.festiv)
 
  const handleUpcomingEdit = (i) => {
    dispatch(canvaBoolean({ canvas: !canva }))
    dispatch(canvaData({ canvaDatas: i }))
};

const SelectEvents = AssignLists?.map((item) => ({
  label: item?.event?.eventName,
  value: item?.event?.eventId,
}));

const handleClearFilter = () => {
  setDate('')
  SetEvents('')
  dispatch(SponsorData({ token, currentPage, perPage }))
}

useEffect(() => {
  dispatch(getAssignedList(token))
}, [])

	useEffect(() => {
    let apiParams = {token}

    if(date || Events){
      apiParams.date = date;
      apiParams.Events = Events;
    }else{
      apiParams = { ...apiParams, currentPage, perPage };
    }

		dispatch(SponsorData(apiParams));

	}, [token ,currentPage, perPage , Events ,date])


  return (
    <PageWrapper title={demoPagesMenu.DataList.subMenu.sponsor.text}>
    <Page>
      <Card stretch data-tour='list'>
        <CardHeader borderSize={1}>
          <CardLabel icon='MonetizationOn' iconColor='danger'>
            <CardTitle>Sponsors List</CardTitle>
          </CardLabel>
          <CardActions>
          <div className='d-flex align-item-center justify-content-center'>
								<div className='filterIcon'>
									<Icon icon='Sort' size='2x' className='h-100'></Icon>
								</div>
								<div className='mx-4 SelectDesign'>
                    <Label>Choose Event</Label>
									<Select placeholder='Filter Events' value={Events} onChange={(e) => SetEvents(e.target.value)}>
										{
											SelectEvents?.length > 0 ?
												(
													SelectEvents?.map((item, index) => (
														<Option key={index} value={item?.value}>{item?.label}</Option>
													))
												)
												:
												(
													<Option value=''>Please wait,Loading...</Option>
												)
										}
									</Select>
								</div>
                <div className='mx-4'>
                    <Label>Choose Date</Label>
                    <div className=' SelectDesign'>
                    <input type='date'  className='SelectDesign' value={date} onChange={(e)=>{setDate(e.target.value)}}></input>

                    </div>
                </div>
								{
									Events || date ?
										(
											<div className='cursor-pointer d-flex align-items-center ' onClick={handleClearFilter} >
												<Button
													color='info'
													hoverShadow='none'
													icon='Clear'
													isLight
												>
													Clear filters
												</Button>
											</div>
										)
										:
										null
								}
							</div>
          </CardActions>
        </CardHeader>
        <CardBody className='table-responsive' isScrollable>
          <table className='table table-modern table-hover'>
            <thead>
              <tr>
                <th scope='col' className='text-center'>Date</th>
                <th scope='col' className='text-center'>Name</th>
                <th scope='col' className='text-center'>Organization</th>
                <th scope='col' className='text-center'>Email</th>
                <th scope='col' className='text-center'>Phone Number</th>
                <th scope='col' className='text-center'>City</th>
                <th scope='col' className='text-center'>Details</th>
              </tr>
            </thead>
            <tbody className='text-center' >
              {
                SponsorList?.length > 0 ?
                  (

                    SponsorList?.map((item) => (
                      <tr>
                      <td className='text-center'>
                        <span className='h6'>
                          <p className='fs-6'>{item?.createdAt.split('T')[0]}</p>
                        </span>
                      </td>
                      <td className='text-center'>
                        <span className='h6'>
                           <p className='fs-6'>{item?.firstname} </p> 
                        </span>
                      </td>
                      <td className='text-center'>
                        <span className='h6'>
                           <p className='fs-6'>{item?.organizationName} </p> 
                        </span>
                      </td>
                      <td className='text-center'>
                        <span className='h6'>
                           <p >{item?.email} </p> 
                        </span>
                      </td>
                      <td className='text-center'>
                        <span className='h6'>
                           <p className='fs-6'>{item?.phoneNumber} </p> 
                        </span>
                      </td>
                      <td className='text-center'>
                        <span className='h6'>
                           <p className='fs-6'>{item?.city} </p> 
                        </span>
                      </td>
                      <td>
                    <div className=' td-flex'>
                        <Button
                            // isOutline={!darkModeStatus}
                            icon="ArrowRight"
                            onClick={() => { handleUpcomingEdit(item) }}
                        >
                        </Button>
                    </div>
                </td>
                    </tr>
                    ))
                  )
                  :
                  (
                    <>
                      <tr>
                      <td></td>
                        <td></td>
                        <td></td>
                        <td>{Loading ? <Spinner color="dark" size="10" /> : 
                          <Button
                            color='info'
                            hoverShadow='none'
                            icon='Cancel'
                          >
                            No Sponsor List
                          </Button>
                        }</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </>
                  )
              }
            </tbody>
          </table>
        </CardBody>

        <CardFooterRight>
           <ResponsivePagination
              total={totalSponsorPage}
              current={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
        </CardFooterRight>
      </Card>
      {canva && <SponsorDetails />}
    </Page>
  </PageWrapper>
  )
}

export default Sponsor