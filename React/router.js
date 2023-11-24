import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroForm from "./Components/cadastro";
import LoginForm from "./Components/LoginForm";
import Table from "./Components/tableInfo";
import CadastroProduto from "./Components/cadastroProduto";
import EditarProduto from "./Components/editarProduto";
import TableUsuario from "./Components/tableInfoUsuario";
import CadastroEdit from "./Components/editarUsuario";
import AcessoUsuario from "./Components/acessoUsuario";
import TableUsuarioUsuario from "./Components/acessoUsuarioUsuario";





const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cadastro" element={<CadastroForm />} />
        <Route path="/table" element={<Table />} />
        <Route path="/cadastroProduto" element={<CadastroProduto />} />
        <Route path="/editarProduto/:id" element={<EditarProduto />} />
        <Route path="/tableUsuario" element={<TableUsuario />} />
        <Route path="/acessoUsuario" element={<AcessoUsuario />} />
        <Route path="/cadastroEdit/:id" element={<CadastroEdit />} />
        <Route path="/tableUsuarioUsuario" element={<TableUsuarioUsuario />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;