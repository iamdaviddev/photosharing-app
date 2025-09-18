import EventListItem from "@/components/event-list-item";
import { useAuth } from "@/providers/AuthProvider";
import { getEvents, getEventsForUser } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ActivityIndicator, Text, View, FlatList, Pressable } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { user } = useAuth()
  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: () => getEventsForUser(user!.id),
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
        ListHeaderComponent={()=> (
          <Link href='/events/create' asChild>
            <Pressable className="bg-purple-600 p-4 rounded-lg flex-row items-center justify-center gap-2">
              <PlusIcon size={24} color={'white'}/>
              <Text className="text-white text-lg font-semibold">Create event</Text>
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  )
}