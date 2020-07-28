import {Wechaty} from 'wechaty';
import res from '../common/resource';
import moment from 'moment'

export const getEmployeeBirth = async () => {
    //@ts-ignore
    const {data:{body}} = await res.getEmployeeBirth();
    return ['本月生日员工 \n',...body.map(item=>handleSingleEmployee(item))]
  }

  export const getWxTemplate = async () => {
    const now=moment().format('MM月DD日')
    return `【企课网】\n人力资源部  曹芮\n${now}   工作汇报\n共计面试 人\n     ： 人\n①\n②\n③\n【2020跟随企课网一起奔跑】\n`
  }

  const handleSingleEmployee=(employee)=>{
    const {department,name,location,birthday}=employee;
    return `${location} ${department} ${name} ${birthday} \n`
  }