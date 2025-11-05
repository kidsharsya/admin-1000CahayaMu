export async function loginAdmin(email: string, password: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.meta?.success) {
      throw new Error(data.meta?.message || 'Login failed');
    }

    const token = data.data.access_token;
    const isAdmin = data.data.is_admin;

    // ✅ Simpan token dan status admin di localStorage (opsional, untuk client)
    localStorage.setItem('access_token', token);
    localStorage.setItem('is_admin', JSON.stringify(isAdmin));

    // ✅ Simpan juga di cookies agar middleware (server) bisa baca
    document.cookie = `access_token=${token}; path=/;`;
    document.cookie = `is_admin=${isAdmin}; path=/;`;

    return data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(message);
  }
}
