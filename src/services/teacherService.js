import api from './api'

export const fetchTeachers = (params = {}) =>
  api.get('auth/teachers/', { params }).then(r => r.data)

export const fetchTeacher = (id) =>
  api.get(`auth/teachers/${id}/`).then(r => r.data)

export const createTeacher = (data) =>
  api.post('auth/teachers/', data).then(r => r.data)

export const updateTeacher = (id, data) =>
  api.patch(`auth/teachers/${id}/`, data).then(r => r.data)

export const deleteTeacher = (id) =>
  api.delete(`auth/teachers/${id}/`)

export const resetTeacherPassword = (id) =>
  api.post(`auth/teachers/${id}/reset-password/`).then(r => r.data)
