import * as constants from '@/store/constants'
import CertifierContract from '@/contracts/Certifier.json'

const state = {
  provider: !!(window.web3 && window.web3.currentProvider),
  isOwner : false,
  name: null,
  contract: null,
  coinbase: null
}

const actions = {
  [constants.CERTIFIER_INIT]: ({commit}) => {
    const abi = CertifierContract.abi
    const contractAddress = '0x8667723c408c809d73563b158075eb0e6a304e7d'
    const instance = web3.eth.contract(abi).at(contractAddress)
    commit(constants.CERTIFIER_SET_INSTANCE, instance)
    web3.eth.getCoinbase( (error,coinbase) =>{
      if( error) console.log( error)
      commit( constants.CERTIFIER_SET_COINBASE, coinbase)
      instance.isOwner({from: coinbase}, (error, isOwner) => {
        if(error) console.error(error)
        commit( constants.CERTIFIER_SET_IS_OWNER, isOwner)
      })
      instance.getName({from: coinbase}, (error, name) =>{
        if( error) console.error(error)
        commit( constants.CERTIFIER_SET_NAME, name )
      })
    })
  },
  [constants.CERTIFIER_CHANGE_NAME]:({commit, state},data)=>{
    state.contract.setName(data,{from:state.coinbase},(error,res)=>{
      if(error) console.error(error)
      console.log("RES",res)
      commit( constants.CERTIFIER_SET_NAME, res )
    })
  }



}

const mutations = {
  [constants.CERTIFIER_SET_INSTANCE] : (state, instance) =>{
    state.contract = instance
  },
  [constants.CERTIFIER_SET_COINBASE] : (state, coinbase) =>{
    state.coinbase = coinbase
  },
  [constants.CERTIFIER_SET_IS_OWNER] : (state, isOwner) =>{
    state.isOwner = isOwner
  },
  [constants.CERTIFIER_SET_NAME] : (state, name) =>{
    state.name = name
  }

}

const getters = {}

export default{
  state,
  actions,
  mutations,
  getters
}