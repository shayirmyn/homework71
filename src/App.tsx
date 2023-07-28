import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AddForm from "./containers/AddEditForm/AddForm";
import AdminDishes from "./containers/AdminDishes/AdminDishes";
import Layout from "./components/Layout/Layout";
import EditForm from "./containers/AddEditForm/EditForm";
import UserHome from "./containers/UserHome/UserHome";
import AdminOrders from "./containers/AdminOrders/AdminOrders";
import NavHead from "./components/NavHead/NavHead";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/admin"
            element={
              <header>
                <NavHead />
              </header>
            }
          ></Route>
          <Route
            path="/"
            element={
              <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <div className="container-fluid">
                    <span className="navbar-brand ms-5">
                      <h4>Turtle Pizza Admin</h4>
                    </span>
                  </div>
                </nav>
                <UserHome />
              </div>
            }
          />
          <Route
            path="/admin/dishes"
            element={
              <div>
                <header>
                  <NavHead />
                </header>
                <AdminDishes />
              </div>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <div>
                <header>
                  <NavHead />
                </header>
                <AdminOrders />
              </div>
            }
          />
          <Route
            path="/admin/new-dish"
            element={
              <div>
                <header>
                  <NavHead />
                </header>
                <AddForm />
              </div>
            }
          />
          <Route
            path="/admin/:id/edit"
            element={
              <div>
                <header>
                  <NavHead />
                </header>
                <EditForm />
              </div>
            }
          />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
