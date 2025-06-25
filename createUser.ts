import { hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/db';

async function main() {
  const email = 'test@example.com';
  const password = 'password123';

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.log('User created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });