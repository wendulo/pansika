import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { colors } from "../theme/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any, "Favourites">;

const FavouritesScreen: React.FC<Props> = ({ navigation }) => {
  const { favourites, toggleFavourite } = useFavorites();

  return (
    <View style={styles.container}>
      <FlatList
        data={favourites}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={{ color: colors.muted }}>No favourites yet.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
          >
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.store}>{item.storeName}</Text>
              <Text style={styles.price}>MWK {item.price.toLocaleString()} / {item.unit}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavourite(item)}>
              <Text style={{ color: colors.primary }}>Remove</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: {
    flexDirection: "row",
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 14,
    marginBottom: 12
  },
  image: { width: 70, height: 70, borderRadius: 12 },
  name: { fontWeight: "700", color: colors.text },
  store: { color: colors.muted, fontSize: 12 },
  price: { color: colors.primary, marginVertical: 4 }
});

export default FavouritesScreen;
