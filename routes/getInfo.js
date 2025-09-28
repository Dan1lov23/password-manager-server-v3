import express from 'express';

import passwordsDb from '../configs/passwordsDB.js';
import favoritesDb from '../configs/favoritesDB.js';

const router = express.Router();

router.post('/getPasswords', async (req, res) => {

    const {username} = req.body;

    const info = passwordsDb.prepare('SELECT * FROM passwords WHERE username = ?;').all(username);

    if (info) {
        console.log("Данные отправлены");
        res.json(info);
    }
})

router.post('/getFavorites', async (req, res) => {

    const {username} = req.body;

    const info = favoritesDb.prepare('SELECT * FROM favorites WHERE username = ?;').all(username);

    if (info) {
        console.log("Избранное отправлено на фронтенд");
        res.json(info);
    }
})

export default router;
