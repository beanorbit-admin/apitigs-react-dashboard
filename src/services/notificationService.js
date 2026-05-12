import api from './api'

export const fetchNotifications = (params = {}) =>
  api.get('notifications/', { params }).then(r => r.data)

export const markNotificationAsRead = (id) =>
  api.patch(`notifications/${id}/read/`).then(r => r.data)

export const markAllNotificationsAsRead = () =>
  api.post('notifications/mark-all-read/').then(r => r.data)

export const fetchScheduledNotifications = (params = {}) =>
  api.get('notifications/scheduled/', { params }).then(r => r.data)

export const createScheduledNotification = (data) =>
  api.post('notifications/scheduled/', data).then(r => r.data)

export const deleteScheduledNotification = (id) =>
  api.delete(`notifications/scheduled/${id}/`)
