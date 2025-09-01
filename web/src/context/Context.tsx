import { createContext, useEffect, useState } from "react";
import type { Categoria, Doenca, Sintoma } from "@/types/type";

interface InterfaceContext {
  categorias: Categoria[];
  setCategorias: (newState: any) => void;
  sintomas: Sintoma[];
  setSintomas: (newState: any) => void;
  doencas: Doenca[];
  setDoencas: (newState: any) => void;

  selected: Sintoma[];
  setSelected: React.Dispatch<React.SetStateAction<Sintoma[]>>;
}
const initialValue = {
  categorias: [
    {
      id: "1",
      nome: "Constitucionais / Gerais",
      sintomas: [],
      ativo: false,
    },
    {
      id: "2",
      nome: "Visuais / Oftalmológicos",
      sintomas: ["6", "7", "8", "9", "10", "11", "12"],
      ativo: true,
    },
    {
      id: "3",
      nome: "Otorrinolaringológicos (Ouvidos, Nariz, Garganta, Boca)",
      sintomas: ["1", "2", "3"],
      ativo: true,
    },
    {
      id: "4",
      nome: "Neurológicos",
      sintomas: ["4", "5"],
      ativo: true,
    },
    {
      id: "5",
      nome: "Psiquiátricos / Comportamentais",
      sintomas: [],
      ativo: true,
    },
    {
      id: "6",
      nome: "Cardiovasculares",
      sintomas: [],
      ativo: true,
    },
    {
      id: "7",
      nome: "Respiratórios",
      sintomas: [],
      ativo: true,
    },
    {
      id: "8",
      nome: "Gastrointestinais",
      sintomas: [],
      ativo: true,
    },
    {
      id: "9",
      nome: "Hepatobiliares / Pâncreas",
      sintomas: [],
      ativo: true,
    },
    {
      id: "10",
      nome: "Endócrinos / Metabólicos",
      sintomas: [],
      ativo: true,
    },
    {
      id: "11",
      nome: "Hematológicos / Linfáticos",
      sintomas: [],
      ativo: true,
    },
    {
      id: "12",
      nome: "Imunológicos / Alergias",
      sintomas: [],
      ativo: true,
    },
    {
      id: "13",
      nome: "Músculo-esqueléticos",
      sintomas: [],
      ativo: true,
    },
    {
      id: "14",
      nome: "Dermatológicos (Pele, Cabelos, Unhas)",
      sintomas: [],
      ativo: true,
    },
    {
      id: "15",
      nome: "Geniturinários (Urinário)",
      sintomas: [],
      ativo: true,
    },
    {
      id: "16",
      nome: "Reprodutivos (Masculino e Feminino)",
      sintomas: [],
      ativo: true,
    },
  ],

  setCategorias: () => {},
  sintomas: [
    { id: "1", nome: "Tosse", ativo: true },
    { id: "2", nome: "Falta de ar", ativo: true },
    { id: "3", nome: "Chiado no peito", ativo: true },
    { id: "4", nome: "Dor no peito", ativo: true },
    { id: "5", nome: "Palpitações", ativo: true },
    { id: "6", nome: "Fotofobia (sensibilidade à luz)", ativo: true },
    {
      id: "7",
      nome: "Dificuldade de enxergar (baixa acuidade visual)",
      ativo: true,
    },
    { id: "8", nome: "Cegueira noturna", ativo: true },
    { id: "9", nome: "Estrabismo", ativo: true },
    { id: "10", nome: "Catarata (opacificação do cristalino)", ativo: true },
    { id: "11", nome: "Olhos esbugalhados ou afundados", ativo: true },
    {
      id: "12",
      nome: "Nistagmo (movimentos involuntários dos olhos)",
      ativo: true,
    },
    {
      id: "13",
      nome: "Visão Distorcida / Borrada",
      ativo: true,
    },
    {
      id: "14",
      nome: "Diplopia (visão dupla)",
      ativo: true,
    },
    {
      id: "15",
      nome: "Poliopia (visão múltipla)",
      ativo: true,
    },
    {
      id: "16",
      nome: "Hipovisão",
      ativo: true,
    },
  ],
  setSintomas: () => {},
  doencas: [
    {
      id: "1",
      nome: "Asma",
      cid: "CID-10: J45",
      descricao:
        "Asma é uma doença inflamatória crônica das vias aéreas que causa tosse, chiado no peito e falta de ar. Os sintomas variam em intensidade e frequência, podendo ser desencadeados por alérgenos, exercício físico ou infecções.",
      diagnostico: [
        "História clínica com episódios recorrentes de tosse, chiado e falta de ar",
        "Sintomas que pioram à noite ou com exposição a gatilhos (poeira, exercício, frio)",
        "Espirometria mostrando obstrução reversível após broncodilatador",
      ],
      tratamento: [
        "Broncodilatadores de resgate para crises",
        "Corticoides inalatórios para controle contínuo",
        "Evitar fatores desencadeantes (poeira, fumaça, ácaros)",
        "Plano de ação individualizado e acompanhamento médico",
      ],
      exames: [
        "Espirometria: avalia função pulmonar e resposta ao broncodilatador",
        "Peak flow: mede variação da obstrução em casa",
        "Testes alérgicos: identificam gatilhos",
        "Radiografia de tórax: descarta outras doenças",
      ],
      sintomas: ["1", "2", "3"],
      ativo: true,
    },
    {
      id: "2",
      nome: "Ceratocone",
      cid: "CID-10: H18.6",
      descricao:
        "Ceratocone é uma doença ocular progressiva caracterizada pelo afinamento e deformação da córnea, que passa a ter formato de cone. Isso provoca astigmatismo irregular, miopia e visão distorcida, que não melhora totalmente com óculos.",
      diagnostico: [
        "História de visão borrada ou distorcida que não melhora com óculos",
        "Topografia corneana mostrando curvatura irregular típica de cone",
        "Tomografia corneana evidenciando alterações de elevação e espessura",
        "Paquimetria mostrando afinamento corneano progressivo",
      ],
      tratamento: [
        "Óculos ou lentes rígidas nos estágios iniciais",
        "Crosslinking corneano para estabilizar a progressão",
        "Anel intracorneano em casos moderados",
        "Transplante de córnea em estágios avançados",
      ],
      exames: [
        "Topografia corneana: avalia curvatura da córnea",
        "Tomografia corneana: avalia elevação e espessura",
        "Paquimetria: mede a espessura da córnea",
        "Acuidade visual: quantifica a perda de visão",
      ],
      sintomas: ["6", "13", "14", "15", "16"],
      ativo: true,
    },
  ],

  setDoencas: () => {},

  selected: [],
  setSelected: () => {},
};

export const Context = createContext<InterfaceContext>(initialValue);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //   FORM

  const [categorias, setCategorias] = useState<Categoria[]>(
    initialValue.categorias
  );
  const [sintomas, setSintomas] = useState<Sintoma[]>(initialValue.sintomas);
  const [doencas, setDoencas] = useState<Doenca[]>(initialValue.doencas);
  const [selected, setSelected] = useState<Sintoma[]>([]);
  //   useEffect(() => {}, []);
  return (
    <Context.Provider
      value={{
        categorias,
        setCategorias,
        sintomas,
        setSintomas,
        doencas,
        setDoencas,
        selected,
        setSelected,
      }}
    >
      {children}
    </Context.Provider>
  );
};
