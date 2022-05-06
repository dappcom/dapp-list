/** 模糊搜索匹配，传入目标数组和搜索的关键词 */
export function FuzzySearch(targetArr, keyVal) {
  if (Array.isArray(targetArr)) {
    return targetArr.filter((item) => {
      let prop = 'name'
      if (item.title) {
        prop = 'title'
      }
      let flag = false
      if (item.dapp_list) {
        flag = item.dapp_list.some((dapp) => {
          return (
            dapp.title.toLowerCase().indexOf(keyVal.toLowerCase()) > -1 ||
            dapp.url.toLowerCase().indexOf(keyVal.toLowerCase()) > -1
          )
        })
      }
      return item[prop].toLowerCase().indexOf(keyVal.toLowerCase()) > -1 || flag
    })
  }
}

export const chainNameMap = {
  1: 'Ethereum',
  10: 'Optimistic',
  56: 'BSC',
  66: 'OKExChain',
  128: 'HECO',
  137: 'Polygon',
  250: 'Fantom',
  8217: 'Klaytn',
  43114: 'AVAX',
  1666600000: 'Harmony',
}

export const courseUrl =
  'https://theodore-ratliff.gitbook.io/fen-xiang/CN/tp-tutorial/dapplist'

export const courseEnUrl =
  'https://theodore-ratliff.gitbook.io/fen-xiang/EN/tutorial/dapplist'
