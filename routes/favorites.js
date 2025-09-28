import express from 'express';

import db from '../configs/favoritesDB.js';

const router = express.Router();

router.post('/checkFavoriteFunction', async (req, res) => {

    const {serviceName, login, password, username, passwordId, fullPassword} = req.body;

    const favorites = db.prepare('SELECT * FROM favorites WHERE username = ?').all(username);

    const checkFunction = () => {
        for (let a = 0; a < favorites.length; a++) {
            console.log(favorites[a],"\n", fullPassword);
            if (favorites[a].passwordId === fullPassword.passwordId) {
                return true;
            }
        }
        return false;
    }

    if (checkFunction()) {
        const stmt = db.prepare("DELETE FROM favorites WHERE username = ? AND passwordId = ?");
        stmt.run(username, passwordId);
    } else {
        const stmt = db.prepare('INSERT INTO favorites (serviceName, login, password, username, passwordId) VALUES (?, ?, ?, ?, ?)');
        stmt.run(serviceName, login, password, username, passwordId);
    }

    res.json("Пароль добавлен в избранное");
})

export default router
