import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";
import { OrderService } from "../services/api";

type Props = NativeStackScreenProps<any, "OrderConfirmation">;

const OrderConfirmationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { orderId } = route.params || {};
  const [orderTotal, setOrderTotal] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        const order = await OrderService.detail(orderId);
        setOrderTotal(order.total_amount);
      } catch (e) {
        // ignore
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.subtitle}>Thank you for shopping with Pansika.</Text>
      {orderTotal ? <Text style={styles.total}>Total: MWK {orderTotal.toLocaleString()}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 26, fontWeight: "800", color: colors.text },
  subtitle: { color: colors.muted, marginTop: 8 },
  total: { marginTop: 12, fontWeight: "800", color: colors.primary },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 20
  },
  buttonText: { color: "#fff", fontWeight: "800" }
});

export default OrderConfirmationScreen;
