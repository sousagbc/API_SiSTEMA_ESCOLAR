import express from 'express'
import {
  listStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} from './controllers'

const app = express()
app.use(express.json())

// Rotas de estudantes
app.get('/students', listStudents)
app.post('/students', createStudent)
app.get('/students/:id', getStudent)
app.put('/students/:id', updateStudent)
app.delete('/students/:id', deleteStudent)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})