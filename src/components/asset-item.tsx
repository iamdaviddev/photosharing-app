import { Tables } from "@/types/database.types";

import { AdvancedImage } from "cloudinary-react-native";
import { cloudinary } from "@/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize"
import { artisticFilter } from "@cloudinary/url-gen/actions/effect";
import { useWindowDimensions } from "react-native";

export default function AssetItem({ asset }: {asset: Tables<"assets">}) {
  const { width } = useWindowDimensions()
  return(
    <AdvancedImage
      cldImg={cloudinary
        .image(asset.asset_id!)
        .resize(
          thumbnail()
            
      )
      .effect(artisticFilter('incognito'))
      }
      className="flex-1 w-full aspect-[3/4] h-auto"
    />
  )
}