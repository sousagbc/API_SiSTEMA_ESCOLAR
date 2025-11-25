import { prisma } from './prisma'

async function main() {
  await prisma.student.createMany({
    data: [
      { name: 'Gabriel', email: 'gabriel@example.com' },
      { name: 'Maria', email: 'maria@example.com' },
    ],
  })

  await prisma.teacher.createMany({
    data: [
      { name: 'Professor A', email: 'prof.a@example.com' },
      { name: 'Professor B', email: 'prof.b@example.com' },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })