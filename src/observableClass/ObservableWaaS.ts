//@ts-ignore
import { observable, action, makeAutoObservable } from "mobx"
import sequence from '../embeddedWallet/SequenceEmbeddedWallet'
import { ethers } from 'ethers'

class WaaS {
    @observable authProof : any = null
    @observable waas : any = null
    @observable walletAddress : any = null
  
    constructor() {
      makeAutoObservable(this)
      this.waas = sequence
    }
  
    @action
    async signIn(idToken: string) {
  
      const res = await this.waas.signIn({
        idToken: idToken // inputted id credential from google
      }, "template")
  
      console.log(res)
      this.walletAddress = res.wallet
    }
  
    @action
    async signMessage() {
      const nonce = ethers.BigNumber.from(
        ethers.utils.hexlify(ethers.utils.randomBytes(20))
      )
      const authProof = await this.waas.sessionAuthProof({ nonce }) 
      console.log(authProof)
      this.authProof = 'authProof'
    }
  }
  
  export default WaaS