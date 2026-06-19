(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'test@example.com', password: 'password123' }),
    });
    const text = await res.text();
    console.log('status', res.status);
    console.log('set-cookie', res.headers.get('set-cookie'));
    console.log(text);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
