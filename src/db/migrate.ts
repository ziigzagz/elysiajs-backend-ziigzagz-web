import { db } from './index';
import { users, categories } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Seed categories
    await db.insert(categories).values([
      {
        name: 'Web Development',
        slug: 'web-development',
        description: 'Website and web application projects'
      },
      {
        name: 'Mobile Apps',
        slug: 'mobile-apps',
        description: 'Mobile application development projects'
      },
      {
        name: 'Design',
        slug: 'design',
        description: 'Graphic design and UI/UX projects'
      },
      {
        name: 'E-commerce',
        slug: 'e-commerce',
        description: 'Online store and e-commerce solutions'
      }
    ]);

    console.log('✅ Categories seeded');

    // Seed admin user (password: admin123)
    await db.insert(users).values({
      username: 'admin',
      password: '$2y$10$.8YPL6rf8Z0Yz9ZLvyw45OQ8Og/cgc7T/L4116fsQ5kMIvnculNx.',
      email: 'admin@example.com',
      fullName: 'Administrator',
      role: 'admin',
      status: 'active'
    });

    console.log('✅ Admin user seeded (username: admin, password: admin123)');
    console.log('🎉 Database seeded successfully!');
  } catch (error: any) {
    console.error('❌ Seed error:', error.message);
  }
  
  process.exit(0);
}

seed();
