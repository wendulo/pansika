import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";
import { OrderService } from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any, "Orders">;

const OrdersScreen: React.FC<Props> = ({ navigation }) => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderService.list();
        setOrders(data);
      } catch (e) {
        // fallback dummy order for UI
        setOrders([
          {
            id: 1,
            total_amount: 50000,
            status: "Pending",
            created_at: new Date().toISOString(),
            items: []
          }
        ]);
      }
    };
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={{ color: colors.muted }}>No orders yet.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("OrderDetail", { orderId: item.id })}
          >
            <Text style={styles.title}>Order #{item.id}</Text>
            <Text style={styles.subtitle}>
              {new Date(item.created_at).toLocaleDateString()} • MWK {item.total_amount?.toLocaleString()}
            </Text>
            <Text style={{ color: colors.primary, fontWeight: "700" }}>{item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: {
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 14,
    marginBottom: 12
  },
  title: { fontWeight: "800", color: colors.text },
  subtitle: { color: colors.muted, marginTop: 4 }
});

export default OrdersScreen;
