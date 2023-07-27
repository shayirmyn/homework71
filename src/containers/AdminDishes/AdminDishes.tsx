import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getAllDishes} from "../../store/adminThunk";
import {NavLink} from "react-router-dom";
import Spinner from "../../components/Spinners/Spinner";

const AdminDishes = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllDishes());
    }, [dispatch])

    const dishes = useAppSelector(state => state.dishes.dishes);

    const loading = useAppSelector(state => state.dishes);

    return (
        <div className="card text-center postCard shadow-lg p-3 mt-5 bg-body-tertiary">
            <div className="dishesHead">
                <div>
                    <h4 className="card-header d-block me-auto ms-2 bg-body-tertiary shadow-lg">
                        Dishes
                    </h4>
                </div>
                <div>
                    <NavLink to="/admin/new-dish" className="btn btn-secondary">New Dish</NavLink>
                </div>
            </div>
            {loading.getLoading ? (<Spinner />): (
                dishes.map((dish) => (
                    <div key={dish.id}>
                        <div className="innerPost mt-2 mb-2 shadow-lg p-2 bg-body-tertiary">
                            <div className="card-body">
                                <h5 className="card-title">{dish.name}</h5>
                                <div className="divImg">
                                    <img src={dish.photo} alt={dish.name}/>
                                </div>
                            </div>
                            <div className="card-footer text-body-secondary">
                                price: <strong>{dish.price} KGS</strong>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminDishes;