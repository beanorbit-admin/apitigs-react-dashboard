import api from './api'

export const fetchStudents = (params = {}) =>
  api.get('auth/students/', { params }).then(r => r.data)

export const fetchStudent = (id) =>
  api.get(`auth/students/${id}/`).then(r => r.data)

export const createStudent = (data) =>
  api.post('auth/students/', data).then(r => r.data)

export const updateStudent = (id, data) =>
  api.patch(`auth/students/${id}/`, data).then(r => r.data)

export const deleteStudent = (id) =>
  api.delete(`auth/students/${id}/`)
