import { Text, View } from "react-native";

import { Tables } from "@/types/database.types";

type Event = Tables<'events'>;

type EventListProps = {
  event: Event,
}

export default function EventListItem({ event }: EventListProps) {
  return(
    <View className="bg-neutral-800 p-4 rounded-lg">
      <Text className="text-white text-2xl font-bold">{event.name}</Text>
    </View>
  )
}