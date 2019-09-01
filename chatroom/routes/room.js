var express = require('express');
var router = express.Router();


const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Room = require('../schemas/room');

router.post('/room', async (req, res, next) => {// 룸 생성하기
    try {
        const room = new Room({
            title: req.body.title,
            max: req.body.max,
            owner: req.session.color,
            password: req.body.password,
        });
        const newRoom = await room.save();// 집어넣기 그대로 
        const io = req.app.get('io');
        io.of('/room').emit('newRoom', newRoom);

    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.get('/room/:id', async (req, res, next) => {
    try {
        const room = await Room.findOne({ _id: req.params.id });
        const io = req.app.get('io');
        if (!room) {
            res.status(200).send(defaultRes.successFalse(statusCode.OK, resMessage.NOT_CORRECT_USERINFO));
            return res.redirect('/');
        }
        else if (room.password && room.password !== req.query.password) {
            res.status(200).send(defaultRes.successFalse(statusCode.OK, resMessage.NOT_CORRECT_USERINFO));
            return res.redirect('/');
        }


    } catch (error) {
        console.error(error);
        return next(error);
    }
});
module.exports = router;