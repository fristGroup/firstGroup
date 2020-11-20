export default function formaDate(time, flag) {
  let date = new Date(time);
  let nowDate = new Date();
  // 获取当前时间的信息
  let nowDay = nowDate.getDate();
  let nowY = nowDate.getFullYear();
  let nowH = nowDate.getHours();
  let nowM = nowDate.getMinutes();

  let dataStr;
  // 获取年
  const y = date.getFullYear();
  // 获取月份
  const M = date.getMonth() + 1;
  // 获取日期
  const d = date.getDate();
  // 获取小时
  let h = date.getHours();

  let _h = h >= 10 ? h : "0" + h;
  // 获取分钟
  let m = date.getMinutes();

  let _m = m >= 10 ? m : "0" + m;

  let s = date.getSeconds();
  s = s >= 10 ? s : "0" + s;

  if (flag) {
    switch (flag) {
      case "m":
        dataStr = `${M}月${d}日`;
        break;
      case "h":
        dataStr = `${_h}:${_m}`;
        break;
      case "s":
        dataStr = `${_m}:${s}`;
        break;
    }
  } else {
    if (y < nowY) {
      // 如果不是今年的评论，则展示年份
      dataStr = `${y}年${M}月${d}日 ${_h}:${_m}`;
    } else {
      if (nowDay === d) {
        if (nowH === h || (nowH - h === 1 && m > nowM)) {
          dataStr = `${m}分钟前`;
        } else {
          // 如果是当天的评论，则只显示时间
          dataStr = nowH - h <= 1 ? `${m}分钟前` : `${_h}:${_m}`;
        }
      } else if (nowDay - 1 === d) {
        dataStr = `昨天 ${_h}:${_m}`;
      } else {
        dataStr = `${M}月${d}日 ${_h}:${_m}`;
      }
    }
  }

  return dataStr;
}
