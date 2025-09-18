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

import { uploadToCloudinary } from '@/lib/cloudinary';
import { CameraIcon } from 'react-native-heroicons/outline';
import { useLocalSearchParams } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertAsset } from '@/services/assets';
import { useAuth } from '@/providers/AuthProvider';


export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const { id } = useLocalSearchParams<{ id: string }>()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const inserAssetMutation = useMutation({
    mutationFn: (assetId: string) => 
      insertAsset({ event_id: id, user_id: user?.id, asset_id: assetId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', id] })
    }
  }) 


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
    const photo = await camera.current?.takePictureAsync()

    if(!photo?.uri) return;
    
    const cloudinaryResponse = await uploadToCloudinary(photo.uri)

    console.log(JSON.stringify(cloudinaryResponse, null, 2))

    inserAssetMutation.mutate(cloudinaryResponse.public_id)
  }

  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <View 
          className='absolute bottom-0 h-10 w-full p-2'
        >
          <CameraIcon
            size={26} 
            color={'white'}
            onPress={toggleCameraFacing}
            className="ml-2"
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
