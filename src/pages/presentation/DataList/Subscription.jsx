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
import { SubscribeList } from '../../../redux/Slice';
import Spinner from '../../../components/bootstrap/Spinner';




const Subscription = () => {

  const dispatch = useDispatch()

	const { SubscriptionList, Loading, token } = useSelector((state) => state.festiv)


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
              </tr>
            </thead>
            <tbody className='text-center' >
              {
                SubscriptionList?.length > 0 ?
                  (

                    SubscriptionList?.map((item) => (
                      <tr>
                      <td className='text-center'>
                        <span className='h6'>
                          <p className='fs-6'>{item?.createdAt.split('T')[0]}</p>
                        </span>
                      </td>
                      <td className='text-center'>
                        <span className='h6'>
                           <p className='fs-6'>{item?.email} </p> 
                        </span>
                      </td>
                    </tr>
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