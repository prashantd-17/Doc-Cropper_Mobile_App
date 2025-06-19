import React, { useState } from 'react';
import { View, Button, Image, PermissionsAndroid, Platform, StyleSheet, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import PhotoManipulator from 'react-native-photo-manipulator';

const DOCUMENT_PRESETS = {
  PAN: { width: 600, height: 300 },
  PASSPORT: { width: 413, height: 531 },
  AADHAR: { width: 800, height: 600 },
};

export default function DocumentPhotoPicker({navigation} : any) {
  const [imageUri, setImageUri] = useState<string | null>(null);

const requestPermissions = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  try {
    const sdkVersion = Platform.constants?.Release || '30';

    const cameraGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      }
    );

    const storageGranted = await PermissionsAndroid.request(
      parseInt(sdkVersion) >= 13
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your photos and files',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      }
    );

    return (
      cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
      storageGranted === PermissionsAndroid.RESULTS.GRANTED
    );
  } catch (error) {
    console.warn('Permission error:', error);
    return false;
  }
};


const pickImage = async (fromCamera: boolean) => {
  const hasPermission = await requestPermissions();

  if (!hasPermission) {
    Alert.alert('Permission Required', 'Please grant camera and storage access from settings to use this feature.');
    return;
  }

  const result = await (fromCamera ? launchCamera : launchImageLibrary)({
    mediaType: 'photo',
    quality: 1,
    includeBase64: false,
  });

  if (result.didCancel) return;

  if (result.errorMessage) {
    Alert.alert('Error', result.errorMessage);
    return;
  }

  if (result.assets && result.assets[0]?.uri) {
    navigation.navigate('ImageCropScreen', {
      imageUri: result.assets[0].uri,
      preset: DOCUMENT_PRESETS.PASSPORT,
      onDone: async (croppedUri: string) => {
        const resized = await ImageResizer.createResizedImage(
          croppedUri,
          DOCUMENT_PRESETS.PASSPORT.width,
          DOCUMENT_PRESETS.PASSPORT.height,
          'JPEG',
          60
        );
        setImageUri(resized.uri);
      },
    });
  }
};


  const cropAndCompress = async (uri: string, type: keyof typeof DOCUMENT_PRESETS) => {
    const preset = DOCUMENT_PRESETS[type];

    try {
      const result = await PhotoManipulator.crop(uri, {
        x: 0,
        y: 0,
        width: preset.width,
        height: preset.height,
      });

      const resized = await ImageResizer.createResizedImage(result, preset.width, preset.height, 'JPEG', 60);

      setImageUri(resized.uri);
    } catch (error) {
      console.error('Crop/compression error:', error);
    }
  };

   const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'Something went wrong');
    } else {
      const uri = result.assets?.[0]?.uri;
      console.log('Selected image:', uri);
      // You can now crop/compress/upload/etc.
    }
  };

  
  return (
    <View style={styles.container}>
      <Button title="Pick from Gallery" onPress={() => pickImage(false)} />
      <Button title="Take Photo" onPress={() => pickImage(true)} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginTop: 20 }}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
