// const LoginPage = () => {
//   return (
//     <div className=" bg-amber-900 h-[100vh] ">
//       LoginPage
//       <form action="" className=" flex flex-col">
//         <input type="email" name="" id="" placeholder="Digite o seu E-mail" />
//         <input type="password" name="" id="" placeholder="Digite sua senha" />
//         <button type="submit"></button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import { Logo } from "@/assets";
const LoginPage = () => {
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="w-24 h-24 mb-6 border rounded-2xl border-gray-500"
        />

        <h1 className="text-2xl font-bold text-gray-800 mb-6">GeneAll</h1>

        <form className="flex flex-col w-full gap-4">
          <input
            type="email"
            placeholder="Digite o seu E-mail"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 cursor-pointer text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
