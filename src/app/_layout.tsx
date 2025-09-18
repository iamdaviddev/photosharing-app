import "../../global.css"
import { Link, Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from  '@react-navigation/native'
import { ArrowTopRightOnSquareIcon } from 'react-native-heroicons/outline'
import AuthProvider from "../providers/AuthProvider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {

  return <ThemeProvider value={DarkTheme}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
            name="events/[id]/index" 
            options={{ 
              title: "Event", 
              headerLargeTitle: true,
              headerTransparent: true,
              headerBackButtonDisplayMode: 'minimal'
            }} 
          />

          <Stack.Screen
            name="events/[id]/camera"
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
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
}