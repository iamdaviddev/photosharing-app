import { 
  CameraView, 
  CameraType, 
  useCameraPermissions 
} from 'expo-camera';
import { useRef, useState } from 'react';

import { 
  ActivityIndicator, 
  Button, 
  Pressable, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const camera = useRef<CameraView>(null)

  if (!permission) {
    return <ActivityIndicator className='flex-1 items-center justify-center bg-slate-900' />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto() {
    console.log("Image captured")
    const photo = await camera.current?.takePictureAsync()

    console.log(JSON.stringify(photo, null, 2))
  }

  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <View 
          className='absolute bottom-0 bg-neutral-900/20 h-10 w-full'
        >
          <Ionicons
            name="camera-reverse-outline" 
            size={24} 
            color={'white'}
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>

      {/* Footer */}
      <SafeAreaView
        edges={['bottom']}
        className='flex-row bg-transparent w-full p-4 justify-center items-center'
      >
        <Pressable
          onPress={takePhoto} 
          className='bg-white rounded-full w-20 h-20'
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
