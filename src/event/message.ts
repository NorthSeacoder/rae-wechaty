import { Message } from 'wechaty'
import _ from 'lodash'

import * as fund from '../handler/fund'
import * as oa from '../handler/oa'
import test from '../handler/test'
import {getEveryDayEn} from '../handler/everyDayEn'

const defaultRoute = { keyword: '', handle: fund.topFund }
const routes = [
  { keyword: '基金', handle: fund.topFund },
  { keyword: 'test', handle: test },
  { keyword: '生日', handle: oa.getEmployeeBirth },
  { keyword: '日报', handle: oa.getWxTemplate },
  { keyword: '每日英语', handle: getEveryDayEn },
  // { keyword: '文章', handle: recentArticle },
  defaultRoute
]

async function reply (msg: Message, _data:any) {
  const data = _.concat(_data)
  for (const text of data) {
    if (text) {
      await msg.say(text)
    }
  }
}

export async function handleMessage (msg: Message) {
  if (msg.type() === Message.Type.Text) {
    if (!msg.room() || (await msg.mentionSelf() && msg.room()!.owner()!.name().includes('nsc'))) {
      const self = msg.to()
      const text = msg.text().replace("@" + self?.name(), '')
      const route = routes.find(route => {
        return text.includes(route.keyword)
      }) || defaultRoute
      const data = await route.handle()
      await reply(msg, data)
    }
  }
}
