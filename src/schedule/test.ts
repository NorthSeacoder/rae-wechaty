import demo from '../common/resource/index';

const params={
    key:'b4f6836068fee09831e9275468b997b1'
};
// @ts-ignore
demo.getEveryDayEn({params}).then(({data})=>{
    console.log(data)
})