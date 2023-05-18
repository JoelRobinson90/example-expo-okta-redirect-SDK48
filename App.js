import { useEffect, useState } from 'react';
import * as Crypto from 'expo-crypto';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useAuthRequest, useAutoDiscovery, makeRedirectUri } from 'expo-auth-session';
import Constants from 'expo-constants';

const { url, redirect, clientId, pkfcSecureString } = Constants.expoConfig.extra;
const SCOPES = ['openid', 'profile', 'email', 'phone', 'offline_access'];

export default function App() {
  const [codeChallenge, setCodeChallenge] = useState();

  const discovery = useAutoDiscovery(`${url}/oauth2/default`);
  const redirectUri = makeRedirectUri({
    path: redirect,
  });

  const [_, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: SCOPES,
      redirectUri,
      usePKCE: true,
      codeChallenge,
      codeChallengeMethod: 'S256',
    },
    discovery,
  );

  useEffect(() => {
    if (!response) {
      (async () => {
        const digest = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          pkfcSecureString,
        );
        setCodeChallenge(digest);
      })();
    }
  }, [response]);

  const onPress = () => {
    promptAsync()
  }

  return (
    <View style={styles.container}>
      <Text>redirectUri: {redirectUri}</Text>
      <Button title='Log In' onPress={onPress} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
