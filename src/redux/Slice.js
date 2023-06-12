import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';


const initialState = {
	login: !!localStorage.getItem('Token'),
	token: localStorage.getItem('Token') || null,
	Loading: false,
	error: '',
	success: '',
	canva: false,
	// status:false,
	canvaList: [],
	CategoryList: [],
	LocationList: [],
	stateLists:[],
	cityLists:[],
	EditLocation: [],
	EventList:[],
	TicketCategoryList:[],
	TicketLists:[]
};



const Token =  localStorage.getItem('Token');

console.log("redux",Token);
// option for all content type JSON
const option = {
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${Token }`,
		'Content-Type': 'application/json',
	},
};

// Option for image or file multipart
const OptionFile = {
	headers: {
		'Content-Type': 'multipart/form-data',
		Authorization: `Bearer ${Token }`,
	},
}


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
				`${process.env.REACT_APP_LIVE_URL}/loginuser`,
				values,
				options,
			);
			if (response.status === 200) {
				const { data } = response;
				localStorage.setItem('Token', data?.token);
				return [data?.message,data?.token];
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
			// if(val?.perPage && val?.currentPage){
			// 	const response = await axios.get(
			// 		`${process.env.REACT_APP_LIVE_URL}/listEventCategory?page=${val?.currentPage}&limit=${val?.perPage}`,
			// 		{headers: {
			// 			Accept: 'application/json',
			// 			Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
			// 			'Content-Type': 'application/json',
			// 		}},
			// 	);
			// 	if (response.status == 200) {
			// 		const { data } = response;
			// 		return data;
			// 	}
			// }
			// else{
				const response = await axios.get(
					`${process.env.REACT_APP_LIVE_URL}/listEventCategory`,{
						headers: {
							Accept: 'application/json',
							Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
							'Content-Type': 'application/json',
						},
					}
				);
				if (response.status == 200) {
					const { data } = response;
					return data;
				}
			// }
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
				`${process.env.REACT_APP_LIVE_URL}/createEventCategory`,
				val?.values,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				}},
			);
			if (response.status == 200) {
				const data = 'Category Added Successfully';
				return data;
			}
		} catch (error) {
			return rejectWithValue('Category Not Added');
		}
	},
);

// GET LOCATION LIST LINK

export const getLocationList = createAsyncThunk(
	'location/getLocationList',
	async (val, { rejectWithValue }) => {
		try {
			// if(val?.perPage && val?.currentPage){
			// 	const response = await axios.get(
			// 		`${process.env.REACT_APP_LIVE_URL}/listEventLocation?page=${val?.currentPage}&limit=${val?.perPage}`,
			// 		{headers: {
			// 			Accept: 'application/json',
			// 			Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
			// 			'Content-Type': 'application/json',
			// 		}},
			// 	);
			// 	if (response.status == 200) {
			// 		const  {data}  = response;
			// 		return data;
			// 	}
			// }
			// else{
				const response = await axios.get(
					`${process.env.REACT_APP_LIVE_URL}/listEventLocation`,
					{headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					}},
				);
				if (response.status == 200) {
					const  {data}  = response;
					return data;
				}
			// }
			
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

// INSIDE LOCATION CREATE,EDIT STATE LIST 

export const statelist = createAsyncThunk(
	'location/stateList',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/stateList`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				}},
			);
			if (response.status == 200) {
				const  {data}  = response;
				return data;
			}
		}
		catch(error){
			return rejectWithValue('');
		}
	}
)

// INSIDE LOCATION CREATE,EDIT CITY LIST

export const citylist = createAsyncThunk(
	'location/citylist',
	async(val,{rejectWithValue})=>{
	if(val.length>0){

		try{
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/stateAndCityList?state=${val}`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token')}`,
					'Content-Type': 'application/json',
				}},
			);
			if (response.status == 200) {
				const  {data}  = response;
				return data;
			}
		}
		catch(error){
			return rejectWithValue('');
		}
	}
	}
)

