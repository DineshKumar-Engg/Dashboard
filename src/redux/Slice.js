import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
	login: !!localStorage.getItem('Token'),
	token: localStorage.getItem('Token') || null,
	Loading: false,
	error: '',
	success: '',
	totalCategoryPage: '',
	totalLocationpage:'',
	TotalEventPage:'',
	totalTicketCategoryPage: '',
	totalTicketListPage:'',
	totalAssignPage:'',
	totalVendorPage:'',
	totalSponsorPage:'',
	totalPurchasePage:'',
	totalSalesPage:'',
	totalRedemptionPage:'',
	totalFailedScanPage:'',
	canva: false,
	canvaList: [],
	CategoryList: [],
	CategoryNameList: [],
	AssignedCategoryList: [],
	CategoryId:'',
	LocationId:'',
	TicketCategoryId:'',
	LocationList: [],
	LocationNameList: [],
	stateLists: [],
	cityLists: [],
	EditLocation: [],
	LocationData: [],
	EventList: [],
	EditEventDatas: [],
	TicketCategoryList: [],
	AssignTicketCategoryList: [],
	EventFilterId:'',
	TicketFilterId:'',
	TicketLists: [],
	TicketId: localStorage.getItem('ticketId'),
	TicketDetails: [],
	TicketType: [],
	TicketCategoryData: [],
	TicketGeneralData: [],
	TicketFaceData: [],
	TicketFeesData: [],
	TicketRedemptionData: [],
	EventNameList: [],
	TicketNameList: [],
	AssignLists: [],
	AssingedEventlist:[],
	AssignData: '',
	TemplateList: [],
	TemplateData: [],
	HomeDataAutoList:[],
	AssignedLocationList:[],
	AssignedEventList:[],
	ListTimeZone:[],
	EventTemplateData:'',
	TicketEventList:[],
	AssignedTicketList:[],
	TicketTemplateData:'',
	SponsorTemplateData:'',
	VendorTemplateData:'',
	AboutTemplateData:'',
	FestivTemplateData:'',
	SubscriptionList:[],
	SponsorList:[],
	VendorList:[],
	FilterDataList:[],
	PurchaseReportList:[],
	TicketSalesReportList:[],
	TicketRedemptionReportList:[],
	FailedReportList:[],
	DownloadReport:[],
	TopTicketList:[]
};

// const Token =  localStorage.getItem('Token');FilterDataList

// // option for all content type JSON
// const option = {
// 	headers: {
// 		Accept: 'application/json',
// 		Authorization: `Bearer ${Token }`,
// 		'Content-Type': 'application/json',
// 	},
// };

// // Option for image or file multipart
// const OptionFile = {
// 	headers: {
// 		'Content-Type': 'multipart/form-data',
// 		Authorization: `Bearer ${Token }`,
// 	},
// }

// Login link

export const Userlogin = createAsyncThunk(
	'login/userlogin',
	async (values, { rejectWithValue }) => {
		try {
			const options = {
				headers: {
					device: 'web',
				},
			};
			const response = await axios.post(
				`${process.env.REACT_APP_AWS_URL}/authentication/loginuser`,
				values,
				options,
			);
			if (response.status === 200) {
				const { data } = response;
				const currentTimeInMillis = Date.now();
				const expireTimeInMillis = currentTimeInMillis + 7 * 24 * 60 * 60 * 1000;  
				const expireTimeInSeconds = Math.floor(expireTimeInMillis / 1000);
				localStorage.setItem('Token', data?.token);
				localStorage.setItem('tokenExpiration', expireTimeInSeconds);
				return [data?.message, data?.token];
			}
		} catch (error) {
			const { response } = error;
			return rejectWithValue(response?.data?.message);
		}
	},
);

// GET CATEGORY LIST lINK

export const getCategoryList = createAsyncThunk(
	'category/getcategoryList',
	async (val, { rejectWithValue }) => {
		try {
			if (val?.perPage && val?.currentPage) {
				const response = await axios.get(
					 `${process.env.REACT_APP_AWS_URL}/EventCategory/listEventCategory?page=${val?.currentPage}&limit=${val?.perPage}`,

					{
						headers: {
							Accept: 'application/json',
							Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
							'Content-Type': 'application/json',
						},
					},
				);
				if (response.status == 200) {
					const { data } = response;
					return [data?.findDetail, data?.totalPages];
				}
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

// ADD CATEGORY LIST LINK
export const addCategoryList = createAsyncThunk(
	'category/addcategoryList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_AWS_URL}/EventCategory/createEventCategory`,
				val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.error || error?.response?.data?.message);
		}
	},
);

//Get Category list

export const getCategoryNameList = createAsyncThunk(
	'category/getCategoryNameList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/EventCategory/listEventCategoryName`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

// Delete Category list

export const deleteCategoryList = createAsyncThunk(
	'category/deleteCategoryList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_AWS_URL}/EventCategory/deleteEventCategory/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);




//For filter , Assigned Event category list

export const assignedCategoryNameList = createAsyncThunk(
	'event/assignedCategoryNameList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/EventCategory/assignEventCategoryName`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);



// GET LOCATION LIST LINK

export const getLocationList = createAsyncThunk(
	'location/getLocationList',
	async (apiParams, { rejectWithValue }) => {
		try {
				let url = `${process.env.REACT_APP_AWS_URL}/eventLocation/listEventLocation`;
			  
				const params = {
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || apiParams?.token}`,
						'Content-Type': 'application/json',
					},
				};
				const queryParams = [];
			
				if (apiParams.currentPage && apiParams.perPage) {
					queryParams.push(`page=${apiParams.currentPage}&limit=${apiParams.perPage}`);
				}
				if (apiParams?.stateSelect) {
					queryParams.push(`state=[${apiParams.stateSelect}]`);
				}
				if (apiParams?.citySelect) {
					queryParams.push(`city=[${apiParams?.citySelect}]`);
				}
				
				if (queryParams.length > 0) {
					url += `?${queryParams.join('&')}`;
				}

				const response = await axios.get(url,params);
			
				if (response.status === 200) {
					const { data } = response;
					const result = [data?.findDetail,data?.totalPages];
					return result;
				}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

// Get Location Name List

export const getLocationNameList = createAsyncThunk(
	'location/getLocationNameList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/eventLocation/listEventLocationName`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

// INSIDE LOCATION CREATE,EDIT STATE LIST

export const statelist = createAsyncThunk(
	'location/stateList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_AWS_URL}/stateList`, {
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				},
			});
			if (response.status == 200) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

// INSIDE LOCATION CREATE,EDIT CITY LIST

export const citylist = createAsyncThunk('location/citylist', async (val, { rejectWithValue }) => {
	if (val.length > 0) {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/stateAndCityList?state=[${val}]`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token')}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	}
});


export const saveLocation = createAsyncThunk(
    'location/saveLocation',
    async (val, { rejectWithValue }) => {
        try {
            let url;
            let method;

            if (val?.id) {
                url = `${process.env.REACT_APP_AWS_URL}/eventLocation/updateEventLocation/${val.id}`;
                method = 'put';
            } else {
                url = `${process.env.REACT_APP_AWS_URL}/eventLocation/createEventLocation`;
                method = 'post';
            }

            const response = await axios[method](url, val?.values, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200 || response.status === 201) {
                const data = response?.data?.message;
                return data;
            }
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
        }
    },
);




export const GetLocationId = createAsyncThunk(
	'location/GetLocationId',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/eventLocation/listLocationById/${val.id}`,

				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

//Delete Location Link

export const deleteLocationList = createAsyncThunk(
	'location/deleteLocationList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_AWS_URL}/eventLocation/deleteEventLocation/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

//ADD EVENT LINK

export const addEvent = createAsyncThunk('event/addevent', async (val, { rejectWithValue }) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_AWS_URL}/event/createEvent`,
			val?.formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				},
			},
		);
		if (response.status == 200 || response.status == 201) {
			const data = response?.data?.message;
			return data;
		}
	} catch (error) {
		return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
	}
});

//EDIT EVENT LINK

export const editEvent = createAsyncThunk('event/editevent', async (val, { rejectWithValue }) => {
	try {
		const response = await axios.put(
			`${process.env.REACT_APP_AWS_URL}/updateEvent/${val?.id}`,val?.formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				},
			},
		);
		if (response.status == 200) {
			const data = response?.data?.message;
			return data;
		}
	} catch (error) {
		return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
	}
});

//Delete Event list

export const deleteEventList = createAsyncThunk(
	'event/deleteEventList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_AWS_URL}/deleteEvent/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
		}
	},
);







// EVENT LIST LINK

export const eventList = createAsyncThunk('event/eventList', async (val, { rejectWithValue }) => {
	try {

		const params = {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || apiParams?.token}`,
				'Content-Type': 'application/json',
			},
		};
		if (val?.currentPage && val?.perPage) {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/listEvent?page=${val?.currentPage}&limit=${val?.perPage}`,
				params
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return [data?.findDetail,data?.totalPages];
			}
		}
		if(val?.AssignCategoryList || val?.year || val?.status) {

			let url = `${process.env.REACT_APP_AWS_URL}/listEvent`
			const queryParams = [];
			if (val?.AssignCategoryList?.length>0) {
				queryParams.push(`eventCategory=[${val.AssignCategoryList}]`);
			}
			if (val?.year?.length>0) {
				queryParams.push(`year=[${val?.year}]`);
			}
			if (val?.status) {
				queryParams.push(`status=${val?.status}`);
			}
			
			if (queryParams.length > 0) {
				url += `?${queryParams.join('&')}`;
			}
			const response = await axios.get(url,params);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return [data?.findDetail];
			}
		}
		if(val?.TicketFilterId){
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/listEventsByTicket?ticketId=${val?.TicketFilterId}`,
				params
			);
			if(response.status == 200 || response.status == 201) {
				const { data } = response;
				return [data];
			}
		}	
		if(val?.CategoryId){
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/listByEventCategoryOrEventLocation?eventCategoryId=${val?.CategoryId}`,
				params
			);
			if(response.status == 200 || response.status == 201) {
				const { data } = response;
				return [data];
			}
		}
		if(val?.LocationId){
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/listByEventCategoryOrEventLocation?eventLocationId=${val?.LocationId}`,
				params
			);
			if(response.status == 200 || response.status == 201) {
				const { data } = response;
				return [data];
			}
		}
	} catch (error) {
		return rejectWithValue('');
	}
});




//Edit Event Data

export const editEventData = createAsyncThunk(
	'event/editEventData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/listEventById/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

// EVENT LIST STATUS CHANGE LINK

export const statusChange = createAsyncThunk(
	'event/statusChange',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_AWS_URL}/updateEventStatus/${val?.ids}`,
				{ status: val?.statusChanges },
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue('Event Status Not Updatded');
		}
	},
);

// ADD TICKET CATEGORY LINK

export const addTicketCategory = createAsyncThunk(
	'ticketcategory/addTicketCategory',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_AWS_URL}/ticketCategory/createTicketCategory`,
				val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
		}
	},
);

