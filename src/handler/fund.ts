import res from '../common/resource';

function getFunds () {
  //@ts-ignore
  return res.getFund().then(({ data }) => {
    return JSON.parse(data.slice(14)).datas.map(x => x.split(','))
  })
}

export const topFund = async () => {
  const funds = await getFunds()
  return funds.map(fund => `${fund[0]}: ${fund[1]}`).join('\n')
}
