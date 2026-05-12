import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as svc from '../../services/studentService'

export const fetchStudentsThunk = createAsyncThunk('students/fetchAll', async (params, { rejectWithValue }) => {
  try { return await svc.fetchStudents(params) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const fetchStudentThunk = createAsyncThunk('students/fetchOne', async (id, { rejectWithValue }) => {
  try { return await svc.fetchStudent(id) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const createStudentThunk = createAsyncThunk('students/create', async (data, { rejectWithValue }) => {
  try { return await svc.createStudent(data) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const updateStudentThunk = createAsyncThunk('students/update', async ({ id, data }, { rejectWithValue }) => {
  try { return await svc.updateStudent(id, data) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const deleteStudentThunk = createAsyncThunk('students/delete', async (id, { rejectWithValue }) => {
  try { await svc.deleteStudent(id); return id } catch (e) { return rejectWithValue(e.response?.data) }
})

const studentSlice = createSlice({
  name: 'students',
  initialState: { list: [], selected: null, totalCount: 0, loading: false, error: null },
  reducers: {
    setStudents: (state, action) => { state.list = action.payload },
    addStudent: (state, action) => { state.list.push(action.payload) },
    updateStudent: (state, action) => {
      const idx = state.list.findIndex(s => s.id === action.payload.id)
      if (idx !== -1) state.list[idx] = action.payload
    },
    deleteStudent: (state, action) => { state.list = state.list.filter(s => s.id !== action.payload) },
    setSelected: (state, action) => { state.selected = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsThunk.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchStudentsThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.list = payload.results ?? payload
        state.totalCount = payload.count ?? (payload.results ? payload.count : state.list.length)
      })
      .addCase(fetchStudentsThunk.rejected, (state, { payload }) => { state.loading = false; state.error = payload })
      .addCase(fetchStudentThunk.fulfilled, (state, { payload }) => { state.selected = payload })
      .addCase(createStudentThunk.fulfilled, (state, { payload }) => { state.list.push(payload) })
      .addCase(updateStudentThunk.fulfilled, (state, { payload }) => {
        const idx = state.list.findIndex(s => s.id === payload.id)
        if (idx !== -1) state.list[idx] = payload
        if (state.selected?.id === payload.id) state.selected = payload
      })
      .addCase(deleteStudentThunk.fulfilled, (state, { payload: id }) => {
        state.list = state.list.filter(s => s.id !== id)
      })
  },
})

export const { setStudents, addStudent, updateStudent, deleteStudent, setSelected } = studentSlice.actions
export default studentSlice.reducer
