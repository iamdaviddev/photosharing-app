import { 
  ActivityIndicator, 
  FlatList, 
  Pressable, 
  Text, 
  View 
} from "react-native";

import { 
  Link, 
  Stack, 
  useLocalSearchParams 
} from "expo-router";

import AssetItem from "@/components/asset-item";

import { useQuery } from "@tanstack/react-query";
import { getEvent } from "@/services/events";

import { CameraIcon } from "react-native-heroicons/outline";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()
  
  const { data: event, isLoading, error, isRefetching, refetch } = useQuery({
    queryKey: ['events', id],
    queryFn: () => getEvent(id)
  })

  if(isLoading) return <ActivityIndicator className="flex-1 items-center justify-center"/>

  if(error) {
    return <Text>Error: {error.message}</Text>
  }

  if(!event){
    return <Text>Event not found</Text>
  }

  return(
    <>
      <Stack.Screen 
        options={{ 
          title: event.name 
        }} 
      />

      <FlatList
        data={event.assets}
        numColumns={2}
        contentContainerClassName="gap-1 p-4"
        columnWrapperClassName="gap-4"
        renderItem={({ item }) => <AssetItem asset={item}/>}
        refreshing={isRefetching}
        onRefresh={refetch}
      />

      <Link href={`/events/${id}/camera`} asChild>
        <Pressable className="absolute bottom-12 right-4 flex-row items-center justify-center bg-purple-600 p-4 rounded-full">
          <CameraIcon size={28} color={'white'}/>
        </Pressable>
      </Link>
    </>
  )
}