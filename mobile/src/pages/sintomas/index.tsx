import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Logo } from "@/src/assets/images";
import styles from "./styles";
import { IconUi, MultiSelectUi } from "@/src/components/ui";
import { Context } from "@/src/context/Context";
import Colors from "@/src/constants/Colors";

const SintomasPage = () => {
  const cores = ["#C04C89", "#4C9A64", "#3AAEB0"];

  const { categorias, doencas, sintomas, selected, setSelected } =
    useContext(Context);

  // const allColors = Object.values(Colors).flatMap((value) =>
  //   typeof value === "string" ? [value] : Object.values(value)
  // );

  const allColors = cores.map(
    () => cores[Math.floor(Math.random() * cores.length)]
  );

  function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={Logo} style={styles.headerLogo} resizeMode="contain" />
        <MultiSelectUi />
      </View>

      {/* {Array.from({ length: 40 }).map((_, index) => (
        <Text key={index}>Item repetido {index + 1}</Text>
      ))} */}

      {/* SECTION */}
      <View style={{ marginTop: 20, paddingBottom: 50 }}>
        {categorias.length > 0 ? (
          <>
            {categorias.map((categorias, index) => {
              const randomHex =
                allColors[Math.floor(Math.random() * allColors.length)];
              const bgColor = hexToRgba(randomHex, 0.3); // 50% de opacidade no fundo
              return (
                <View style={{ alignItems: "center" }}>
                  {categorias.ativo && (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: bgColor,
                        alignItems: "center",
                        height: 60,
                        width: 350,
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 20,
                        marginTop: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: randomHex,
                      }}
                    >
                      <IconUi
                        color={randomHex}
                        name="error"
                        size={30}
                        type="material"
                        style={{ marginTop: 10 }}
                      />
                      <Text key={categorias.id} style={{ color: "black" }}>
                        {categorias.nome}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </>
        ) : (
          <View
            style={{
              alignItems: "center",
              marginTop: 50,
              backgroundColor: Colors.Pink.PinkLight,
              height: 150,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: Colors.Purple, fontSize: 17 }}>
              Nenhuma categoria foi encontrada
            </Text>
            <IconUi
              color={Colors.Purple}
              name="error"
              size={30}
              type="material"
              style={{ marginTop: 10 }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SintomasPage;
