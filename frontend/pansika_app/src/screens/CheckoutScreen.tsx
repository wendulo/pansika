import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";
import { useCart } from "../context/CartContext";
import { OrderService } from "../services/api";

type Props = NativeStackScreenProps<any, "Checkout">;

const paymentMethods = [
  { key: "COD", label: "Cash on Delivery" },
  { key: "AirtelMoney", label: "Airtel Money" },
  { key: "Mpamba", label: "TNM Mpamba" }
];

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const { items, subtotal, clear } = useCart();
  const [address, setAddress] = useState("Area 18, Lilongwe");
  const [payment, setPayment] = useState("COD");
  const [loading, setLoading] = useState(false);

  const deliveryFee = items.length ? 2000 : 0;
  const total = subtotal + deliveryFee;

  const placeOrder = async () => {
    if (!items.length) {
      Alert.alert("Cart empty", "Add items before checking out.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        delivery_address: address,
        payment_method: payment,
        items: items.map(i => ({ product_id: i.productId, quantity: i.quantity }))
      };
      const order = await OrderService.create(payload);
      clear();
      navigation.replace("OrderConfirmation", { orderId: order.id });
    } catch (e) {
      Alert.alert("Order failed", "Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Delivery location</Text>
      <TextInput value={address} onChangeText={setAddress} style={styles.input} />

      <Text style={styles.label}>Payment method</Text>
      {paymentMethods.map(method => (
        <TouchableOpacity
          key={method.key}
          style={[styles.option, payment === method.key && styles.optionActive]}
          onPress={() => setPayment(method.key)}
        >
          <Text style={[styles.optionText, payment === method.key && styles.optionTextActive]}>{method.label}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.summary}>
        <Row label="Subtotal" value={`MWK ${subtotal.toLocaleString()}`} />
        <Row label="Delivery" value={`MWK ${deliveryFee.toLocaleString()}`} />
        <Row label="Total" value={`MWK ${total.toLocaleString()}`} bold />
      </View>

      <TouchableOpacity style={styles.button} onPress={placeOrder} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Placing order..." : "Place Order"}</Text>
      </TouchableOpacity>
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
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  label: { fontWeight: "700", color: colors.text, marginTop: 12, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12
  },
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginVertical: 6
  },
  optionActive: { borderColor: colors.primary, backgroundColor: "#e8f8ef" },
  optionText: { color: colors.text },
  optionTextActive: { color: colors.primary, fontWeight: "800" },
  summary: { marginTop: 16, padding: 12, borderRadius: 12, backgroundColor: colors.card },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  rowText: { color: colors.text },
  bold: { fontWeight: "800" },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 16
  },
  buttonText: { color: "#fff", fontWeight: "800" }
});

export default CheckoutScreen;
