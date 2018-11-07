/**
 * Created by Administrator on 2017/4/12.
 */
export const lowercase =(str)=>{
  if (!str) return ''
  str = str.toString()
  return str.toLowerCase()
}

export const uppercase =(str)=>{
  if (!str) return ''
  str = str.toString()
  return str.toUpperCase()
}

export const capitalize =(str)=>{
  if (!str) return ''
  str = str.toString()
  return str[0].toUpperCase() + str.slice(1)
}

//迭代状态
export const payType =(str)=>{
  if(str == 'cash'){
    return '现金';
  }else if(str == 'wechat'){
    return '微信';
  }else if(str == 'alipay'){
    return '支付宝';
  } else if(str=='card'){
    return '银行卡'
  }else if(str=='other'){
    return '其他'
  }
}



