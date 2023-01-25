import { useAppDispatch } from "features/config/hooks";
import {
  REACT_APP_DOMAIN_URL,
  SEE_ME_TAB_FAQ,
} from "features/shared/constants";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import { useEffect } from "react";
import { SeeMePopClubFaqs, SeeMeTabFaq } from "../components";

export function SeeMePopClub() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(storeReset());
  }, [dispatch]);

  return (
    <main className="bg-primary">
      <HeaderNav
        activeUrl="FRANCHISING"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-logo.png",
          alt: "Taters Logo",
          className: "w-[150px] lg:w-[120px]",
        }}
      />
      <section
        style={{
          backgroundImage: `url('${REACT_APP_DOMAIN_URL}api/assets/images/home/hero/mobile/taters_entertainment_snacks.jpg')`,
          backgroundSize: "contain",
          backgroundPositionX: "center",
          backgroundPositionY: 45,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="relative items-end justify-center sm:hidden "
      >
        <img
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/home/hero/mobile/taters_entertainment_snacks.jpg"
          }
          alt="The best pop corn in town"
          style={{ visibility: "hidden" }}
        />
      </section>
      <img
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/home/hero/desktop/taters_entertainment_snacks_black.jpg"
        }
        className="hidden w-full sm:block"
        alt="The best pop corn in town"
      />

      <section className="container pb-20 min-h-min">
        <h1 className='text-tertiary text-3xl font-["Bebas_Neue"] text-center py-2 '>
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <SeeMeTabFaq tabs={SEE_ME_TAB_FAQ} activeTab="popclub">
          <SeeMePopClubFaqs />
        </SeeMeTabFaq>
      </section>

      <FooterNav activeUrl="HOME" />
    </main>
  );
}
