export type Sintoma = {
  id: string;
  nome: string;
  ativo: boolean;
};

export type Categoria = {
  id: string;
  nome: string;
  sintomas: string[];
  ativo: boolean;
};

export type Doenca = {
  id: string;
  nome: string;
  cid: string;
  descricao: string;
  sintomas: string[];
  ativo: boolean;
};

export type BaseDeDados = {
  categorias: Categoria[];
  sintomas: Sintoma[];
  doencas: Doenca[];
};
