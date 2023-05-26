import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';




const initialState ={
        status:false,
        login:'',
        token:'',
        Loading:false,
        error:'',
        success:'',
        CategoryList:[],
        LocationList:[],
        EditLocation:[]
       
}
const Token = localStorage.getItem('Token')
const option = {
   headers:{
    'Accept': 'application/json',
    'Authorization':`Bearer ${Token}`,
    'Content-Type': 'application/json'
   }
}

export const Userlogin = createAsyncThunk(
    'login/userlogin',
    async(values,{rejectWithValue})=>{
       try{
         const options = {
					headers: {
						"device":"web",
					}
				}
          const response=await axios.post(`${process.env.REACT_APP_LIVE_URL}/loginuser`,values,options)
            if(response.statusText == "OK" && response.status == 200){
                const {data} = response
                localStorage.setItem('token',data?.token)
                return data?.message
          
            }
       }catch(error){
        const {response}=error
        return rejectWithValue(response?.data?.message)
       }
    }
)



export const getCategoryList = createAsyncThunk(
    "category/getcategoryList",
    async(_,{rejectWithValue})=>{
   try{
    const response=await axios.get(`${process.env.REACT_APP_LIVE_URL}/listEventCategory`,option)
            if(response.statusText == "OK" && response.status == 200){
                const {data} = response
                return data
            }
   }catch(error){
    return rejectWithValue("No Category List")
   }
}
)
export const addCategoryList = createAsyncThunk(
    "category/addcategoryList",
    async(category,{rejectWithValue})=>{
      try{
        const response =await axios.post(`${process.env.REACT_APP_LIVE_URL}/createEventCategory`,category,option)
        if(response.statusText && response.status == 200){
            const data = "Category Added Successfully"
            return data
        }
      }catch(error){
        return rejectWithValue('Category Not Addedd')
      }
    }
)

export const getLocationList = createAsyncThunk(
    "location/getLocationList",
    async(_,{rejectWithValue})=>{
        try{            
    const response=await axios.get(`${process.env.REACT_APP_LIVE_URL}/listEventLocation`,option)
            if(response.statusText == "OK" && response.status == 200){
               
                const {data} = response
                console.log(data);
                return data
            }
        }
        catch(error){
            return rejectWithValue('No Location List')
        }
    }
)

export const addLocationList = createAsyncThunk(
    "location/addLocationList",
    async(val,loc,{rejectWithValue})=>{
        console.log(val,loc);
    //     try{            
    // const response=await axios.get(`${process.env.REACT_APP_LIVE_URL}/createEventLocation`,{val,loc},option)
    //         if(response.statusText == "OK" && response.status == 200){
    //            console.log(response);
    //             // const {data} = response
    //             // return data
    //         }
    //     }
    //     catch(error){
    //         return rejectWithValue('No Location List')
    //     }
    }
)

export const getLocationId = createAsyncThunk(
    "location/getLocationId",
    async(id,{rejectWithValue})=>{
        try{            
    const response=await axios.get(`${process.env.REACT_APP_LIVE_URL}/updateEventLocation/${id}`,option)
            if(response.statusText == "OK" && response.status == 200){
               
                const {data} = response
                console.log(data);
                return data
            }
        }
        catch(error){
            return rejectWithValue('No Location Data')
        }
    }
)


const ReduxSlice = createSlice({
    name:'festiv',
    initialState:initialState,
    reducers:{
        addCategory:(state,action)=>{
            state.CategoryList = action.payload.categoryData
        },
        errorMessage:(state,action)=>{
          state.error = action.payload.errors
        },
        successMessage:(state,action)=>{
            state.success =action.payload.successess
        },
        loadingStatus:(state,action)=>{
            state.Loading =action.payload.loadingStatus
        }
    },
    extraReducers:(builder)=>{
    builder
        .addCase(Userlogin.pending,(state)=>{
            state.Loading=true
        })
        .addCase(Userlogin.fulfilled,(state,action)=>{
            state.Loading =false,
            state.error ='',
            state.success= action.payload
            state.status = true
        })
        .addCase(Userlogin.rejected,(state,action)=>{
            state.error = action.payload
            state.Loading = false,
            state.login=''
            state.status = false
            localStorage.removeItem("token")
        })
        .addCase(addCategoryList.pending,(state)=>{
            state.Loading=true
        })
        .addCase(addCategoryList.fulfilled,(state,action)=>{
            state.Loading =false,
            state.error ='',
            state.success = action.payload
        })
        .addCase(addCategoryList.rejected,(state,action)=>{
            state.error = action.payload,
            state.Loading = false
            state.success = ''
        })
        .addCase(getCategoryList.pending,(state)=>{
            state.Loading=true
        })
        .addCase(getCategoryList.fulfilled,(state,action)=>{
            state.Loading =false,
            state.error ='',
            state.CategoryList = action.payload
        })
        .addCase(getCategoryList.rejected,(state,action)=>{
            state.error = action.payload
            state.Loading = false,
            state.createCategory=[]
        })
        .addCase(getLocationList.pending,(state)=>{
            state.Loading=true
        })
        .addCase(getLocationList.fulfilled,(state,action)=>{
            state.Loading =false,
            state.error ='',
            state.LocationList = action.payload
        })
        .addCase(getLocationList.rejected,(state,action)=>{
            state.error = action.payload,
            state.Loading = false
        })
        .addCase(getLocationId.pending,(state)=>{
            state.Loading=true
        })
        .addCase(getLocationId.fulfilled,(state,action)=>{
            state.Loading =false,
            state.error ='',
            state.EditLocation = action.payload
        })
        .addCase(getLocationId.rejected,(state,action)=>{
            state.error = action.payload,
            state.Loading = false
            state.EditLocation=[]
        })
    }
})

export const {addCategory,errorMessage,successMessage,loadingStatus} = ReduxSlice.actions
export default ReduxSlice.reducer