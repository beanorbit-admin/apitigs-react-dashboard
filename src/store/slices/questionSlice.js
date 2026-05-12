import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as svc from '../../services/assessmentService'

export const fetchQuestionsThunk = createAsyncThunk('questions/fetchAll', async (params, { rejectWithValue }) => {
  try { return await svc.fetchQuestions(params) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const fetchQuestionThunk = createAsyncThunk('questions/fetchOne', async (id, { rejectWithValue }) => {
  try { return await svc.fetchQuestion(id) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const createQuestionThunk = createAsyncThunk('questions/create', async (data, { rejectWithValue }) => {
  try { return await svc.createQuestion(data) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const updateQuestionThunk = createAsyncThunk('questions/update', async ({ id, data }, { rejectWithValue }) => {
  try { return await svc.updateQuestion(id, data) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const deleteQuestionThunk = createAsyncThunk('questions/delete', async (id, { rejectWithValue }) => {
  try { await svc.deleteQuestion(id); return id } catch (e) { return rejectWithValue(e.response?.data) }
})

const questionSlice = createSlice({
  name: 'questions',
  initialState: { list: [], selected: null, totalCount: 0, loading: false, error: null },
  reducers: {
    setQuestions: (state, action) => { state.list = action.payload },
    addQuestion: (state, action) => { state.list.push(action.payload) },
    updateQuestion: (state, action) => {
      const idx = state.list.findIndex(q => q.id === action.payload.id)
      if (idx !== -1) state.list[idx] = action.payload
    },
    deleteQuestion: (state, action) => { state.list = state.list.filter(q => q.id !== action.payload) },
    setSelected: (state, action) => { state.selected = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsThunk.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchQuestionsThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.list = payload.results ?? payload
        state.totalCount = payload.count ?? state.list.length
      })
      .addCase(fetchQuestionsThunk.rejected, (state, { payload }) => { state.loading = false; state.error = payload })
      .addCase(fetchQuestionThunk.fulfilled, (state, { payload }) => { state.selected = payload })
      .addCase(createQuestionThunk.fulfilled, (state, { payload }) => { state.list.push(payload) })
      .addCase(updateQuestionThunk.fulfilled, (state, { payload }) => {
        const idx = state.list.findIndex(q => q.id === payload.id)
        if (idx !== -1) state.list[idx] = payload
        if (state.selected?.id === payload.id) state.selected = payload
      })
      .addCase(deleteQuestionThunk.fulfilled, (state, { payload: id }) => {
        state.list = state.list.filter(q => q.id !== id)
      })
  },
})

export const { setQuestions, addQuestion, updateQuestion, deleteQuestion, setSelected } = questionSlice.actions
export default questionSlice.reducer
