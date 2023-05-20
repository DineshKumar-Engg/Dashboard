import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';




const initialState ={
        CategoryList:[],
        createCategory:[],
        Loading:false,
        error:''
}



export const getCategoryList = createAsyncThunk(
    "category/getcategoryList",
    async(_,{rejectWithValue})=>{
    const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/category`)
    console.log(response);
            if(response.statusText == "OK" && response.status == 200){
                const {data} = response
                return data
            }
            else{
            return rejectWithValue({err:'No Category List'})
            }
            

    }

)

export const addCategoryList = createAsyncThunk(
    "category/addcategoryList",
    async(category,{rejectWithValue})=>{
        const response =await axios.post(`${process.env.REACT_APP_BASE_URL}/createcategory`,{
            body:category
        })
        if(response.statusText && response.status == 200){
            const {data} = await response
            return data
        }else{
            return rejectWithValue({error:'Not Added Category List'})
        }
    }
)

const ReduxSlice = createSlice({
    name:'festiv',
    initialState:initialState,
    reducers:{
        addCategory:(state,action)=>{
            state.CategoryList = action.payload.categoryData
        }
    },
    extraReducers:(builder)=>{
    builder
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
        .addCase(addCategoryList.pending,(state)=>{
            state.Loading=true
        })
        .addCase(addCategoryList.fulfilled,(state,action)=>{
            state.Loading =false,
            state.error ='',
            state.createCategory.push(action.payload)
        })
        .addCase(addCategoryList.rejected,(state,action)=>{
            state.error = action.payload,
            state.Loading = false
        })
    }
})

export const {addCategory} = ReduxSlice.actions
export default ReduxSlice.reducer