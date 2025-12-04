import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }) => (
  <View style={styles.container}>
    <Ionicons name="search" size={18} color={colors.muted} />
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder || "Search food, electronics, etc."}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 8
  },
  input: {
    marginLeft: 8,
    flex: 1
  }
});

export default SearchBar;
