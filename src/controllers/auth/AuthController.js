const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../../../models')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, dan password wajib diisi' })
    }

    const existingUser = await db.User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah terdaftar' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.User.create({
      name,
      email,
      password: hashedPassword,
    })

    const { password: _pw, ...userWithoutPassword } = user.toJSON()

    return res.status(201).json({
      message: 'Registrasi berhasil',
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error('Error during register:', error)
    return res.status(500).json({ message: 'Internal server error: ' + error })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'email dan password wajib diisi' })
    }

    const user = await db.User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah' })
    }

    const { password: _pw, ...userWithoutPassword } = user.toJSON()

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'devsecret', {
      expiresIn: '1h',
    })

    const userWithToken = {
      ...userWithoutPassword,
      token,
    }

    return res.json({
      message: 'Login berhasil',
      data: userWithToken,
    })
  } catch (error) {
    console.error('Error during login:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  register,
  login,
}
