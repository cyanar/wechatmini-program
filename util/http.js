import {config} from '../config.js';
const tips = {
  1:"错误",
  1007: 'appKey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在 ',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  3000: '该期内容不存在'
}
export default class HTTP {
   request(params){
     const {
       method,
       url,
       data
     } = params;
     if(!method){
       params.method = "GET";
     }
     wx.request({
       url: config.api_base_url + url,
       method,
       data,
       header: {
         'content-type':'application/json',
         'appKey': config.appKey
       },
       success: (res)=>{
         if(!params.success) return;
         let code = res.statusCode;
         if(String(code).startsWith('2')){  
            params.success(res.data);
         }else {
            let errorCode = res.data.error_code;
            this._show_errorCode(errorCode);
         }
       },
       fail: (err)=>{
        this._show_errorCode(1);
       }
     })
   }
   _show_errorCode(errorCode){
      if(!errorCode){
        errorCode = 1;
      }
      wx.showToast({
        title:tips[errorCode],
        icon: 'none',
        duration: 2000
      })
   }
}