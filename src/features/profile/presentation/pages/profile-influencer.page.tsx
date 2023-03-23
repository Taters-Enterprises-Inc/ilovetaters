import { ProfileContainer } from "../components/profile-container";
import {
  ProfileInfluencerForm,
  ProfileInfluencerDashboard,
  ProfileInfluencerContract,
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
      {getInfluencerState.data?.status ? (
        <>
          {getInfluencerState.data.status <= 3 ? (
            <ProfileInfluencerForm />
          ) : null}
          {getInfluencerState.data.status > 3 &&
          getInfluencerState.data.status <= 7 ? (
            <ProfileInfluencerContract />
          ) : null}
          {getInfluencerState.data.status > 7 ? (
            <ProfileInfluencerDashboard />
          ) : null}
        </>
      ) : (
        <ProfileInfluencerForm />
      )}
    </ProfileContainer>
  );
}
