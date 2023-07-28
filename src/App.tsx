import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import AddForm from "./containers/AddEditForm/AddForm";
import AdminDishes from "./containers/AdminDishes/AdminDishes";
import Layout from "./components/Layout/Layout";
import EditForm from "./containers/AddEditForm/EditForm";
import UserHome from "./containers/UserHome/UserHome";
import AdminOrders from "./containers/AdminOrders/AdminOrders";

const App = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/admin" element={(
                        <div className="m-auto">
                            <h2>Hello Admin!</h2>
                        </div>
                    )}>
                    </Route>
                    <Route path="/" element={(<UserHome />)} />
                    <Route path="/admin/dishes" element={(
                        <AdminDishes />
                    )}/>
                    <Route path="/admin/orders" element={(
                        <AdminOrders />
                    )}/>
                    <Route path="/admin/new-dish" element={(
                        <AddForm />
                    )}/>
                    <Route path="/admin/:id/edit" element={(
                        <EditForm />
                    )}/>
                </Routes>
            </Layout>
        </>
    );
};

export default App;
