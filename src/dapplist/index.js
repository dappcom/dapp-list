const collection1 = require('../dapplist/AllNFT.json')
const collection2 = require('../dapplist/AVAX.json')
const collection3 = require('../dapplist/EthereumdApps.json')
const collection4 = require('../dapplist/EverythingBSC.json')
const collection5 = require('../dapplist/Fantom.json')
const collection6 = require('../dapplist/GameFi.json')
const collection7 = require('../dapplist/Harmony.json')
const collection8 = require('../dapplist/HECO.json')
const collection9 = require('../dapplist/Klaytn.json')
const collection10 = require('../dapplist/OKXChain.json')
const collection11 = require('../dapplist/Optimistic.json')
const collection12 = require('../dapplist/Polygon.json')
const collection13 = require('../dapplist/Solana.json')
const collection14 = require('../dapplist/TRON.json')

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
]

dappCollection.forEach((item, index) => {
  item.id = index
})

export default dappCollection
