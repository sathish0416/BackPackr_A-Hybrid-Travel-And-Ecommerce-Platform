// Simple endpoint testing script
// Run with: node test-auth-endpoints.js

const endpoints = [
  { method: 'GET', url: 'http://localhost:5000/api/auth/user/register', desc: 'User Register Page' },
  { method: 'GET', url: 'http://localhost:5000/api/auth/agency/register', desc: 'Agency Register Page' },
  { method: 'POST', url: 'http://localhost:5000/api/auth/register/user', desc: 'User Register API' },
  { method: 'POST', url: 'http://localhost:5000/api/auth/register/agency', desc: 'Agency Register API' },
  { method: 'POST', url: 'http://localhost:5000/api/auth/login/user', desc: 'User Login API' },
  { method: 'POST', url: 'http://localhost:5000/api/auth/login/agency', desc: 'Agency Login API' },
];

console.log('🧪 Testing Authentication Endpoints\n');

endpoints.forEach(async (endpoint, index) => {
  try {
    const response = await fetch(endpoint.url, { 
      method: endpoint.method,
      headers: { 'Content-Type': 'application/json' }
    });
    
    const status = response.status;
    const statusText = response.statusText;
    const statusEmoji = status >= 200 && status < 300 ? '✅' : status >= 400 ? '❌' : '⚠️';
    
    console.log(`${index + 1}. ${endpoint.desc}`);
    console.log(`   ${statusEmoji} ${endpoint.method} ${endpoint.url}`);
    console.log(`   Status: ${status} ${statusText}\n`);
    
  } catch (error) {
    console.log(`${index + 1}. ${endpoint.desc}`);
    console.log(`   ❌ ${endpoint.method} ${endpoint.url}`);
    console.log(`   Error: ${error.message}\n`);
  }
});

console.log('🔍 Check the results above for any issues.');
console.log('💡 Make sure your server is running on localhost:5000');
