import api from './api'

// Course Schedules
export const fetchCourseSchedules = (params = {}) =>
  api.get('schedule/course-schedules/', { params }).then(r => r.data)

export const createCourseSchedule = (data) =>
  api.post('schedule/course-schedules/', data).then(r => r.data)

export const updateCourseSchedule = (id, data) =>
  api.patch(`schedule/course-schedules/${id}/`, data).then(r => r.data)

export const deleteCourseSchedule = (id) =>
  api.delete(`schedule/course-schedules/${id}/`)

// Events
export const fetchEvents = (params = {}) =>
  api.get('schedule/events/', { params }).then(r => r.data)

export const createEvent = (data) =>
  api.post('schedule/events/', data).then(r => r.data)

export const updateEvent = (id, data) =>
  api.patch(`schedule/events/${id}/`, data).then(r => r.data)

export const deleteEvent = (id) =>
  api.delete(`schedule/events/${id}/`)
