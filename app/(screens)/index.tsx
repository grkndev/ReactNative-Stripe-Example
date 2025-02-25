import CheckoutForm from "@/components/checkout-form.native";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

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
  const router = useRouter();
  return (
    <View className="flex-1 items-center py-4">
      <Text className="font-bold text-2xl">Sepet</Text>
      <FlatList
        className="w-full"
        data={CartData}
        renderItem={({ item }) => <CartItem name={item.name} price={item.price} amount={item.amount} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <View className="w-full p-4 border-t border-red-200">
        <CheckoutForm amount={CartData.reduce((acc, item) => acc + item.price * item.amount, 0)} />
      </View>
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
    <View className="flex-row items-center w-full justify-between p-4 border-b border-red-200">
      <View className="flex-row items-center gap-4">
        <View className="w-20 rounded-2xl aspect-square bg-red-300" />
        <View>
          <Text className="text-lg font-medium">
            {name}
          </Text>
          <Text>
            ${price}
          </Text>
        </View>
      </View>
      <View className="w-14 aspect-square border border-red-300 rounded-2xl flex-row items-center justify-center">
        <Text>
          {amount}
        </Text>
      </View>
    </View>
  )
}