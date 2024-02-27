import { thisMonth, thisWeek, today } from './../posts'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import type { Post } from './../posts'
import type { NewUser } from '@/users'
import type { User } from '../users'
const app = express()
app.use(cors())
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

app.post<{}, {}, NewUser>('/users', (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allUsers.push(user)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user
  res.json(rest)
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
