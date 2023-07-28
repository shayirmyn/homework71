import React from "react";
import { IBasket } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postOrder } from "../../store/ordersThunk";
import BtnSpinner from "../Spinners/BtnSpinner";

interface IProps {
  basket: IBasket[];
  cancel: React.MouseEventHandler;
  onDelete: (id: string) => void;
}

const CheckOut: React.FC<IProps> = ({ basket, cancel, onDelete }) => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.orders);

  const totalPrice = basket.reduce((acc, item) => {
    return acc + parseFloat(item.price) * item.amount;
  }, 150);

  const onOrder = async (e: React.MouseEvent) => {
    await dispatch(postOrder(basket));
    basket = [];
    cancel(e);
  };

  return (
    <div className="position-fixed top-0 start-0 bottom-0 end-0 bg-black bg-opacity-50">
      <div className="position-absolute top-50 start-50 translate-middle border border-black border-2 p-3 rounded-4 bg-white">
        <div className="dishesHead">
          <div>
            <h4 className="card-header d-block me-auto ms-2 bg-body-tertiary shadow-lg">
              Orders
            </h4>
          </div>
          <div className="me-3">
            <p>
              <strong>delivery cost: 150 KGS</strong>
            </p>
            <h4>Total Price: {totalPrice} KGS</h4>
          </div>
        </div>
        <div className="card text-center postCard shadow-lg p-3 mt-4 bg-body-tertiary">
          {basket.map((item) => (
            <div key={item.id}>
              <div className="innerPost mt-2 shadow-lg p-2 mb-2 bg-body-tertiary">
                <div className="card-footer text-body-secondary d-flex">
                  <h4 className="card-title">{item.name}</h4>
                  <span className="ms-auto">
                    X<strong>{item.amount}</strong>
                  </span>
                  <div className="priceModal">
                    price: <strong>{item.price} KGS</strong>
                  </div>
                  <div className="ms-3">
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="modalBtn mt-4">
          <button className="btn btn-danger me-2" onClick={cancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onOrder}>
            {loading.postLoading && <BtnSpinner />}Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
