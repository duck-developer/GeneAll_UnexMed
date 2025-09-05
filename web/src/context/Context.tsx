import { createContext, useEffect, useState } from "react";
import type { Categoria, Doenca, Sintoma } from "@/types/type";
import useSintomas from "@/pages/SintomasPage/utils/useSintomas";
import useCategory from "@/pages/CategoryPage/utils/useCategory";
import useDoenca from "@/pages/DoençaPage/utils/useDoenca";

interface InterfaceContext {
  categorias: Categoria[];
  sintomas: Sintoma[];
  doencas: Doenca[];

  selected: Sintoma[];
  setSelected: React.Dispatch<React.SetStateAction<Sintoma[]>>;
}
const initialValue = {
  categorias: [],
  sintomas: [],
  setSintomas: () => {},
  doencas: [],

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
  const [selected, setSelected] = useState<Sintoma[]>([]);

  //SERVICES
  const { sintomas, getAllSintomas } = useSintomas();
  const { categorias, getAllCategory } = useCategory();
  const { doencas, getAllDoencas } = useDoenca();
  useEffect(() => {
    getAllSintomas();
    getAllCategory();
    getAllDoencas();
  }, [sintomas, categorias, doencas]);
  return (
    <Context.Provider
      value={{
        categorias,
        sintomas,
        doencas,
        selected,
        setSelected,
      }}
    >
      {children}
    </Context.Provider>
  );
};
