# Galatama Fishing - Mini Leaderboard Simulator

## Deskripsi
Simulasi leaderboard untuk game fishing competition Galatama.  
Dibuat untuk tugas tes Unity Developer Intern.

## Fitur
- Timer sesi 60 detik dengan countdown
- 5 bot pemain dengan tangkapan acak 3-6 detik
- Leaderboard live update otomatis
- Kategori tangkapan terberat terpisah
- Notifikasi toast setiap tangkapan baru (hilang 2 detik)
- State machine: waiting -> running -> ended
- Efek visual untuk tangkapan besar (>7kg)
- Pure function untuk penentuan hasil tangkapan
- Layout responsive
- Struktur kode terpisah (state, logic, render)

## Cara Menjalankan
1. Clone repository ini
2. Buka `index.html` dengan Live Server
3. Klik "Mulai Turnamen"
4. Saksikan simulasi berjalan!

## Struktur Kode
- `js/state.js` - Data dan pure functions
- `js/gameLogic.js` - State machine
- `js/renderer.js` - UI rendering
- `js/toastManager.js` - Notifikasi & history
- `js/animationManager.js` - Efek visual
- `js/main.js` - Entry point

## Teknologi
- Vanilla JavaScript
- CSS3
- HTML5