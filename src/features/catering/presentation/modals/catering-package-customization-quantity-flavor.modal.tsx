import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  changeProductPrice,
  GetProductDetailsState,
  selectGetProductDetails,
} from "features/shop/presentation/slices/get-product-details.slice";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import { ShopMultiFlavorType } from "features/shop/presentation/pages/shop-product.page";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import NumberFormat from "react-number-format";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {
  getProductSku,
  GetProductSkuState,
  selectGetProductSku,
} from "features/shop/presentation/slices/get-product-sku.slice";
import { ShopProductFlavor } from "features/shop/presentation/components";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { CustomizePackageProduct } from "../pages/catering-build-your-own-package.page";

let quantityId: any;

interface CateringPackageCustomizationQuantityFlavorModalProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (product: CustomizePackageProduct) => void;
}
export function CateringPackageCustomizationQuantityFlavorModal(
  props: CateringPackageCustomizationQuantityFlavorModalProps
) {
  const query = useQuery();

  const hash = query.get("hash");

  const isLongPress = useRef(false);
  const timerRef = useRef(0);
  const isQuantityNull = useRef(false);
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [setDisabled] = useState(true);
  const [resetMultiFlavors, setResetMultiFlavors] = useState(false);
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const [currentSize, setCurrentSize] = useState<string>("");

  const [currentMultiFlavors, setCurrentMultiFlavors] =
    useState<ShopMultiFlavorType>({});

  const getSessionState = useAppSelector(selectGetSession);
  const getProductDetailsState = useAppSelector(selectGetProductDetails);
  const getProductSkuState = useAppSelector(selectGetProductSku);

  useEffect(() => {
    if (resetMultiFlavors === true) {
      setResetMultiFlavors(false);
    }
  }, [resetMultiFlavors]);

  useEffect(() => {
    if (
      getProductSkuState.status === GetProductSkuState.success &&
      getProductSkuState.data
    ) {
      dispatch(
        changeProductPrice({
          price: getProductSkuState.data.price,
        })
      );
    }
  }, [getProductSkuState, dispatch]);

  useEffect(() => {
    setQuantity(1);
    setCurrentSize("");
    setCurrentMultiFlavors({});
    setResetMultiFlavors(false);
  }, [hash]);

  useEffect(() => {
    if (
      getProductDetailsState.status &&
      getProductDetailsState.data &&
      getProductDetailsState.data.product_size &&
      getProductDetailsState.data.product_size.length > 0 &&
      getProductDetailsState.data.product.product_hash === hash &&
      currentSize === ""
    ) {
      setCurrentSize(getProductDetailsState.data.product_size[0].id.toString());
    }
  }, [getProductDetailsState, currentSize, hash]);

  function handleOnClick() {
    if (isLongPress.current === true) {
      return;
    }
  }

  function handleOnMouseUp() {
    clearTimeout(timerRef.current);
    clearInterval(quantityId);

    if (quantity > 1) {
      if (
        getProductDetailsState.data &&
        getProductDetailsState.data?.product.num_flavor > 0
      ) {
        setCurrentMultiFlavors({});
        setResetMultiFlavors(true);
      }
    }
  }

  function handleOnMouseDown(action: string) {
    isQuantityNull.current = false;
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      clearInterval(quantityId);
      setOpenLoginChooserModal(true);
    } else {
      pressTimer(action);
    }
  }

  function pressTimer(action: string) {
    isLongPress.current = false;

    action === "add"
      ? setQuantity(() => {
          return isNaN(quantity) ? 1 : quantity + 1;
        })
      : setQuantity(quantity - 1);

    timerRef.current = window.setTimeout(() => {
      handleOnLongPress(action);
      isLongPress.current = true;
    }, 300);
  }

  function handleOnLongPress(action: string) {
    let counter = isNaN(quantity) ? 1 : quantity;

    quantityId = setInterval(() => {
      if (action === "add") counter += 1;
      else counter -= 1;

      if (counter >= 1000) {
        clearTimeout(timerRef.current);
        clearInterval(quantityId);
        setQuantity(1000);
      } else if (counter <= 1) {
        clearTimeout(timerRef.current);
        clearInterval(quantityId);
        setQuantity(1);
      } else {
        setQuantity(counter);
      }
    }, 100);
  }

  const createFlavorDetails = (): string | undefined => {
    if (currentMultiFlavors === undefined) return undefined;
    let result: string | undefined;

    Object.keys(currentMultiFlavors).forEach((key) => {
      const multiFlavorsArray: Array<{
        name: string;
        quantity: number;
      }> = Object.values(currentMultiFlavors[key]);

      for (let i = 0; i < multiFlavorsArray.length; i++) {
        if (multiFlavorsArray[i].quantity > 0)
          result =
            (result === undefined ? "" : result) +
            `<strong>${multiFlavorsArray[i].quantity.toString()}</strong> - ${
              multiFlavorsArray[i].name
            }<br>`;
      }
    });

    return result ? result : undefined;
  };

  const handleSizeAndFlavorChange = (size: string) => {
    if (getProductDetailsState.data) {
      dispatch(
        getProductSku({
          prod_flavor: "",
          prod_size: size,
        })
      );
    }
  };

  const handleAddProductToPackage = () => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    if (
      getProductDetailsState.status === GetProductDetailsState.success &&
      getProductDetailsState.data
    ) {
      if (
        getProductDetailsState.data?.product_flavor &&
        getProductDetailsState.data.product.num_flavor > 0 &&
        getProductDetailsState.data.product_flavor.length > 0
      ) {
        for (
          let i = 0;
          i < getProductDetailsState.data.product_flavor.length;
          i++
        ) {
          let totalMultiFlavorsQuantity = 0;

          if (currentMultiFlavors[i] === undefined) {
            dispatch(
              popUpSnackBar({
                message: "Please meet the required number of flavors.",
                severity: "error",
              })
            );

            return;
          }

          Object.keys(currentMultiFlavors[i]).forEach(function (key) {
            const currentFlavor = currentMultiFlavors[i];
            totalMultiFlavorsQuantity += currentFlavor[key].quantity;
          });

          if (
            totalMultiFlavorsQuantity !==
            quantity * getProductDetailsState.data.product.num_flavor
          ) {
            dispatch(
              popUpSnackBar({
                message: "Please meet the required number of flavors.",
                severity: "error",
              })
            );

            return;
          }
        }
      }

      let flavors_details = createFlavorDetails();

      props.onAddProduct({
        prod_id: getProductDetailsState.data.product.id,
        prod_image_name: getProductDetailsState.data.product.product_image,
        prod_name: getProductDetailsState.data.product.name,
        prod_qty: quantity,
        prod_size: currentSize,
        prod_price: getProductDetailsState.data.product.price,
        prod_calc_amount: getProductDetailsState.data.product.price * quantity,
        prod_category: getProductDetailsState.data.product.category,
        promo_discount_percentage:
          getProductDetailsState.data.product.promo_discount_percentage,
        prod_with_drinks: -1,
        flavors_details: flavors_details,
        prod_sku_id: -1,
        prod_sku: -1,
        prod_type: "product",
      });

      props.onClose();
    }
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div
        style={{ display: props.open ? "flex" : "none" }}
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm no-scrollbar no-scrollbar::-webkit-scrollbar"
      >
        <div className="bg-secondary px-3 py-[30px] round w-[90%] sm:w-[60%] lg:w-[40%] relative rounded-[10px] mt-10 mb-[150px]">
          <button
            className="absolute text-2xl text-white top-2 right-4 "
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          >
            <IoMdClose />
          </button>

          <section className="px-2 py-4 space-y-3">
            <Swiper
              slidesPerView={"auto"}
              autoplay={{ delay: 5000 }}
              modules={[Navigation, Autoplay]}
              navigation
              className="w-full"
            >
              {getProductDetailsState.data?.product_images.map((name) => (
                <SwiperSlide>
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${name}`}
                    className="rounded-[10px] w-full h-full object-cover"
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex flex-col flex-1 py-2 space-y-1 text-white">
              <h3 className="text-lg w-[90%] font-bold leading-4">
                {getProductDetailsState.data?.product.name}
              </h3>

              {getProductDetailsState.data?.product.add_details ? (
                <span
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: getProductDetailsState.data?.product.add_details,
                  }}
                />
              ) : null}
            </div>

            {getProductDetailsState.data?.product.price ? (
              <h2 className="mt-4 text-4xl text-white">
                <NumberFormat
                  value={(
                    getProductDetailsState.data.product.price * quantity
                  ).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </h2>
            ) : null}

            <div>
              <h2 className="font-['Bebas_Neue'] text-3xl text-white tracking-[2px]">
                Quantity
              </h2>

              <div className="h-[50px] w-full mt-2">
                <div className="relative flex flex-row w-full h-full mt-1 text-white bg-transparent border-2 border-white rounded-lg">
                  <button
                    onClick={() =>
                      quantity <= 1 || isQuantityNull.current
                        ? setDisabled
                        : handleOnClick()
                    }
                    onMouseDown={() =>
                      quantity <= 1 ? setDisabled : handleOnMouseDown("minus")
                    }
                    onMouseUp={handleOnMouseUp}
                    onTouchStart={() =>
                      quantity <= 1 ? setDisabled : handleOnMouseDown("minus")
                    }
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      handleOnMouseUp();
                    }}
                    className={`h-full w-[150px] rounded-l cursor-pointer outline-none bg-primary ${
                      quantity <= 1 || isQuantityNull.current
                        ? "opacity-30 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <AiOutlineMinus className="mx-8 text-xl " />
                  </button>

                  <input
                    value={quantity}
                    type="number"
                    onChange={(e) => {
                      let value = e.target.value;
                      isQuantityNull.current = false;

                      if (
                        getSessionState.data?.userData == null ||
                        getSessionState.data?.userData === undefined
                      ) {
                        clearInterval(quantityId);
                        setOpenLoginChooserModal(true);
                      } else {
                        if (isNaN(parseInt(value)) || value === "0") {
                          isQuantityNull.current = true;
                        }
                        if (parseInt(value) >= 1000) {
                          setQuantity(1000);
                        } else if (parseInt(value) < 0) {
                          setQuantity(1);
                        } else {
                          setQuantity(parseInt(value));
                        }
                      }
                    }}
                    min="1"
                    max="1000"
                    className="flex items-center w-full text-xl font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
                    name="custom-input-number"
                  />

                  <button
                    onClick={() =>
                      quantity >= 1000 ? setDisabled : handleOnClick()
                    }
                    onMouseDown={() =>
                      quantity >= 1000 ? setDisabled : handleOnMouseDown("add")
                    }
                    onMouseUp={handleOnMouseUp}
                    onTouchStart={() =>
                      quantity >= 1000 ? setDisabled : handleOnMouseDown("add")
                    }
                    onTouchEnd={(e) => {
                      e.preventDefault();

                      handleOnMouseUp();
                    }}
                    className={`h-full w-[150px] rounded-r cursor-pointer bg-primary ${
                      quantity >= 1000 ? "opacity-30 cursor-not-allowed" : ""
                    }`}
                  >
                    <AiOutlinePlus className="mx-8 text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {getProductDetailsState.data?.product_size &&
            getProductDetailsState.data?.product_size.length > 0 ? (
              <div>
                <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
                  Choose Size
                </h2>
                <FormControl>
                  <RadioGroup
                    value={currentSize}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const sizeId = (event.target as HTMLInputElement).value;

                      setCurrentSize(sizeId);
                      handleSizeAndFlavorChange(sizeId);
                    }}
                  >
                    {getProductDetailsState.data?.product_size.map(
                      (size, i) => {
                        return (
                          <FormControlLabel
                            key={i}
                            value={size.id}
                            control={
                              <Radio color="tertiary" sx={{ color: "white" }} />
                            }
                            label={
                              <span className="!text-white">{size.name}</span>
                            }
                          />
                        );
                      }
                    )}
                  </RadioGroup>
                </FormControl>
              </div>
            ) : null}

            {getProductDetailsState.data?.product_flavor.map((flavor, i) => (
              <>
                {getProductDetailsState.data ? (
                  <ShopProductFlavor
                    key={i}
                    numberOfFlavors={
                      getProductDetailsState.data.product.num_flavor
                    }
                    productQuantity={quantity}
                    currentMultiFlavor={currentMultiFlavors[i]}
                    flavor={flavor}
                    onChangeMultiFlavor={(updatedMultiFlavors) => {
                      const updateCurrentMultiFlavor = {
                        ...currentMultiFlavors,
                      };

                      updateCurrentMultiFlavor[i] = updatedMultiFlavors;

                      setCurrentMultiFlavors(updateCurrentMultiFlavor);
                    }}
                  />
                ) : null}
              </>
            ))}

            <button
              onClick={handleAddProductToPackage}
              className="text-white !mt-8 text-xl border border-white flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
            >
              <BsFillCartPlusFill className="text-3xl" />
              <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                Add product
              </span>
            </button>
          </section>
        </div>
      </div>
      <LoginChooserModal
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />
    </>
  );
}
