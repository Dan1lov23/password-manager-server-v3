import Database from 'better-sqlite3';

const passwordsDb = new Database('../databases/passwords.db', { verbose: console.log });

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
