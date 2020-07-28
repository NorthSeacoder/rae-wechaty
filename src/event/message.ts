import { Message } from 'wechaty'
import _ from 'lodash'

import * as fund from '../message/fund'
import * as oa from '../message/oa'
import test from '../message/test'

const defaultRoute = { keyword: '', handle: fund.topFund }
const routes = [
  { keyword: '基金', handle: fund.topFund },
  { keyword: 'test', handle: test },
  { keyword: '生日', handle: oa.getEmployeeBirth },
  { keyword: '日报', handle: oa.getWxTemplate },
  // { keyword: '文章', handle: recentArticle },
  defaultRoute
]

async function reply (msg: Message, _data) {
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
