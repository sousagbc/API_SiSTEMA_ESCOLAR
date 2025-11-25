import { Request, Response } from 'express'
import { prisma } from './prisma'
import {
  studentCreateSchema,
  teacherCreateSchema,
  subjectCreateSchema,
  classCreateSchema,
  enrollmentCreateSchema,
  gradeCreateSchema,
  gradeAverageSchema,
} from './schemas'

export const listStudents = async (req: Request, res: Response) => {
  const students = await prisma.student.findMany()
  res.json(students)
}

export const createStudent = async (req: Request, res: Response) => {
  const parsed = studentCreateSchema.parse(req.body)
  const s = await prisma.student.create({ data: parsed })
  res.status(201).json(s)
}

export const getStudent = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const s = await prisma.student.findUnique({ where: { id }, include: { enrollments: true } })
  if (!s) return res.status(404).json({ error: 'Not found' })
  res.json(s)
}

export const updateStudent = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const parsed = studentCreateSchema.partial().parse(req.body)
  const s = await prisma.student.update({ where: { id }, data: parsed })
  res.json(s)
}

export const deleteStudent = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  await prisma.student.delete({ where: { id } })
  res.status(204).send()
}

// Grades
export const createGrade = async (req: Request, res: Response) => {
  const parsed = gradeCreateSchema.parse(req.body)
  const g = await prisma.grade.create({ data: parsed })
  const all = await prisma.grade.findMany({ where: { enrollmentId: parsed.enrollmentId } })
  const avg = all.reduce((s: number, x: { value: number }) => s + x.value, 0) / all.length
  await prisma.enrollment.update({ where: { id: parsed.enrollmentId }, data: { average: avg } })
  res.status(201).json(g)
}