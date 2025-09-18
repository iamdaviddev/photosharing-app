import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';

export default function Share() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return(
    <View className="flex-1 p-4 gap-4 items-center mt-44">
      <Text className="text-white text-2xl font-bold">
        Share Event with your friends
      </Text>

      <QRCode
        value={`exp://192.168.100.4:8081/--/events/${id}/join`}
        size={300}
      />

    </View>
  )
}