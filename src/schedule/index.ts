import { Wechaty } from 'wechaty'

import everyDayEn from './everyDayEn'
// import articleBot from './article'

export async function schedule (bot: Wechaty) {
  await everyDayEn(bot)
}