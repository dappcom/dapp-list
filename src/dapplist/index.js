const collection1 = require('../../dapps/AllNFT.json')
const collection2 = require('../../dapps/AVAX.json')
const collection3 = require('../../dapps/EthereumdApps.json')
const collection4 = require('../../dapps/EverythingBSC.json')
const collection5 = require('../../dapps/Fantom.json')
const collection6 = require('../../dapps/GameFi.json')
const collection7 = require('../../dapps/Harmony.json')
const collection8 = require('../../dapps/HECO.json')
const collection9 = require('../../dapps/Klaytn.json')
const collection10 = require('../../dapps/OKXChain.json')
const collection11 = require('../../dapps/Optimistic.json')
const collection12 = require('../../dapps/Polygon.json')
const collection13 = require('../../dapps/Solana.json')
const collection14 = require('../../dapps/TRON.json')
const collection15 = require('../../dapps/KCCMainnet.json')
const collection16 = require('../../dapps/Arbitrum.json')
const collection17 = require('../../dapps/ETC.json')

const dappCollection = [
  collection1,
  collection2,
  collection3,
  collection4,
  collection5,
  collection6,
  collection7,
  collection8,
  collection9,
  collection10,
  collection11,
  collection12,
  collection13,
  collection14,
  collection15,
  collection16,
  collection17,
]
const dappCollectionUrl = [
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/AllNFT.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/AVAX.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/EthereumdApps.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/EverythingBSC.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/Fantom.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/GameFi.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/Harmony.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/HECO.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/Klaytn.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/OKXChain.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/Optimistic.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/Polygon.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/Solana.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/TRON.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/KCCMainnet.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/Arbitrum.json',
  'https://gitee.com/dapplist/dappcom/raw/master/dapp-list/ETC.json',
]
const dappCollectionTestUrl = [
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/AllNFT.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/AVAX.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/EthereumdApps.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/EverythingBSC.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/Fantom.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/GameFi.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/Harmony.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/HECO.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/Klaytn.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/OKXChain.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/Optimistic.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/Polygon.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/Solana.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/TRON.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/KCCMainnet.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/Arbitrum.json',
  'https://gitee.com/dapplist/dappcom/raw/dev/dapp-list/ETC.json',
]

dappCollection.forEach((item, index) => {
  item.id = index
  if (process.env.NODE_ENV === 'test') {
    item.url = dappCollectionTestUrl[index]
  } else {
    item.url = dappCollectionUrl[index]
  }
})

export default dappCollection
