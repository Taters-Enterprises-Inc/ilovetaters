import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PlatformChooserModal } from "../modals/platform-chooser.modal";
import { StoreChooserModal } from "../modals/store-chooser.modal";
import { StoreVisitStoreChooserModal } from "../modals/store-visit-store-chooser.modal";
import {
  getAllPlatformCategories,
  selectGetAllPlatformCategories,
} from "../slices/get-all-platform-categories.slice";
import {
  getAllPlatform,
  selectGetAllPlatform,
} from "../slices/get-all-platform.slice";
import { getDeals, selectGetDeals } from "../slices/get-deals.slice";
import { getPopClubData } from "../slices/get-popclub-data.slice";
import { selectSetPopClubData } from "../slices/set-popclub-data.slice";
import { selectSetSession } from "../../../shared/presentation/slices/set-session.slice";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { selectSetStoreAndAddressPopClub } from "../slices/set-store-and-address-popclub.slice";

export function PopClubHome() {
  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);
  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);
  const [opelPlatformChooserModal, setOpenPlatformChooserModal] =
    useState(false);

  const getAllPlatformState = useAppSelector(selectGetAllPlatform);
  const getAllPlatformCategoriesState = useAppSelector(
    selectGetAllPlatformCategories
  );
  const getSessionState = useAppSelector(selectGetSession);
  const getDealsState = useAppSelector(selectGetDeals);

  const setPopClubDataState = useAppSelector(selectSetPopClubData);
  const setSessionState = useAppSelector(selectSetSession);
  const setStoreAndAddressPopClubState = useAppSelector(
    selectSetStoreAndAddressPopClub
  );

  const dispatch = useAppDispatch();
  let { platform } = useParams();
  const query = useQuery();
  const navigate = useNavigate();
  const category = query.get("category");

  useEffect(() => {
    dispatch(getPopClubData());
  }, [setPopClubDataState, dispatch]);

  useEffect(() => {
    dispatch(getSession());

    if (platform !== undefined && category !== null) {
      dispatch(getAllPlatform());
      dispatch(getAllPlatformCategories({ platform_url_name: platform }));
      dispatch(
        getDeals({ platform_url_name: platform, category_url_name: category })
      );
    }
  }, [
    dispatch,
    platform,
    query,
    navigate,
    category,
    setStoreAndAddressPopClubState,
    setSessionState,
  ]);

  return (
    <>
      <section className="lg:container">
        <img
          className="lg:hidden"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/popclub/hero/mobile/popclub.webp"
          }
          alt="The best pop corn in town"
        ></img>
        <img
          className="hidden lg:block"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/popclub/hero/desktop/popclub.webp"
          }
          alt="The best pop corn in town"
        ></img>

        <img
          className="hidden lg:block"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/popclub/banner/popclub_instruction.webp"
          }
          alt="The best pop corn in town"
        ></img>
      </section>
      <section className="container ">
        <div className="flex flex-col items-start justify-start text-xs sm:text-sm md:text-base">
          {getSessionState.data?.popclub_data ? (
            <button
              onClick={() => {
                setOpenPlatformChooserModal(true);
              }}
            >
              <span className="text-white">Claim deals via : </span>
              <span className="text-[#ffcd17] font-['Bebas_Neue'] tracking-widest">
                {getSessionState.data?.popclub_data.platform.replace("-", "  ")}
              </span>
            </button>
          ) : null}

          {getSessionState.data?.cache_data ? (
            <button
              className="text-white "
              onClick={() => {
                switch (platform) {
                  case "online-delivery":
                    setOpenStoreChooserModal(true);
                    break;
                  case "store-visit":
                    setOpenStoreVisitStoreChooserModal(true);
                    break;
                }
              }}
            >
              <span className="text-white">Chosen store: </span>
              <span className="text-[#ffcd17] font-['Bebas_Neue'] tracking-widest">
                {getSessionState.data?.cache_data.store_name}
              </span>
            </button>
          ) : null}

          {getSessionState.data?.customer_address &&
          platform === "online-delivery" ? (
            <button
              className="flex space-x-1 text-white text-start"
              onClick={() => {
                switch (platform) {
                  case "online-delivery":
                    setOpenStoreChooserModal(true);
                    break;
                  case "store-visit":
                    setOpenStoreVisitStoreChooserModal(true);
                    break;
                }
              }}
            >
              <span className="text-white">Address: </span>
              <span className="text-[#ffcd17] truncate w-[200px] sm:w-[400px] md:w-[600px]">
                {getSessionState.data?.customer_address}
              </span>
            </button>
          ) : null}
        </div>

        <div className="overflow-y-auto w-full hide-scrollbar font-['Bebas_Neue'] my-2">
          <ul className="flex items-start justify-start space-x-6 mt-2 w-[400px] lg:w-full">
            <Link
              to={`?category=all`}
              className="flex items-center justify-center space-x-1 text-lg tracking-widest text-gray-500 lg:px-2 font-semi-bold "
            >
              <span
                className={
                  "all" === query.get("category")
                    ? "text-[#ffcd17] font-bold "
                    : "text-white"
                }
              >
                All
              </span>
            </Link>
            {getAllPlatformCategoriesState.data.map((category, i) => (
              <li key={i}>
                <Link
                  to={`?category=${category.url_name}`}
                  className="flex items-center justify-center space-x-1 text-lg tracking-widest text-gray-500 lg:px-2 font-semi-bold"
                >
                  <span
                    className={
                      category.url_name === query.get("category")
                        ? "text-[#ffcd17] font-bold"
                        : "text-white"
                    }
                  >
                    {category.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container pb-96">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
          {getDealsState.data.map((deal, i) => (
            <Link key={i} to={`/popclub/deal/${deal.hash}`}>
              <div className=" relative flex flex-wrap flex-col bg-secondary shadow-md shadow-[#ffcd17] rounded-[10px] h-full">
                <h1 className="text-[12px] lg:text-lg pt-1 text-white uppercase font-['Bebas_Neue'] tracking-[2px] text-center ">
                  {deal.category_name}
                </h1>
                {deal.original_price && deal.promo_price ? (
                  <div className="absolute top-0 left-0 mt-9 lg:mt-8">
                    <div
                      className={`text-[11px] lg:text-[12px] mb-[2px] bg-yellow-500 text-white rounded-r-[2px] font-bold px-1`}
                    >
                      {Math.floor(
                        ((deal.original_price - deal.promo_price) /
                          deal.original_price) *
                          100
                      )}
                      % OFF
                    </div>
                    <div className=" bg-red-500 text-white rounded-r-[4px] leading-[13px] lg:leading-[15px] px-1 py-[2px]">
                      <div className="text-left md:text-[12px] text-[11px] lg:text-[12px] font-normal line-through">
                        ₱ {deal.original_price}
                      </div>
                      <div className="text-[15px] lg:text-[20px] text-start">
                        ₱ {deal.promo_price}
                      </div>
                    </div>
                  </div>
                ) : null}
                <img
                  alt="..."
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${deal.product_image}`}
                  className="card-clickable h-[200px] lg:h-[350px] object-cover"
                />

                <div className="relative flex mb-2">
                  <div className="fade-seperator"></div>
                  <h4 className="text-white text-[12px]  pb-3 pt-4 px-2  leading-4 lg:text-base font-light text-start text-sm whitespace-pre-wrap ">
                    {deal.name}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PlatformChooserModal
        platforms={getAllPlatformState.data}
        onSelectedPlatform={(platform: string) => {
          switch (platform) {
            case "store-visit":
              setOpenStoreVisitStoreChooserModal(true);
              setOpenPlatformChooserModal(false);
              break;
            case "online-delivery":
              setOpenStoreChooserModal(true);
              setOpenPlatformChooserModal(false);
              break;
          }
        }}
        open={opelPlatformChooserModal}
        onClose={() => {
          setOpenPlatformChooserModal(false);
        }}
      />

      <StoreChooserModal
        open={openStoreChooserModal}
        onClose={() => {
          setOpenStoreChooserModal(false);
        }}
      />

      <StoreVisitStoreChooserModal
        open={openStoreVisitStoreChooserModal}
        onClose={() => {
          setOpenStoreVisitStoreChooserModal(false);
        }}
      />
    </>
  );
}
