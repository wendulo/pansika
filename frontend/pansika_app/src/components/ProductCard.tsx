import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
  price: number;
  unit: string;
  image_url?: string;
  discount_percent?: number;
  storeName?: string;
  onPress?: () => void;
  onToggleFav?: () => void;
  isFavourite?: boolean;
};

const ProductCard: React.FC<Props> = ({
  name,
  price,
  unit,
  image_url,
  discount_percent,
  storeName,
  onPress,
  onToggleFav,
  isFavourite
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {discount_percent ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{discount_percent}% OFF</Text>
        </View>
      ) : null}
      <Image
        source={{ uri: image_url || "https://via.placeholder.com/150" }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        {storeName ? (
          <Text style={styles.store} numberOfLines={1}>
            {storeName}
          </Text>
        ) : null}
        <Text style={styles.unit}>{unit}</Text>
        <Text style={styles.price}>MWK {price.toLocaleString()}</Text>
      </View>
      <TouchableOpacity style={styles.heart} onPress={onToggleFav}>
        <Ionicons name={isFavourite ? "heart" : "heart-outline"} size={18} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 12,
    width: 160,
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#ff9f43",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 2
  },
  badgeText: { color: "#fff", fontWeight: "700", fontSize: 10 },
  image: { width: "100%", height: 100, borderRadius: 12, marginBottom: 8 },
  info: { gap: 2 },
  name: { fontWeight: "600", color: colors.text },
  store: { color: colors.muted, fontSize: 12 },
  unit: { color: colors.muted, fontSize: 12 },
  price: { fontWeight: "700", color: colors.primary, marginTop: 4 },
  heart: { position: "absolute", top: 10, right: 10 }
});

export default ProductCard;
