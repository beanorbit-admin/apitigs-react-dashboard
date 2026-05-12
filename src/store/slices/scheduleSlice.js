import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as svc from '../../services/scheduleService'

export const fetchCourseSchedulesThunk = createAsyncThunk('schedule/fetchCourseSchedules', async (params, { rejectWithValue }) => {
  try { return await svc.fetchCourseSchedules(params) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const createCourseScheduleThunk = createAsyncThunk('schedule/createCourseSchedule', async (data, { rejectWithValue }) => {
  try { return await svc.createCourseSchedule(data) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const updateCourseScheduleThunk = createAsyncThunk('schedule/updateCourseSchedule', async ({ id, data }, { rejectWithValue }) => {
  try { return await svc.updateCourseSchedule(id, data) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const deleteCourseScheduleThunk = createAsyncThunk('schedule/deleteCourseSchedule', async (id, { rejectWithValue }) => {
  try { await svc.deleteCourseSchedule(id); return id } catch (e) { return rejectWithValue(e.response?.data) }
})

export const fetchEventsThunk = createAsyncThunk('schedule/fetchEvents', async (params, { rejectWithValue }) => {
  try { return await svc.fetchEvents(params) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const createEventThunk = createAsyncThunk('schedule/createEvent', async (data, { rejectWithValue }) => {
  try { return await svc.createEvent(data) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const updateEventThunk = createAsyncThunk('schedule/updateEvent', async ({ id, data }, { rejectWithValue }) => {
  try { return await svc.updateEvent(id, data) } catch (e) { return rejectWithValue(e.response?.data) }
})

export const deleteEventThunk = createAsyncThunk('schedule/deleteEvent', async (id, { rejectWithValue }) => {
  try { await svc.deleteEvent(id); return id } catch (e) { return rejectWithValue(e.response?.data) }
})

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: { courseSchedules: [], events: [], selectedSchedule: null, loading: false, error: null },
  reducers: {
    setCourseSchedules: (state, { payload }) => { state.courseSchedules = payload },
    addCourseSchedule: (state, { payload }) => { state.courseSchedules.push(payload) },
    updateCourseSchedule: (state, { payload }) => {
      const idx = state.courseSchedules.findIndex(s => s.id === payload.id)
      if (idx !== -1) state.courseSchedules[idx] = payload
    },
    deleteCourseSchedule: (state, { payload: id }) => {
      state.courseSchedules = state.courseSchedules.filter(s => s.id !== id)
      if (state.selectedSchedule?.id === id) state.selectedSchedule = null
    },
    setSelectedSchedule: (state, { payload }) => { state.selectedSchedule = payload },
    setEvents: (state, { payload }) => { state.events = payload },
    addEvent: (state, { payload }) => { state.events.push(payload) },
    updateEvent: (state, { payload }) => {
      const idx = state.events.findIndex(e => e.id === payload.id)
      if (idx !== -1) state.events[idx] = payload
    },
    deleteEvent: (state, { payload: id }) => { state.events = state.events.filter(e => e.id !== id) },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsThunk.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchEventsThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.events = payload.results ?? payload
      })
      .addCase(fetchEventsThunk.rejected, (state, { payload }) => { state.loading = false; state.error = payload })
      .addCase(createEventThunk.fulfilled, (state, { payload }) => { state.events.push(payload) })
      .addCase(updateEventThunk.fulfilled, (state, { payload }) => {
        const idx = state.events.findIndex(e => e.id === payload.id)
        if (idx !== -1) state.events[idx] = payload
      })
      .addCase(deleteEventThunk.fulfilled, (state, { payload: id }) => {
        state.events = state.events.filter(e => e.id !== id)
      })
      .addCase(fetchCourseSchedulesThunk.fulfilled, (state, { payload }) => {
        state.courseSchedules = payload.results ?? payload
      })
      .addCase(createCourseScheduleThunk.fulfilled, (state, { payload }) => { state.courseSchedules.push(payload) })
      .addCase(updateCourseScheduleThunk.fulfilled, (state, { payload }) => {
        const idx = state.courseSchedules.findIndex(s => s.id === payload.id)
        if (idx !== -1) state.courseSchedules[idx] = payload
      })
      .addCase(deleteCourseScheduleThunk.fulfilled, (state, { payload: id }) => {
        state.courseSchedules = state.courseSchedules.filter(s => s.id !== id)
      })
  },
})

export const {
  setCourseSchedules, addCourseSchedule, updateCourseSchedule, deleteCourseSchedule, setSelectedSchedule,
  setEvents, addEvent, updateEvent, deleteEvent,
} = scheduleSlice.actions
export default scheduleSlice.reducer
