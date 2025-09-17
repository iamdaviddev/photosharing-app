import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/authProvider";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Home() {
  const { isAuthenticated, user } = useAuth()

  console.log(isAuthenticated, user)

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