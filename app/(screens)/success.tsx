import CheckIcon from "@/components/Icons/check";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function SuccessScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-8 px-8">
      <CheckIcon width={128} height={128} color={"#15803d"} />
      <Text className="text-center text-2xl font-bold text-green-700">
        Ödemeniz başarıyla alındı. {"\n"}Bizi tercih ettiğiniz için{"\n"}teşekkür ederiz.
      </Text>
      <TouchableOpacity onPress={() => router.dismissTo('/')} className="bg-orange-500 p-4 w-full items-center justify-center rounded-2xl">
        <Text className="text-white font-bold text-lg">Anasayfaya dön</Text>
      </TouchableOpacity>
    </View>
  )
}