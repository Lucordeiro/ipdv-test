import { PrismaClient } from './../generated/prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 🔥 Cargos (Jobs)
  const jobAdmin = await prisma.job.upsert({
    where: { name: 'Administrador' },
    update: {},
    create: {
      uuid: crypto.randomUUID(),
      name: 'Administrador',
    },
  });

  // 🔐 Cria usuário administrador
  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'user@ipdv.com' },
    update: {},
    create: {
      uuid: crypto.randomUUID(),
      name: 'IPDV User',
      email: 'user@ipdv.com',
      password: passwordHash,
      job_id: jobAdmin.uuid,
      is_active: true,
    },
  });

  console.log('✅ Seed concluído com sucesso');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });