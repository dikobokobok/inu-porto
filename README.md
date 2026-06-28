# Ibnu Nur Ramadani - Personal Portfolio

Portfolio personal bertema **Pixel Art & Retro 8-bit (PixelPark)** yang dibangun menggunakan **Vite + React + TailwindCSS**. 

Portofolio ini mendeskripsikan latar belakang pendidikan, hobi, pengalaman kerja, keaktifan organisasi, dan prestasi yang diraih oleh **Ibnu Nur Ramadani**.

## 🚀 Fitur Utama
- **Desain Retro & Pixel Art**: Menggunakan font `Press Start 2P`, `VT323`, dan aesthetic UI retro/pixel dengan shading bayangan tebal.
- **HUD Status Widget**: Tampilan status bar layaknya game RPG klasik (HP, EXP, Stats).
- **Guestbook Terminal Interaktif**: Konsol terminal berbasis text untuk mengirim pesan langsung dan mendapatkan respons otomatis dari `IbnuBot`.
- **Responsive Layout**: Optimal digunakan di Desktop maupun Mobile.
- **Vercel Ready**: Konfigurasi deployment bawaan dengan `vercel.json` untuk kelancaran routing asset statis.

## 🛠️ Langkah Instalasi Lokal

### Prasyarat
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (Versi 18 ke atas direkomendasikan)
- [npm](https://www.npmjs.com/) atau Yarn/pnpm

### 1. Clone & Masuk ke Folder Proyek
```bash
cd /home/inu/app/porto/1/portfolio
```

### 2. Instal Dependensi
Gunakan npm untuk mengunduh modul-modul yang dibutuhkan:
```bash
npm install
```

### 3. Jalankan Mode Pengembangan (Local Server)
Untuk menjalankan server lokal guna melakukan testing & development:
```bash
npm run dev
```
Setelah server berjalan, buka browser dan akses `http://localhost:5173`.

### 4. Build untuk Produksi
Guna mengompilasi kode menjadi file HTML/CSS/JS statis yang optimal:
```bash
npm run build
```
Hasil build akan berada di dalam folder `dist/`.

---

## ⚡ Deployment ke Vercel

Proyek ini telah dilengkapi dengan berkas konfigurasi `vercel.json`. Untuk meluncurkannya ke Vercel secara mudah, ikuti langkah ini:

### Menggunakan Vercel CLI:
1. Pasang Vercel CLI global jika belum ada:
   ```bash
   npm install -g vercel
   ```
2. Jalankan perintah deploy di root folder:
   ```bash
   vercel
   ```
3. Ikuti petunjuk di terminal untuk setup project baru.
4. Untuk deploy production:
   ```bash
   vercel --prod
   ```

### Melalui Vercel Dashboard (GitHub/GitLab):
1. Push kode Anda ke repositori GitHub.
2. Masuk ke dashboard [Vercel](https://vercel.com).
3. Klik **Add New** -> **Project**.
4. Import repositori portfolio tersebut.
5. Konfigurasi build setting otomatis mendeteksi **Vite**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Klik **Deploy**. Selesai!
