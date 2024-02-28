import { thisMonth, thisWeek, today } from './../posts'
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jsonwebtoken from 'jsonwebtoken'
import type { Post } from './../posts'
import type { NewUser } from '@/users'
import type { User } from '../users'
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

const allPost = [today, thisWeek, thisMonth]
const allUsers: User[] = []

app.get('/posts', (req, res) => {
  res.json(allPost)
})

app.post<{}, {}, Post>('/posts', (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allPost.push(post)
  res.json(post)
})

const SECRET = 'secret'
const COOKIE = 'vuejs-jwt'

function authenticate(id: string, req: Request, res: Response) {
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: 'chintan-rupareliya',
    expiresIn: '30 days'
  })
  res.cookie(COOKIE, token, { httpOnly: true })
}

app.get('/current-user', (req, res) => {
  try {
    const token = req.cookies[COOKIE]
    const result = jsonwebtoken.verify(token, SECRET)
    res.json({ id: result.id })
  } catch (e) {
    res.status(404).end()
  }
})

app.post('/logout', (req, res) => {
  res.cookie(COOKIE, '', { httpOnly: true })
  res.status(200).end()
})

app.post<{}, {}, NewUser>('/login', (req, res) => {
  const targetUser = allUsers.find((x) => x.username === req.body.username)
  if (!targetUser || targetUser.password !== req.body.password) {
    res.status(401).end()
  } else {
    authenticate(targetUser.id, req, res)
    res.status(200).end()
  }
})

app.post<{}, {}, NewUser>('/users', (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allUsers.push(user)
  authenticate(user.id, req, res)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user
  res.json(rest)
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
