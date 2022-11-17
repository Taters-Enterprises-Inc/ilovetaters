import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import { useEffect } from "react";
import {
  selectSetStoreAndAddress,
  SetStoreAndAddressState,
} from "features/shared/presentation/slices/set-store-and-address.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { CateringHeroCarousel } from "../components/catering-hero.carousel";
import { CateringSelectStore } from "../components/catering-select-store";

export function CateringHome() {
  const dispatch = useAppDispatch();
  const setStoreAndAddressState = useAppSelector(selectSetStoreAndAddress);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (setStoreAndAddressState.status === SetStoreAndAddressState.success) {
      dispatch(getSession());
      navigate("products");
      document.body.classList.remove("overflow-hidden");
    }
  }, [setStoreAndAddressState, navigate]);

  useEffect(() => {
    dispatch(storeReset());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-primary">
      <CateringHeroCarousel />

      <CateringSelectStore />
    </main>
  );
}
