import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
  city: string;
  tags: string;
  image_url?: string;
  onPress?: () => void;
};

const StoreCard: React.FC<Props> = ({ name, city, tags, image_url, onPress }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: image_url || "https://via.placeholder.com/200" }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.tags}>{tags}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>View Store</Text>
        <Ionicons name="chevron-forward" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  image: { width: "100%", height: 120, borderRadius: 12, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center" },
  name: { fontWeight: "700", fontSize: 16, color: colors.text },
  city: { color: colors.muted, marginTop: 2 },
  tags: { color: colors.primary, marginTop: 4 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    marginLeft: 8
  },
  buttonText: { color: "#fff", fontWeight: "700", marginRight: 4 }
});

export default StoreCard;
