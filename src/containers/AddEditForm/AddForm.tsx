import React from "react";
import { useNavigate } from "react-router-dom";
import { IGet } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postDish } from "../../store/dishesThunk";
import Spinner from "../../components/Spinners/Spinner";
import DishForm from "../../components/DishForm/DishForm";

const AddForm = () => {
  const loading = useAppSelector((state) => state.dishes.postLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addDish = async (dish: IGet) => {
    await dispatch(postDish(dish));
    navigate("/admin/dishes");
  };

  return (
    <div className="mt-5 formDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      {loading ? <Spinner /> : <DishForm onSubmit={addDish} />}
    </div>
  );
};

export default AddForm;
