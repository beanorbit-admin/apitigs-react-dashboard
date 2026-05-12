import api from './api'

export const login = (email, password) =>
  api.post('auth/login/', { email, password }).then(r => r.data)

export const refreshToken = (refresh) =>
  api.post('auth/token/refresh/', { refresh }).then(r => r.data)

export const getMe = () =>
  api.get('auth/me/').then(r => r.data)

export const changePassword = (data) =>
  api.post('auth/change-password/', data).then(r => r.data)
