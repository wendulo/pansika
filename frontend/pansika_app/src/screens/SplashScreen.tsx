import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<any>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
useEffect(() => {
    // Small delay so the logo can show briefly. Only redirect when Login route exists
    const timer = setTimeout(() => {
      const routeNames = navigation.getState()?.routeNames || [];
      if (routeNames.includes("Login")) {
        navigation.replace("Login");
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Pansika</Text>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background
  },
  logo: { fontSize: 32, fontWeight: "800", color: colors.primary, marginBottom: 16 }
});

export default SplashScreen;
