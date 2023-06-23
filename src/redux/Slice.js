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
	canvaList: [],
	CategoryList: [],
	LocationList: [],
	stateLists:[],
	cityLists:[],
	EditLocation: [],
	LocationData:[],
	EventList:[],
	EditEventDatas:[],
	TicketCategoryList:[],
	TicketLists:[],
	TicketId:localStorage.getItem("ticketId"),
	TicketDetails:[],
	TicketType:[],
	TicketFaceData:[],
	TicketFeesData:[],
	TicketRedemptionData:[],
	EventNameList:[],
	TicketNameList:[],
	AssignLists:[],
	AssignData:''
};



const Token =  localStorage.getItem('Token');

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
				
				const tokenExpiration = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
				localStorage.setItem('Token', data?.token);
				localStorage.setItem('tokenExpiration', tokenExpiration);
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
			if(val?.perPage && val?.currentPage){
				const response = await axios.get(
					`${process.env.REACT_APP_LIVE_URL}/listEventCategory?page=${val?.currentPage}&limit=${val?.perPage}`,
					{headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					}},
				);
				if (response.status == 200) {
					const { data } = response;
					return data;
				}
			}
			// else{
				// const response = await axios.get(
				// 	`${process.env.REACT_APP_LIVE_URL}/listEventCategory`,{
				// 		headers: {
				// 			Accept: 'application/json',
				// 			Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				// 			'Content-Type': 'application/json',
				// 		},
				// 	}
				// );
				// if (response.status == 200) {
				// 	const { data } = response;
				// 	return data;
				// }
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
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

// Delete Category list

export const deleteCategoryList = createAsyncThunk(
	'category/deleteCategoryList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_LIVE_URL}/deleteEventCategory/${val?.id}`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				}},
			);
			if (response.status == 200) {
				console.log(response);
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);



// GET LOCATION LIST LINK