// GET CATEGORY LIST LINK

export const getTicketCategoryList = createAsyncThunk(
	'ticket/getTicketCategoryList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/ticketCategory/listTicketCategory?page=${val?.currentPage}&limit=${val?.perPage}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return [data?.findDetail,data?.totalPages];
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

//Assigned Ticket Category List

export const AssignedTicketCategoryList = createAsyncThunk(
	'ticket/AssignedTicketCategoryList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/ticketCategory/assignTicketCategoryName`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

// Delete TicketCategory

export const deleteTicketCategoryList = createAsyncThunk(
	'ticket/deleteTicketCategoryList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_AWS_URL}/ticketCategory/deleteTicketCategory/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);




// Ge ticket Categroy Data List

export const GetTicketCategoryData = createAsyncThunk(
	'ticket/GetTicketCategoryData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/listTicketCategoryName`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

// GET TICKET LIST

export const getTicketDataLists = createAsyncThunk(
    'ticket/getTicketDataLists',
    async (val, { rejectWithValue }) => {
        try {
           
                let url = `${process.env.REACT_APP_AWS_URL}/listAllTicket`;
                const params = {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
                        'Content-Type': 'application/json',
                    },
                };

                if (val?.currentPage && val?.perPage) {
                    url += `?page=${val.currentPage}&limit=${val.perPage}`;
                } 
				if (val?.AssignTicketCategory || val?.year || val?.status) {
					
					const queryParams = [];
					if (val?.AssignTicketCategory?.length>0) {
						queryParams.push(`ticketCategory=[${val.AssignTicketCategory}]`);
					}
					if (val?.year?.length>0) {
						queryParams.push(`year=[${val?.year}]`);
					}
					if (val?.status) {
						queryParams.push(`status=${val?.status}`);
					}

					if (queryParams.length > 0) {
						url += `?${queryParams.join('&')}`;
					}
				} 
				if (val?.EventFilterId) {
                    url = `${process.env.REACT_APP_AWS_URL}/listTicketsByEvent?eventId=${val.EventFilterId}`;
                } 
				if (val?.TicketCategoryId) {
                    url = `${process.env.REACT_APP_AWS_URL}/listByTicketCategory?ticketCategoryId=${val.TicketCategoryId}`;
                }

                const response = await axios.get(url, params);

                if (response.status === 200 || response.status === 201) {
                    const { data } = response;
					if(response?.data?.findDetail){
						return [data?.findDetail];
					}
					else{
						return [data]
					}
                    
                }
        } catch (error) {
            return rejectWithValue('');
        }
    },
);

// Get Ticket Single Details

export const getTicketDetails = createAsyncThunk(
	'ticket/getTicketDetails',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/listOneTicketDetail/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

// Delete Ticket List

export const deleteTicketList = createAsyncThunk(
	'ticket/deleteTicketList',
	async (val, { rejectWithValue }) => {
		try {
		
			const response = await axios.delete(
				`${process.env.REACT_APP_AWS_URL}/ticket/deleteTicket/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);


// Ticket status change

export const TicketstatusChange = createAsyncThunk(
	'ticket/ticketstatusChange',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_AWS_URL}/ticket/updateTicketStatus/${val?.ids}`,
				{ status: val?.statusChanges },
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

// ADD TICKET GENERAL

export const addTicketGeneral = createAsyncThunk(
	'ticket/addGeneralTicket',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_AWS_URL}/ticket/createTicket`,
				val?.values,
				{
					headers:{
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const data = [response.data?.message, response?.data?.newTicket?._id];
				const ticketId = response?.data?.newTicket?._id;
				localStorage.setItem('ticketId', ticketId);
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
		}
	},
);

export const addTicketRedemption = createAsyncThunk(
	'ticket/addTicketRedemption',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_AWS_URL}/redemption/createTicketRedemption`,
				val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
		}
	},
);

export const addTicketFeesStructure = createAsyncThunk(
	'ticket/addTicketFeesStructure',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_AWS_URL}/feesStructure/createTicketFeesStructure`,
				val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
		}
	},
);

export const TicketTypes = createAsyncThunk(
	'ticket/TicketType',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_AWS_URL}/ticketType/listTicketType`, {
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
					'Content-Type': 'application/json',
				},
			});
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

export const GetTicketFace = createAsyncThunk(
	'ticket/GetTicketFace',
	async (val, { rejectWithValue }) => {
		try {
			if (val?.id) {
				const response = await axios.get(
					`${process.env.REACT_APP_AWS_URL}/ticketFace/listTicketFace/${val?.id}`,
					{
						headers: {
							Accept: 'application/json',
							Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
							'Content-Type': 'application/json',
						},
					},
				);
				if (response.status == 200 || response.status == 201) {
					const { data } = response;
					return data;
				}
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

export const addTicketFace = createAsyncThunk(
	'ticket/addTicketFace',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_AWS_URL}/ticketFace/createTicketFace`,
				val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
		}
	},
);



//Get Ticket General data

export const GetTicketGeneralData = createAsyncThunk(
	'ticket/GetTicketGeneralData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/ticket/listOneTicket/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

//Get Data for edit
export const GetTicketFeesData = createAsyncThunk(
	'ticket/GetTicketFeesData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/feesStructure/listTicketFeesStructure/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

// Get Redemption Data for edit

export const GetTicketRedemptionData = createAsyncThunk(
	'ticket/GetTicketRedemptionData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/redemption/listTicketRedemption/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

// Edit Ticket Geneeral Ticket
export const EditTicketGeneral = createAsyncThunk(
	'ticket/EditTicketGeneral',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_AWS_URL}/ticket/updateTicket/${val?.id}`,
				val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
		}
	},
);

// Edit Ticket Redemption
export const EditTicketRedemption = createAsyncThunk(
	'ticket/EditTicketRedemption',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_AWS_URL}/redemption/updateTicketRedemption/${val?.id}`,
				val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
		}
	},
);

//Edit Ticket Fees structure

export const EditTicketFees = createAsyncThunk(
	'ticket/EditTicketFees',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_AWS_URL}/feesStructure/updateTicketFeesStructure/${val?.id}`,
				val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
		}
	},
);

//Edit Ticket face

export const EditTicketFace = createAsyncThunk(
	'ticket/EditTicketFees',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_AWS_URL}/ticketFace/updateTicketFace/${val?.id}`,
				val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error);
		}
	},
);

//----------------------Assign-------------------------------------------------//

export const AssignTicketName = createAsyncThunk(
	'assign/AssignTicketName',
	async (val, { rejectWithValue }) => {
		try {
			if (val?.length > 0) {
				const response = await axios.get(
					`${process.env.REACT_APP_AWS_URL}/ticket/listTicketName`,
					{
						headers: {
							Accept: 'application/json',
							Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
							'Content-Type': 'application/json',
						},
					},
				);
				if (response.status == 200 || response.status == 201) {
					const { data } = response;
					return data;
				}
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

export const AssignEventName = createAsyncThunk(
	'assign/AssignEventName',
	async (val, { rejectWithValue }) => {
		try {
			
				const response = await axios.get(
					`${process.env.REACT_APP_AWS_URL}/event/listEventName`,
					{
						headers: {
							Accept: 'application/json',
							Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
							'Content-Type': 'application/json',
						},
					},
				);
				if (response.status == 200 || response.status == 201) {
					const { data } = response;
					return data;
				}
			
		} catch (error) {
			return rejectWithValue('');
		}
	},
);




export const AddAndEditAssign = createAsyncThunk(
	'assign/AddAndEditAssign',
	async (val, { rejectWithValue }) => {
		const { uniqueId, eventId, values, value, token } = val;

		const headers = {
			Accept: 'application/json',
			Authorization: `Bearer ${localStorage.getItem('Token') || token}`,
			'Content-Type': 'application/json',
		  }

		try {
			let response;
			if (uniqueId && eventId) {
				response = await axios.put(
				  `${process.env.REACT_APP_AWS_URL}/assignEventTicket/updateEventTicket/${eventId}/${uniqueId}`,
				  value,{headers});
			  } 
			else {
				response = await axios.post(
					`${process.env.REACT_APP_AWS_URL}/assignEventTicket/createEventTicket`,values,{headers}
				);
			  }
			if (response.status == 200 || response.status == 201) {
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);


export const getAssignedList = createAsyncThunk(
	'assign/getAssignedList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/assignEventTicket/listAllEventTicket?page=${val?.currentPage}&limit=${val?.perPage}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return [data?.findDetail,data?.totalPages];
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);


//Assign Single List data


export const getAssignSingle = createAsyncThunk(
	'assign/getAssignSingle',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/assignEventTicket/listEventTicketById/${val?.eventId}/${val?.uniqueId}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

export const getTemplateList = createAsyncThunk(
	'template/getTemplateList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/TicketTemplate/listTicketTemplateName`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

// select template, we get list of page homepage,buyticket page,sponsorship page

export const getTemplateId = createAsyncThunk(
	'template/getTemplateId',
	async (val, { rejectWithValue }) => {
		try {
			if(val?.selectValue){
				const response = await axios.get(
					`${process.env.REACT_APP_AWS_URL}/TicketTemplate/listTicketTemplateById/${val?.selectValue}`,
					{
						headers: {
							Accept: 'application/json',
							Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
							'Content-Type': 'application/json',
						},
					},
				);
				if (response.status == 200 || response.status == 201) {
					const { data } = response;
					return data;
				}
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

// update the status of pages to publish or publish


export const updatePublishStatus = createAsyncThunk(
	'template/updatePublishStatus',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_AWS_URL}/updateTicketTemplateStatus/${val?.id}/${val?.uid}`,
				{ status: val?.status },
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);



// Home Template data


export const homeData = createAsyncThunk(
	'pages/homeData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				// `https://d0a9-2401-4900-1ce3-b07d-a041-d5b0-4013-f91f.ngrok-free.app/updateHomePage/${val?.id}`,
				`${process.env.REACT_APP_AWS_URL}/homepage/updateHomePage/${val?.id}`,
				val?.formData,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);


export const HomeDataList = createAsyncThunk(
	'pages/homeDataList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/listHomePageByTemplatePageId/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json'
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data[0];
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

// Event Page data

export const AssignedEventLocation = createAsyncThunk('eventPage/eventPageLocationList', async (val, { rejectWithValue }) => {
	try {

			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/listEvent`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.findDetail;
			}
	} catch (error) {
		return rejectWithValue('');
	}
});

export const AssignedEventFilter= createAsyncThunk('eventPage/eventPageEventList', async (val, { rejectWithValue }) => {
	try {
		if(val?.LocationId){
			const response = await axios.get(
				`${process.env.REACT_APP_AWS_URL}/listByEventCategoryOrEventLocation?eventLocationId=${val?.LocationId}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if(response.status == 200 || response.status == 201) {
				
				const { data } = response;
				return data;
			}
		}
	} catch (error) {
		return rejectWithValue('');
	}
});
				// `${process.env.REACT_APP_AWS_URL}/updateEventPage/${val?.id}`,
				// val?.formData,
export const EventPageConfig = createAsyncThunk(
	'pages/eventData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
		 `${process.env.REACT_APP_AWS_URL}/eventpage/updateEventPage/${val?.id}`,
			val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

export const EventPageListTimeZone = createAsyncThunk(
	'pages/EventPageListTimeZone',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
		 `${process.env.REACT_APP_AWS_URL}/listTimeZone`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

export const getAssignedEvent= createAsyncThunk(
	'pages/getAssignedEvent',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
		 `${process.env.REACT_APP_AWS_URL}/assignEventTicket/listEventTicket`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);


export const EventPageDataList = createAsyncThunk(
	'pages/eventDataList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
		 `${process.env.REACT_APP_AWS_URL}/eventpage/listEvenPageByTemplatePageId/${val?.id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data[0]
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

export const TicketPageEventList = createAsyncThunk(
	'pages/ticketPageEventDataList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
		 `${process.env.REACT_APP_AWS_URL}/eventpage/listEvenPageAllDetails`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				
				const { data } = response;
				return data
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);


export const AssignTicketPageList = createAsyncThunk(
	'pages/AssignTicketPageList',
	async (val, { rejectWithValue }) => {
		try {
			if(val?.eventId){
				const response = await axios.get(
				
					`${process.env.REACT_APP_AWS_URL}/assignEventTicket/listEventTicketById/${val?.eventId}/,`,
					{
						headers: {
							Accept: 'application/json',
							Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
							'Content-Type': 'application/json',
						},
					},
				);
				if (response.status == 200 || response.status == 201) {
					const { data } = response;
					return data[0]?.tickets;
				}
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

export const TicketPageConfig = createAsyncThunk(
	'pages/ticketPageConfig',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
		 `${process.env.REACT_APP_AWS_URL}/ticketPage/updateTicketPage/${val?.id}`,
			val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error );
		}
	},
);


export const TicketPageDataList = createAsyncThunk(
	'pages/ticketPageDataList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
		 `${process.env.REACT_APP_AWS_URL}/ticketPage/listTicketPageByTemplatePageId/${val?.id}`,
		{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data[0]
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

export const websiteSetting = createAsyncThunk(
	'pages/websiteSetting',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
		 `${process.env.REACT_APP_AWS_URL}/updateSetting`,val?.value,
		   {
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

export const SponsorPageConfig = createAsyncThunk(
	'pages/SponsorPageConfig',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
		 `${process.env.REACT_APP_AWS_URL}/updateAdminSponsorPage/${val?.id}`,
			val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

export const SponsorPageData = createAsyncThunk(
	'pages/SponsorPageData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
		 `${process.env.REACT_APP_AWS_URL}/listAdminSponsorPageByTemplatePageId/${val?.id}`,
		{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data[0]
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

export const VendorPageConfig = createAsyncThunk(
	'pages/VendorPageConfig',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
		 `${process.env.REACT_APP_AWS_URL}/updateAdminVendorPage/${val?.id}`,
			val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

export const VendorPageData = createAsyncThunk(
	'pages/VendorPageData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
		 `${process.env.REACT_APP_AWS_URL}/listAdminVendorPageByTemplatePageId/${val?.id}`,
		{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data[0]
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);


export const AboutPageConfig = createAsyncThunk(
	'pages/AboutPageConfig',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
		 `${process.env.REACT_APP_AWS_URL}/aboutpage/updateAboutPage/${val?.id}`,
			val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);


export const AboutPageData = createAsyncThunk(
	'pages/AboutPageData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
		 `${process.env.REACT_APP_AWS_URL}/aboutpage/listAboutPageByTemplatePageId/${val?.id}`,
		{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
		},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data[0]
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

export const FestivPageConfig = createAsyncThunk(
	'pages/FestivPageConfig',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
		 `${process.env.REACT_APP_AWS_URL}/FestivalHoursPage/updateFestivalHoursPage/${val?.id}`,
			val?.values,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);


export const FestivPageData = createAsyncThunk(
	'pages/FestivPageData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
		 `${process.env.REACT_APP_AWS_URL}/FestivalHoursPage/listFestivalHoursPageByTemplatePageId/${val?.id}`,
		{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'multipart/form-data',
					},
		},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data[0]
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

export const SubscribeList = createAsyncThunk(
	'datalist/SubscribeList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
		 `${process.env.REACT_APP_AWS_URL}/listSubscribe`,
		{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
		},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);
export const UpdateSubscribeStatus = createAsyncThunk(
	'datalist/UpdateSubscribeStatus',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_AWS_URL}/updateSubscribeStatus/${val?.ids}`,
				{ status: val?.statusChanges },
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

export const SponsorData = createAsyncThunk(
	'datalist/SponsorData',
	async (val, { rejectWithValue }) => {
		try {

				let url = `${process.env.REACT_APP_AWS_URL}/listSponsor`;
				const params = {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
                        'Content-Type': 'application/json',
                    },
                };
				const queryParams = [];
				if(val?.currentPage && val?.perPage){
					queryParams.push(`?page=${val?.currentPage}&limit=${val?.perPage}`)
				}
				if(val?.Events ){
					queryParams.push(`event=[${val.Events}]`);
				}
				if(val?.date){
					queryParams.push(`date=${val.date}`);
				}
				if (queryParams.length > 0) {
					url += `?${queryParams.join('&')}`;
				}
				const response = await axios.get(url, params);
				if (response.status == 200 || response.status == 201) {
				const { data } = response;
				if(response?.data?.findDetail){
					return [data?.findDetail,data?.totalPages];
				}
				else{
					return [data]
				}
				}

		} catch (error) {
			return rejectWithValue('');
		}
	},
);


export const VendorData = createAsyncThunk(
	'datalist/VendorData',
	async (val, { rejectWithValue }) => {
		try {

				let url = `${process.env.REACT_APP_AWS_URL}/listVendor`;
				const params = {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
                        'Content-Type': 'application/json',
                    },
                };
				const queryParams = [];
				if(val?.currentPage && val?.perPage){
					queryParams.push(`?page=${val?.currentPage}&limit=${val?.perPage}`)
				}
				if(val?.Events ){
					queryParams.push(`event=[${val.Events}]`);
				}
				if(val?.date){
					queryParams.push(`date=${val.date}`);
				}
				if (queryParams.length > 0) {
					url += `?${queryParams.join('&')}`;
				}
				const response = await axios.get(url, params);
				if (response.status == 200 || response.status == 201) {
				const { data } = response;
				if(response?.data?.findDetail){
					return [data?.findDetail,data?.totalPages];
				}
				else{
					return [data]
				}
				}
	
		} catch (error) {
			return rejectWithValue('');
		}
	},
);


export const FilterList = createAsyncThunk(
	'report/filterList',
	async(apiParams,{rejectWithValue})=>{
		try{
			let url = `${process.env.REACT_APP_AWS_URL}/listFilter`;
		
			const params = {
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || apiParams?.token}`,
					'Content-Type': 'application/json',
				},
			};
			const queryParams = [];
			if (apiParams.CategroyId) {
				queryParams.push(`eventCategory=[${apiParams.CategroyId}]`);
			}
			if (apiParams.LocationId) {
				queryParams.push(`eventLocation=[${apiParams.LocationId}]`);
			}
			if (apiParams.TicketCategoryId) {
				queryParams.push(`ticketCategory=[${apiParams.TicketCategoryId}]`);
			}
			if (apiParams.EventNameId) {
				queryParams.push(`event=[${apiParams.EventNameId}]`);
			}
			if (apiParams.TicketNameId) {
				queryParams.push(`ticket=[${apiParams.TicketNameId}]`);
			}
			if (queryParams.length > 0) {
				url += `?${queryParams.join('&')}`;
			}
			const response = await axios.get(url, params);
				if (response.status == 200 || response.status == 201) {
					const { data } = response;
					return data;
				
			}
		}catch(error){
			return rejectWithValue('');
		}
	}
)









export const PurchaseReport = createAsyncThunk(
	'report/PurchaseReport',
	async (apiParams, { rejectWithValue }) => {
		try {
			

				let url = `${process.env.REACT_APP_AWS_URL}/report/listReportPurchaseTransaction`;
				const params = {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
                        'Content-Type': 'application/json',
                    },
                };
				const queryParams = [];
				if (apiParams.currentPage && apiParams.perPage) {
					queryParams.push(`page=${apiParams.currentPage}&limit=${apiParams.perPage}`);
				}
		
				if (apiParams.CategroyId?.length >0) {
					queryParams.push(`eventCategory=[${apiParams.CategroyId}]`);
				}
				if (apiParams.LocationId?.length >0) {
					queryParams.push(`eventLocation=[${apiParams.LocationId}]`);
				}
				if (apiParams.TicketCategoryId?.length >0) {
					queryParams.push(`ticketCategory=[${apiParams.TicketCategoryId}]`);
				}
				if (apiParams.EventNameId?.length >0) {
					queryParams.push(`event=[${apiParams.EventNameId}]`);
				}
				if (apiParams.TicketNameId?.length >0) {
					queryParams.push(`ticket=[${apiParams.TicketNameId}]`);
				}
				if (apiParams.EmailId) {
					queryParams.push(`email=${apiParams.EmailId}`);
				}
				if (apiParams.OrderId) {
					queryParams.push(`orderNumber=${apiParams.OrderId}`);
				}
				if (apiParams.date) {
					queryParams.push(`date=${apiParams.date}`);
				}
				if(apiParams.TicketTypeId?.length >0){
					queryParams.push(`ticketType=${apiParams.TicketTypeId}`);
				}
				if (queryParams.length > 0) {
					url += `?${queryParams.join('&')}`;
				}
				
				const response = await axios.get(url, params);
				if (response.status == 200 || response.status == 201) {
				const { data } = response;
				if(response?.data?.findDetail){
					return [data?.findDetail,data?.totalPages];
				}
				else{
					return [data]
				}
				}
	
		} catch (error) {
			return rejectWithValue('');
		}
	},
);






export const TicketSalesList= createAsyncThunk(
	'report/TicketSalesList',
	async (apiParams, { rejectWithValue }) => {
		try {
			
				let url = `${process.env.REACT_APP_AWS_URL}/listReportTicketSales`;
				const params = {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
                        'Content-Type': 'application/json',
                    },
                };
				const queryParams = [];
				if (apiParams.currentPage && apiParams.perPage) {
					queryParams.push(`page=${apiParams.currentPage}&limit=${apiParams.perPage}`);
				}
		
				if (apiParams.CategroyId?.length >0) {
					queryParams.push(`eventCategory=[${apiParams.CategroyId}]`);
				}
				if (apiParams.LocationId?.length >0) {
					queryParams.push(`eventLocation=[${apiParams.LocationId}]`);
				}
				if (apiParams.TicketCategoryId?.length >0) {
					queryParams.push(`ticketCategory=[${apiParams.TicketCategoryId}]`);
				}
				if (apiParams.EventNameId?.length >0) {
					queryParams.push(`event=[${apiParams.EventNameId}]`);
				}
				if (apiParams.TicketNameId?.length >0) {
					queryParams.push(`ticket=[${apiParams.TicketNameId}]`);
				}
				if (apiParams.date) {
					queryParams.push(`date=${apiParams.date}`);
				}
				if(apiParams.TicketTypeId?.length >0){
					queryParams.push(`ticketType=${apiParams.TicketTypeId}`);
				}
				if (queryParams.length > 0) {
					url += `?${queryParams.join('&')}`;
				}
				
				const response = await axios.get(url, params);
				if (response.status == 200 || response.status == 201) {
				const { data } = response;
				if(response?.data?.findDetail){
					return [data?.findDetail,data?.totalPages];
				}
				else{
					return [data]
				}
				}
	
		} catch (error) {
			return rejectWithValue('');
		}
	},
);


export const RedemptionReportList= createAsyncThunk(
	'report/RedemptionReportList',
	async (apiParams, { rejectWithValue }) => {
		try {
			
				let url = `${process.env.REACT_APP_AWS_URL}/listReportRedemption`;
				const params = {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
                        'Content-Type': 'application/json',
                    },
                };
				const queryParams = [];
				if (apiParams.currentPage && apiParams.perPage) {
					queryParams.push(`page=${apiParams.currentPage}&limit=${apiParams.perPage}`);
				}
				if (apiParams.CategroyId?.length >0) {
					queryParams.push(`eventCategory=[${apiParams.CategroyId}]`);
				}
				if (apiParams.LocationId?.length >0) {
					queryParams.push(`eventLocation=[${apiParams.LocationId}]`);
				}
				if (apiParams.TicketCategoryId?.length >0) {
					queryParams.push(`ticketCategory=[${apiParams.TicketCategoryId}]`);
				}
				if (apiParams.EventNameId?.length >0) {
					queryParams.push(`event=[${apiParams.EventNameId}]`);
				}
				if (apiParams.TicketNameId?.length >0) {
					queryParams.push(`ticket=[${apiParams.TicketNameId}]`);
				}
				if (apiParams.EmailId) {
					queryParams.push(`email=${apiParams.EmailId}`);
				}
				if (apiParams.OrderId) {
					queryParams.push(`orderNumber=${apiParams.OrderId}`);
				}
				if (apiParams.Purchasedate) {
					queryParams.push(`purchaseDate=${apiParams.Purchasedate}`);
				}
				if (apiParams.Redeemdate) {
					queryParams.push(`redemDate=${apiParams.Redeemdate}`);
				}
				if(apiParams.TicketTypeId?.length >0){
					queryParams.push(`ticketType=${apiParams.TicketTypeId}`);
				}
				if (queryParams.length > 0) {
					url += `?${queryParams.join('&')}`;
				}
				const response = await axios.get(url, params);
				if (response.status == 200 || response.status == 201) {
				const { data } = response;
				if(response?.data?.findDetail){
					return [data?.findDetail,data?.totalPages];
				}
				else{
					return [data]
				}
				}
	
		} catch (error) {
			return rejectWithValue('');
		}
	},
);


export const TicketFailedScanReportList= createAsyncThunk(
	'report/TicketFailedScanReportList',
	async (apiParams, { rejectWithValue }) => {
		try {
			
				let url = `${process.env.REACT_APP_AWS_URL}/listReportFailedScan`;
				const params = {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
                        'Content-Type': 'application/json',
                    },
                };
				const queryParams = [];
				if (apiParams.currentPage && apiParams.perPage) {
					queryParams.push(`page=${apiParams.currentPage}&limit=${apiParams.perPage}`);
				}
		
				if (apiParams.CategroyId?.length >0) {
					queryParams.push(`eventCategory=[${apiParams.CategroyId}]`);
				}
				if (apiParams.LocationId?.length >0) {
					queryParams.push(`eventLocation=[${apiParams.LocationId}]`);
				}
				if (apiParams.TicketCategoryId?.length >0) {
					queryParams.push(`ticketCategory=[${apiParams.TicketCategoryId}]`);
				}
				if (apiParams.EventNameId?.length >0) {
					queryParams.push(`event=[${apiParams.EventNameId}]`);
				}
				if (apiParams.TicketNameId?.length >0) {
					queryParams.push(`ticket=[${apiParams.TicketNameId}]`);
				}
				if (apiParams.EmailId) {
					queryParams.push(`email=${apiParams.EmailId}`);
				}
				if (apiParams.OrderId) {
					queryParams.push(`orderNumber=${apiParams.OrderId}`);
				}
				if (apiParams.Purchasedate) {
					queryParams.push(`purchaseDate=${apiParams.Purchasedate}`);
				}
				if (apiParams.Redeemdate) {
					queryParams.push(`redemDate=${apiParams.Redeemdate}`);
				}
				if (apiParams.Faileddate) {
					queryParams.push(`failedDate=${apiParams.Faileddate}`);
				}
				if(apiParams.TicketTypeId?.length >0){
					queryParams.push(`ticketType=${apiParams.TicketTypeId}`);
				}
				if (queryParams.length > 0) {
					url += `?${queryParams.join('&')}`;
				}
				
				const response = await axios.get(url, params);
				if (response.status == 200 || response.status == 201) {
				const { data } = response;
				if(response?.data?.findDetail){
					return [data?.findDetail,data?.totalPages];
				}
				else{
					return [data]
				}
				}
	
		} catch (error) {
			return rejectWithValue('');
		}
	},
);


//Report download

export const ReportDownload = createAsyncThunk(
	'report/ReportDownload',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
		 `${process.env.REACT_APP_AWS_URL}/excelApi?reportName=${val}`,
		{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					},
		},
			);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);


// Top Ticket sales


export const TopTicketSales = createAsyncThunk(
	'dashboard/TopTicketSales',
	async (apiParams, { rejectWithValue }) => {
		try {
			let url = `${process.env.REACT_APP_AWS_URL}/dashboard/listTopTicketSales`;
			const params = {
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || apiParams?.token}`,
					'Content-Type': 'application/json',
				},
			};
			const queryParams = [];

			if(apiParams?.date ){
				queryParams.push(`searchDate=${apiParams?.date}`)
			}
			if(apiParams?.SearchEvent?.length > 0 ){
				queryParams.push(`event=[${apiParams?.SearchEvent}]`)
			}
			if (queryParams.length > 0) {
				url += `?${queryParams.join('&')}`;
			}
			const response = await axios.get(url, params);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data
			}
			} 
		 catch (error) {
			return rejectWithValue('');
		}
	},
);



const ReduxSlice = createSlice({
	name: 'festiv',
	initialState: initialState,
	reducers: {
		addCategory: (state, action) => {
			state.CategoryList = action.payload.categoryData;
		},
		errorMessage: (state, action) => {
			state.error = action.payload.errors;
		},
		successMessage: (state, action) => {
			state.success = action.payload.successess;
		},
		loadingStatus: (state, action) => {
			state.Loading = action.payload.loadingStatus;
		},
		canvaBoolean: (state, action) => {
			state.canva = action.payload.canvas;
		},
		canvaData: (state, action) => {
			state.canvaList = action.payload.canvaDatas;
		},
		loginState: (state, action) => {
			state.login = action.payload.loginSet;
		},
		LoginToken: (state, action) => {
			state.token = action.payload.tokenremove;
		},
		tokenStore: (state, action) => {
			state.token = action.payload.tokenremove;
		},
		TicketIdClear: (state, action) => {
			state.TicketId = action.payload.TicketStatus;
		},
		EventFilter:(state,action)=>{
			state.EventFilterId = action.payload.EventId
		},
		TicketFilter:(state,action)=>{
			state.TicketFilterId =action.payload.TicketId
		},
		CategoryFilter:(state,action)=>{
			state.CategoryId = action.payload.CategoryFilterId
		},
		LocationFilter:(state,action)=>{
			state.LocationId=action.payload.LocationFilterId
		},
		TicketCatFilter:(state,action)=>{
			state.TicketCategoryId =action.payload.TicketCatFilterId
		},
	},
	extraReducers: (builder) => {
		builder

			// Login reducer

			.addCase(Userlogin.pending, (state) => {
				state.Loading = true;
				state.error = '';
			})
			.addCase(Userlogin.fulfilled, (state, action) => {
				(state.Loading = false), (state.login = true);
				(state.error = ''), 
				(state.success = action.payload[0]);
				state.token = action.payload[1];
			})
			.addCase(Userlogin.rejected, (state, action) => {
				(state.Loading = false), (state.login = false), (state.success = '');
				state.error = action.payload;
			})

			//Add category list

			.addCase(addCategoryList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addCategoryList.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(addCategoryList.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			// Category list reducer

			.addCase(getCategoryList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getCategoryList.fulfilled, (state, action) => {
					(state.Loading = false),
					(state.error = ''),
					(state.CategoryList = action.payload[0]),
					(state.totalCategoryPage = action.payload[1]);
			})
			.addCase(getCategoryList.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), 
				(state.createCategory = []);
			})

			//Get Category Name likst

			.addCase(getCategoryNameList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getCategoryNameList.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.CategoryNameList = action.payload);
			})
			.addCase(getCategoryNameList.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.CategoryNameList = []);
			})

			//delete category list

			.addCase(deleteCategoryList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(deleteCategoryList.fulfilled, (state, action) => {
				(state.Loading = false), (state.success = action.payload), (state.error = '');
			})
			.addCase(deleteCategoryList.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
			})

			// Location list reducer

			.addCase(getLocationList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getLocationList.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), 
				(state.LocationList = action.payload[0]),
				(state.totalLocationpage = action.payload[1]);
			})
			.addCase(getLocationList.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.LocationNameList = []);
			})

			// Get Location Name List

			.addCase(getLocationNameList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getLocationNameList.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.LocationNameList = action.payload);
			})
			.addCase(getLocationNameList.rejected, (state, action) => {
				(state.error = action.payload), (state.LocationNameList = false);
			})

			// State List reducer

			.addCase(statelist.pending, (state) => {
				state.Loading = true;
			})
			.addCase(statelist.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.stateLists = action.payload);
			})
			.addCase(statelist.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
			})

			// City List reducer

			.addCase(citylist.pending, (state) => {
				state.Loading = false;
			})
			.addCase(citylist.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.cityLists = action.payload);
			})
			.addCase(citylist.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
			})

			// Add & Edit location reducer

			.addCase(saveLocation.pending, (state) => {
				state.Loading = true;
			})
			.addCase(saveLocation.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(saveLocation.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})


			//Location Data

			.addCase(GetLocationId.pending, (state) => {
				state.Loading = true;
			})
			.addCase(GetLocationId.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.LocationData = action.payload);
			})
			.addCase(GetLocationId.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.LocationData = [];
			})

			// Delete Location

			.addCase(deleteLocationList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(deleteLocationList.fulfilled, (state, action) => {
				(state.Loading = false), (state.success = action.payload), (state.error = '');
			})
			.addCase(deleteLocationList.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
			})

			// Event Add reducer

			.addCase(addEvent.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addEvent.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(addEvent.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			// Assigned event category list

			.addCase(assignedCategoryNameList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(assignedCategoryNameList.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.AssignedCategoryList = action.payload);
			})
			.addCase(assignedCategoryNameList.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.AssignedCategoryList = []);
			})

			// Event list reducer

			.addCase(eventList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(eventList.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''),
				(state.EventList = action.payload[0] )
				state.TotalEventPage = action.payload[1];
			})
			.addCase(eventList.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.EventList = []);
			})

			//Event Edit list reducer

			.addCase(editEvent.pending, (state) => {
				state.Loading = true;
			})
			.addCase(editEvent.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(editEvent.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			//Edit event Data

			.addCase(editEventData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(editEventData.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.EditEventDatas = action.payload);
			})
			.addCase(editEventData.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.EditEventDatas = []);
			})

			//Delete Event List

			.addCase(deleteEventList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(deleteEventList.fulfilled, (state, action) => {
				(state.Loading = false), (state.success = action.payload), (state.error = '');
			})
			.addCase(deleteEventList.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
			})

			// EVENT STATUS CHANGE

			.addCase(statusChange.pending, (state) => {
				state.Loading = true;
			})
			.addCase(statusChange.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(statusChange.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			//Ticket Category added
			.addCase(addTicketCategory.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addTicketCategory.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(addTicketCategory.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			//Ticket Category List Reducer
			.addCase(getTicketCategoryList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getTicketCategoryList.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.TicketCategoryList = action.payload[0]),
					(state.totalTicketCategoryPage = action.payload[1]);
			})
			.addCase(getTicketCategoryList.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), 
				(state.TicketCategoryList = []),
				(state.totalTicketCategoryPage = '');
			})

			//Assigned Ticket Category List

			.addCase(AssignedTicketCategoryList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(AssignedTicketCategoryList.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.AssignTicketCategoryList = action.payload);
			})
			.addCase(AssignedTicketCategoryList.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.AssignTicketCategoryList = []);
			})
			//Delete Ticket Category list
			.addCase(deleteTicketCategoryList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(deleteTicketCategoryList.fulfilled, (state, action) => {
				(state.Loading = false), (state.success = action.payload), (state.error = '');
			})
			.addCase(deleteTicketCategoryList.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
			})

			//Ticket list reducer
			.addCase(getTicketDataLists.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getTicketDataLists.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), 
				(state.TicketLists = action.payload[0]);
				(state.totalTicketListPage = action.payload[1]);
			})
			.addCase(getTicketDataLists.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), 
				(state.TicketLists = []),
				(state.totalTicketListPage = '');
			})

			//Event by tickets

			// .addCase(getEventByTicket.pending, (state) => {
			// 	state.Loading = true;
			// })
			// .addCase(getEventByTicket.fulfilled, (state, action) => {
			// 	(state.Loading = false), (state.error = ''), (state.TicketLists = action.payload);
			// })
			// .addCase(getEventByTicket.rejected, (state, action) => {
			// 	state.error = action.payload;
			// 	(state.Loading = false), (state.TicketLists = []);
			// })



			// get Single Data Ticket Details

			.addCase(getTicketDetails.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getTicketDetails.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.TicketDetails = action.payload);
			})
			.addCase(getTicketDetails.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.TicketDetails = []);
			})

			//get Ticket Category Data List

			.addCase(GetTicketCategoryData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(GetTicketCategoryData.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.TicketCategoryData = action.payload);
			})
			.addCase(GetTicketCategoryData.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.TicketCategoryData = []);
			})

			// Get Ticket General Data

			.addCase(GetTicketGeneralData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(GetTicketGeneralData.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.TicketGeneralData = action.payload);
			})
			.addCase(GetTicketGeneralData.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.TicketGeneralData = []);
			})

			// Get TicketFees Data

			.addCase(GetTicketFeesData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(GetTicketFeesData.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.TicketFeesData = action.payload);
			})
			.addCase(GetTicketFeesData.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.TicketFeesData = []);
			})

			// Get Redemption Data

			.addCase(GetTicketRedemptionData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(GetTicketRedemptionData.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.TicketRedemptionData = action.payload);
			})
			.addCase(GetTicketRedemptionData.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.TicketRedemptionData = []);
			})

			//Delete ticket list

			.addCase(deleteTicketList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(deleteTicketList.fulfilled, (state, action) => {
				(state.Loading = false), (state.success = action.payload), (state.error = '');
			})
			.addCase(deleteTicketList.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
			})

			//Ticket Status change

			.addCase(TicketstatusChange.pending, (state) => {
				state.Loading = true;
			})
			.addCase(TicketstatusChange.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(TicketstatusChange.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			// Ticket general add

			.addCase(addTicketGeneral.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addTicketGeneral.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.success = action.payload[0]),
					(state.TicketId = action.payload[1]);
			})
			.addCase(addTicketGeneral.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			// Edit Ticket General
			.addCase(EditTicketGeneral.pending, (state) => {
				state.Loading = true;
			})
			.addCase(EditTicketGeneral.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(EditTicketGeneral.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			//Ticket Redemption add

			.addCase(addTicketRedemption.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addTicketRedemption.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(addTicketRedemption.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			//Edit Ticket Redemption

			.addCase(EditTicketRedemption.pending, (state) => {
				state.Loading = true;
			})
			.addCase(EditTicketRedemption.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(EditTicketRedemption.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			//Edit Fees structure

			.addCase(EditTicketFees.pending, (state) => {
				state.Loading = true;
			})
			.addCase(EditTicketFees.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(EditTicketFees.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})
			//Ticket type list

			.addCase(TicketTypes.pending, (state) => {
				state.Loading = true;
			})
			.addCase(TicketTypes.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.TicketType = action.payload);
			})
			.addCase(TicketTypes.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.TicketType = []);
			})

			// Add fees structure
			.addCase(addTicketFeesStructure.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addTicketFeesStructure.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(addTicketFeesStructure.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			//Get ticket Face data
			.addCase(GetTicketFace.pending, (state) => {
				state.Loading = true;
			})
			.addCase(GetTicketFace.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.TicketFaceData = action.payload);
			})
			.addCase(GetTicketFace.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.TicketFaceData = []);
			})

			// Post Ticekt face data
			.addCase(addTicketFace.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addTicketFace.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(addTicketFace.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			//--------------------------Assign---------------------//
			.addCase(AssignTicketName.pending, (state) => {
				state.Loading = true;
			})
			.addCase(AssignTicketName.fulfilled, (state, action) => {
				(state.Loading = false),
					(state.error = ''),
					(state.TicketNameList = action.payload);
			})
			.addCase(AssignTicketName.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.TicketNameList = []);
			})

			.addCase(AssignEventName.pending, (state) => {
				state.Loading = true;
			})
			.addCase(AssignEventName.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.EventNameList = action.payload);
			})
			.addCase(AssignEventName.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.EventNameList = []);
			})

			// .addCase(addAssign.pending, (state) => {
			// 	state.Loading = true;
			// })
			// .addCase(addAssign.fulfilled, (state, action) => {
			// 	(state.Loading = false), (state.error = ''), (state.success = action.payload);
			// })
			// .addCase(addAssign.rejected, (state, action) => {
			// 	(state.error = action.payload), (state.Loading = false);
			// 	state.success = '';
			// })

			// edit assign list

			.addCase(AddAndEditAssign.pending, (state) => {
				state.Loading = true;
			})
			.addCase(AddAndEditAssign.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(AddAndEditAssign.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			// get Assigned list
			.addCase(getAssignedList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getAssignedList.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), 
				(state.AssignLists = action.payload[0]),
				(state.totalAssignPage = action.payload[1]);
			})
			.addCase(getAssignedList.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.AssignLists = []);
			})

			//Assign Single data

			.addCase(getAssignSingle.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getAssignSingle.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.AssignData = action.payload);
			})
			.addCase(getAssignSingle.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.AssignData = '');
			})

			// Template List

			.addCase(getTemplateList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getTemplateList.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.TemplateList = action.payload);
			})
			.addCase(getTemplateList.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.TemplateList = '');
			})

			// Get Template Page Data

			.addCase(getTemplateId.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getTemplateId.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.TemplateData = action.payload);
			})
			.addCase(getTemplateId.rejected, (state, action) => {
				state.error = action.payload;
				(state.Loading = false), (state.TemplateData = '');
			})

			// template page status publish unpublish change

			.addCase(updatePublishStatus.pending, (state) => {
				state.Loading = true;
			})
			.addCase(updatePublishStatus.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(updatePublishStatus.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			// home data
			
			.addCase(homeData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(homeData.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(homeData.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})


			.addCase(HomeDataList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(HomeDataList.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.HomeDataAutoList = action.payload);
			})
			.addCase(HomeDataList.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.HomeDataAutoList = '';
			})
			//Event Assigned location list

			.addCase(AssignedEventLocation.pending, (state) => {
				state.Loading = true;
			})
			.addCase(AssignedEventLocation.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.AssignedLocationList = action.payload);
			})
			.addCase(AssignedEventLocation.rejected, (state, action) => {
				(state.error = action.payload),
				 (state.Loading = false);
				 state.AssignedLocationList = [];
			})

			//Event filter list

			.addCase(AssignedEventFilter.pending, (state) => {
				state.Loading = true;
			})
			.addCase(AssignedEventFilter.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.AssignedEventList = action.payload);
			})
			.addCase(AssignedEventFilter.rejected, (state, action) => {
				(state.error = action.payload),
				 (state.Loading = false);
				 state.AssignedEventList = [];
			})

			//Event config 

			.addCase(EventPageConfig.pending, (state) => {
				state.Loading = true;
			})
			.addCase(EventPageConfig.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.success = action.payload);
			})
			.addCase(EventPageConfig.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.success = '';
			})


			.addCase(getAssignedEvent.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getAssignedEvent.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.AssingedEventlist = action.payload);
			})
			.addCase(getAssignedEvent.rejected, (state, action) => {
				(state.error = action.payload),
				 (state.Loading = false);
				 state.AssingedEventlist = '';
			})


			.addCase(EventPageDataList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(EventPageDataList.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.EventTemplateData = action.payload);
			})
			.addCase(EventPageDataList.rejected, (state, action) => {
				(state.error = action.payload),
				 (state.Loading = false);
				 state.EventTemplateData = '';
			})

			
			.addCase(EventPageListTimeZone.pending, (state) => {
				state.Loading = true;
			})
			.addCase(EventPageListTimeZone.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.ListTimeZone = action.payload);
			})
			.addCase(EventPageListTimeZone.rejected, (state, action) => {
				(state.error = action.payload),
				 (state.Loading = false);
				 state.ListTimeZone = '';
			})

			.addCase(TicketPageEventList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(TicketPageEventList.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.TicketEventList = action.payload);
			})
			.addCase(TicketPageEventList.rejected, (state, action) => {
				(state.error = action.payload),
				 (state.Loading = false);
				 state.TicketEventList = '';
			})
			.addCase(AssignTicketPageList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(AssignTicketPageList.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.AssignedTicketList = action.payload);
			})
			.addCase(AssignTicketPageList.rejected, (state, action) => {
				(state.error = action.payload),
				 (state.Loading = false);
				 state.AssignedTicketList = '';
			})
			.addCase(TicketPageConfig.pending, (state) => {
				state.Loading = true;
			})
			.addCase(TicketPageConfig.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.success = action.payload);
			})
			.addCase(TicketPageConfig.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.success = '';
			})
			.addCase(TicketPageDataList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(TicketPageDataList.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.TicketTemplateData = action.payload);
			})
			.addCase(TicketPageDataList.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.TicketTemplateData = '';
			})
			.addCase(websiteSetting.pending, (state) => {
				state.Loading = true;
			})
			.addCase(websiteSetting.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.success = action.payload);
			})
			.addCase(websiteSetting.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.success = '';
			})

			// sponsore page

			.addCase(SponsorPageConfig.pending, (state) => {
				state.Loading = true;
			})
			.addCase(SponsorPageConfig.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.success = action.payload);
			})
			.addCase(SponsorPageConfig.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.success = '';
			})

			.addCase(SponsorPageData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(SponsorPageData.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.SponsorTemplateData = action.payload);
			})
			.addCase(SponsorPageData.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.SponsorTemplateData = '';
			})

			// Vendor page

			.addCase(VendorPageConfig.pending, (state) => {
				state.Loading = true;
			})
			.addCase(VendorPageConfig.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.success = action.payload);
			})
			.addCase(VendorPageConfig.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.success = '';
			})

			.addCase(VendorPageData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(VendorPageData.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.VendorTemplateData = action.payload);
			})
			.addCase(VendorPageData.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.VendorTemplateData = '';
			})

			//About Page

			.addCase(AboutPageConfig.pending, (state) => {
				state.Loading = true;
			})
			.addCase(AboutPageConfig.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.success = action.payload);
			})
			.addCase(AboutPageConfig.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.success = '';
			})

			.addCase(AboutPageData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(AboutPageData.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.AboutTemplateData = action.payload);
			})
			.addCase(AboutPageData.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.AboutTemplateData = '';
			})


			// FestivalHours 

			.addCase(FestivPageConfig.pending, (state) => {
				state.Loading = true;
			})
			.addCase(FestivPageConfig.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.success = action.payload);
			})
			.addCase(FestivPageConfig.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.success = '';
			})

			.addCase(FestivPageData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(FestivPageData.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.FestivTemplateData = action.payload);
			})
			.addCase(FestivPageData.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.FestivTemplateData = '';
			})

			// subscription List

			.addCase(SubscribeList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(SubscribeList.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.SubscriptionList = action.payload);
			})
			.addCase(SubscribeList.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.SubscriptionList = '';
			})

			.addCase(UpdateSubscribeStatus.pending, (state) => {
				state.Loading = true;
			})
			.addCase(UpdateSubscribeStatus.fulfilled, (state, action) => {
				(state.Loading = false), (state.error = ''), (state.success = action.payload);
			})
			.addCase(UpdateSubscribeStatus.rejected, (state, action) => {
				(state.error = action.payload), (state.Loading = false);
				state.success = '';
			})

			//sponsor data
			.addCase(SponsorData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(SponsorData.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.SponsorList = action.payload[0]),
				(state.totalSponsorPage = action.payload[1]);
			})
			.addCase(SponsorData.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.SponsorList = '';
			})

			.addCase(VendorData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(VendorData.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.VendorList = action.payload[0]),
				(state.totalVendorPage = action.payload[1]);
			})
			.addCase(VendorData.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.VendorList = '';
			})

			// Report Reducer 

			//Filter List

			.addCase(FilterList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(FilterList.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.FilterDataList = action.payload);
			})
			.addCase(FilterList.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.FilterDataList = '';
			})







			// purchase Transcation

			.addCase(PurchaseReport.pending, (state) => {
				state.Loading = true;
			})
			.addCase(PurchaseReport.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.PurchaseReportList = action.payload[0]),
				(state.totalPurchasePage = action.payload[1]);
			})
			.addCase(PurchaseReport.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.PurchaseReportList = [];
			})

			// Sales Report

			.addCase(TicketSalesList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(TicketSalesList.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.TicketSalesReportList = action.payload[0]),
				(state.totalSalesPage = action.payload[1]);
			})
			.addCase(TicketSalesList.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.TicketSalesReportList = [];
			})

			//Redemption Report
			.addCase(RedemptionReportList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(RedemptionReportList.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.TicketRedemptionReportList = action.payload[0]),
				(state.totalRedemptionPage = action.payload[1]);
			})
			.addCase(RedemptionReportList.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.TicketRedemptionReportList = [];
			})

			// Failed Scan 

			.addCase(TicketFailedScanReportList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(TicketFailedScanReportList.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.FailedReportList = action.payload[0]),
				(state.totalFailedScanPage = action.payload[1]);
			})
			.addCase(TicketFailedScanReportList.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.FailedReportList = [];
			})

			//Report Download 

			.addCase(ReportDownload.pending, (state) => {
				state.Loading = true;
			})
			.addCase(ReportDownload.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.DownloadReport = action.payload);
			})
			.addCase(ReportDownload.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.DownloadReport = [];
			})





			//Dashboard API 

			.addCase(TopTicketSales.pending, (state) => {
				state.Loading = true;
			})
			.addCase(TopTicketSales.fulfilled, (state, action) => {
				(state.Loading = false), 
				(state.error = ''), 
				(state.TopTicketList = action.payload);
			})
			.addCase(TopTicketSales.rejected, (state, action) => {
				(state.error = action.payload), 
				(state.Loading = false);
				state.TopTicketList = [];
			})
	},
});

export const {
	TicketIdClear,
	addCategory,
	errorMessage,
	successMessage,
	loadingStatus,
	canvaBoolean,
	canvaData,
	login,
	loginState,
	LoginToken,
	EventFilter,
	TicketFilter,
	CategoryFilter,
	LocationFilter,
	TicketCatFilter
} = ReduxSlice.actions;
export default ReduxSlice.reducer;

