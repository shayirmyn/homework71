import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllDishes } from "../../store/dishesThunk";
import Spinner from "../../components/Spinners/Spinner";
import { IBasket, IGet2 } from "../../types";
import CheckOut from "../../components/CheckOut/CheckOut";

const UserHome = () => {
  const dispatch = useAppDispatch();

  const [basket, setBasket] = useState<IBasket[]>([]);

  useEffect(() => {
    dispatch(getAllDishes());
  }, [dispatch]);

  const dishes = useAppSelector((state) => state.dishes.dishes);

  const loading = useAppSelector((state) => state.dishes);

  const addToBasket = (dish: IGet2) => {
    const currentIndex = basket.findIndex((item) => item.id === dish.id);

    if (currentIndex !== -1) {
      const basketCopy = [...basket];
      const prevAmount = basketCopy[currentIndex].amount;
      basketCopy.splice(currentIndex, 1);
      setBasket([...basketCopy, { ...dish, amount: prevAmount + 1 }]);
    } else {
      setBasket((prevState) => [
        ...prevState,
        {
          ...dish,
          amount: 1,
        },
      ]);
    }
  };

  const [isCheckout, setIsCheckout] = useState(false);

  const onDelete = (id: string) => {
    setBasket((prevState) => prevState.filter((every) => every.id !== id));
  };

  let checkout: React.ReactNode | null = isCheckout ? (
    <CheckOut
      onDelete={onDelete}
      cancel={() => setIsCheckout(false)}
      basket={basket}
    />
  ) : null;

  return (
    <div className="card text-center postCard shadow-lg p-3 mt-5 bg-body-tertiary">
      <div className="dishesHead">
        <div>
          <h4 className="card-header d-block me-auto ms-2 bg-body-tertiary shadow-lg">
            Dishes
          </h4>
        </div>
        <div>
          <button
            className="btn btn-success"
            onClick={() => setIsCheckout(true)}
          >
            Checkout
          </button>
        </div>
      </div>
      {loading.getLoading ? (
        <Spinner />
      ) : (
        dishes.map((dish) => (
          <div key={dish.id}>
            <div className="innerPost mt-2 shadow-lg p-2 mb-2 bg-body-tertiary">
              <div className="card-body">
                <h5 className="card-title">{dish.name}</h5>
                <div className="divImg">
                  <img src={dish.photo} alt={dish.name} />
                </div>
              </div>
              <div className="card-footer text-body-secondary d-flex justify-content-between">
                <div className="ms-3">
                  price: <strong>{dish.price} KGS</strong>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToBasket(dish)}
                  >
                    Add to order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {checkout}
    </div>
  );
};

export default UserHome;
