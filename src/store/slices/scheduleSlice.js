import { createSlice } from '@reduxjs/toolkit'

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: { courseSchedules: [], events: [], selectedSchedule: null },
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
    deleteEvent: (state, { payload: id }) => {
      state.events = state.events.filter(e => e.id !== id)
    },
  },
})

export const {
  setCourseSchedules, addCourseSchedule, updateCourseSchedule, deleteCourseSchedule, setSelectedSchedule,
  setEvents, addEvent, updateEvent, deleteEvent,
} = scheduleSlice.actions
export default scheduleSlice.reducer
