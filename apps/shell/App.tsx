import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

// 개발 중엔 Metro를 띄운 PC의 IP로 webview(Vite) 개발 서버에 붙는다.
// ponytail: prod URL은 배포 주소 정해지면 교체
const devHost = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';
const WEBVIEW_URL = __DEV__ ? `http://${devHost}:5173` : 'https://example.com';

export default function App() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: WEBVIEW_URL }} style={styles.container} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
