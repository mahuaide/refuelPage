/**
 * Created by Administrator on 2017/4/12.
 */
import moment from 'moment';
moment.locale('zh-cn');

export const timeFormate=(time,reg)=>{
  return time?moment(new Date(parseInt(time))).format(reg):"";
}

//计算耗时 X小时Y分
export const calcTime=(secondTime,isCourseTime)=>{
  secondTime = parseInt(secondTime);
  var hour ,minutes;
  if(isCourseTime){
    hour = (secondTime/3600)<1?"":Math.floor(secondTime/3600);
    minutes = (secondTime-hour*3600)/60 <1?"0":(secondTime-hour*3600)/60<10?""+Math.floor((secondTime-hour*3600)/60):Math.floor((secondTime-hour*3600)/60);
  }else{
    hour = (secondTime/3600)<1?"":Math.floor(secondTime/3600);
    minutes = (secondTime-hour*3600)/60 <1?"00":(secondTime-hour*3600)/60<10?"0"+Math.floor((secondTime-hour*3600)/60):Math.floor((secondTime-hour*3600)/60);
  }
  var second = secondTime%60==0?"00":secondTime%60<10?"0"+secondTime%60:secondTime%60;
  if(isCourseTime){
    return ((hour == "" ? "0": hour) + "小时") + minutes + "分";
  }else{
    return (hour == "" ? "": hour + ":") + minutes + ":" + second;
  }
}

//毫秒数，返回（年，月，日，小时，分钟，刚刚）前
export const intervalTime=(val)=>{
  let millisecond = parseInt(val);
  if(millisecond/(365*24*60*60*1000)>=1){
    return Math.floor(millisecond/(365*24*60*60*1000))+"年前";
  }else if(millisecond/(30*24*60*60*1000)>=1){
    return Math.floor(millisecond/(30*24*60*60*1000))+"个月前";
  }else if(millisecond/(24*60*60*1000)>=1){
    return Math.floor(millisecond/(24*60*60*1000))+"天前";
  }else if(millisecond/(60*60*1000)>=1){
    return Math.floor(millisecond/(60*60*1000))+"小时前";
  }else if(millisecond/(60*1000)>=1){
    return Math.floor(millisecond/(60*1000))+"分钟前";
  }else{
    return '刚刚'
  }
}
