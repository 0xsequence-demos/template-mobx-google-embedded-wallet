import React, { useEffect }from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useSessionHash } from './embeddedWallet/useSessionHash'
import './App.css'

//@ts-ignore
import { observer } from 'mobx-react';
import sequence from './embeddedWallet/SequenceEmbeddedWallet'

const App = observer((props: any) => {
  const { sessionHash } = useSessionHash()
  const handleGoogleLogin = async (tokenResponse: CredentialResponse) => {
    props.waas.signIn(tokenResponse.credential)
  }

  useEffect(() => {
    // on refresh sign out
    setTimeout(async () => {
      if(await sequence.isSignedIn()){
        try {
          const sessions = await sequence.listSessions()
    
          for(let i = 0; i < sessions.length; i++){
            await sequence.dropSession({ sessionId: sessions[i].id })
          }
        }catch(err){
          console.log(err)
        }
      }
    }, 0)
  }, [])

  return (
    <div className="App">
      <div>
        <img src="https://sequence.xyz/sequence-wordmark.svg" alt="Sequence" />
        <span style={{ color: 'white', padding: '20px 10px' }}>x</span>
        <img src="https://mobx.js.org/assets/mobx.png" alt="MobX" width={'22px'} />
      </div>
      {!props.waas.wallet && (
        <div style={{marginTop: '100px'}}>
        <GoogleLogin
          nonce={sessionHash}
          key={sessionHash}
          onSuccess={handleGoogleLogin}
          shape="circle"
          width={230}
        />
        </div>

      )}
      <p>{props.waas.walletAddress}</p>
      {props.waas.walletAddress && <button onClick={() => props.waas.signMessage()}>Sign Message</button> }
      <p>{props.waas.authProof}</p>
    </div>
  );
});

export default App;
