import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Home() {
  useEffect(()=> {
    supabase
      .from('events')
      .select('*, assets(*)')
      .then((data) => console.log(JSON.stringify(data, null, 2)))
  }, [])

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