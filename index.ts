import {Wechaty} from 'wechaty';
import {PuppetPadplus} from 'wechaty-puppet-padplus';
import Qrterminal from 'qrcode-terminal';

import config from './src/common/constant/config';
import {handleMessage} from './src/event/message';
import {schedule} from './src/schedule'
//ipad协议
const bot = new Wechaty({
    puppet: new PuppetPadplus({
        token: config.TOKEN,
    }),
    name: 'Rae',
});
function handleScan(qrcode: string) {
    Qrterminal.generate(qrcode, {small: true});
}

bot.on('scan', handleScan)
    .on('message', handleMessage)
    // .on('message',handleMessage)
    .start()
    .then(() => {
        bot.Room.findAll().then(async (rooms) => {
            for (const room of rooms) {
                const name = await room.topic();
                // const ownerId=room.owner().name()
                const id = room.id;
                console.log(name, id);
            }
            // console.log(rooms)
        });
        schedule(bot)
    });
