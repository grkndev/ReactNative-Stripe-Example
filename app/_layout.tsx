import "@/global.css"
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { StatusBar } from "expo-status-bar"
import StripeProvider from '@/components/stripe-provider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
    <StripeProvider>
      <StatusBar style="dark" />
      <BottomSheetModalProvider>
        <Stack >
          <Stack.Screen name="(screens)" options={{ headerShown: false, animation: "simple_push" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </BottomSheetModalProvider>
    </StripeProvider>
    </GestureHandlerRootView>
  );
}
