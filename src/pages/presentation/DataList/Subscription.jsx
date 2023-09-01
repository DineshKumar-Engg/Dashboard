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
import { SubscribeList, errorMessage, loadingStatus, successMessage } from '../../../redux/Slice';
import Spinner from '../../../components/bootstrap/Spinner';
import CommonSubscribe from '../../Common/CommonSubscribe';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';




const Subscription = () => {

  const dispatch = useDispatch()

	const { SubscriptionList, Loading, token ,success ,error} = useSelector((state) => state.festiv)

	const handleSave = (val) => {
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span className='fs-6'>{val}</span>
			</span>,
		);
		if (success) {
			dispatch(SubscribeList(token))
		}
		dispatch(errorMessage({ errors: '' }))
		dispatch(successMessage({ successess: '' }))
		dispatch(loadingStatus({ loadingStatus: false }))
	};

	useEffect(() => {
		error && handleSave(error)
		success && handleSave(success)
	}, [success, error])

	useEffect(() => {
		dispatch(SubscribeList(token));
	}, [token])



  return (
    <PageWrapper title={demoPagesMenu.DataList.subMenu.subscription.text}>
    <Page>
      <Card stretch data-tour='list'>
        <CardHeader borderSize={1}>
          <CardLabel icon='Subject' iconColor='danger'>
            <CardTitle>Subscription List</CardTitle>
          </CardLabel>
        </CardHeader>
        <CardBody className='table-responsive' isScrollable>
          <table className='table table-modern table-hover'>
            <thead>
              <tr>
                <th scope='col' className='text-center'>Date</th>
                <th scope='col' className='text-center'>Email</th>
                <th scope='col' className='text-center'>Subscribed</th>
              </tr>
            </thead>
            <tbody className='text-center' >
              {
                SubscriptionList?.length > 0 ?
                  (

                    SubscriptionList?.map((items) => (
                      <CommonSubscribe
                      item={items}
                      />
                    ))
                  )
                  :
                  (
                    <>
                      <tr>
                        <td></td>
                        <td>{Loading ? <Spinner color="dark" size="10" /> : 
                          <Button
                            color='info'
                            hoverShadow='none'
                            icon='Cancel'
                          >
                            No Subscribers
                          </Button>
                        }</td>
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
    </Page>
  </PageWrapper>
  )
}

export default Subscription