# Fullstack Technical Test

## Daftar Username dan Password

| Username       | Password   |
| -------------- | ---------- |
| admin@example.com | password |
| employee@example.com | password |
| approver@example.com | password |

## Versi Database

- MySQL: 8.0

## Versi PHP

- PHP: 8.2

## Framework

- Laravel: 11.31

## Panduan Penggunaan Aplikasi

### Persiapan Lingkungan

1. Clone repository ini:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies menggunakan Composer dan npm:
    ```sh
    composer install
    npm install
    ```

3. Salin file [.env.example](http://_vscodecontentref_/0) menjadi [.env](http://_vscodecontentref_/1) dan sesuaikan konfigurasi sesuai kebutuhan:
    ```sh
    cp .env.example .env
    ```

4. Generate application key:
    ```sh
    php artisan key:generate
    ```

5. Migrasi dan seed database:
    ```sh
    php artisan migrate --seed
    ```

### Menjalankan Aplikasi

1. Jalankan server pengembangan:
    ```sh
    php artisan serve
    ```

2. Jalankan Vite untuk asset bundling:
    ```sh
    npm run dev
    ```

3. Akses aplikasi melalui browser di alamat:
    ```
    http://localhost:8000
