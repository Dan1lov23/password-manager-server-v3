import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Определяем абсолютный путь к папке базы данных
const databasesDir = path.resolve(__dirname, '../databases');

// Создаем папку, если она не существует
if (!fs.existsSync(databasesDir)) {
    fs.mkdirSync(databasesDir, { recursive: true });
}

// Полный путь к файлу базы данных
const dbPath = path.join(databasesDir, 'users.db');

const usersDb = new Database(dbPath, { verbose: console.log });

try {
    usersDb.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        userRole TEXT
    )`);
    console.log('Подключение к базе данных пользователей успешно установлено.');
} catch (err) {
    console.error('Ошибка открытия базы данных: ' + err.message);
}

export default usersDb;