import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  categories: string[];
  selected?: string | null;
  onSelect: (value: string) => void;
};

const CategoryChips: React.FC<Props> = ({ categories, selected, onSelect }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
    {categories.map(cat => {
      const active = selected === cat;
      return (
        <TouchableOpacity
          key={cat}
          onPress={() => onSelect(cat)}
          style={[styles.chip, active && styles.activeChip]}
        >
          <Text style={[styles.chipText, active && styles.activeText]}>{cat}</Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.card,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  chipText: { color: colors.text },
  activeChip: { backgroundColor: colors.primary, borderColor: colors.primary },
  activeText: { color: "#fff", fontWeight: "700" }
});

export default CategoryChips;
