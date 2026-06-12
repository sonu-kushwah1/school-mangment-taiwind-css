const axios = require('axios');

async function testEndpoints() {
  const endpoints = [
    'http://localhost:5001/api/user',
    'http://localhost:5001/api/users',
    'http://localhost:5001/api/auth/users',
    'http://localhost:5001/api/auth/user',
    'http://localhost:5000/users'
  ];

  for (const url of endpoints) {
    try {
      console.log(`Testing GET ${url}...`);
      const res = await axios.get(url);
      console.log(`Success on ${url}:`, res.status, JSON.stringify(res.data).substring(0, 200));
    } catch (err) {
      console.log(`Failed on ${url}:`, err.message, err.response ? err.response.status : 'No Response');
    }
  }
}

testEndpoints();
