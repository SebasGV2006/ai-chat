(async () => {
  try {
    const reg = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Flow User', email: 'flow@example.com', password: 'password123' }),
    });
    console.log('register status', reg.status);
    const sc = reg.headers.get('set-cookie');
    console.log('set-cookie', sc);
    const cookie = sc ? sc.split(';')[0] : '';
    const sres = await fetch('http://localhost:3000/api/auth/session', {
      headers: { Cookie: cookie },
    });
    console.log('session status', sres.status);
    console.log(await sres.text());
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
