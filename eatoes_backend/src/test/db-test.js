require('dotenv').config();
const { sequelize } = require('../config/postgresql');
const User = require('../models/postgresql/User');

async function testDatabase() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Database connection successful!');

    // Test user creation
    const testUser = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword'
    });
    console.log('Test user created:', testUser.toJSON());

    // Test user retrieval
    const foundUser = await User.findOne({ where: { email: 'test@example.com' } });
    console.log('Found user:', foundUser.toJSON());

    // Clean up
    await testUser.destroy();
    console.log('Test user deleted');

    process.exit(0);
  } catch (error) {
    console.error('Database test failed:', error);
    process.exit(1);
  }
}

testDatabase(); 