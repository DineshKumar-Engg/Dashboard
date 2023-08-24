import { useEffect} from 'react';
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
import { SponsorData, SubscribeList, VendorData } from '../../../redux/Slice';
import Spinner from '../../../components/bootstrap/Spinner';
import { canvaBoolean, canvaData } from '../../../redux/Slice';
import SponsorDetails from './SponsorDetails';
import VendorDetails from './VendorDetails';

const Vendor = () => {


  const dispatch = useDispatch()

	const { VendorList, Loading,  canva, token} = useSelector((state) => state.festiv)
 
  const handleUpcomingEdit = (i) => {
    dispatch(canvaBoolean({ canvas: !canva }))
    dispatch(canvaData({ canvaDatas: i }))
};


	useEffect(() => {
		dispatch(VendorData(token));
	}, [token])





  return (
    <PageWrapper title={demoPagesMenu.DataList.subMenu.vendor.text}>
    <Page>
      <Card stretch data-tour='list'>
        <CardHeader borderSize={1}>
          <CardLabel icon='Storefront' iconColor='danger'>
            <CardTitle>Vendor List</CardTitle>
          </CardLabel>
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
                VendorList?.length > 0 ?
                  (

                    VendorList?.map((item) => (
                      <tr>
                      <td className='text-center'>
                        <span className='h6'>
                          <p>{item?.createdAt.split('T')[0]}</p>
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
                           <p className='fs-6'>{item?.email} </p> 
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
                            No Vendor List
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

        <CardFooter>
          {/* <CardFooterRight>
            <ResponsivePagination
              total={totalCategoryPage}
              current={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </CardFooterRight> */}
        </CardFooter>
      </Card>
      {canva && <VendorDetails />}
    </Page>
  </PageWrapper>
  )
}

export default Vendor