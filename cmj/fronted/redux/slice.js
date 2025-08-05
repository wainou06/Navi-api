import { createAsyncThunk, createSlice, isAction } from '@reduxjs/toolkit'
import { loginUser, registerUser } from '../API/api'

export const registerUserThunk = createAsyncThunk('slice/registerUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await registerUser(userData)
      return response.data.user
   } catch (error) {
      console.log(error)
      return rejectWithValue(error.response?.data.message)
   }
})

export const loginUserThunk = createAsyncThunk('slice/loginUser', async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(credentials)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

export const logoutUserThunk = createAsyncThunk('slice/logoutUser', async (_, { rejectWithValue }) => {
   try {
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const slice = createSlice({
   name: 'slice',
   initialState: {
      user: null,
      isAuthenticated: false,
      loading: true,
      error: null,
   },
   reducers: {
      clearAuthError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(registerUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(loginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginUserThunk.fulfilled, (state, action) => {
            console.log('검문')
            state.loading = false
            state.user = action.payload
            state.isAuthenticated = true
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
   },
})
export const { clearAuthError } = slice.actions
export default slice.reducer
