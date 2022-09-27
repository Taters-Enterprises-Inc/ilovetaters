import {
  REACT_APP_DOMAIN_URL,
  SNACKSHOP_TERMS_AND_CONDITIONS_TABS,
} from "features/shared/constants";
import { HeaderNav, Tab } from "features/shared/presentation/components";
import { useEffect } from "react";
import { MdRule } from "react-icons/md";
import { useLocation } from "react-router-dom";

export function PrivacyPolicy() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return (
    <main className="min-h-screen bg-paper pb-36">
      <HeaderNav
        activeUrl="HOME"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-logo.webp",
          alt: "Taters Logo",
          className: "w-[150px] lg:w-[120px]",
        }}
      />
      <section className="container py-6">
        <Tab
          tabs={[
            {
              name: "Privacy Policy",
              active: "privacy-policy",
              url: "/privacy-policy",
              icon: <MdRule />,
            },
          ]}
          activeTab="privacy-policy"
        >
          <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] leading-8 text-3xl">
            Corporate Website Privacy Policy
          </h1>
          <hr className="mt-2 mb-4 border-secondary" />
          <div className="space-y-4 text-secondary">
            <p>
              Taters Enterprises, Inc. (the "Company") is committed to the
              protection of the privacy of your personal information as we are
              conscious of our responsibilities as a "personal information
              controller" under Republic Act No. 10173 or the Data Privacy Act
              of 2012. You can visit most pages on this website without the need
              of giving personal information; however, there are certain
              instances when we will passively collect non-personally
              identifiable information in order to give you an outstanding
              browsing experience. The information we collect and our policy
              regarding its collection and storage are discussed in detail
              below. We believe it is important for you to know how we treat and
              protect your information. The terms of this Privacy Policy apply
              to all users of this website and to all relevant activities of the
              Company. Should the Company launch other online initiatives that
              will require the collection of personal information or will entail
              another way of collecting and storing data, the Company reserves
              the right to formulate a more specific privacy policy for these
              initiatives. If you do not agree with the terms of this Privacy
              Policy, you should immediately stop the use of this website. Your
              use of this website shall be construed as your acknowledgement and
              acceptance of the terms of this Privacy Policy.
            </p>

            <p className="mb-0">
              <strong>What we Collect</strong>
            </p>

            <p>
              This website only collects non-personally identifiable information
              such as information about your browser type, browser language,
              internet protocol (IP) address, geolocation, server name, date and
              time of accessing this website, the pages you access while you are
              at this website, and the address of the website from which you
              linked this website from. In some instances, we may collect
              information through the use of cookies. If we are going to use
              cookies, we shall declare it expressly in this website. The
              information collected, coupled with your frequent visits, will
              impact your use of the website. Collection is necessary as it
              allows us to analyze our performance in order to tailor a better
              user experience for you.
            </p>

            <p className="mb-0">
              <strong>How we Collect</strong>
            </p>

            <p>
              Our website may use or install cookies to help customize your
              experience upon each visit. These cookies are small packets of
              data sent from a website and stored in your computer by your
              browser while you are browsing. Cookies allow websites to remember
              certain information or to record your browsing activity. This, in
              turn, allows us to respond to you as an individual. Our website
              can adapt its operations to your needs, likes and dislikes by
              gathering and remembering information about your individual
              preferences. Overall, cookies help us provide you with a better
              website by enabling us to monitor which pages you find useful and
              which you do not. In no way do cookies give us access to your
              computer or any information about you, other than the data you
              choose to share with us. Furthermore, any information that we
              gather will not be disclosed outside of our company, affiliates,
              third party agents, business partners, nor will it be used for
              unsolicited communication. You do not need to enable cookies to
              navigate this website. If you prefer not to receive cookies while
              browsing our website, you can adjust your browser to alert you of
              the presence of cookies so that you may accept or refuse to accept
              the cookies while browsing. You can further adjust your browser to
              refuse all cookies that may be present in a website. By disabling
              or refusing to receive cookies, however, you may encounter some
              difficulties in using some parts of the website.
            </p>

            <p className="mb-0">
              <strong>Security, Storage, and Disposal</strong>
            </p>

            <p>
              We are committed to protecting the security of your information.
              We use a variety of secure physical, electronic and managerial
              procedures to help protect your information from unauthorized
              access, use or disclosure. Your information will be stored and
              processed in a secure internal database which shall be maintained
              and controlled exclusively by the Company. Access to the database
              may only be given to the Company's affiliates, subsidiaries and
              authorized agents. We shall retain the information we collect only
              for as long as necessary for the fulfillment of the purposes
              stated in this Privacy Policy. We generally do not store this
              information for a period longer than ten years after the stated
              purposes have been fulfilled; after which, the information will be
              disposed of in accordance with the relevant data privacy laws,
              regulations and company guidelines.
            </p>

            <p className="mb-0">
              <strong>Links to Other Websites</strong>
            </p>

            <p>
              Our website may contain links to other websites of interest.
              Please note that we do not have any control over the content of
              these other websites. Once you leave our website by clicking on
              these links, you acknowledge that the Company cannot be held
              responsible for the protection and privacy of any information you
              provide these other websites. We highly encourage you to exercise
              prudence and look at the privacy notices/policies of the other
              websites that you visit.
            </p>

            <p className="mb-0">
              <strong>Updating of the Privacy Policy</strong>
            </p>

            <p>
              We may update and/or revise this Privacy Policy from time to time.
              Changes to this Privacy Policy shall be posted on our homepage so
              that you are always aware of any changes to how we collect and
              process information. The latest version of this policy shall be
              determined by checking the date shown in the "Last Updated" tab of
              this Privacy Policy.
            </p>

            <p className="mb-0">
              <strong>Inquiries</strong>
            </p>
            <p>
              If you have any questions regarding this Privacy Policy, or our
              use of your information, please contact us through:
              <br />
              <br />
              Taters Enterprises, Inc.
              <br />
              TEI Center, 3536 Hilario St, Makati, 1235 Metro Manila
              <br />
              tei.online@tatersgroup.com
            </p>
          </div>
        </Tab>
      </section>
    </main>
  );
}
