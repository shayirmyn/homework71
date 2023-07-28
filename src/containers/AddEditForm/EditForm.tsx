import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getOneDish, putDish} from "../../store/dishesThunk";
import DishForm from "../../components/DishForm/DishForm";
import {IGet} from "../../types";
import Spinner from "../../components/Spinners/Spinner";

const EditForm = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams() as {id: string};
    const dish = useAppSelector(state => state.dishes.dish);
    const loading = useAppSelector(state => state.dishes);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOneDish(id));
    }, [id, dispatch]);

    const editDish = async (newDish: IGet) => {
        await dispatch(putDish({
            id,
            data: newDish
        }));


        navigate("/admin/dishes");
    };


    return dish && (
        <div className="mt-5 formDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            {
                loading.getOneLoading ? (<Spinner />) :
                    (
                        <DishForm dish={dish} onSubmit={editDish}/>

                    )
            }
        </div>
    );
};

export default EditForm;