import { Link } from "react-router-dom";
import { IconsUi, ParticlesBackground } from "../components/ui";
import { motion } from "framer-motion";

import { useState } from "react";

//ICONS
import { MdSick } from "react-icons/md";
import { FaViruses } from "react-icons/fa";
import { LuBlocks } from "react-icons/lu";
import CategoryPage from "./CategoryPage";
import SintomasPage from "./SintomasPage";
import DoencaPage from "./DoencaPage";

const Home = () => {
  const options = [
    { name: "Categoria", icon: LuBlocks },
    { name: "Sintomas", icon: MdSick },
    { name: "Doenças", icon: FaViruses },
  ];
  const [filtro, setFiltro] = useState("Categoria");
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* <ParticlesBackground /> */}

      {/* <div className=" w-full h-[100vh]  flex justify-center items-center pb-[15%] gap-[30%]">
        <Link
          className={`bg-[#0F172A] cursor-pointer rounded-[10px] border border-[#1E293B] px-[40px] py-[10px] hover:border-[#334155] ease-in-out transition-all`}
          to="/sintomas"
        >
          <p className="text-[#94A3B8] text-[18px]">Sintomas</p>
        </Link>

        <Link
          className={`bg-[#0F172A] cursor-pointer rounded-[10px] border border-[#1E293B] px-[40px] py-[10px] hover:border-[#334155] ease-in-out transition-all`}
          to="/doenças"
        >
          <p className="text-[#94A3B8] text-[18px]">Doenças</p>
        </Link>
      </div> */}

      <div className="flex justify-between  flex-1">
        <div className="bg-cyan-950 fixed h-full  border-r-2 border-white flex z-10 flex-col max-w-[30%] gap-4 px-4 py-2 transition-all pt-8">
          {options.map((item, index) => {
            const isActive = filtro === item.name;
            return (
              <button
                onClick={async () => {
                  // if (item.name == "Sair") {
                  // await firebaseLogOutAcount();
                  // } else {
                  setFiltro(item.name);
                  // }
                }}
                key={index}
                className=" text-white group flex w-[3rem] h-[3rem] justify-center items-center gap-2 bg-blue-600 rounded-full cursor-pointer transition-all ease-in-out hover:justify-center hover:rounded-lg hover:w-[10rem]"
              >
                <IconsUi
                  size={26}
                  active={isActive}
                  icon={item.icon}
                  className=" text-white"
                />
                <p className="group-hover:block hidden">{item.name}</p>
              </button>
            );
          })}
        </div>

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
