import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PlatformChooserModal } from "../modals/platform-chooser.modal";
import { SnacksDeliveredStoreChooserModal } from "../modals/snacks-delivered-store-chooser.modal";
import { StoreVisitStoreChooserModal } from "../modals/store-visit-store-chooser.modal";
import {
  getAllPlatformCategories,
  selectGetAllPlatformCategories,
} from "../slices/get-all-platform-categories.slice";
import { getDeals, selectGetDeals } from "../slices/get-deals.slice";
import { getPopClubData } from "../slices/get-popclub-data.slice";
import { selectSetPopClubData } from "../slices/set-popclub-data.slice";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { Deal } from "../components";
import { redeemValidators } from "../slices/redeem-validators.slice";
import { PopclubHeroCarousel } from "../components/popclub-hero.carousel";

export function PopClubHome() {
  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);
  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);
  const [opelPlatformChooserModal, setOpenPlatformChooserModal] =
    useState(false);

  const getAllPlatformCategoriesState = useAppSelector(
    selectGetAllPlatformCategories
  );
  const getSessionState = useAppSelector(selectGetSession);
  const getDealsState = useAppSelector(selectGetDeals);

  const setPopClubDataState = useAppSelector(selectSetPopClubData);
  const dispatch = useAppDispatch();
  let { platform } = useParams();
  const query = useQuery();
  const category = query.get("category");

  useEffect(() => {
    if (platform !== undefined && category !== null) {
      dispatch(getSession());
      dispatch(getPopClubData());
      dispatch(redeemValidators());

      dispatch(getAllPlatformCategories({ platform_url_name: platform }));
      dispatch(
        getDeals({ platform_url_name: platform, category_url_name: category })
      );
    }
  }, [platform, query, category, setPopClubDataState]);

  return (
    <>
      <section className="lg:container">
        <PopclubHeroCarousel />
      </section>
      <section className="container ">
        <div className="flex flex-col items-start justify-start text-xs leading-4 lg:leading-5 sm:text-sm md:text-base lg:mt-2">
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
              <span className="text-[#ffcd17] truncate w-[200px] sm:w-[400px] font-bold">
                {getSessionState.data?.customer_address}
              </span>
            </button>
          ) : null}
        </div>

        <div className="overflow-y-auto w-full hide-scrollbar font-['Bebas_Neue'] mb-[13px] mt-[4px] sm:mt-[10px] md:mt-[23px] lg:mt-[10px]">
          <ul className="flex items-start justify-start space-x-6 mt-2 w-[800px] lg:w-full">
            <Link
              to={`?category=all`}
              className="flex items-center justify-center space-x-1 text-lg tracking-[3px] text-gray-500 lg:px-2 font-semi-bold "
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
            {getAllPlatformCategoriesState.data?.map((category, i) => (
              <li key={i}>
                <Link
                  to={`?category=${category.url_name}`}
                  className="flex items-center justify-center space-x-1 text-lg tracking-[3px] text-gray-500 lg:px-2 font-semi-bold"
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

      {getDealsState.data ? (
        <section className="container pb-96">
          {getDealsState.data.length <= 0 ? (
            <div className="flex flex-col items-center justify-center">
              <img
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/popclub/mr_poppy/Poppie_Surprised.png`}
                alt="Taters Mr Poppy Suprised"
                width={300}
              />
              <span className="text-white text-3xl font-['Bebas_Neue'] tracking-[3px]">
                Oops.. No Deals Found
              </span>
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-5">
            {getDealsState.data.map((deal, i) => (
              <Deal key={i} deal={deal} />
            ))}
          </div>
        </section>
      ) : null}

      <PlatformChooserModal
        hasCloseButton={true}
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

      <SnacksDeliveredStoreChooserModal
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
