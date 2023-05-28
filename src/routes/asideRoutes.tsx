import React from 'react';
import { RouteProps } from 'react-router-dom';
import { demoPagesMenu, } from '../menu';
import DefaultAside from '../pages/_layout/_asides/DefaultAside';
import { Navigate } from 'react-router-dom';


const asides: RouteProps[] = [
	// {path:"/", element:<Navigate to="/auth-pages/login"/>},
	{ path: '/auth-pages/login', element: null },
	{ path: '*', element: <DefaultAside /> },
];

export default asides;

// <PageWrapper title={demoPagesMenu.eventPages.subMenu.location.text}>
// 			<Page container='fluid'>
// 				<div className="row h-100'">
// 					<div className="col-12">
// 						<Card>
// 							<CardHeader borderSize={1}>
// 								<CardLabel icon='AddLocationAlt' iconColor='info'>
// 									<CardTitle>Location</CardTitle>
// 								</CardLabel>
// 								<CardActions>
// 									<Link to='/newLocation'>
// 										<Button
// 											color='light'
// 											hoverShadow='none'
// 											icon='AddLocation'
// 										>
// 											Add New Location

// 										</Button>
// 									</Link>
// 								</CardActions>
// 							</CardHeader>
// 							<CardBody className='table-responsive' isScrollable>
// 								<table className='table table-modern table-hover'>
// 									<thead>
// 										<tr>
// 											<th scope='col' className='text-center'>
// 												Name of the location</th>
// 											<th scope='col' className='text-center'>
// 												Associated Events
// 											</th>
// 											<th scope='col' className='text-center'>
// 												Edit
// 											</th>
// 											<th scope='col' className='text-center'>
// 												Details
// 											</th>
// 										</tr>
// 									</thead>
// 									<tbody>
// 										{
// 											onCurrentPageItems?.map((i) => (
// 												<CommonLocationRow
// 													key={i.id}
// 													{...i}
// 													item={i}
// 													selectName='selectedList'
// 													selectOnChange={selectTable.handleChange}
// 													selectChecked={selectTable.values.selectedList.includes(
// 														// @ts-ignore
// 														// i.id.toString(),
// 													)}
// 												/>
// 											))
// 										}
// 									</tbody>
// 								</table>
// 							</CardBody>

// 							<PaginationButtons
// 								data={LocationList}
// 								label='items'
// 								setCurrentPage={setCurrentPage}
// 								currentPage={currentPage}
// 								perPage={perPage}
// 								setPerPage={setPerPage}
// 							/>
// 						</Card>
// 					</div>
// 				</div>
// 			</Page>

// 		</PageWrapper>