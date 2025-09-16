import { Text, useWindowDimensions, View } from "react-native";
import { AdvancedImage } from "cloudinary-react-native";
import { cloudinary } from "@/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize"
import { artisticFilter } from "@cloudinary/url-gen/actions/effect";

export default function Event() {
  const { width } = useWindowDimensions()
  return(
    <View>
      <Text className="text-white">Event</Text>

      <AdvancedImage
        cldImg={cloudinary
          .image('mkh64fuquzqlfx1zbxlv')
          .resize(
            thumbnail()
        )
        .effect(artisticFilter('incognito'))
        }
        className="w-full aspect-[3/4] h-auto"
      />
    </View>
  )
}