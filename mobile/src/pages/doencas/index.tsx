import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { Context } from "@/src/context/Context";
import Colors from "@/src/constants/Colors";
import { IconUi } from "@/src/components/ui";

// Habilita animação no Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DoencasPage = () => {
  const { doencas } = useContext(Context);
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  // Filtra doenças pelo nome e que estejam ativas
  const doencasFiltradas = doencas.filter(
    (d) => d.ativo && d.nome.toLowerCase().includes(search.toLowerCase().trim())
  );

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#0F172A" }}>
      {/* Campo de pesquisa */}
      <TextInput
        placeholder="Pesquisar doença..."
        placeholderTextColor="#94A3B8"
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#1E293B",
          color: "white",
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: Colors.Purple,
        }}
      />

      {doencasFiltradas.length > 0 ? (
        doencasFiltradas.map((doenca) => (
          <View
            key={doenca.id}
            style={{
              backgroundColor: "#1E293B",
              borderRadius: 10,
              marginBottom: 15,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: Colors.Purple,
            }}
          >
            {/* Botão expandir */}
            <TouchableOpacity
              onPress={() => toggleExpand(doenca.id!)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                {doenca.nome}
              </Text>
              <IconUi
                name={openId === doenca.id ? "expand-less" : "expand-more"}
                type="material"
                color="white"
                size={24}
              />
            </TouchableOpacity>

            {/* Conteúdo expandido */}
            {openId === doenca.id && (
              <View style={{ padding: 15, backgroundColor: "#111827" }}>
                <Text style={{ color: "#94A3B8", marginBottom: 5 }}>
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    CID:
                  </Text>{" "}
                  {doenca.cid}
                </Text>
                <Text style={{ color: "#94A3B8", marginBottom: 5 }}>
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Descrição:
                  </Text>{" "}
                  {doenca.descricao}
                </Text>
                <Text style={{ color: "#94A3B8", marginBottom: 5 }}>
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Diagnóstico:
                  </Text>{" "}
                  {doenca.diagnostico.join(", ")}
                </Text>
                <Text style={{ color: "#94A3B8", marginBottom: 5 }}>
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Tratamento:
                  </Text>{" "}
                  {doenca.tratamento.join(", ")}
                </Text>
                <Text style={{ color: "#94A3B8", marginBottom: 5 }}>
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Exames:
                  </Text>{" "}
                  {doenca.exames.join(", ")}
                </Text>
              </View>
            )}
          </View>
        ))
      ) : (
        <View
          style={{
            marginTop: 50,
            alignItems: "center",
          }}
        >
          <Text style={{ color: Colors.Purple, fontSize: 16 }}>
            Nenhuma doença encontrada
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default DoencasPage;
