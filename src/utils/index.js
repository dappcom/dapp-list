import _ from 'loadsh'

/** 模糊搜索匹配，传入目标数组和搜索的关键词 */
export function FuzzySearch(targetArr, val) {
  let keyVal = val.trim()
  if (Array.isArray(targetArr)) {
    return targetArr.filter((item) => {
      let prop = 'name'
      if (item.title) {
        prop = 'title'
      }
      let flag = false
      if (item.dapp_list) {
        flag = item.dapp_list.some((dapp) => {
          return dapp.title.toLowerCase().indexOf(keyVal.toLowerCase()) > -1
        })
      }
      // dapp.url.toLowerCase().indexOf(keyVal.toLowerCase()) > -1
      let searchDapps = []
      let otherDapps = []
      if (item.dapp_list) {
        searchDapps = item.dapp_list.filter((dapp) => {
          return dapp.title.toLowerCase().indexOf(keyVal.toLowerCase()) > -1
        })
      }
      if (item.dapp_list) {
        otherDapps = item.dapp_list.filter((dapp) => {
          return dapp.title.toLowerCase().indexOf(keyVal.toLowerCase()) === -1
        })
      }
      item.searchDapps = searchDapps
      item.otherDapps = otherDapps
      // console.log('searchDapps', searchDapps)
      // console.log('otherDapps', otherDapps)
      return item[prop].toLowerCase().indexOf(keyVal.toLowerCase()) > -1 || flag
    })
  }
}

export function FuzzySearchDappList(targetArr, val) {
  let keyVal = val.trim()
  if (Array.isArray(targetArr)) {
    return targetArr.filter((item) => {
      return item.name.toLowerCase().indexOf(keyVal.toLowerCase()) > -1
    })
  }
}

export function FuzzySearchDapps(targetArr, val) {
  let keyVal = val.trim()
  if (Array.isArray(targetArr)) {
    let dappsList = []
    targetArr.forEach((item) => {
      dappsList = [...item.dapp_list, ...dappsList]
    })
    // 去重
    // dappsList = _.uniqWith(dappsList, _.isEqual)
    dappsList = arrayUnique(dappsList, 'title')
    // console.log('dappsList', dappsList)
    return dappsList.filter((dapps) => {
      return dapps.title.toLowerCase().indexOf(keyVal.toLowerCase()) > -1
    })
  }
}

function arrayUnique(arr, name) {
  var hash = {}

  return arr.reduce(function (item, next) {
    hash[next[name]] ? '' : (hash[next[name]] = true && item.push(next))

    return item
  }, [])
}

export const chainNameMap = {
  1: 'Ethereum',
  10: 'Optimistic',
  56: 'BSC',
  66: 'OKExChain',
  128: 'HECO',
  137: 'Polygon',
  250: 'Fantom',
  321: 'KCC',
  8217: 'Klaytn',
  43114: 'AVAX',
  1666600000: 'Harmony',
}

export const courseUrl =
  'https://theodore-ratliff.gitbook.io/fen-xiang/CN/tp-tutorial/dapplist'

export const courseEnUrl =
  'https://theodore-ratliff.gitbook.io/fen-xiang/EN/tutorial/dapplist'
