import {Wechaty} from 'wechaty';
import {CronJob} from 'cron';
import _ from 'lodash';
import moment from 'moment';

import res from '../common/resource';
import config from '../common/constant/config';
const key = config.APIKEY;

export const getEveryDayEn = async () => {
    const date = moment().format('YYYY-MM-DD');
    let info = {
        date: '',
        content: '',
        note: '',
    };
    const {
        data: {body, code}, // @ts-ignore
    } = await res.getCachedEveryEn({params: {date}});
    if (code == 0) {
        info = body;
    } else {
        const {
            data: {newslist}, // @ts-ignore
        } = await res.getEveryDayEn({params: {key}});
        info = newslist[0];
        // @ts-ignore
        await res.setCachedEveryEn({info});
    }
    const text = _.trim(`日期:${info.date},\n英文:${info.content},\n中文:${info.note}`);
    return text;
};
export default async (bot) => {
    const room = await bot.Room.find({topic: 'bot'});
    const text = await getEveryDayEn();
    // @ts-ignore
    await room.say(text);
};
