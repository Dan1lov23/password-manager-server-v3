import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasesDir = path.resolve(__dirname, '../databases');

if (!fs.existsSync(databasesDir)) {
    fs.mkdirSync(databasesDir, { recursive: true });
}

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
