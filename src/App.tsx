import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import AddForm from "./containers/AdminForms/AddForm";
import AdminDishes from "./containers/AdminDishes/AdminDishes";
import Layout from "./components/Layout/Layout";
import NavHead from "./components/NavHead/NavHead";

const App = () => {

    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/admin" element={(
                        <NavHead />
                    )}>
                    </Route>
                    <Route path="/admin/dishes" element={(
                        <AdminDishes />
                    )}/>
                    <Route path="/admin/new-dish" element={(
                        <AddForm />
                    )}/>
                </Routes>
            </Layout>
        </>
    );
};

export default App;
