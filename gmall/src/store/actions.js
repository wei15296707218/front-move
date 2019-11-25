
//给action注册事件处理函数.
 export  function setUserInfo({commit},user){
 return commit('setUserInfo',user)
}
export  function isShowfootbar({commit},isShow){
  return commit('isShowfootbar',isShow)
}

