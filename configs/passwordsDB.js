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

const dbPath = path.join(databasesDir, 'passwords.db');

const passwordsDb = new Database(dbPath, { verbose: console.log });

try {
    passwordsDb.exec(`CREATE TABLE IF NOT EXISTS passwords (
       serviceName TEXT,
       login TEXT,
       username TEXT,
       password TEXT,
       passwordId INTEGER
    )`);
    console.log('Подключение к базе данных паролей успешно установлено.');
} catch (err) {
    console.error('Ошибка открытия базы данных: ' + err.message);
}

export default passwordsDb;
