import axios from 'axios'
import cookie from 'react-cookie'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://top-calories-api.herokuapp.com/'
} else if (process.env.REACT_APP_TEST) {
  axios.defaults.baseURL = 'http://localhost:5000'
} else {
  axios.defaults.baseURL = 'http://localhost:3001'
}

if (cookie.load('userAuthToken')) {
  axios.defaults.headers.common['Authorization'] = cookie.load('userAuthToken')
}

const userRequests = {
  register: (email, password, caloriesGoal) => {
    return axios.post('/registrations', {
      user: {
        email: email,
        password: password,
        daily_calories_goal: caloriesGoal
      }
    })
  },

  updateInfo: (id, caloriesGoal) => {
    return axios.put(`/registrations/${id}`, {
      user: {
        daily_calories_goal: caloriesGoal
      }
    })
  },

  login: (email, password) => {
    return axios.post('/sessions', {
      session: {
        email: email,
        password: password
      }
    }).then((response) => {
      const user = response.data
      cookie.save('userAuthToken', user.auth_token, { path: '/' })
      axios.defaults.headers.common['Authorization'] = user.auth_token
      return response
    })
  },

  logout: () => {
    return axios.delete('/sessions')
  },

  getCaloriesEntries: (query) => {
    return axios.get(`/calories_entries?${query}`)
  },

  showCaloriesEntry: (entryId) => {
    return axios.get(`/calories_entries/${entryId}`)
  },

  createCaloriesEntry: (title, caloriesAmount, date) => {
    return axios.post('/calories_entries', {
      calories_entry: {
        title: title,
        calories_amount: caloriesAmount,
        date: date
      }
    })
  },

  updateCaloriesEntry: (entryId, title, caloriesAmount, date) => {
    return axios.put(`/calories_entries/${entryId}`, {
      calories_entry: {
        id: entryId,
        title: title,
        calories_amount: caloriesAmount,
        date: date
      }
    })
  },

  deleteCaloriesEntry: (entryId) => {
    return axios.delete(`/calories_entries/${entryId}`)
  }
}

const adminRequests = {
  getUsers: () => {
    return axios.get('/admin/users')
  },

  showUser: (id) => {
    return axios.get(`/admin/users/${id}`)
  },

  createUser: (email, password, role, dailyCaloriesGoal) => {
    return axios.post('/admin/users', {
      user: {
        email: email,
        password: password,
        role: role,
        daily_calories_goal: dailyCaloriesGoal
      }
    })
  },

  updateUser: (id, email, password, role, dailyCaloriesGoal) => {
    return axios.put(`/admin/users/${id}`, {
      user: {
        email: email,
        password: password,
        role: role,
        daily_calories_goal: dailyCaloriesGoal
      }
    })
  },

  deleteUser: (id) => {
    return axios.delete(`/admin/users/${id}`)
  },

  getUserCaloriesEntries: (id, query='') => {
    return axios.get(`admin/users/${id}/calories_entries?${query}`)
  },

  showUserCaloriesEntry: (userId, id) => {
    return axios.get(`admin/users/${userId}/calories_entries/${id}`)
  },

  createUserCaloriesEntry: (id, title, caloriesAmount, date) => {
    return axios.post(`/admin/users/${id}/calories_entries`, {
      calories_entry: {
        title: title,
        calories_amount: caloriesAmount,
        date: date
      }
    })
  },

  updateUserCaloriesEntry: (userId, id, title, caloriesAmount, date) => {
    return axios.put(`/admin/users/${userId}/calories_entries/${id}`, {
      calories_entry: {
        title: title,
        calories_amount: caloriesAmount,
        date: date
      }
    })
  },

  deleteUserCaloriesEntry: (userId, id) => {
    return axios.delete(`/admin/users/${userId}/calories_entries/${id}`)
  }
}

export { userRequests, adminRequests }
