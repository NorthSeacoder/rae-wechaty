import {Wechaty} from 'wechaty';
import {CronJob} from 'cron';
import pFilter from 'p-filter';
import _ from 'lodash';

import res from '../common/resource';
import config from '../common/constant/config';
const key = config.APIKEY;

// 找到开头的群名，每天 16:30 定时推送
export default async (bot: Wechaty) => {
    return new CronJob(
        '0 30 16 */1 * *',
        // '0 */1 * * * *',
        async () => {
            const room = await bot.Room.find({topic: 'bot'});
            // @ts-ignore
              const {data:{newslist}} = await res.getEveryDayEn({params:{key}})
            const text=_.trim(`
            日期:${newslist[0].date},
            英文:${newslist[0].content},
            中文:${newslist[0].note}
            `)
            await room.say(text);
        },
        null,
        true,
        'Asia/Shanghai'
    );
};
