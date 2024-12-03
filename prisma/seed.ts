import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 50; i++) {
    const toy = await prisma.toy.create({
      data: {
        title: faker.commerce.productName(),
        material: faker.commerce.productMaterial(),
        weight: faker.number.int({ min: 0, max: 5000 }),
      },
    });

    const numOfChildrens = faker.number.int({ min: 1, max: 3 });

    for (let x = 0; x < numOfChildrens; x++) {
      const child = await prisma.child.create({
        data: {
          name: faker.person.fullName(),
          address: faker.location.country() + faker.location.streetAddress(),
          gob: faker.datatype.boolean(),
        },
      });

      await prisma.childrenAndToys.create({
        data: {
          toyId: toy.id,
          childId: child.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
