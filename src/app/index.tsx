import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/authProvider";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Home() {
  const { isAuthenticated, user } = useAuth()

<<<<<<< HEAD
  if(isLoading){
    return <ActivityIndicator className="flex-1 items-center justify-center"/>
  }

  if(error){
    return <Text>Error: {error.message}</Text>
  }
=======
  console.log(isAuthenticated, user)
>>>>>>> fe64b31a27751ae378d810bfd00495d77c9c2d56

  return(
    <View className="flex-1 justify-center items-center gap-4">
      <Link href="/camera" className="font-bold text-white">
        Open Camera
      </Link>

      <Link href="/event" className="font-bold text-white">
        Event details
      </Link>
    </View>
  )
}