export const getLocationList = createAsyncThunk(
	'location/getLocationList',
	async (val, { rejectWithValue }) => {
		try {
			if(val?.perPage && val?.currentPage){
				const response = await axios.get(
					`${process.env.REACT_APP_LIVE_URL}/listEventLocation?page=${val?.currentPage}&limit=${val?.perPage}`,
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
			// else{
				// const response = await axios.get(
				// 	`${process.env.REACT_APP_LIVE_URL}/listEventLocation`,
				// 	{headers: {
				// 		Accept: 'application/json',
				// 		Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				// 		'Content-Type': 'application/json',
				// 	}},
				// );
				// if (response.status == 200) {
				// 	const  {data}  = response;
				// 	return data;
				// }
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
		            const data = response?.data?.message
		            return data
		        }
		    }
		    catch(error){
		        return rejectWithValue(error?.response?.data?.message)
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
				const  data  = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

export const GetLocationId= createAsyncThunk(
	'location/GetLocationId',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listLocationById/${val.id}`,

				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				}},
				);
			if (response.status == 200 || response.status == 201) {
				const  {data}  = response;
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
		console.log(val?.id, val?.token);
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_LIVE_URL}/deleteEventLocation/${val?.id}`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				}},
			);
			if (response.status == 200) {
				console.log(response);
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
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
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
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
				const data = response?.data?.message;
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);

//Delete Event list

export const deleteEventList = createAsyncThunk(
	'event/deleteEventList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_LIVE_URL}/deleteEvent/${val?.id}`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				}},
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





// EVENT LIST LINK

export const eventList = createAsyncThunk(
	'event/eventList',
	async (val, { rejectWithValue }) => {
		try {
			// const response = await axios.get(
			// 	`${process.env.REACT_APP_LIVE_URL}/listEvent`,
			// 	{headers: {
			// 		Accept: 'application/json',
			// 		Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
			// 		'Content-Type': 'application/json',
			// 	}},
			// 	);
			// if (response.status == 200 || response.status == 201) {
			// 	const  {data}  = response
			// 	return data;
			// }
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listEvent?page=${val?.currentPage}&limit=${val?.perPage}`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
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

//Edit Event Data

export const editEventData = createAsyncThunk(
	'event/editEventData',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listEventById/${val?.id}`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
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
				`${process.env.REACT_APP_LIVE_URL}/updateEventStatus/${val?.ids}`,{"status":val?.statusChanges},
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
					'Content-Type': 'application/json',
				}},
				);
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
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_LIVE_URL}/createTicketCategory`,
				val?.values,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				}},
			);
			if (response.status == 200) {
				const data = 'Ticket Category Added Successfully';
				return data;
			}
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message);
		}
	},
);


// GET CATEGORY LIST LINK

export const getTicketCategoryList = createAsyncThunk(
	'ticket/getTicketCategoryList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listTicketCategory?page=${val?.currentPage}&limit=${val?.perPage}`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
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

// Delete TicketCategory 

export const deleteTicketCategoryList = createAsyncThunk(
	'ticket/deleteTicketCategoryList',
	async (val, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_LIVE_URL}/deleteTicketCategory/${val?.id}`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				}},
			);
			if (response.status == 200) {
				console.log(response);
				const data = response?.data?.message;
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
			console.log(val?.currentPage,val?.perPage);
			if(val?.currentPage && val?.perPage){
				const response = await axios.get(`${process.env.REACT_APP_LIVE_URL}/listAllTicket?page=${val?.currentPage}&limit=${val?.perPage}`,
				{headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					}},
					)
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


// Get Ticket Single Details 

export const getTicketDetails = createAsyncThunk(
	'ticket/getTicketDetails',
	async (val, { rejectWithValue }) => {
		try {

			const response = await axios.get(`${process.env.REACT_APP_LIVE_URL}/listOneTicketDetail/${val?.id}`,
				{headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
						'Content-Type': 'application/json',
					}},
					)
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
			console.log(val?.id,val?.token);
			const response = await axios.delete(
				`${process.env.REACT_APP_LIVE_URL}/deleteTicket/${val?.id}`,
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				}},
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
				`${process.env.REACT_APP_LIVE_URL}/updateTicketStatus/${val?.ids}`,{"status":val?.statusChanges},
				{headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
					'Content-Type': 'application/json',
				}},
				
				);
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
			const response = await axios.post(`${process.env.REACT_APP_LIVE_URL}/createTicket`,val?.dataToSend,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				console.log(response);

				const  data = [response.data?.message,response?.data?.newTicket?._id] 
				const ticketId = response?.data?.newTicket?._id
				localStorage.setItem("ticketId",ticketId)
				return data;
			}
		}catch (error){
			return rejectWithValue('General Ticket Not Added');
		}
	}
)

export const addTicketRedemption= createAsyncThunk(
	'ticket/addTicketRedemption',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.post(`${process.env.REACT_APP_LIVE_URL}/createTicketRedemption`,val?.values,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  data = response?.data?.message
				return data;
			}
		}catch (error){
			return rejectWithValue('Redemption  Not Added');
		}
	}
)

export const addTicketFeesStructure= createAsyncThunk(
	'ticket/addTicketFeesStructure',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.post(`${process.env.REACT_APP_LIVE_URL}/createTicketFeesStructure`,val?.values,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  data = response?.data?.message;
				return data;
			}
		}catch (error){
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)

export const TicketTypes= createAsyncThunk(
	'ticket/TicketType',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.get(`${process.env.REACT_APP_LIVE_URL}/listTicketType`,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  {data} = response
				return data;
			}
		}catch (error){
			return rejectWithValue('');
		}
	}
)

export const GetTicketFace= createAsyncThunk(
	'ticket/GetTicketFace',
	async(val,{rejectWithValue})=>{
		try{
			if(val?.id){
				const response = await axios.get(`${process.env.REACT_APP_LIVE_URL}/listTicketFace/${val?.id}`,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  {data} = response
				return data;
			}
			}
			// if(val?.id){
			// 	const response = await axios.get(`${process.env.REACT_APP_LIVE_URL}/listTicketFace/${val?.id}`,
			// {headers: {
			// 	Accept: 'application/json',
			// 	Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
			// 	'Content-Type': 'application/json',
			// }},
			// )
			// if (response.status == 200 || response.status == 201) {
			// 	const  {data} = response
			// 	return data;
			// }
			// }
		}catch (error){
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)

export const addTicketFace= createAsyncThunk(
	'ticket/addTicketFace',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.post(`${process.env.REACT_APP_LIVE_URL}/createTicketFace`,val?.values,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  data = response?.data?.message;
				return data;
			}
		}catch (error){
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)

//Get Data for edit 
export const GetTicketFeesData= createAsyncThunk(
	'ticket/GetTicketFeesData',
	async(val,{rejectWithValue})=>{
		try{
				const response = await axios.get(`${process.env.REACT_APP_LIVE_URL}/listTicketFeesStructure/${val?.id}`,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  {data} = response
				return data;
			}
		}catch (error){
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)


// Get Redemption Data for edit

export const GetTicketRedemptionData= createAsyncThunk(
	'ticket/GetTicketRedemptionData',
	async(val,{rejectWithValue})=>{
		try{
				const response = await axios.get(`${process.env.REACT_APP_LIVE_URL}/listTicketRedemption/${val?.id}`,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  {data} = response
				return data;
			}
		}catch (error){
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)



// Edit Ticket Geneeral Ticket
export const EditTicketGeneral = createAsyncThunk(
	'ticket/EditTicketGeneral',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.put(`${process.env.REACT_APP_LIVE_URL}/updateTicket/${val?.id}`,val?.value,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				console.log(response);

				const  data = response?.data?.message
				return data;
			}
		}catch (error){
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)

// Edit Ticket Redemption
export const EditTicketRedemption = createAsyncThunk(
	'ticket/EditTicketRedemption',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.put(`${process.env.REACT_APP_LIVE_URL}/updateTicketRedemption/${val?.id}`,val?.values,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				console.log(response);

				const  data = response?.data?.message
				return data;
			}
		}catch (error){
			console.log(error);
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)



//Edit Ticket Fees structure

export const EditTicketFees = createAsyncThunk(
	'ticket/EditTicketFees',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.put(`${process.env.REACT_APP_LIVE_URL}/updateTicketFeesStructure/${val?.id}`,val?.values,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				console.log(response);

				const  data = response?.data?.message
				return data;
			}
		}catch (error){
			console.log(error);
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)

//Edit Ticket face

export const EditTicketFace = createAsyncThunk(
	'ticket/EditTicketFees',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.put(`${process.env.REACT_APP_LIVE_URL}/updateTicketFace/${val?.id}`,val?.values,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				console.log(response);

				const  data = response?.data?.message
				return data;
			}
		}catch (error){
			console.log(error);
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)

//----------------------Assign-------------------------------------------------//

export const AssignTicketName= createAsyncThunk(
	'assign/AssignTicketName',
	async(val,{rejectWithValue})=>{
		try{
			if(val?.length>0)
			{
				const response = await axios.get(`${process.env.REACT_APP_LIVE_URL}/listTicketName`,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  {data} = response
				return data;
			}
			}
		}catch (error){
			return rejectWithValue('');
		}
	}
)

export const AssignEventName= createAsyncThunk(
	'assign/AssignEventName',
	async(val,{rejectWithValue})=>{
		try{
			if(val?.length>0)
			{
				const response = await axios.get(`${process.env.REACT_APP_LIVE_URL}/listEventName`,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  {data} = response
				return data;
			}
			}
		}catch (error){
			return rejectWithValue('');
		}
	}
)


export const addAssign= createAsyncThunk(
	'assign/addAssign',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.post(`${process.env.REACT_APP_LIVE_URL}/createEventTicket`,val?.values,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  data = response?.data?.message;
				return data;
			}
		}catch (error){
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)

// Put assign event ticket

export const EditAssign= createAsyncThunk(
	'assign/EditAssign',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.put(`${process.env.REACT_APP_LIVE_URL}/updateEventTicket/${val?.eventId}/${val?.uniqueId}`,val?.values,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  data = response?.data?.message;
				return data;
			}
		}catch (error){
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)

export const getAssignedList= createAsyncThunk(
	'assign/getAssignedList',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.get(`${process.env.REACT_APP_LIVE_URL}/listAllEventTicket`,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  {data} = response;
				return data;
			}
		}catch (error){
			return rejectWithValue(error?.response?.data?.message);
		}
	}
)


//Assign Single List data

export const getAssignSingle= createAsyncThunk(
	'assign/getAssignSingle',
	async(val,{rejectWithValue})=>{
		try{
			const response = await axios.get(`${process.env.REACT_APP_LIVE_URL}/listEventTicketById/${val?.eventId}/${val?.uniqueId}`,
			{headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('Token') || val?.token}`,
				'Content-Type': 'application/json',
			}},
			)
			if (response.status == 200 || response.status == 201) {
				const  {data} = response;
				return data;
			}
		}catch (error){
			return rejectWithValue(error?.response?.data?.message);
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
		},
		TicketIdClear:(state,action)=>{
			state.TicketId = action.payload.TicketStatus
		}
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

			//delete category list

			.addCase(deleteCategoryList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(deleteCategoryList.fulfilled, (state, action) => {
				state.Loading = false, 
				state.success = action.payload,
				state.error = '';
			})
			.addCase(deleteCategoryList.rejected, (state, action) => {
				state.error = action.payload,
				state.Loading = false; 
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
			

			//Location Data

			.addCase(GetLocationId.pending, (state) => {
				state.Loading = true;
			})
			.addCase(GetLocationId.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.LocationData = action.payload;
			})
			.addCase(GetLocationId.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.LocationData = [];
			})


				// Delete Location 

				.addCase(deleteLocationList.pending, (state) => {
					state.Loading = true;
				})
				.addCase(deleteLocationList.fulfilled, (state, action) => {
					state.Loading = false, 
					state.success = action.payload,
					state.error = '';
				})
				.addCase(deleteLocationList.rejected, (state, action) => {
					state.error = action.payload,
					state.Loading = false; 
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


			//Edit event Data

			.addCase(editEventData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(editEventData.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				 state.EditEventDatas = action.payload;
			})
			.addCase(editEventData.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.EditEventDatas = [];
			})

			//Delete Event List 

			.addCase(deleteEventList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(deleteEventList.fulfilled, (state, action) => {
				state.Loading = false, 
				state.success = action.payload,
				state.error = '';
			})
			.addCase(deleteEventList.rejected, (state, action) => {
				state.error = action.payload,
				state.Loading = false; 
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


			//Delete Ticket Category list
			.addCase(deleteTicketCategoryList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(deleteTicketCategoryList.fulfilled, (state, action) => {
				state.Loading = false, 
				state.success = action.payload,
				state.error = '';
			})
			.addCase(deleteTicketCategoryList.rejected, (state, action) => {
				state.error = action.payload,
				state.Loading = false; 
			})


			//Ticket list reducer
			.addCase(getTicketDataLists.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getTicketDataLists.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				state.TicketLists = action.payload;
			})
			.addCase(getTicketDataLists.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.TicketLists = [];
			})


			// get Single Data Ticket Details

			.addCase(getTicketDetails.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getTicketDetails.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				state.TicketDetails = action.payload;
			})
			.addCase(getTicketDetails.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.TicketDetails = [];
			})



			// Get TicketFees Data

			.addCase(GetTicketFeesData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(GetTicketFeesData.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				state.TicketFeesData = action.payload;
			})
			.addCase(GetTicketFeesData.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.TicketFeesData = [];
			})


			// Get Redemption Data

			.addCase(GetTicketRedemptionData.pending, (state) => {
				state.Loading = true;
			})
			.addCase(GetTicketRedemptionData.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				state.TicketRedemptionData = action.payload;
			})
			.addCase(GetTicketRedemptionData.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.TicketRedemptionData = [];
			})

			//Delete ticket list

			.addCase(deleteTicketList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(deleteTicketList.fulfilled, (state, action) => {
				state.Loading = false, 
				state.success = action.payload,
				state.error = '';
			})
			.addCase(deleteTicketList.rejected, (state, action) => {
				state.error = action.payload,
				state.Loading = false; 
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
				state.success = action.payload[0],
				state.TicketId=action.payload[1]
			})
			.addCase(addTicketGeneral.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})

			// Edit Ticket General 
			.addCase(EditTicketGeneral.pending, (state) => {
				state.Loading = true;
			})
			.addCase(EditTicketGeneral.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload
			})
			.addCase(EditTicketGeneral.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false
				state.success = ''
			})

			//Ticket Redemption add

			.addCase(addTicketRedemption.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addTicketRedemption.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(addTicketRedemption.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})


			//Edit Ticket Redemption

			.addCase(EditTicketRedemption.pending, (state) => {
				state.Loading = true;
			})
			.addCase(EditTicketRedemption.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload
			})
			.addCase(EditTicketRedemption.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false
				state.success = ''
			})


			//Edit Fees structure

			.addCase(EditTicketFees.pending, (state) => {
				state.Loading = true;
			})
			.addCase(EditTicketFees.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload
			})
			.addCase(EditTicketFees.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false
				state.success = ''
			})
			//Ticket type list

			.addCase(TicketTypes.pending, (state) => {
				state.Loading = true;
			})
			.addCase(TicketTypes.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				state.TicketType = action.payload;
			})
			.addCase(TicketTypes.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.TicketType = [];
			})

			// Add fees structure
			.addCase(addTicketFeesStructure.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addTicketFeesStructure.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(addTicketFeesStructure.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})

			//Get ticket Face data
			.addCase(GetTicketFace.pending, (state) => {
				state.Loading = true;
			})
			.addCase(GetTicketFace.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				 state.TicketFaceData = action.payload;
			})
			.addCase(GetTicketFace.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.TicketFaceData = [];
			})

			// Post Ticekt face data
			.addCase(addTicketFace.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addTicketFace.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(addTicketFace.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})




			//--------------------------Assign---------------------//
			.addCase(AssignTicketName.pending, (state) => {
				state.Loading = true;
			})
			.addCase(AssignTicketName.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				state.TicketNameList = action.payload;
			})
			.addCase(AssignTicketName.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.TicketNameList = [];
			})

			.addCase(AssignEventName.pending, (state) => {
				state.Loading = true;
			})
			.addCase(AssignEventName.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				state.EventNameList = action.payload;
			})
			.addCase(AssignEventName.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.EventNameList = [];
			})

			.addCase(addAssign.pending, (state) => {
				state.Loading = true;
			})
			.addCase(addAssign.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(addAssign.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})
			

			// edit assign list
			
			.addCase(EditAssign.pending, (state) => {
				state.Loading = true;
			})
			.addCase(EditAssign.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '', 
				state.success = action.payload;
			})
			.addCase(EditAssign.rejected, (state, action) => {
				state.error = action.payload, 
				state.Loading = false;
				state.success = '';
			})




			// get Assigned list
			.addCase(getAssignedList.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getAssignedList.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				state.AssignLists = action.payload;
			})
			.addCase(getAssignedList.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.AssignLists = [];
			})

			//Assign Single data

			.addCase(getAssignSingle.pending, (state) => {
				state.Loading = true;
			})
			.addCase(getAssignSingle.fulfilled, (state, action) => {
				state.Loading = false, 
				state.error = '',
				state.AssignData = action.payload;
			})
			.addCase(getAssignSingle.rejected, (state, action) => {
				state.error = action.payload;
				state.Loading = false, 
				state.AssignData = '';
			})
	},
});

export const { TicketIdClear,addCategory, errorMessage, successMessage, loadingStatus, canvaBoolean, canvaData,login,loginState,LoginToken } =
	ReduxSlice.actions;
export default ReduxSlice.reducer;
//statusCheckMark