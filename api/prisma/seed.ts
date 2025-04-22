import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const brands = [
    { name: "Nike" },
    { name: "Adidas" },
    { name: "Puma" },
    { name: "Reebok" },
    { name: "New Balance" }
  ];

  await Promise.all(
    brands.map(brand =>
      prisma.brand.create({
        data: { name: brand.name }
      })
    )
  );

  console.info("✅ Seed de marcas finalizada!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
