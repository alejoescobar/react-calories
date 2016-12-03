import axios from 'axios'
import cookie from 'react-cookie'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3000'
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

  login: (email, password) => {
    return axios.post('/sessions', {
      session: {
        email: email,
        password: password
      }
    }).then((response) => {
      const user = response.data
      cookie.save('userAuthToken', user.auth_token)
      axios.defaults.headers.common['Authorization'] = user.auth_token
      return response
    })
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

  getUserCaloriesEntries: (id) => {
    return axios.get(`admin/users/${id}/calories_entries`)
  },

  createUserCaloriesEntry: (id, title, caloriesAmount, date) => {
    return axios.post(`/admin/users/${id}/calories_entries`, {
      calories_entry: {
        title: title,
        calories_amount: caloriesAmount,
        date: date
      }
    })
  }
}

export { userRequests, adminRequests }
