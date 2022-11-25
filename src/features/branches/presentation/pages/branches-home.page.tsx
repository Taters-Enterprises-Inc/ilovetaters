import { BRANCHES_INFO, REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect } from "react";
import { useAppDispatch } from "features/config/hooks";
import { getStoresAvailableBranches } from "../slices/get-stores-available-branches.slice";
import { BranchesCluster, BranchesSearch } from "../component";

export function BranchesHome() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getStoresAvailableBranches({
        address: null,
        service: "BRANCHES",
      })
    );
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-primary">
      <img
        className="lg:hidden"
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/branches/hero/mobile/branches_nationwide.jpg"
        }
        alt="The best pop corn in town"
      />
      <img
        className="hidden w-full lg:block"
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/branches/hero/desktop/branches_nationwide_black.jpg"
        }
        alt="The best pop corn in town"
      />

      <section className="blockfont-['Bebas_Neue']">
        <h1 className="text-center py-4 text-white font-['Bebas_Neue'] md:text-[3rem] text-[2rem] font-normal tracking-[2px]">
          Contact Us
        </h1>
      </section>

      <section className="container flex flex-col gap-4 text-center md:grid xl:grid-cols-4 md:grid-cols-2">
        {BRANCHES_INFO.map((value, i) => (
          <div
            key={i}
            className="block w-full p-6 rounded-lg shadow-md bg-secondary "
          >
            <div className="flex justify-center w-full h-auto my-4">
              {value.icon}
            </div>
            <h5 className="mb-2 text-medium  tracking-[2px] text-[#fff] font-['Bebas_Neue']">
              {value.title}
            </h5>
            <a
              href={value.link}
              className="text-[12px] text-[#e7e6eb] hover:text-red-400	tracking-[1px]"
            >
              {value.subtitle}
            </a>
          </div>
        ))}
      </section>

      <section className="bg-primary ">
        <section className="block antialiased font-['Bebas_Neue']">
          <h1 className=" md:text-[3rem] text-[2rem] font-normal text-center container py-4 text-[#f2f1ed] tracking-[2px]">
            Our Branches
          </h1>
        </section>

        <section className="container pb-[200px]">
          <div className="mb-3">
            <BranchesSearch label="Search store branch" />
          </div>

          <BranchesCluster />
        </section>
      </section>
    </main>
  );
}
