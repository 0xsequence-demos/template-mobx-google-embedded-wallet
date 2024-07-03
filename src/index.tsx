import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import WaaS from './observableClass/ObservableWaaS'
import { useSessionHash } from './embeddedWallet/useSessionHash'
import { GoogleOAuthProvider } from '@react-oauth/google'

function Dapp() {
  const { sessionHash } = useSessionHash()

  return (
		<GoogleOAuthProvider clientId="908369456253-9ki3cl7bauhhu61hgtb66c1ioo0u2n24.apps.googleusercontent.com" nonce={sessionHash} key={sessionHash}>
      <App waas={new WaaS()}/>
		</GoogleOAuthProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
        <Dapp/>
  </React.StrictMode>
)