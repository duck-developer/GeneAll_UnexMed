import { ParticlesBackground } from "@/components/ui";
import { Context } from "@/context/Context";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

// ICONS
import { FaClipboardList } from "react-icons/fa";
import { LuBrain } from "react-icons/lu";
import { GiMicroscope } from "react-icons/gi";
import {
  PiPillFill,
  PiTestTubeFill,
  PiDna,
  PiPuzzlePieceBold,
  PiBooksDuotone,
} from "react-icons/pi";
import { FaXRay } from "react-icons/fa6";
import {
  DoencaDiagnostico,
  DoencaDiferencial,
  DoencaExames,
  DoencaFisiopatologia,
  DoencaFontes,
  DoencaGenetica,
  DoencaImagens,
  DoencaTratamento,
  DoencaVisaoGeral,
} from "@/components/layout";

const DoencaDetalhe = () => {
  const { id } = useParams();
  const { doencas } = useContext(Context);

  const doenca = doencas.find((d) => d.id === id);

  const options = [
    { name: "Visão Geral", icon: FaClipboardList },
    { name: "Fisiopatologia", icon: LuBrain },
    { name: "Diagnóstico", icon: GiMicroscope },
    { name: "Tratamento", icon: PiPillFill },
    { name: "Exames", icon: PiTestTubeFill },
    { name: "Genética", icon: PiDna },
    { name: "Dif. Diagnóstico", icon: PiPuzzlePieceBold },
    { name: "Imagens", icon: FaXRay },
    { name: "Fontes", icon: PiBooksDuotone },
  ];

  const [filtro, setFiltro] = useState("Visão Geral");

  if (!doenca) {
    return (
      <div className="text-white pt-20 text-center">
        <ParticlesBackground />
        <h1 className="font-bold text-3xl">Doença não encontrada.</h1>
      </div>
    );
  }

  return (
    <div className="text-white pt-5">
      <ParticlesBackground />
      <h1 className="text-3xl font-bold text-center capitalize">
        {` ${doenca.nome} (${doenca.cid}) `}
      </h1>

      {/* SCROLL HORIZONTAL */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar  px-4 py-6 ">
        {options.map((item, index) => {
          const isActive = filtro === item.name;
          return (
            <button
              key={index}
              onClick={() => setFiltro(item.name)}
              className={`flex cursor-pointer items-center gap-3 min-w-[12rem] px-4 py-3 rounded-2xl shadow-md transition-all duration-300 
                ${
                  isActive
                    ? "bg-cyan-600  scale-105"
                    : "bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-zinc-100"
                }`}
            >
              <item.icon size={24} />
              <span className="text-base ">{item.name}</span>
            </button>
          );
        })}
      </div>

      <div>
        <div className="mt-6">
          {filtro === "Visão Geral" && (
            <DoencaVisaoGeral DoencaVisaoGeralprops={doenca} />
          )}
          {filtro === "Fisiopatologia" && <DoencaFisiopatologia />}
          {filtro === "Diagnóstico" && <DoencaDiagnostico />}
          {filtro === "Tratamento" && <DoencaTratamento />}
          {filtro === "Exames" && <DoencaExames />}
          {filtro === "Genética" && <DoencaGenetica />}
          {filtro === "Dif. Diagnóstico" && <DoencaDiferencial />}
          {filtro === "Imagens" && <DoencaImagens />}
          {filtro === "Fontes" && <DoencaFontes />}
        </div>
      </div>
    </div>
  );
};

export default DoencaDetalhe;
