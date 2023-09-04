const register = async (req, res) => {
  res.send('register user')
}
const login = async (req, res) => {
  res.send('Login')
}
const logout = async (req, res) => {
  res.send('Logout')
}

module.exports = {
  register,
  login,
  logout,
}
