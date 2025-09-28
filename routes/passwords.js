import express from 'express';

import db from '../configs/passwordsDB.js';

const router = express.Router();

router.post('/addPassword', async (req, res) => {

    const {serviceName, login, password, username, passwordId} = req.body;
    console.log(serviceName, login, password, username, passwordId);

    const stmt = db.prepare('INSERT INTO passwords (serviceName, login, password, username, passwordId) VALUES (?, ?, ?, ?, ?)');
    stmt.run(serviceName, login, password, username, passwordId);
    res.json("Пароль добавлен");
})

router.post('/deletePassword', async (req, res) => {
    const {username, passwordId} = req.body;

    const stmt = db.prepare("DELETE FROM passwords WHERE username = ? AND passwordId = ?");
    stmt.run(username, passwordId);
    res.json("Пароль удалён");
})

router.post('/changeLogin', async (req, res) => {
    const {newLogin, passwordId} = req.body;

    const stmt = db.prepare('UPDATE passwords SET login = ? WHERE passwordId = ?');
    stmt.run(newLogin, passwordId);
})

router.post('/changePassword', async (req, res) => {
    const {newPassword, passwordId} = req.body;

    const stmt = db.prepare('UPDATE passwords SET password = ? WHERE passwordId = ?');
    stmt.run(newPassword, passwordId);
})

export default router
