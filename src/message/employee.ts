import {Wechaty} from 'wechaty';
import res from '../common/resource';

export const getEmployeeBirth = async () => {
    //@ts-ignore
    const {data:{body}} = await res.getEmployeeBirth();
    console.log(body);
    return ['本月生日员工 \n',...body.map(item=>handleSingleEmployee(item))]
    // return Object.keys(body).map(key => `${key}: ${body[key]}`).join('\n')
  }


  const handleSingleEmployee=(employee)=>{
    const {department,name,location,birthday}=employee;
    return `${location} ${department} ${name} ${birthday} \n`
  }