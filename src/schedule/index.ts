import { Wechaty } from 'wechaty'
import {CronJob} from 'cron';
import everyDayEn from '../handler/everyDayEn'
// import articleBot from './article'

export async function schedule (bot: Wechaty) {
  // await everyDayEn(bot)
  new CronJob(
    '0 30 16 */1 * *',
    // '0 */1 * * * *',
    async () => {
        await everyDayEn(bot)
    },
    null,
    true,
    'Asia/Shanghai'
)
}