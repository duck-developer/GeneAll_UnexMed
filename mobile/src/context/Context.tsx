import { createContext, useEffect, useState } from "react";
import type { Categoria, Doenca, Sintoma } from "@/src/types/type";
import useSintomas from "../services/useSintomas";

interface InterfaceContext {
  categorias: Categoria[];
  sintomas: Sintoma[];
  doencas: Doenca[];

  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}
const initialValue = {
  categorias: [],
  sintomas: [],
  doencas: [],

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

  const [selected, setSelected] = useState<string[]>([]);

  const {
    sintomas,
    categorias,
    doencas,
    getAllDoencas,
    getAllSintomas,
    getAllCategory,
  } = useSintomas();
  useEffect(() => {
    getAllSintomas();
    getAllCategory();
    getAllDoencas();
  }, []);
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
