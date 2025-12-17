## Employee Portal

Portal karyawan sederhana berbasis Next.js App Router dengan Supabase sebagai backend otentikasi dan sumber data pengumuman.

### Fitur utama

- Registrasi dan login memanfaatkan Server Actions (`app/(auth)/actions.ts`) sehingga kredensial tidak pernah diproses di client handler biasa.
- Proteksi rute melalui `middleware.ts` yang me-refresh sesi Supabase dan mengarahkan user sesuai status login.
- Dashboard server component yang menampilkan email pengguna dan menarik data tabel `announcements` langsung dari Supabase (dengan Suspense fallback).
- Tombol logout menjalankan Server Action untuk mengakhiri sesi dan mengarahkan kembali ke `/login`.

### Prasyarat & konfigurasi

1. Buat project Supabase lalu isi file `.env.local` dengan kredensial berikut:

	```bash
	NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
	NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
	```

2. Buat tabel `announcements` di Supabase SQL editor:

	```sql
	create table if not exists announcements (
	  id bigint generated always as identity primary key,
	  title text not null,
	  content text not null,
	  created_at timestamp with time zone default now()
	);
	```

3. Masukkan minimal tiga baris data dummy agar dashboard menampilkan kartu pengumuman.

### Menjalankan aplikasi

```bash
npm install
npm run dev
```

Aplikasi dapat diakses di [http://localhost:3000](http://localhost:3000). Gunakan `/register` untuk membuat akun baru lalu login di `/login` sebelum masuk ke `/dashboard`.
