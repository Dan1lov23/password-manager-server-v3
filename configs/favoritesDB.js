import Database from 'better-sqlite3';

const favoritesDv = new Database('../databases/favorites.db', { verbose: console.log });

try {
    favoritesDv.exec(`CREATE TABLE IF NOT EXISTS favorites (
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

export default favoritesDv;
