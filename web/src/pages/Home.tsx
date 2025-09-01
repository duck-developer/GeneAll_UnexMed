import { IconsUi } from "../components/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebaseconnection";

// ICONS
import { MdSick } from "react-icons/md";
import { FaViruses } from "react-icons/fa";
import { LuBlocks, LuLogOut } from "react-icons/lu";
import CategoryPage from "./CategoryPage/CategoryPage";
import SintomasPage from "./SintomasPage/SintomasPage";
import DoencaPage from "./DoençaPage/DoencaPage";

const Home = () => {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("Categoria");

  const options = [
    { name: "Categoria", icon: LuBlocks },
    { name: "Sintomas", icon: MdSick },
    { name: "Doenças", icon: FaViruses },
  ];

  // Função de logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // volta pro login
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between flex-1">
        {/* Sidebar */}
        <div className="bg-cyan-950 fixed h-full border-r-2 border-white flex z-10 flex-col max-w-[30%] gap-4 px-4 py-2 transition-all pt-8">
          {/* Botões principais */}
          {options.map((item, index) => {
            const isActive = filtro === item.name;
            return (
              <button
                key={index}
                onClick={() => setFiltro(item.name)}
                className="text-white group flex w-[3rem] h-[3rem] justify-center items-center gap-2 
                           bg-blue-600 rounded-full cursor-pointer transition-all ease-in-out 
                           hover:justify-center hover:rounded-lg hover:w-[10rem]"
              >
                <IconsUi
                  size={26}
                  active={isActive}
                  icon={item.icon}
                  className="text-white"
                />
                <p className="group-hover:block hidden">{item.name}</p>
              </button>
            );
          })}

          {/* Botão de sair */}
          <button
            onClick={handleLogout}
            className="mt-auto text-white group flex w-[3rem] h-[5rem] justify-center items-center gap-2 
                       rounded-full cursor-pointer transition-all ease-in-out 
                       hover:justify-center hover:rounded-lg hover:w-[10rem]"
          >
            <IconsUi size={26} icon={LuLogOut} className="text-white" />
            <p className="group-hover:block hidden">Sair</p>
          </button>
        </div>

        {/* Conteúdo */}
        <div className="w-full ml-[5rem]">
          {filtro === "Categoria" && <CategoryPage />}
          {filtro === "Sintomas" && <SintomasPage />}
          {filtro === "Doenças" && <DoencaPage />}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
