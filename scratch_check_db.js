const fs = require('fs');
const path = require('path');

// Manually parse backend/.env
const envPath = path.join(__dirname, 'backend', '.env');
if (fs.existsSync(envPath)) {
  const envText = fs.readFileSync(envPath, 'utf8');
  for (const line of envText.split('\n')) {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
    if (match) {
      let key = match[1].trim();
      let value = match[2].trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  }
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const problems = await prisma.problem.findMany({
    include: {
      testCases: true
    }
  });
  console.log("Problems count:", problems.length);
  for (const p of problems) {
    console.log(`Problem: ID=${p.id}, Slug=${p.slug}, Title="${p.title}"`);
    console.log("Test Cases:");
    for (const tc of p.testCases) {
      console.log(`  - Input: ${JSON.stringify(tc.input)}, Expected: ${JSON.stringify(tc.expectedOutput)}, isSample: ${tc.isSample}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
