const axios = require('axios');

async function run() {
  const email = `test_${Date.now()}@example.com`;
  const password = 'Password123';

  try {
    // 1. Register
    console.log('Registering user...');
    await axios.post('http://localhost:5001/api/auth/register', {
      fname: 'Delete Test User',
      email,
      phone: '1234567890',
      role: 'admin',
      password
    });

    // 2. Login
    console.log('Logging in...');
    const loginRes = await axios.post('http://localhost:5001/api/auth/login', {
      email,
      password
    });

    const token = loginRes.data.token;
    const userId = loginRes.data.user.id;
    console.log('User registered with ID:', userId);

    // 3. Delete User with token on /api/user/:id
    console.log(`Deleting user ${userId} using /api/user/${userId}...`);
    const deleteRes = await axios.delete(`http://localhost:5001/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Delete response:', deleteRes.status, deleteRes.data);

  } catch (err) {
    console.error('Error occurred:', err.message);
    if (err.response) {
      console.error('Response data:', err.response.status, err.response.data);
    }
  }
}

run();
