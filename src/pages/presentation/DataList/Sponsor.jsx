import { useEffect, useState } from 'react';
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
import { AssignEventName, SponsorData, SubscribeList, getAssignedList } from '../../../redux/Slice';
import Spinner from '../../../components/bootstrap/Spinner';
import { canvaBoolean, canvaData } from '../../../redux/Slice';
import SponsorDetails from './SponsorDetails';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import Icon from '../../../components/icon/Icon';
import ResponsivePagination from 'react-responsive-pagination';
import Label from '../../../components/bootstrap/forms/Label';
import { MultiSelect } from 'primereact/multiselect';
import Dropdown, {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'

const Sponsor = () => {


  const dispatch = useDispatch()
  const [Events, SetEvents] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [date, setdate] = useState('');

  const { SponsorList, Loading, canva, token, EventNameList, totalSponsorPage } = useSelector((state) => state.festiv)

  const handleUpcomingEdit = (i) => {
    dispatch(canvaBoolean({ canvas: !canva }))
    dispatch(canvaData({ canvaDatas: i }))
  };

  const SelectEvents = EventNameList?.map((item) => ({
    label: item?.eventName,
    value: item?._id,
  }));

  const handleClearFilter = () => {
    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ])
    SetEvents('')
    setdate('')
    dispatch(SponsorData({ token, currentPage, perPage }))
  }

  useEffect(() => {
    dispatch(AssignEventName(token))
  }, [])

  useEffect(() => {
    let apiParams = { token, currentPage, perPage }

    if (date || Events) {
      apiParams = {
        ...apiParams,
        date,
        Events
      }
    }

    dispatch(SponsorData(apiParams));

  }, [token, currentPage, perPage, Events, date])


  const handleSelect = (ranges) => {

    setDateRange([ranges.selection]);
    if (ranges?.selection?.startDate && ranges?.selection?.endDate) {
      const formattedStartDate = format(ranges?.selection?.startDate, 'yyyy-MM-dd');
      const formattedEndDate = format(ranges?.selection?.endDate, 'yyyy-MM-dd');
      const formattedRange = `${formattedStartDate}/${formattedEndDate}`;
      setdate(formattedRange);
    }
  };


  return (
    <PageWrapper title={demoPagesMenu.DataList.subMenu.sponsor.text}>
      <Page>
        <Card stretch data-tour='list'>
          <CardHeader borderSize={1}>
            <CardLabel icon='MonetizationOn' iconColor='danger'>
              <CardTitle>Sponsors List</CardTitle>
            </CardLabel>
            
              <div className='row w-50 d-flex align-item-center justify-content-between'>
                <div className='col-lg-1 filterIcon'>
                  <Icon icon='Sort' size='2x' className='h-100'></Icon>
                </div>
                <div className='col-lg-4'>
                  <Label>Choose Event</Label>
                  <MultiSelect value={Events} onChange={(e) => SetEvents(e.value)} options={SelectEvents} optionLabel="label" display="chip"
                    placeholder="Select Event" className='w-100' />
                </div>
                <div className='col-lg-4'>
                  <Label>Choose Date</Label>
                  <div className=' SelectDesign'>
                    <Dropdown>
                      <DropdownToggle>
                        <Button icon='DateRange' color='dark' isLight>
                          Filter Date{' '}
                          <strong>
                            {Number(dayjs().format('YYYY'))}
                          </strong>
                        </Button>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DateRange
                          ranges={dateRange}
                          onChange={handleSelect}
                        />
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <div className="col-lg-3 mt-4">
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
              </div>
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