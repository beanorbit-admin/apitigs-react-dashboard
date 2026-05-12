import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login as loginApi, getMe } from '../../services/authService'

export const loginThunk = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await loginApi(email, password)
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Invalid credentials')
  }
})

export const fetchMeThunk = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    return await getMe()
  } catch (err) {
    return rejectWithValue(err.response?.data)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('aptigs_token') || null,
    role: localStorage.getItem('aptigs_role') || null,
    loading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.role = action.payload.role
      localStorage.setItem('aptigs_token', action.payload.token)
      localStorage.setItem('aptigs_role', action.payload.role)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.role = null
      localStorage.removeItem('aptigs_token')
      localStorage.removeItem('aptigs_refresh')
      localStorage.removeItem('aptigs_role')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => { state.loading = true; state.error = null })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.token = payload.access
        state.role = payload.role
        state.user = { email: payload.email }
        localStorage.setItem('aptigs_token', payload.access)
        localStorage.setItem('aptigs_refresh', payload.refresh)
        localStorage.setItem('aptigs_role', payload.role)
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(fetchMeThunk.fulfilled, (state, { payload }) => {
        state.user = payload
        state.role = payload.role
      })
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
