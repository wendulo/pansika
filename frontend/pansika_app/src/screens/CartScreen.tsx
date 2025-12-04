import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCart } from "../context/CartContext";
import { colors } from "../theme/colors";
import QuantitySelector from "../components/QuantitySelector";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<any, "Cart">;

const DELIVERY_FEE = 2000; // example fee in MWK

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const total = subtotal + (items.length ? DELIVERY_FEE : 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.productId.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={{ color: colors.muted }}>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.store}>{item.storeName}</Text>
              <Text style={styles.price}>MWK {item.price.toLocaleString()} / {item.unit}</Text>
              <QuantitySelector quantity={item.quantity} onChange={qty => updateQuantity(item.productId, qty)} />
            </View>
            <TouchableOpacity onPress={() => removeItem(item.productId)}>
              <Ionicons name="trash-outline" size={22} color={colors.danger} />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.summary}>
        <Row label="Subtotal" value={`MWK ${subtotal.toLocaleString()}`} />
        <Row label="Delivery fee" value={items.length ? `MWK ${DELIVERY_FEE.toLocaleString()}` : "MWK 0"} />
        <Row label="Total" value={`MWK ${total.toLocaleString()}`} bold />
        <TouchableOpacity
          style={[styles.button, { opacity: items.length ? 1 : 0.5 }]}
          disabled={!items.length}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.buttonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <View style={styles.row}>
    <Text style={[styles.rowText, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.rowText, bold && styles.bold]}>{value}</Text>
  </View>
);

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
  price: { color: colors.primary, marginVertical: 4 },
  summary: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  rowText: { color: colors.text },
  bold: { fontWeight: "800" },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12
  },
  buttonText: { color: "#fff", fontWeight: "800" }
});

export default CartScreen;
