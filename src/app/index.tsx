import EventListItem from "@/components/event-list-item";
import { getEvents } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  if(isLoading){
    return <ActivityIndicator className="flex-1 items-center justify-center"/>
  }

  if(error){
    return <Text>Error: {error.message}</Text>
  }

  return(
    <SafeAreaView className="flex-1">
      <FlatList 
        data={data}
        contentContainerClassName="gap-4 p-4"
        renderItem={({ item })=> <EventListItem event={item}/>}
        contentInsetAdjustmentBehavior="automatic"
        className="mt-14"
      />
    </SafeAreaView>
  )
}