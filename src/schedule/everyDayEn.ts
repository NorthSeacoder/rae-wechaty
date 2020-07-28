import {Wechaty} from 'wechaty';
import {CronJob} from 'cron';
import _ from 'lodash';
import moment from 'moment';

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
            const date = moment().format('YYYY-MM-DD');
            let info={
                date:'',
                content:'',
                note:''
            }
            try {
                // @ts-ignore
                const {data: {body},code}=await res.getCachedEveryEn({params: {date}})
                console.log(body)
                if(code==0){
                    info=body
                }else{
                    // @ts-ignore
                    const {data: {newslist}} = await res.getEveryDayEn({params: {key}});
                    info=newslist;
                    // @ts-ignore
                    await res.setCachedEveryEn({info})
                }
                
                const text = _.trim(`日期:${info.date},\n英文:${info.content},\n中文:${info.note}`);
                await room.say(text); 
            } catch (error) {
                console.log(error)
            }
            
        },
        null,
        true,
        'Asia/Shanghai'
    );
};
