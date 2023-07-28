import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteOrder, getOrders } from "../../store/ordersThunk";
import Spinner from "../../components/Spinners/Spinner";

const AdminOrders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orders = useAppSelector((state) => state.orders.orders);

  const loading = useAppSelector((state) => state.orders);

  const onDelete = async (id: string) => {
    await dispatch(deleteOrder(id));
    await dispatch(getOrders());
  };

  return (
    <div className="card text-center postCard shadow-lg p-3 mt-5 bg-body-tertiary">
      <div className="dishesHead">
        <h4 className="card-header d-block me-auto ms-2 bg-body-tertiary shadow-lg">
          Orders
        </h4>
      </div>
      {loading.getLoading || loading.deleteLoading ? (
        <Spinner />
      ) : (
        orders.map((order) => {
          const totalPrice = order.dishes.reduce((acc, dish) => {
            return acc + parseFloat(dish.price) * dish.amount;
          }, 150);
          return (
            <div
              key={order.id}
              className="innerPost mt-2 mb-2 shadow-lg p-2 bg-body-tertiary"
            >
              {order.dishes.map((dish) => (
                <div key={dish.id}>
                  <div className="innerPost mt-2 shadow-lg p-2 mb-2 bg-body-tertiary">
                    <div className="card-footer text-body-secondary d-flex">
                      <h4 className="card-title">{dish.name}</h4>
                      <span className="ms-auto">
                        X<strong>{dish.amount}</strong>
                      </span>
                      <div className="priceModal">
                        price: <strong>{dish.price} KGS</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <p>Delivery cost: 150 KGS</p>
              <h4>
                <strong>total Price: {totalPrice} KGS</strong>
              </h4>
              <button
                className="btn btn-danger ms-auto"
                onClick={() => onDelete(order.id)}
              >
                Complete order
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AdminOrders;
