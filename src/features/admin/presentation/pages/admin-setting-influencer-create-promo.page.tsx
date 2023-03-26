import { SettingInfluencerModel } from "features/admin/core/domain/setting-influencer.model";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  MaterialInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
import {
  closeMessageModal,
  openMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminHead } from "../components";
import {
  createAdminSettingInfluencerPromo,
  CreateAdminSettingInfluencerPromoState,
  resetCreateAdminSettingInfluencerPromoState,
  selectCreateAdminSettingInfluencerPromo,
} from "../slices/create-admin-setting-influencer-promo.slice";
import {
  selectGetAdminSettingInfluencers,
  getAdminSettingInfluencers,
} from "../slices/get-admin-setting-influencers.slice";

export function AdminSettingInfluencerCreatePromo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getAdminSettingInfluencersState = useAppSelector(
    selectGetAdminSettingInfluencers
  );

  const [formState, setFormState] = useState<{
    customerDiscountPercentage: string;
    influencerDiscountPercentage: string;
    influencer: SettingInfluencerModel | "";
  }>({
    customerDiscountPercentage: "",
    influencerDiscountPercentage: "",
    influencer: "",
  });

  useEffect(() => {
    dispatch(getAdminSettingInfluencers());
  }, [dispatch]);

  const createAdminSettingInfluencerPromoState = useAppSelector(
    selectCreateAdminSettingInfluencerPromo
  );

  useEffect(() => {
    if (
      createAdminSettingInfluencerPromoState.status ===
      CreateAdminSettingInfluencerPromoState.success
    ) {
      navigate("/admin/setting/influencer-promo");
      dispatch(resetCreateAdminSettingInfluencerPromoState());
    }
  }, [createAdminSettingInfluencerPromoState, dispatch, navigate]);

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      openMessageModal({
        message: "Are you sure you want to create the influencer promo ?",
        buttons: [
          {
            color: "#CC5801",
            text: "Yes",
            onClick: () => {
              dispatch(
                createAdminSettingInfluencerPromo({
                  ...formState,
                  influencer: JSON.stringify(formState.influencer),
                })
              );

              dispatch(closeMessageModal());
            },
          },
          {
            color: "#22201A",
            text: "No",
            onClick: () => {
              dispatch(closeMessageModal());
            },
          },
        ],
      })
    );
  };

  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            {
              name: "Influencer Promos",
              url: "/admin/setting/influencer-promo",
            },
            {
              name: "Create Influencer Promo",
              url: "/admin/setting/influencer-promo/create-promo",
            },
          ],
        }}
      />
      <section className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Create Influencer Promo
        </span>
      </section>
      <form onSubmit={handleOnSubmit} className="p-4 space-y-3">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-3">
            {getAdminSettingInfluencersState.data ? (
              <MaterialInputAutoComplete
                label="Select Influencer"
                fullWidth
                colorTheme="black"
                options={getAdminSettingInfluencersState.data}
                getOptionLabel={(option) =>
                  (option.fb_user_name ?? "") + (option.mobile_user_name ?? "")
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={formState.influencer}
                onChange={(e, influencer) => {
                  setFormState({
                    ...formState,
                    influencer: influencer,
                  });
                }}
              />
            ) : null}
            <div className="flex space-x-2">
              <MaterialInput
                colorTheme="black"
                onChange={handleInputChange}
                required
                value={formState.customerDiscountPercentage}
                name="customerDiscountPercentage"
                label="Customer Discount Percentage"
                type="number"
                fullWidth
              />

              <MaterialInput
                colorTheme="black"
                onChange={handleInputChange}
                required
                value={formState.influencerDiscountPercentage}
                name="influencerDiscountPercentage"
                label="Influencer Discount Percentage"
                fullWidth
                type="number"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white rounded-lg bg-button w-fit"
        >
          Create Influencer Promo
        </button>
      </form>
    </>
  );
}
