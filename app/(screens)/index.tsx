import CheckoutForm from "@/components/checkout-form.native";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from "react";
import CheckIcon from "@/components/Icons/check";

const CartData = [
  {
    id: 1,
    name: "Organic Valley Whole Milk",
    price: 4.29,
    amount: 2,
  },
  {
    id: 2,
    name: "Fuji Apple (Large)",
    price: 1.49,
    amount: 6,
  },
  {
    id: 3,
    name: "Sourdough Bread Loaf",
    price: 5.99,
    amount: 1,
  },
  {
    id: 4,
    name: "Atlantic Salmon Fillet",
    price: 12.99,
    amount: 2,
  },
  {
    id: 5,
    name: "Ben & Jerry's Ice Cream",
    price: 6.50,
    amount: 3,
  },
]

export default function HomeScreen() {

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["75%"], []);


  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <View className="flex-1 items-center py-4">
      <Text className="font-bold text-2xl">Cart</Text>
      <FlatList
        className="w-full"
        data={CartData}
        renderItem={({ item }) => <CartItem name={item.name} price={item.price} amount={item.amount} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <View className="w-full p-4 border-t border-zinc-200">
        <CheckoutForm onSuccess={handlePresentModalPress} amount={CartData.reduce((acc, item) => acc + item.price * item.amount, 0)} />
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 items-center justify-center p-8">
          <View className="flex-col items-center gap-4">
            <CheckIcon width={128} height={128} color={"#15803d"} />
            <Text className="font-bold text-2xl text-center">Payment successful!{"\n"}Thank you for choosing us. 🎉</Text>
          </View>
          <TouchableOpacity className="bg-zinc-900 w-full p-4 rounded-3xl absolute bottom-8" onPress={() => bottomSheetModalRef.current?.close()}>
            <Text className="text-center text-white text-lg font-bold">Close</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}

function CartItem({
  amount = 1,
  name,
  price,
}: {
  amount?: number;
  name: string;
  price: number;
}) {
  return (
    <View className="flex-row items-center w-full justify-between p-4 border-b border-zinc-200">
      <View className="flex-row items-center gap-4">
        <View className="w-20 rounded-3xl aspect-square bg-zinc-300" />
        <View>
          <Text className="text-lg font-medium">
            {name}
          </Text>
          <Text>
            ${price}
          </Text>
        </View>
      </View>
      <View className="w-14 aspect-square border border-zinc-300 rounded-2xl flex-row items-center justify-center">
        <Text>
          {amount}
        </Text>
      </View>
    </View>
  )
}