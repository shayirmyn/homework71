import React, { useEffect, useState } from "react";
import { IGet } from "../../types";
import { NavLink } from "react-router-dom";

interface IProps {
  dish?: IGet;
  onSubmit: (dish: IGet) => void;
}

const initialState = {
  name: "",
  price: "",
  photo: "",
};
const DishForm: React.FC<IProps> = ({ dish = initialState, onSubmit }) => {
  const [dishForm, setDishForm] = useState<IGet>(dish);

  useEffect(() => {
    setDishForm(dish);
  }, [dish]);

  const dataChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setDishForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(dishForm);
  };

  return (
    <div className="col-9 m-auto mt-5 mb-5">
      {dish.name ? <h4>Edit dish</h4> : <h4>Add new dish</h4>}
      <form onSubmit={onSubmitHandler}>
        <div className="form-group mt-3">
          <label htmlFor="title">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={dishForm.name}
            onChange={dataChanged}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="title">Price</label>
          <input
            id="phone"
            type="text"
            name="price"
            value={dishForm.price}
            onChange={dataChanged}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="description">Photo</label>
          <input
            type="text"
            id="photo"
            value={dishForm.photo}
            onChange={dataChanged}
            name="photo"
            required
            className="form-control"
          />
        </div>
        <div className="form-group mt-3 divImg">
          <label htmlFor="description">Photo preview: </label>
          <img src={dishForm.photo} alt={dishForm.name} />
        </div>
        <NavLink
          to="/admin/dishes"
          className="btn btn-danger ms-auto d-block mt-3 me-2"
        >
          Back to dishes
        </NavLink>
        <button
          type="submit"
          className="btn btn-primary ms-auto d-block mt-3 me-2"
        >
          {dish.name ? <>Save</> : <>Add</>}
        </button>
      </form>
    </div>
  );
};

export default DishForm;
