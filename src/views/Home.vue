<template>
  <div class="home">
    <div>
      Name: {{name}}
    </div>
    <div>
      Account: {{coinbase}}
    </div>
    <div>
      Is Ownwer? :{{isOwner ? 'Yes': 'No'}}
    </div>
    <input type="text" placeholder="cambie aqui el nombre" v-model="newName">
    <button @click="changeName(newName)">cambiar nombre</button>
  </div>
</template>

<script>

import {mapActions, mapState } from 'vuex'
import * as constants from '@/store/constants'

export default {
  name: 'home',
  computed: {
    ...mapState({
      name: state => state.Certifier.name,
      coinbase: state => state.Certifier.coinbase,
      isOwner: state => state.Certifier.isOwner
    })
  },
  data(){
    return {
      newName: null
    }
  },
  methods:{
    ...mapActions({
      init: constants.CERTIFIER_INIT,
      changeName : constants.CERTIFIER_CHANGE_NAME
    })
    
  },
  created () {
    this.init()
  }
}
</script>
