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
	canvaList: [],
	CategoryList: [],
	LocationList: [],
	stateLists:[],
	cityLists:[],
	EditLocation: [],
};




const Token = localStorage.getItem('Token');


const option = {
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${Token || initialState.token}`,
		'Content-Type': 'application/json',
	},
};

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
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_LIVE_URL}/listEventCategory`,
				option,
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
	},
	extraReducers: (builder) => {
		builder
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
			});
	},
});

export const { addCategory, errorMessage, successMessage, loadingStatus, canvaBoolean, canvaData } =
	ReduxSlice.actions;
export default ReduxSlice.reducer;
