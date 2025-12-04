import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";
import { OrderService } from "../services/api";

type Props = NativeStackScreenProps<any, "OrderDetail">;

const OrderDetailScreen: React.FC<Props> = ({ route }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await OrderService.detail(orderId);
        setOrder(data);
      } catch (e) {
        // fallback minimal detail
        setOrder({
          id: orderId,
          total_amount: 0,
          status: "Pending",
          items: []
        });
      }
    };
    load();
  }, [orderId]);

  if (!order) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order #{order.id}</Text>
      <Text style={styles.subtitle}>Status: {order.status}</Text>
      <Text style={styles.subtitle}>Total: MWK {order.total_amount?.toLocaleString()}</Text>

      <Text style={[styles.title, { marginTop: 16 }]}>Items</Text>
      {order.items?.length ? (
        order.items.map((item: any) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.itemText}>{item.product?.name || "Product"}</Text>
            <Text style={styles.itemText}>
              {item.quantity} x MWK {item.unit_price?.toLocaleString()}
            </Text>
          </View>
        ))
      ) : (
        <Text style={{ color: colors.muted }}>No items available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { fontWeight: "800", fontSize: 18, color: colors.text },
  subtitle: { color: colors.muted, marginTop: 4 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.card,
    padding: 10,
    borderRadius: 10,
    marginVertical: 6
  },
  itemText: { color: colors.text }
});

export default OrderDetailScreen;
