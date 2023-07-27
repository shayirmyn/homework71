import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {ISubmit} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {postDish} from "../../store/adminThunk";

const AddForm = () => {
    const loading = useAppSelector(state => state.dishes)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();



    const [submitData, setSubmitData] = useState<ISubmit>({
        name: "",
        price: "",
        photo: "",
    });

    const dataChanged = (
        event:
            React.ChangeEvent<HTMLInputElement>

    ) => {
        const { name, value } = event.target;

        setSubmitData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(postDish(submitData));
        navigate("/admin");
    };

    return (
        <div className="mt-5 formDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <div className="col-9 m-auto mt-5 mb-5">
                <h4>Add new dish</h4>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group mt-3">
                        <label htmlFor="title">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={submitData.name}
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
                            value={submitData.price}
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
                            value={submitData.photo}
                            onChange={dataChanged}
                            name="photo"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mt-3 divImg">
                        <label htmlFor="description">Photo preview: </label>
                        <img src={submitData.photo} alt={submitData.name}/>
                    </div>
                    <NavLink to="/admin"
                             className="btn btn-danger ms-auto d-block mt-3 me-2">Back to dishes</NavLink>
                    <button
                            type="submit"
                            className="btn btn-primary ms-auto d-block mt-3 me-2"
                    >
                        <>Add</>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddForm;