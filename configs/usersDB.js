import Database from 'better-sqlite3';

const usersDb = new Database('../databases/users.db', { verbose: console.log });

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
