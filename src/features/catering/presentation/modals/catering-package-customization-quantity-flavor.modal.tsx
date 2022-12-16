import { useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { selectGetProductDetails } from "features/shop/presentation/slices/get-product-details.slice";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";

interface CateringPackageCustomizationQuantityFlavorModalProps {
  open: boolean;
  onClose: () => void;
}
export function CateringPackageCustomizationQuantityFlavorModal(
  props: CateringPackageCustomizationQuantityFlavorModalProps
) {
  const [quantity, setQuantity] = useState(1);

  const getProductDetailsState = useAppSelector(selectGetProductDetails);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div
      style={{ display: props.open ? "flex" : "none" }}
      className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm no-scrollbar no-scrollbar::-webkit-scrollbar"
    >
      <div className="bg-secondary px-3 py-[30px] round w-[90%] lg:w-[40%] relative rounded-[10px] my-10">
        <button
          className="absolute text-2xl text-white top-2 right-4 "
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        <section className="space-y-3">
          <div className="relative flex">
            <Swiper
              slidesPerView={"auto"}
              autoplay={{ delay: 5000 }}
              modules={[Navigation, Autoplay]}
              className="w-[100px] h-[100px]"
            >
              {getProductDetailsState.data?.product_images.map((name) => (
                <SwiperSlide>
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${name}`}
                    className="lg:rounded-[10px]  object-cover"
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex flex-col flex-1 px-3 py-2 space-y-1 text-white">
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
          </div>

          <div>
            <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
              Quantity
            </h2>

            <div className="h-[60px] w-full mt-2">
              <div className="relative flex flex-row w-full h-full mt-1 text-white bg-transparent border-2 border-white rounded-lg">
                <button
                  onClick={() => {}}
                  className={`h-full w-[150px] rounded-l cursor-pointer outline-none bg-primary`}
                >
                  <AiOutlineMinus className="mx-8 text-3xl " />
                </button>

                <input
                  value=""
                  type="number"
                  onChange={(e) => {}}
                  min="1"
                  max="10"
                  className="flex items-center w-full text-3xl font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
                  name="custom-input-number"
                />

                <button
                  onClick={() => {}}
                  className={`h-full w-[150px] rounded-r cursor-pointer bg-primary`}
                >
                  <AiOutlinePlus className="mx-8 text-3xl" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => {}}
            className="text-white text-xl border border-white flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
          >
            <BsFillCartPlusFill className="text-3xl" />
            <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
              Add package
            </span>
          </button>
        </section>
      </div>
    </div>
  );
}
