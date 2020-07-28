import {Resource} from '@nsea/tools';
import config from '../constant/config'
const {nscBaseUrl} =config;

const api = {
    url: '',
    getEveryDayEn: {
        url: 'http://api.tianapi.com/txapi/everyday/index',
        method: 'get',
    },
    getFund:{
        url:'http://fund.eastmoney.com/data/FundGuideapi.aspx?dt=0&rs=1y,100_1n,100_3n,100_2n,100',
        method:'get'
    },

    //nsc
    getEmployeeBirth:{
        url:nscBaseUrl+'/employee/birth',
        method:'get'
    },
    getCachedEveryEn:{
        url:nscBaseUrl+'/caches',
        method:'get'
    },
    
    setCachedEveryEn:{
        url:nscBaseUrl+'/caches',
        method:'post'
    }



};

export default Resource.create(api);
