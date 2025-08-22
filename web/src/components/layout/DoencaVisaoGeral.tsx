import type { Doenca } from "@/types/type";

type Props = {
  DoencaVisaoGeralprops: Doenca;
};

const DoencaVisaoGeral = ({ DoencaVisaoGeralprops }: Props) => {
  return (
    <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-md space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-zinc-300">Descrição</h3>
        <p className="text-zinc-200">{DoencaVisaoGeralprops.descricao}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-zinc-300">Prevalência</h3>
        <p className="text-zinc-200">
          Estima-se que afete entre 1 em cada 500 a 2.000 pessoas. É mais comum
          em adolescentes e adultos jovens.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-zinc-300">
          Sintomas Iniciais
        </h3>
        <ul className="list-disc pl-6 text-zinc-200">
          <li>Visão embaçada ou distorcida</li>
          <li>Aumento da sensibilidade à luz</li>
          <li>Mudanças frequentes no grau dos óculos</li>
          <li>Dificuldade para enxergar à noite</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-zinc-300">Idade de Início</h3>
        <p className="text-zinc-200">Geralmente entre 10 e 25 anos</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-zinc-300">Gravidade</h3>
        <p className="text-zinc-200">
          Variável — pode ser leve ou evoluir rapidamente, exigindo transplante
          de córnea em casos avançados.
        </p>
      </div>
    </div>
  );
};

export default DoencaVisaoGeral;
