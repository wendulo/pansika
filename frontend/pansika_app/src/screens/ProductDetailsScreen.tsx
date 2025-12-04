import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";
import QuantitySelector from "../components/QuantitySelector";
import ProductCard from "../components/ProductCard";
import { ProductService } from "../services/api";
import { sampleProducts } from "../data/sampleData";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

type Props = NativeStackScreenProps<any, "ProductDetails">;

const ProductDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<any>(sampleProducts.find(p => p.id === productId));
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavorites();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await ProductService.detail(productId);
        setProduct(data);
      } catch (e) {
        // keep sample fallback
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const pricePerUnit = Number(product.discounted_price || product.price);
  const total = pricePerUnit * quantity;
  const moreFromStore = sampleProducts.filter(p => p.store?.id === product.store?.id && p.id !== product.id).slice(0, 5);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <Image source={{ uri: product.image_url }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.subtitle}>
            {product.category?.name || product.category} • {product.store?.name || "Store"} • ⭐ {product.rating}
          </Text>

          <View style={styles.rowBetween}>
            <Text style={styles.price}>MWK {pricePerUnit.toLocaleString()} / {product.unit}</Text>
            <TouchableOpacity
              onPress={() =>
                toggleFavourite({
                  id: product.id,
                  name: product.name,
                  image_url: product.image_url,
                  price: product.price,
                  unit: product.unit,
                  storeName: product.store?.name || "Store"
                })
              }
            >
              <Text style={{ color: colors.primary, fontWeight: "700" }}>
                {isFavourite(product.id) ? "♥ Remove" : "♡ Favourite"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Quantity</Text>
          <QuantitySelector quantity={quantity} onChange={setQuantity} />

          <Text style={styles.sectionTitle}>Product Details</Text>
          <Text style={styles.description}>
            {product.description || "Tasty and fresh product sourced from local Malawi stores."}
          </Text>

          <Text style={styles.sectionTitle}>More from this store</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {moreFromStore.map(item => (
              <ProductCard
                key={item.id}
                name={item.name}
                price={item.discounted_price || item.price}
                unit={item.unit}
                image_url={item.image_url}
                discount_percent={item.discount_percent}
                storeName={product.store?.name}
                onPress={() => navigation.push("ProductDetails", { productId: item.id })}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={{ color: colors.muted }}>Total Price</Text>
          <Text style={styles.total}>MWK {total.toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addToCart({
              productId: product.id,
              name: product.name,
              price: pricePerUnit,
              storeName: product.store?.name || "Store",
              unit: product.unit,
              image_url: product.image_url,
              quantity
            });
            navigation.navigate("Cart");
          }}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  image: { width: "100%", height: 260 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: "800", color: colors.text },
  subtitle: { color: colors.muted, marginTop: 6 },
  price: { fontSize: 18, fontWeight: "800", color: colors.primary, marginTop: 12 },
  sectionTitle: { fontWeight: "800", fontSize: 18, color: colors.text, marginVertical: 12 },
  description: { color: colors.text, lineHeight: 20 },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f8f9fb",
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  total: { fontWeight: "800", fontSize: 18, color: colors.text },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16
  },
  addButtonText: { color: "#fff", fontWeight: "800" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  loading: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: colors.text,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12
  }
});

export default ProductDetailsScreen;
