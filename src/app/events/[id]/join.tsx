import { useAuth } from "@/providers/AuthProvider";
import { getEvent, joinEvent } from "@/services/events";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Join() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: event } = useQuery({
    queryKey: ['events', id],
    queryFn: () => getEvent(id)

  })

  const joinEventMutation = useMutation({
    mutationFn: () => joinEvent(id, user.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', id] })
      router.replace(`/events/${id}`)
    }
  })

  return(
    <View className="flex-1 p-4 gap-6 items-center justify-center">
      <Text className="text-neutral-400 text-lg font-bold">
        Your invited to join
      </Text>
      <Text className="text-white text-5xl text-center font-bold">{event?.name}</Text>

      <Pressable onPress={() => joinEventMutation.mutate()} className="bg-purple-600 p-4 rounded-lg">
        <Text className="text-white">Join Event</Text>
      </Pressable>
    </View>
  )
}