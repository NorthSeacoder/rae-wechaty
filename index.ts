import {Wechaty, Message} from 'wechaty';
import {PuppetPadplus} from 'wechaty-puppet-padplus';
import {wechatyYouDaoPlugin} from 'wechaty-plugin-yd';
import {EventLogger, QRCodeTerminal} from 'wechaty-plugin-contrib';
import {WechatyWeixinOpenAI} from 'wechaty-weixin-openai';

import {SentimentData, AIBotRequestResponse} from './interface/openApi';
import config from './src/common/constant/config';
import {handleMessage} from './src/event/message';
import {schedule} from './src/schedule';

const noAnswerHook = async (message: Message) => {
    console.log(`No Answer Message: ${message}`);
};

const preAnswerHook = async (message: Message, answer: AIBotRequestResponse, sentiment?: SentimentData) => {
    console.log(`PreAnswerHook() with message: ${message}, answer: ${JSON.stringify(answer)} and sentiment: ${JSON.stringify(sentiment)}`);
    return true;
};

//ipad协议
const bot = new Wechaty({
    puppet: new PuppetPadplus({
        token: config.TOKEN,
    }),
    name: 'Rae',
});

bot.use(EventLogger())
    .use(QRCodeTerminal({small: true}))
    .on('message', handleMessage)
    .use(
        wechatyYouDaoPlugin({
            appId: config.appId,
            privateKey: config.privateKey,
            prefix: 'yd#',
        })
    )
    .use(
        WechatyWeixinOpenAI({
            token: 'XwyiSptIJ4E9dKMs6ubREoRgSteMCN',
            encodingAESKey: 'fV67qqX86gdOH9N4fsSjqMvf3qGwzk0FH5qscKVuRzm',
            mention: true, // default true: require at the bot in room.
            room: true,
            contact: true, // enable direct message.
            includeSentiment: true,
            noAnswerHook,
            preAnswerHook,
        })
    )
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
        schedule(bot);
    });
