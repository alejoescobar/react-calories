import axios from 'axios'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3000'
}

const requests = {
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
    })
  }
};

export default requests
