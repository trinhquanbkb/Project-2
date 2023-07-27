# Getting Started with Project II

## `FRONTEND`:

Download Nodejs (đã bao gồm cả npm): https://nodejs.org/en/download
Cài đặt yarn toàn cục: npm install -g yarn
Cài đặt các thư viện: yarn install
Chạy ứng dụng: yarn start

## `BACKEND`:

Download Nodejs (đã bao gồm cả npm): https://nodejs.org/en/download
Cài đặt các thư viện: yarn install
Cài đặt sequelize: npm install -g sequelize-cli
Cấu hình lại database trong file config
Tạo các bảng trong database: sequelize db:migrate
Tạo dữ liệu mẫu: sequelize db:seed:all
Nếu có lỗi liên quan đến bảng và muốn xóa: sequelize migrate:undo:all
Nếu có lỗi liên quan đến dữ liệu mẫu: sequelize db:seed:undo:all
Chạy ứng dụng: yarn start

### `Chú ý`:
