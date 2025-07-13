import bcrypt from 'bcryptjs';
import { connectToDatabase } from './mongoose';
import User from '@/models/User';
import Role from '@/models/Role';

export async function seedDatabase() {
  try {
    // Connect to the database
    await connectToDatabase();
    console.log('Connected to database for seeding');

    // Create roles if they don't exist
    const roles = ['user', 'admin', 'superadmin'];
    const roleDescriptions = {
      user: 'Regular user with limited access',
      admin: 'Admin with management capabilities',
      superadmin: 'Super admin with full system access'
    };

    for (const roleName of roles) {
      const existingRole = await Role.findOne({ name: roleName });
      if (!existingRole) {
        await Role.create({
          name: roleName,
          description: roleDescriptions[roleName as keyof typeof roleDescriptions]
        });
        console.log(`Created role: ${roleName}`);
      }
    }

    // Get admin role for user creation
    const adminRole = await Role.findOne({ name: 'admin' });
    
    if (!adminRole) {
      throw new Error('Admin role not found');
    }

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@whitelie.com' });
    
    if (!existingAdmin) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('adminPassword123', 12);
      
      await User.create({
        name: 'Admin User',
        email: 'admin@whitelie.com',
        hashedPassword,
        role: adminRole._id,
        emailVerified: new Date()
      });
      
      console.log('Created admin user: admin@whitelie.com');
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
