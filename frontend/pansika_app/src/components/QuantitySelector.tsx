import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  quantity: number;
  onChange: (value: number) => void;
};

const QuantitySelector: React.FC<Props> = ({ quantity, onChange }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={() => onChange(Math.max(1, quantity - 1))}>
      <Text style={styles.buttonText}>-</Text>
    </TouchableOpacity>
    <Text style={styles.quantity}>{quantity}</Text>
    <TouchableOpacity style={styles.button} onPress={() => onChange(quantity + 1)}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 6
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  buttonText: { fontSize: 18, fontWeight: "700", color: colors.text },
  quantity: { marginHorizontal: 12, fontWeight: "700", fontSize: 16, color: colors.text }
});

export default QuantitySelector;
