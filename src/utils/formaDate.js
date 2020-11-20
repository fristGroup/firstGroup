export default function formaDate(time, flag) {
  let date = new Date(time);
  let dateStr;
  // 获取年
  const y = date.getFullYear();
  // 获取月份
  const M = date.getMonth() + 1;
  // 获取日期
  const d = date.getDate();
  // 获取小时
  let h = date.getHours();
  h = h >= 10 ? h : "0" + h;
  // 获取分钟
  let m = date.getMinutes();
  m = m >= 10 ? m : "0" + m;
  // 获取秒
  let s = date.getSeconds();
  s = s >= 10 ? s : "0" + s;

  switch (flag) {
    case "m":
      dateStr = `${M}月${d}日`;
      break;
    case "t":
      dateStr = `${h}:${m}`;
      break;
    case "s":
      dateStr = `${m}:${s}`;
      break;
    default:
      dateStr = `${y}年${M}月 ${h}:${m}`;
      break;
  }

  return dateStr;
}
