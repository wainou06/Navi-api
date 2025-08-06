import { createAsyncThunk, createSlice, isAction } from '@reduxjs/toolkit'
import { checkAuthStatus, deleteKeyword, getKeyword, loginUser, logoutuser, postKeyword, putKeyword, registerUser } from '../API/api'

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
      const response = await logoutuser()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

export const postKeywordThunk = createAsyncThunk('keyword/postKeyword', async (name, { rejectWithValue }) => {
   try {
      const response = await postKeyword(name)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

export const getKeywordThunk = createAsyncThunk('keyword/getKeyword', async (_, { rejectWithValue }) => {
   try {
      const response = await getKeyword()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

export const putKeywordThunk = createAsyncThunk('keyword/putKeyword', async (data, { rejectWithValue }) => {
   try {
      const { id, name } = data
      const response = await putKeyword(id, name)

      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

export const deleteKeywordThunk = createAsyncThunk('keyword/deleteKeyword', async (data, { rejectWithValue }) => {
   try {
      const id = data
      const response = await deleteKeyword(id)

      return response.data
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
      keywords: [],
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
            state.loading = false
            state.user = action.payload
            state.isAuthenticated = true
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(logoutUserThunk.pending, (state, action) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutUserThunk.fulfilled, (state) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
         })
         .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user || null
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.isAuthenticated = false
            state.user = null
         })

      builder
         .addCase(postKeywordThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(postKeywordThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(postKeywordThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(getKeywordThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getKeywordThunk.fulfilled, (state, action) => {
            state.loading = false
            state.keywords = action.payload
         })
         .addCase(getKeywordThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(putKeywordThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(putKeywordThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(putKeywordThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deleteKeywordThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteKeywordThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deleteKeywordThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})
export const { clearAuthError } = slice.actions
export default slice.reducer
