import { formatter } from 'date-fns'
import { format } from 'date-fns/esm'

export function dateToString(date) {
  // 日付が存在しない場合
  if (!date) {
    return ''
  }
  // 日付が存在した場合
  return format(date, 'yyyy年M月d日 HH時mm分')
}
