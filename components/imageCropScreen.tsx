import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function ImageCropScreen({ route, navigation }:any) {
  const { imageUri, preset, onDone } = route.params;

  useEffect(() => {
    ImagePicker.openCropper({
        path: imageUri,
        width: preset.width,
        height: preset.height,
        cropping: true,
        cropperToolbarTitle: 'Crop Document',
        compressImageQuality: 0.8,
        mediaType: 'photo'
    })
      .then((image) => {
        onDone(image.path);
        navigation.goBack();
      })
      .catch(() => navigation.goBack());
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
