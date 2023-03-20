import { ProfileContainer } from "../components/profile-container";
import {
  ProfileInfluencerForm,
  ProfileInfluencerDashboard,
} from "../components";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getInfluencer,
  selectGetInfluencer,
} from "../slices/get-influencer.slice";

export function ProfileInfluencer() {
  const dispatch = useAppDispatch();
  const getInfluencerState = useAppSelector(selectGetInfluencer);

  useEffect(() => {
    dispatch(getInfluencer());
  }, [dispatch]);

  return (
    <ProfileContainer title="Influencer" activeTab="influencer">
      {getInfluencerState.data?.status === 3 ? (
        <ProfileInfluencerDashboard />
      ) : (
        <ProfileInfluencerForm />
      )}
    </ProfileContainer>
  );
}
