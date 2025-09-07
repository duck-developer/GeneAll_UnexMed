import { View } from "react-native";
import React, { useContext, useState } from "react";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from "./styles";
import { Context } from "@/src/context/Context";

const MultiSelectUi = () => {
  const { sintomas, selected, setSelected } = useContext(Context);

  const selectedIds = selected.map((s) => s.id); // apenas ids para o dropdown

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={sintomas}
        labelField="nome"
        valueField="id"
        placeholder="Selecione um Sintoma"
        searchPlaceholder="Buscar..."
        value={selectedIds}
        onChange={(itemIds) => {
          const selectedItems = sintomas.filter((s) => itemIds.includes(s.id));
          setSelected(selectedItems);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default MultiSelectUi;
