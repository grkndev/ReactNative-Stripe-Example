import "@/global.css"
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { StatusBar } from "expo-status-bar"
import StripeProvider from '@/components/stripe-provider';


export default function RootLayout() {
  return (
    <StripeProvider>
      <StatusBar style="dark" />
      <Stack >
        <Stack.Screen name="(screens)" options={{ headerShown: false, animation:"simple_push" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </StripeProvider >
  );
}
