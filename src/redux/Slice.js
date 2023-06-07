import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthContext from '../contexts/authContext';
import { useContext } from 'react';

const initialState = {
	login: false,
	token: '',
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
	TicketList:[]
};




const Token = localStorage.getItem('Token');


const option = {
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${Token }`,
		'Content-Type': 'application/json',
	},
};
const OptionFile = {
	headers: {
		'Content-Type': 'multipart/form-data',
		Authorization: `Bearer ${Token }`,
	},
}

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

export const getCategoryList = createAsyncThunk(
	'category/getcategoryList',
	async (val, { rejectWithValue }) => {
		try {
			if(val?.perPage && val?.currentPage){
				const response = await axios.get(
					`${process.env.REACT_APP_LIVE_URL}/listEventCategory?page=${val?.currentPage}&limit=${val?.perPage}`,
					option,
				);
				if (response.status == 200) {
					const { data } = response;
					return data;
				}
			}else{
				const response = await axios.get(
					`${process.env.REACT_APP_LIVE_URL}/listEventCategory`,
					option,
				);
				if (response.status == 200) {
					const { data } = response;
					return data;
				}
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

export const addCategoryList = createAsyncThunk(
	'category/addcategoryList',
	async (category, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_LIVE_URL}/createEventCategory`,
				category,
				option,
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

export const getLocationList = createAsyncThunk(
	'location/getLocationList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listEventLocation`,
				option,
			);
			if (response.status == 200) {
				const  {data}  = response;
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

export const statelist = createAsyncThunk(
	'location/stateList',
	async(_,{rejectWithValue})=>{
		try{
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/stateList`,
				option,
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
export const citylist = createAsyncThunk(
	'location/citylist',
	async(val,{rejectWithValue})=>{
	if(val.length>0){
		try{
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/stateAndCityList?state=${val}`,
				option,
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

export const addLocationList = createAsyncThunk(
	'location/addLocationList',
	async (val, { rejectWithValue }) => {
		    try{
		const response=await axios.post(`${process.env.REACT_APP_LIVE_URL}/createEventLocation`,val,option)
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

export const editLocationId = createAsyncThunk(
	'location/editLocationId',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_LIVE_URL}/updateEventLocation/${val.id}`,val?.values,option);
			if (response.status == 200 || response.status == 201) {
				const  data  = "Event Location updated Successfully";
				return data;
			}
		} catch (error) {
			return rejectWithValue('Location Not Updated,Please try once again....');
		}
	},
);

export const addEvent = createAsyncThunk(
	'event/addevent',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_LIVE_URL}/createEvent`,
				val,
				OptionFile,
			);
			if (response.status == 200 || response.status == 201) {
				const data = 'Event Added Successfully';
				return data;
			}
		} catch (error) {
			return rejectWithValue('Event Not Added');
		}
	},
);

export const editEvent = createAsyncThunk(
	'event/editevent',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_LIVE_URL}/updateEvent/${val?.id}`,
				val?.formData,
				OptionFile,
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

export const eventList = createAsyncThunk(
	'event/eventList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listEvent`,option);
			if (response.status == 200 || response.status == 201) {
				const  {data}  = response
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

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

export const getTicketCategoryList = createAsyncThunk(
	'ticket/getTicketList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listTicketCategory`,
				option,
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

export const getTicketLists = createAsyncThunk(
	'ticket/getTicketLists',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listTicket`,option);
			if (response.status == 200 || response.status == 201) {
				const  {data}  = response
				return data;
			}
		} catch (error) {
			return rejectWithValue('');
		}
	},
);

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
		// statusCheckMark:(state,action)=>{
		// 	state.status= action.payload.statusChecks
		// }
	},
	extraReducers: (builder) => {
		builder

		// Login reducer
			.addCase(Userlogin.pending, (state) => {
				state.Loading = true;
			})
			.addCase(Userlogin.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.login = true;
				state.success = action.payload[0];
				state.token = localStorage.getItem('Token')
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
				state.TicketList = action.payload;
			})
			.addCase(getTicketLists.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.TicketList = [];
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

export const { addCategory, errorMessage, successMessage, loadingStatus, canvaBoolean, canvaData } =
	ReduxSlice.actions;
export default ReduxSlice.reducer;
//statusCheckMark