// ADD LOCATION LINK

export const addLocationList = createAsyncThunk(
	'location/addLocationList',
	async (val, { rejectWithValue }) => {
		    try{
		const response=await axios.post(`${process.env.REACT_APP_LIVE_URL}/createEventLocation`,
		val?.values,
		{headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
			'Content-Type': 'application/json',
		}},
		)
		        if(response.status == 200 || response.status == 201){
		           console.log(response);
		            const data = "Event Location Added Successfully"
		            return data
		        }
		    }
		    catch(error){
		        return rejectWithValue('Location Not Added,Please try once again....')
		    }
	},
);


//EDIT LOCATION LINK

export const editLocationId = createAsyncThunk(
	'location/editLocationId',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_LIVE_URL}/updateEventLocation/${val.id}`,
				val?.values,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				}},
				);
			if (response.status == 200 || response.status == 201) {
				const  data  = "Event Location updated Successfully";
				return data;
			}
		} catch (error) {
			return rejectWithValue('Location Not Updated,Please try once again....');
		}
	},
);


//ADD EVENT LINK

export const addEvent = createAsyncThunk(
	'event/addevent',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_LIVE_URL}/createEvent`,
				val?.formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					}
				},
			);
			if (response.status == 200 || response.status == 201) {
				const data = 'Event Added Successfully';
				return data;
			}
		} catch (error) {
			return rejectWithValue('Event not added.Please try again...');
		}
	},
);

//EDIT EVENT LINK

export const editEvent = createAsyncThunk(
	'event/editevent',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_LIVE_URL}/updateEvent/${val?.id}`,
				val?.formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					}
				},
			);
			if (response.status == 200) {
				const data = 'Event updated Successfully';
				return data;
			}
		} catch (error) {
			return rejectWithValue('Event not updated');
		}
	},
);

// EVENT LIST LINK

export const eventList = createAsyncThunk(
	'event/eventList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listEvent`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
					'Content-Type': 'application/json',
				}},
				);
			if (response.status == 200 || response.status == 201) {
				const  {data}  = response
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
				`${process.env.REACT_APP_LIVE_URL}/updateEventStatus/${val?.ids}`,{"status":val?.statusChanges},option);
			if (response.status == 200 || response.status == 201) {
				const  {data}  = response
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
	async (category, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_LIVE_URL}/createTicketCategory`,
				category,
				option,
			);
			if (response.status == 200) {
				const data = 'Ticket Category Added Successfully';
				return data;
			}
		} catch (error) {
			return rejectWithValue('Ticket Category Not Added');
		}
	},
);


// GET CATEGORY LIST LINK

export const getTicketCategoryList = createAsyncThunk(
	'ticket/getTicketList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listTicketCategory`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') ||val}`,
					'Content-Type': 'application/json',
				}},
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


// GET TICKET LIST

export const getTicketLists = createAsyncThunk(
	'ticket/getTicketLists',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listAllTicket`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
					'Content-Type': 'application/json',
				}},
			);
			console.log(response);
			if (response.status == 200 || response.status == 201) {
				const { data } = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

// Ticket status change

export const TicketstatusChange = createAsyncThunk(
	'ticket/ticketstatusChange',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_LIVE_URL}/updateTicketStatus/${val?.ids}`,{"status":val?.statusChanges},option);
			if (response.status == 200 || response.status == 201) {
				const  {data}  = response
				return data?.message;
			}
		} catch (error) {
			return rejectWithValue('Ticket Status Not Updatded');
		}
	},
);

// ADD TICKET GENERAL

