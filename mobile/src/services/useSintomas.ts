// src/hooks/useSintomas.ts
import { useState } from "react";
import type { Categoria, Doenca, Sintoma } from "@/src/types/type";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/src/services/firebaseConnection";

const doencasCollection = collection(db, "doencas");

const sintomasCollection = collection(db, "sintomas");
const categoriasCollection = collection(db, "categorias");

const useSintomas = () => {
  const [sintomas, setSintomas] = useState<Sintoma[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [doencas, setDoencas] = useState<Doenca[]>([]);

  // Busca todos os sintomas
  async function getAllSintomas() {
    const snapshot = await getDocs(sintomasCollection);

    const lista: Sintoma[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Sintoma[];

    setSintomas(lista);
  }

  async function getAllCategory() {
    const snapshot = await getDocs(categoriasCollection);

    const lista: Categoria[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Categoria[];

    setCategorias(lista);
  }

  const getAllDoencas = async () => {
    const snapshot = await getDocs(doencasCollection);
    const list: Doenca[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Doenca[];
    setDoencas(list);
  };

  return {
    categorias,

    sintomas,
    doencas,

    getAllSintomas,
    getAllCategory,
    getAllDoencas,
  };
};

export default useSintomas;
