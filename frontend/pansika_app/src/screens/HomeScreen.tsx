import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";
import SearchBar from "../components/SearchBar";
import PromoCarousel from "../components/PromoCarousel";
import CategoryChips from "../components/CategoryChips";
import ProductCard from "../components/ProductCard";
import StoreCard from "../components/StoreCard";
import { sampleCategories, sampleProducts, sampleStores } from "../data/sampleData";
import { ProductService, StoreService } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";

type Props = NativeStackScreenProps<any>;

const cities = ["Lilongwe", "Blantyre", "Mzuzu", "Zomba"];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [location, setLocation] = useState("Lilongwe");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [stores, setStores] = useState(sampleStores);
  const [products, setProducts] = useState(sampleProducts);
  const [loading, setLoading] = useState(false);
  const { toggleFavourite, isFavourite } = useFavorites();

  const loadData = async () => {
    try {
      setLoading(true);
      const [storeData, productData] = await Promise.all([StoreService.list(), ProductService.list()]);
      setStores(storeData);
      setProducts(productData.results || productData); // handle pagination or raw array
    } catch (e) {
      // Offline fallback stays with sample data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory ? p.category?.name === selectedCategory || p.category === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 12 }}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Delivering to</Text>
            <TouchableOpacity
              style={styles.location}
              onPress={() => {
                const currentIndex = cities.indexOf(location);
                const nextCity = cities[(currentIndex + 1) % cities.length];
                setLocation(nextCity);
              }}
            >
              <Text style={styles.locationText}>{location}, Malawi</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => loadData()}>
            <Text style={{ color: colors.primary, fontWeight: "700" }}>Refresh</Text>
          </TouchableOpacity>
        </View>

        <SearchBar value={search} onChange={setSearch} />
        <PromoCarousel />
        <Text style={styles.sectionTitle}>Categories</Text>
        <CategoryChips
          categories={sampleCategories}
          selected={selectedCategory}
          onSelect={value => setSelectedCategory(value === selectedCategory ? null : value)}
        />

        <Text style={styles.sectionTitle}>Stores near you</Text>
        {stores.map(store => (
          <StoreCard
            key={store.id}
            name={store.name}
            city={store.city}
            tags={store.tags || store.store_type}
            image_url={store.image_url}
            onPress={() => navigation.navigate("Store", { storeId: store.id })}
          />
        ))}

        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Best Deals</Text>
          {loading ? <ActivityIndicator size="small" color={colors.primary} /> : null}
        </View>
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              name={item.name}
              price={Number(item.discounted_price || item.price)}
              unit={item.unit}
              image_url={item.image_url}
              discount_percent={item.discount_percent}
              storeName={item.store?.name || item.store?.name}
              onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
              onToggleFav={() =>
                toggleFavourite({
                  id: item.id,
                  name: item.name,
                  image_url: item.image_url,
                  price: item.price,
                  unit: item.unit,
                  storeName: item.store?.name || "Store"
                })
              }
              isFavourite={isFavourite(item.id)}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  label: { color: colors.muted },
  location: { paddingVertical: 4 },
  locationText: { fontWeight: "800", fontSize: 18, color: colors.text },
  sectionTitle: { fontWeight: "800", fontSize: 18, color: colors.text, marginVertical: 8 }
});

export default HomeScreen;
