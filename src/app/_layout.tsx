import "../../global.css"
import { Link, Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from  '@react-navigation/native'
import { ArrowTopRightOnSquareIcon } from 'react-native-heroicons/outline'

export default function RootLayout() {
  return <ThemeProvider value={DarkTheme}>
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Events", 
          headerLargeTitle: true, 
          headerTransparent: true
        }} 
      />

      <Stack.Screen
        name="camera"
        options={{ 
          title: "Camera",
          headerBackButtonDisplayMode: "minimal", 
          headerTransparent: true,
          headerBlurEffect: 'dark',
          headerRight: () => (
            <Link href="/camera" className="font-bold text-white">
              <ArrowTopRightOnSquareIcon size={24} color={'white'}/>
            </Link>
          )
        }}
      />
      
    </Stack>
  </ThemeProvider>
}