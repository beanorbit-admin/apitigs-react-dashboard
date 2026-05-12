import api from './api'

// Dashboard
export const fetchDashboardStats = () =>
  api.get('dashboard/stats/').then(r => r.data)

// Categories
export const fetchCategories = (params = {}) =>
  api.get('categories/', { params }).then(r => r.data)

export const createCategory = (data) =>
  api.post('categories/', data).then(r => r.data)

export const updateCategory = (id, data) =>
  api.patch(`categories/${id}/`, data).then(r => r.data)

export const deleteCategory = (id) =>
  api.delete(`categories/${id}/`)

// Courses
export const fetchCourses = (params = {}) =>
  api.get('courses/', { params }).then(r => r.data)

export const fetchCourse = (id) =>
  api.get(`courses/${id}/`).then(r => r.data)

export const createCourse = (data) =>
  api.post('courses/', data).then(r => r.data)

export const updateCourse = (id, data) =>
  api.patch(`courses/${id}/`, data).then(r => r.data)

export const deleteCourse = (id) =>
  api.delete(`courses/${id}/`)
