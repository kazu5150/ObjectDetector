import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import OpenAI from 'openai';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface AppState {
  selectedImage: string | null;
  analysisResult: string | null;
  isAnalyzing: boolean;
}

export default function ObjectDetectorScreen() {
  const [state, setState] = useState<AppState>({
    selectedImage: null,
    analysisResult: null,
    isAnalyzing: false,
  });

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setState(prev => ({
          ...prev,
          selectedImage: result.assets[0].uri,
          analysisResult: null,
        }));
      }
    } catch {
      Alert.alert('エラー', 'ギャラリーからの画像選択に失敗しました。');
    }
  };

  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('権限エラー', 'カメラへのアクセス権限が必要です。設定からアクセスを許可してください。');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setState(prev => ({
          ...prev,
          selectedImage: result.assets[0].uri,
          analysisResult: null,
        }));
      }
    } catch {
      Alert.alert('エラー', '写真の撮影に失敗しました。');
    }
  };

  const analyzeImage = async () => {
    if (!state.selectedImage) return;

    setState(prev => ({ ...prev, isAnalyzing: true }));

    try {
      // Convert image to base64
      const base64Image = await FileSystem.readAsStringAsync(state.selectedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const client = new OpenAI({
        apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || 'your-api-key-here',
      });

      const response = await client.responses.create({
        model: "gpt-5",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "この画像に写っている物体を日本語で識別して、名前と簡単な説明を教えてください。",
              },
              {
                type: "input_image",
                image_url: `data:image/jpeg;base64,${base64Image}`,
              },
            ],
          },
        ],
      });

      const result = response.output_text || "解析結果を取得できませんでした。";
      setState(prev => ({
        ...prev,
        analysisResult: result,
        isAnalyzing: false,
      }));
    } catch (error) {
      console.error('Analysis error:', error);
      setState(prev => ({
        ...prev,
        analysisResult: "解析に失敗しました。ネットワーク接続やAPIキーを確認してください。",
        isAnalyzing: false,
      }));
    }
  };

  const resetState = () => {
    setState({
      selectedImage: null,
      analysisResult: null,
      isAnalyzing: false,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">物体判別アプリ</ThemedText>
        <ThemedText>写真を撮るかギャラリーから選んで物体を識別します</ThemedText>
      </ThemedView>

      {state.selectedImage && (
        <ThemedView style={styles.imageContainer}>
          <Image source={{ uri: state.selectedImage }} style={styles.selectedImage} />
        </ThemedView>
      )}

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <ThemedText style={styles.buttonText}>📷 写真を撮る</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <ThemedText style={styles.buttonText}>🖼️ ギャラリーから選ぶ</ThemedText>
        </TouchableOpacity>

        {state.selectedImage && !state.isAnalyzing && (
          <TouchableOpacity style={[styles.button, styles.analyzeButton]} onPress={analyzeImage}>
            <ThemedText style={styles.buttonText}>🔍 解析する</ThemedText>
          </TouchableOpacity>
        )}

        {state.isAnalyzing && (
          <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <ThemedText>解析中...</ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      {state.analysisResult && (
        <ThemedView style={styles.resultContainer}>
          <ThemedText type="subtitle">解析結果:</ThemedText>
          <ThemedText style={styles.resultText}>{state.analysisResult}</ThemedText>
        </ThemedView>
      )}

      {(state.selectedImage || state.analysisResult) && (
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetState}>
          <ThemedText style={styles.buttonText}>🔄 もう一度</ThemedText>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    gap: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: 300,
    height: 225,
    borderRadius: 10,
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  analyzeButton: {
    backgroundColor: '#34C759',
  },
  resetButton: {
    backgroundColor: '#FF9500',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  resultContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
