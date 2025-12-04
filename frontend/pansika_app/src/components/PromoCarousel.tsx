import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const promos = [
  { title: "Up to 30% off!", desc: "Groceries delivered fast in Lilongwe." },
  { title: "Electronics Deals", desc: "Save on TVs and phones this week." },
  { title: "Fresh veggies daily", desc: "Support local farmers." }
];

const PromoCarousel: React.FC = () => (
  <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={{ marginVertical: 12 }}>
    {promos.map(p => (
      <View key={p.title} style={styles.banner}>
        <Text style={styles.title}>{p.title}</Text>
        <Text style={styles.desc}>{p.desc}</Text>
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#e8f8ef",
    width: 280,
    padding: 16,
    borderRadius: 18,
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 }
  },
  title: { fontWeight: "800", fontSize: 18, color: colors.primary },
  desc: { color: colors.text, marginTop: 6 }
});

export default PromoCarousel;
