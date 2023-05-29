import { ProfileContainer } from "../components/profile-container";
import {
  ProfileInfluencerForm,
  ProfileInfluencerDashboard,
  ProfileInfluencerContractIsRequired,
  ProfileInfluencerContractIsOnVerification,
  ProfileInfluencerContractVerified,
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
      {getInfluencerState.data === null ? <ProfileInfluencerForm /> : null}
      {getInfluencerState.data?.status ? (
        <>
          {getInfluencerState.data.status === 1 ||
          getInfluencerState.data.status === 2 ||
          getInfluencerState.data.status === 3 ||
          getInfluencerState.data.status === 10 ? (
            <ProfileInfluencerForm />
          ) : null}
          {getInfluencerState.data.status === 4 ||
          getInfluencerState.data.status === 5 ||
          getInfluencerState.data.status === 8 ? (
            <ProfileInfluencerContractIsRequired />
          ) : null}
          {getInfluencerState.data.status === 6 ? (
            <ProfileInfluencerContractIsOnVerification />
          ) : null}
          {getInfluencerState.data.status === 7 ? (
            <ProfileInfluencerContractVerified />
          ) : null}
          {getInfluencerState.data.status === 9 ? (
            <ProfileInfluencerDashboard />
          ) : null}
        </>
      ) : null}
    </ProfileContainer>
  );
}
