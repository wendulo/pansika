import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";
import { ProductService, StoreService } from "../services/api";
import { sampleProducts, sampleStores, sampleCategories } from "../data/sampleData";
import CategoryChips from "../components/CategoryChips";
import ProductCard from "../components/ProductCard";
import { useFavorites } from "../context/FavoritesContext";

type Props = NativeStackScreenProps<any, "Store">;

const StoreScreen: React.FC<Props> = ({ route, navigation }) => {
  const { storeId } = route.params;
  const [store, setStore] = useState<any>(sampleStores.find(s => s.id === storeId));
  const [products, setProducts] = useState(sampleProducts.filter(p => p.store.id === storeId));
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toggleFavourite, isFavourite } = useFavorites();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [storeData, productData] = await Promise.all([
          StoreService.list(),
          ProductService.list({ store: storeId })
        ]);
        const foundStore = storeData.find((s: any) => s.id === storeId);
        if (foundStore) setStore(foundStore);
        setProducts(productData.results || productData);
      } catch (e) {
        // keep sample data
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [storeId]);

  const filtered = useMemo(() => {
    if (!filter) return products;
    return products.filter(p => p.category?.name === filter || p.category === filter);
  }, [filter, products]);

  if (!store) {
    return (
      <View style={styles.center}>
        <Text>Store not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Image source={{ uri: store.image_url }} style={styles.banner} />
      <Text style={styles.title}>{store.name}</Text>
      <Text style={styles.subtitle}>
        {store.city} • {store.store_type}
      </Text>

      <Text style={styles.sectionTitle}>Categories</Text>
      <CategoryChips
        categories={["All", ...sampleCategories]}
        selected={filter || "All"}
        onSelect={value => setFilter(value === "All" ? null : value)}
      />

      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Products</Text>
        {loading ? <ActivityIndicator size="small" color={colors.primary} /> : null}
      </View>

      <View style={styles.grid}>
        {filtered.map(item => (
          <ProductCard
            key={item.id}
            name={item.name}
            price={Number(item.discounted_price || item.price)}
            unit={item.unit}
            image_url={item.image_url}
            discount_percent={item.discount_percent}
            storeName={store.name}
            onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
            onToggleFav={() =>
              toggleFavourite({
                id: item.id,
                name: item.name,
                image_url: item.image_url,
                price: item.price,
                unit: item.unit,
                storeName: store.name
              })
            }
            isFavourite={isFavourite(item.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  banner: { width: "100%", height: 160, borderRadius: 16, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "800", color: colors.text },
  subtitle: { color: colors.muted, marginTop: 4 },
  sectionTitle: { fontWeight: "800", fontSize: 18, color: colors.text, marginVertical: 10 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 }
});

export default StoreScreen;