export const addTicketGeneral = createAsyncThunk(
	'ticket/addGeneralTicket',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.post(`${process.env.REACT_APP_LIVE_URL}/createTicket`,val,option)
			if (response.status == 200 || response.status == 201) {
				const  data = "General Ticket Added Successfully"
				return data;
			}
		}catch (error){
			return rejectWithValue('General Ticket Not Added');
		}
	}
)



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
		loginState:(state,action)=>{
			state.login=action.payload.loginSet
		},
		LoginToken:(state,action)=>{
			state.token=action.payload.tokenremove
		},
		tokenStore:(state,action)=>{
			state.token=action.payload.tokenremove
		}
		// statusCheckMark:(state,action)=>{
		// 	state.status= action.payload.statusChecks
		// }
	},
	extraReducers: (builder) => {
		builder

		// Login reducer

			.addCase(Userlogin.pending, (state) => {
				state.Loading = true;
				state.error=''
			})
			.addCase(Userlogin.fulfilled, (state, action) => {
				state.Loading = false, 
				state.login = true;
				state.error = '', 
				state.success = action.payload[0];
				state.token = action.payload[1];

			})
			.addCase(Userlogin.rejected, (state, action) => {
				state.Loading = false, 
				state.login = false, 
				state.success = '';
				state.error = action.payload;
				localStorage.removeItem('Token');
			})

			//Add category list 

			.addCase(addCategoryList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addCategoryList.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(addCategoryList.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})

			// Category list reducer

			.addCase(getCategoryList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getCategoryList.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				 state.CategoryList = action.payload;
			})
			.addCase(getCategoryList.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.createCategory = [];
			})

			// Location list reducer

			.addCase(getLocationList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getLocationList.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.LocationList = action.payload;
			})
			.addCase(getLocationList.rejected, (state, action) => {
				state.error = action.payload,
				 state.Loading = false;
			})

			// State List reducer

			.addCase(statelist.pending, (state) => {
				state.Loading = true;
			})
			.addCase(statelist.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.stateLists = action.payload;
			})
			.addCase(statelist.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
			})

			// City List reducer

			.addCase(citylist.pending, (state) => {
				state.Loading = false;
			})
			.addCase(citylist.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.cityLists= action.payload;
			})
			.addCase(citylist.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
			})

			// Add location reducer

			.addCase(addLocationList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addLocationList.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(addLocationList.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})

			// Edit Location reducer 

			.addCase(editLocationId.pending, (state) => {
				state.Loading = true;
			})
			.addCase(editLocationId.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(editLocationId.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})

			// Event Add reducer

			.addCase(addEvent.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addEvent.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(addEvent.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})

            // Event list reducer 

			.addCase(eventList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(eventList.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				 state.EventList = action.payload;
			})
			.addCase(eventList.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.EventList = [];
			})

			//Event Edit list reducer 
			
			.addCase(editEvent.pending, (state) => {
				state.Loading = true;
			})
			.addCase(editEvent.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(editEvent.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})


               // EVENT STATUS CHANGE 

			.addCase(statusChange.pending, (state) => {
				state.Loading = true;
			})
			.addCase(statusChange.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(statusChange.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})


			//Ticket Category added
			.addCase(addTicketCategory.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addTicketCategory.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(addTicketCategory.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})


			//Ticket Category List Reducer
			.addCase(getTicketCategoryList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getTicketCategoryList.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				 state.TicketCategoryList= action.payload;
			})
			.addCase(getTicketCategoryList.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.TicketCategoryList = [];
			})


			//Ticket list reducer
			.addCase(getTicketLists.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getTicketLists.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				state.TicketLists = action.payload;
			})
			.addCase(getTicketLists.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.TicketLists = [];
			})

			//Ticket Status change 

			.addCase(TicketstatusChange.pending, (state) => {
				state.Loading = true;
			})
			.addCase(TicketstatusChange.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(TicketstatusChange.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})

			// Ticket general add

			.addCase(addTicketGeneral.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addTicketGeneral.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(addTicketGeneral.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})
	},
});

export const { addCategory, errorMessage, successMessage, loadingStatus, canvaBoolean, canvaData,login,loginState,LoginToken } =
	ReduxSlice.actions;
export default ReduxSlice.reducer;
//statusCheckMark