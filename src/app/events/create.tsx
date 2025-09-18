import { useState } from "react";
import { createEvent } from "@/services/events";
import { Button, Pressable, Text, TextInput, View } from "react-native";

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";

export default function CreateEvent() {
  const [name, setName] = useState('')
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const createEventMutation = useMutation({
    mutationFn: () => createEvent({ name, owner_id: user?.id }, user!.id),
    onSuccess: (data) => {
      setName('')
      queryClient.invalidateQueries({ queryKey: ['events'] })
      router.replace(`/events/${data.id}`)
    },
  })

  return(
    <View className="flex-1 p-4 gap-3">
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Event name"
        className="bg-neutral-800 p-5 text-white rounded-lg"
        placeholderTextColor='gray'
      />

      <Pressable 
        onPress={()=> createEventMutation.mutate()} 
        className="bg-purple-600 p-4 mt-6 rounded-lg"
      >
        <Text className="text-white text-center font-bold">Create event</Text>
      </Pressable>
    </View>
  )
}