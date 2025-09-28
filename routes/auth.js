import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../configs/usersDB.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Начался процесс регистрации пользователя`);

    if (!username || !password) {
        return res.status(400).json({ error: `Имя пользователя и пароль обязательны` });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        const role = `user`;

        const stmt = db.prepare('INSERT INTO users (username, password, userRole, ordersCounter) VALUES (?, ?, ?, ?)');
        stmt.run(username, hashedPassword, role, 0);

        console.log(`Пользователь зарегистрирован, процесс регистрации завершён`);
        return res.status(201).json({ marker: true, message: `Пользователь успешно зарегистрирован` });
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            console.log(`Пользователь с таким именем уже существует, процесс регистрации завершён`);
            return res.status(400).json({ marker: false, error: `Пользователь с таким именем уже существует` });
        }
        console.log(`Ошибка при добавлении пользователя: ${err.message}`);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Процесс авторизации начат для пользователя: ${username}`);

    try {
        const user = db.prepare("SELECT username, password, userRole, ordersCounter FROM users WHERE username = ?").get(username);

        if (user) {
            const decryptedPassword = await bcrypt.compare(password, user.password);
            if (decryptedPassword) {
                console.log(`Пользователь успешно вошёл в аккаунт`);
                const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '1h' });
                console.log(user);
                return res.json({ marker: 'true', token: token, role: user.userRole, ordersCounter: user.ordersCounter});
            } else {
                return res.json({ marker: 'false', body: 'Неверный логин или пароль' });
            }
        } else {
            console.log(`Пользователь с никнеймом ${username} не найден`);
            return res.json({ marker: 'false', body: 'Неправильный логин или пароль' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
});

router.post('/changePassword', async (req, res) => {

    const { newPassword, username } = req.body;
    const hashedNewPassword = await bcrypt.hash(newPassword, 5);
    console.log(hashedNewPassword);

    try {
        const stmt = db.prepare('UPDATE users SET password = ? WHERE username = ?');
        stmt.run(hashedNewPassword, username);
        res.json("Данные обновлены");
    } catch (error) {

    }
})

export default router;
