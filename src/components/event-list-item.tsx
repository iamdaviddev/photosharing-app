import { Text, View, Pressable } from "react-native";

import { Tables } from "@/types/database.types";
import { Link } from "expo-router";

type Event = Tables<'events'>;

type EventListProps = {
  event: Event,
}

export default function EventListItem({ event }: EventListProps) {
  return(
    <Link href={`/events/${event.id}`} asChild>
      <Pressable className="bg-neutral-800 p-4 rounded-lg">
        <Text className="text-white text-2xl font-bold">{event.name}</Text>
      </Pressable>
    </Link>
  )
}

