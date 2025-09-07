import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { Logo } from "@/src/assets/images";
import styles from "./styles";
import { IconUi, MultiSelectUi } from "@/src/components/ui";
import { Context } from "@/src/context/Context";
import Colors from "@/src/constants/Colors";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SintomasPage = () => {
  const [selectedDoencaId, setSelectedDoencaId] = useState<string | null>(null);

  const cores = ["#C04C89", "#4C9A64", "#3AAEB0"];
  const { categorias, sintomas, selected, setSelected, doencas } =
    useContext(Context);

  const [openId, setOpenId] = useState<string | null>(null);
  const [showDoencas, setShowDoencas] = useState(false);

  const toggleCategoria = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId((prev) => (prev === id ? null : id));
  };

  const toggleSelect = (sintoma: any) => {
    const exists = selected.some((s: any) => s.id === sintoma.id);
    if (exists) {
      setSelected((prev: any) => prev.filter((s: any) => s.id !== sintoma.id));
    } else {
      setSelected((prev: any) => [...prev, sintoma]);
    }
  };

  // Calcular doenças filtradas e porcentagem
  // const doencasFiltradas = doencas
  //   .map((d) => {
  //     const matchCount = selected.filter((s) =>
  //       d.sintomas.includes(s.id)
  //     ).length;
  //     const percent = Math.round((matchCount / d.sintomas.length) * 100);
  //     return { ...d, matchCount, percent };
  //   })
  //   .filter((d) => d.matchCount > 0); // apenas doenças com pelo menos 1 sintoma
  const doencasFiltradas = doencas
    .map((d) => {
      // Conta quantos sintomas selecionados estão presentes na doença
      const matchCount = selected.filter((s) =>
        d.sintomas.includes(s.id)
      ).length;

      // Calcula a porcentagem de compatibilidade
      // Fórmula: (número de sintomas selecionados que existem na doença / total de sintomas da doença) * 100
      const percent = Math.round((matchCount / d.sintomas.length) * 100);

      return { ...d, matchCount, percent };
    })
    .filter((d) => d.matchCount > 0) // só doenças que têm pelo menos 1 sintoma selecionado
    .sort((a, b) => b.percent - a.percent); // ordena do maior para o menor

  function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <ScrollView>
      {/* HEADER */}
      <View style={styles.header}>
        <Image source={Logo} style={styles.headerLogo} resizeMode="contain" />
        <MultiSelectUi />
      </View>

      {/* SEÇÃO DE DOENÇAS ENCONTRADAS */}
      {selected.length > 0 && (
        <TouchableOpacity
          onPress={() => setShowDoencas((prev) => !prev)}
          style={{
            backgroundColor: "#0F172A",
            marginHorizontal: 20,
            marginTop: 20,
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.Purple,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Doenças encontradas: {doencasFiltradas.length}
          </Text>
          <IconUi
            name={showDoencas ? "expand-less" : "expand-more"}
            type="material"
            color="white"
            size={24}
          />
        </TouchableOpacity>
      )}

      {showDoencas &&
        doencasFiltradas.map((d) => (
          <TouchableOpacity
            key={d.id}
            onPress={() => setSelectedDoencaId(d.id!)}
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              padding: 10,
              backgroundColor: "#1E293B",
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>{d.nome}</Text>
            <Text style={{ color: "#4C9A64", fontSize: 14 }}>{d.percent}%</Text>
          </TouchableOpacity>
        ))}
      {/* Tela cheia da doença selecionada */}
      {selectedDoencaId && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#0F172A",
            padding: 20,
            paddingTop: 60,
            zIndex: 999,
          }}
        >
          {/* Botão Fechar */}
          <TouchableOpacity
            onPress={() => setSelectedDoencaId(null)}
            style={{
              position: "absolute",
              top: 40,
              right: 20,
              zIndex: 1000,
              backgroundColor: "#1E293B",
              padding: 10,
              borderRadius: 50,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              ✕
            </Text>
          </TouchableOpacity>

          {(() => {
            const doenca = doencas.find((d) => d.id === selectedDoencaId);
            if (!doenca) return null;

            return (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Título */}
                <Text
                  style={{
                    color: "#32A2AA",
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {doenca.id}
                </Text>
                <Text style={{ color: "#A0AEC0", marginBottom: 20 }}>
                  CID: {doenca.cid}
                </Text>

                {/* Função para renderizar seções */}
                {[
                  { title: "Descrição", data: [doenca.descricao] },
                  {
                    title: "Sintomas",
                    data: doenca.sintomas
                      .map((sintomaId) => {
                        const sintoma = sintomas.find(
                          (s) => s.id === sintomaId
                        );
                        return sintoma ? sintoma.nome : sintomaId;
                      })
                      .filter(Boolean),
                  },
                  { title: "Diagnóstico", data: doenca.diagnostico },
                  { title: "Tratamento", data: doenca.tratamento },
                  { title: "Exames", data: doenca.exames },
                ].map((section, idx) => (
                  <View
                    key={idx}
                    style={{
                      backgroundColor: "#1E293B",
                      padding: 15,
                      borderRadius: 12,
                      marginBottom: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: "#32A2AA",
                        fontWeight: "bold",
                        fontSize: 16,
                        marginBottom: 8,
                      }}
                    >
                      {section.title}
                    </Text>
                    {section.data.map((item, i) => (
                      <Text
                        key={i}
                        style={{ color: "#E2E8F0", marginBottom: 4 }}
                      >
                        - {item}
                      </Text>
                    ))}
                  </View>
                ))}

                {/* {[
                  { title: "Descrição", data: [doenca.descricao] },
                  { title: "Sintomas", data: doenca.sintomas },
                  { title: "Diagnóstico", data: doenca.diagnostico },
                  { title: "Tratamento", data: doenca.tratamento },
                  { title: "Exames", data: doenca.exames },
                ].map((section, idx) => (
                  <View
                    key={idx}
                    style={{
                      backgroundColor: "#1E293B",
                      padding: 15,
                      borderRadius: 12,
                      marginBottom: 15,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      elevation: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: "#32A2AA",
                        fontWeight: "bold",
                        fontSize: 16,
                        marginBottom: 8,
                      }}
                    >
                      {section.title}
                    </Text>
                    {section.data.map((item, i) => (
                      <Text
                        key={i}
                        style={{ color: "#E2E8F0", marginBottom: 4 }}
                      >
                        - {item}
                      </Text>
                    ))}
                  </View>
                ))} */}
              </ScrollView>
            );
          })()}
        </View>
      )}

      {/* CATEGORIAS */}
      <View style={{ marginTop: 20, paddingBottom: 50 }}>
        {categorias.length > 0 ? (
          categorias.map((categoria, index) => {
            const randomHex = cores[Math.floor(Math.random() * cores.length)];
            const bgColor = hexToRgba(randomHex, 0.3);

            return (
              <View key={categoria.id} style={{ alignItems: "center" }}>
                {categoria.ativo && (
                  <>
                    {/* Botão da Categoria */}
                    <TouchableOpacity
                      onPress={() => toggleCategoria(categoria.id)}
                      style={{
                        backgroundColor: bgColor,
                        alignItems: "center",
                        height: 60,
                        width: 350,
                        paddingHorizontal: 60,
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 10,
                        marginTop: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: randomHex,
                      }}
                    >
                      {/* <IconUi
                        color={randomHex}
                        name="error"
                        size={30}
                        type="material"
                        style={{ marginTop: 10 }}
                      /> */}
                      <Text style={{ color: "black" }}>{categoria.nome}</Text>
                      <IconUi
                        name={
                          openId === categoria.id
                            ? "expand-less"
                            : "expand-more"
                        }
                        type="material"
                        color={randomHex}
                        size={24}
                      />
                    </TouchableOpacity>

                    {/* Sintomas dentro da Categoria */}
                    {openId === categoria.id && (
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          marginTop: 10,
                          width: 350,
                          padding: 10,
                        }}
                      >
                        {categoria.sintomas.map((sintomaId: string) => {
                          const sintoma = sintomas.find(
                            (s: any) => s.id === sintomaId && s.ativo
                          );
                          if (!sintoma) return null;

                          const isSelected = selected.some(
                            (s: any) => s.id === sintoma.id
                          );

                          return (
                            <TouchableOpacity
                              key={sintoma.id}
                              onPress={() => toggleSelect(sintoma)}
                              style={{
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 20,
                                margin: 5,
                                backgroundColor: isSelected
                                  ? "#4C9A64"
                                  : "#2A3248",
                              }}
                            >
                              <Text style={{ color: "white" }}>
                                {sintoma.nome}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </>
                )}
              </View>
            );
          })
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
