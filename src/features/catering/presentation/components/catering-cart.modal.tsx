import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useEffect } from "react";
import { BsCartX } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import {
  removeItemFromCartCatering,
  RemoveItemFromCartCateringState,
  resetRemoveItemFromCartCatering,
  selectRemoveItemFromCartCatering,
} from "../slices/remove-item-from-cart-catering.slice";

interface CateringCartModalProps {
  open: boolean;
  onClose: any;
}

export function CateringCartModal(props: CateringCartModalProps) {
  const getSessionState = useAppSelector(selectGetSession);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const removeItemFromCartCateringState = useAppSelector(
    selectRemoveItemFromCartCatering
  );

  useEffect(() => {
    if (
      removeItemFromCartCateringState.status ===
      RemoveItemFromCartCateringState.success
    ) {
      dispatch(getSession());
      dispatch(resetRemoveItemFromCartCatering());
    }
  }, [removeItemFromCartCateringState, dispatch]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  const isAvailableToProcess = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += orders[i].prod_calc_amount;
      }
    }
    return calculatedPrice > 0;
  };

  const calculateOrdersPrice = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += orders[i].prod_calc_amount;
      }
      return (
        <NumberFormat
          value={calculatedPrice.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    } else {
      return (
        <NumberFormat
          value={0}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-paper px-4 pt-[30px] pb-3 round w-[90%] lg:w-[400px] mt-10 relative rounded-[10px]">
        <button
          className="absolute text-2xl text-secondary top-2 right-4 "
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        {getSessionState.data?.orders === undefined ||
        getSessionState.data?.orders == null ||
        getSessionState.data?.orders.length <= 0 ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <BsCartX className="text-secondary text-7xl" />
            <span className="text-secondary text-4xl font-['Bebas_Neue'] tracking-[2px]">
              Cart Empty
            </span>
          </div>
        ) : (
          <div>
            <h1 className="text-secondary text-3xl font-['Bebas_Neue'] tracking-[2px] text-center border-secondary border-2 rounded-t-2xl py-2 my-4">
              My Cart
            </h1>

            <div className="space-y-6 overflow-y-auto max-h-[400px] lg:max-h-[300px] px-[4px] py-[10px]">
              {getSessionState.data?.orders.map((order, i) => (
                <div
                  key={i}
                  className="flex bg-secondary shadow-md rounded-[10px] relative"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${order.prod_image_name}`}
                    className="rounded-[10px] w-[92px] h-[92px]"
                    alt=""
                  />
                  <div className="flex flex-col flex-1 px-3 py-2 text-white">
                    <h3 className="text-sm w-[90%]  font-bold leading-4">
                      {order.prod_size} {order.prod_name}
                    </h3>
                    <h3 className="text-xs">
                      Quantity:{" "}
                      <span className="text-tertiary">{order.prod_qty}</span>
                    </h3>
                    {order.prod_flavor ? (
                      <h3 className="text-xs">
                        Flavor:{" "}
                        <span className="text-tertiary">
                          {order.prod_flavor}
                        </span>
                      </h3>
                    ) : null}

                    {order.prod_multiflavors ? (
                      <h3 className="text-xs">
                        Flavor: <br />
                        <span
                          className="text-tertiary"
                          dangerouslySetInnerHTML={{
                            __html: order.prod_multiflavors,
                          }}
                        />
                      </h3>
                    ) : null}

                    <h3 className="flex items-end justify-end flex-1 text-base">
                      {order.prod_calc_amount > 0 ? (
                        <NumberFormat
                          value={order.prod_calc_amount.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      ) : (
                        <span className="font-bold text-tertiary">FREE</span>
                      )}
                    </h3>
                  </div>
                  <button
                    className="absolute text-white top-2 right-4 "
                    onClick={() => {
                      dispatch(removeItemFromCartCatering(i));
                    }}
                  >
                    <IoMdClose />
                  </button>
                </div>
              ))}
            </div>

            {isAvailableToProcess() ? (
              <>
                <hr className="mt-6 mb-2 border-t-1 border-secondary" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-secondary">Total:</span>
                    <span className="font-bold text-secondary">
                      {calculateOrdersPrice()}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      props.onClose();
                      navigate("/shop/checkout");
                    }}
                    className="w-full py-2 text-lg text-white border rounded-lg border-secondary bg-button"
                  >
                    Process Orders
                  </button>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
