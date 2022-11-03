import { Tab } from "features/shared/presentation/components";
import { BSC_TERMS_AND_POLICY_TABS } from "features/shared/constants";
import { Link } from "react-router-dom";

import { IoMdClose } from "react-icons/io";

import useMediaQuery from "@mui/material/useMediaQuery";
import { BsLink45Deg } from "react-icons/bs";

export function PrivacyPolicyModal() {

  return (
    <>
      <div
        style={{ display: "flex" }}
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm no-scrollbar no-scrollbar::-webkit-scrollbar"
      >
        <div className="md:w-[70%] w-[80%] bg-paper sm:h-[500px] h-[700px] mt-[3%] mb-[3%] add-extra-margin text-secondary">
          <Tab tabs={BSC_TERMS_AND_POLICY_TABS} activeTab="bsc-privacy-policy">
            <Link
              className="absolute sm:text-2xl text-xl text-black lg:top-[-9%] top-[-23%] md:right-[1vw] right-[2vw]"
              to={"/bsc/create-account"}
            >
              <IoMdClose />
            </Link>

            <div className="lg:w-[95%] w-[90%] mx-auto lg:mt-[1%] mt-[0.5%] sm:mb-[2.5%] mb-[1.75%]">
              <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] lg:text-3xl md:text-2xl text-xl">
                  Privacy Policy
              </h1>

              <hr className="mt-2 mb-4 border-secondary" />

              <div className="space-y-4 text-secondary w-[95%] mx-auto h-[425px] overflow-y-scroll terms-scroll md:text-base text-sm">
                <p> Taters Enterprises Inc., its subsidiaries and affiliates (“Company,” “We,” “Us,” “Our”), is committed 
                    to protecting the privacy and security of all personal and/or sensitive information (“Personal Data”) 
                    related to its employees, customers, business partners, suppliers, contractors, and other parties that 
                    the Company will and is engaged into. For this reason, uniform practice and procedure for collecting, 
                    recording, consolidating, updating, disclosing, storing, accessing, transferring, retaining, destructing 
                    and disposing of Personal Data by the Company is hereby adopted in order to process Personal Data 
                    fairly, appropriately, and lawfully.
                </p>

                <p> This privacy policy sets out how the Company uses, protects and controls any Personal Data that you will
                    provide in this website (“Site”). The Company may change this policy from time to time by updating it in 
                    accordance with subsequent Laws and Implementing Rules and Regulations. The terms of this Privacy Policy 
                    apply to all users of this Site.
                </p>

                <p> If you do not agree to these Terms, then you must immediately stop using the Online Services and request 
                    Taters Enterprises Inc. to close any Online Services account that you have created. By the access and/or use, 
                    and the continued access and/or use by you or your child of the Online Services, you are assumed to have 
                    given your consent and permission for such continued access and/or use, and are deemed to have agreed to the Terms.
                </p>

                <p className="mb-0">
                    <strong>Collection of Personal Data</strong>
                </p>

                <p className="mb-0">
                    The Company collects Personal Data you voluntarily submitted in our Site, as well as non-personal 
                    information provided therein.
                </p>

                <p className="mb-0">
                    We will not sell, share, or rent your Personal Data to others in ways different from what is disclosed 
                    in this statement.
                </p>

                <p className="mb-0 ml-[30px]">
                    <span>
                        <strong> User registration transactions: </strong> Personal information collected by ilovetaters.com 
                        is necessary to the following purposes, without limitation:
                    </span>
                </p>

                    <p className="mb-0 ml-[50px]"> a) to build your account with ilovetaters.com/shop. </p>
                    <p className="mb-0 ml-[50px]"> b) to process your advanced orders. </p>
                    <p className="mb-0 ml-[50px]"> c) to deliver or improve our products and services. </p>
                    <p className="mb-0 ml-[50px]"> d) to administer a content, promotion, survey or other Site feature. </p>
                    <p className="mb-0 ml-[50px]"> e) to send periodic emails regarding your account or other products and services. </p>
                    <p className="mb-0 ml-[50px]"> f) to effectively respond to your customer service requests and support needs. </p>

                <p className="mb-0 ml-[30px]">
                    <strong> Log information: </strong> When you visit our Site, we may also collect non-personal 
                    information such as but not limited to web page from which you came to our Site, your web page 
                    request, Internet Protocol (IP) address, geolocation, browser type, browser language, the date 
                    and time of your request and your registration data. Please be noted that when you purchase a 
                    product or use a web-based service in our Site, we may also log the specific path, actions, and
                    navigation choices you make.
                </p>

                <p className="mb-0 ml-[30px]">
                    <strong>Cookies:</strong> We may use cookies in analyzing and evaluating performance to provide you 
                    better experience when using our Site. Cookies are small files that a Site or its service provider
                    transfers to your computer's hard drive through your web browser (you can disable this) that allows 
                    the Site's or service provider's systems to recognize your browser and capture and remember certain information.
                </p>

                <p> To use the Taters Snack System, you will need to provide the following: Full Name, Email Address, Contact Number(s). </p>

                <p> The Company may share the Personal Data gathered from you within Taters Enterprises Inc. and its subsidiaries 
                    with the purpose of this  Privacy Policy. We may also use the information in the aggregate to understand how our users as a group, use the services and resources
                    provided on our Site.
                </p>

                <p className="mb-0">
                    <strong> Accuracy and Access </strong>
                </p>

                <p> The Company will keep your Personal Data as accurate, complete and up-to-date as is necessary for the purpose for which 
                    it is processed. You will have adequate controls in your account profile to help ensure the accuracy of your Personal 
                    Data. Should you wish to obtain a copy of Personal Data you provided to us, or if you become aware the
                    information is incorrect and you would like us to correct it, or if you wish to withdraw your Personal Data, please 
                    immediately inform us. (see Contact Us section below)
                </p>

                <p className="mb-0">
                    <strong> Third Parties </strong>
                </p>

                <p> The Company may offer links to sites that is run by third parties. If you visit other sites, you should read the site’s 
                    privacy policy, terms and conditions, and their other policies. The Company is not responsible for the 
                    policies and practices of third parties. Any information you give to those organizations is dealt with under 
                    their privacy statement, terms and conditions, and other policies.
                </p>

                <p className="mb-0">
                    <strong>Applicable Law and Rights</strong>
                </p>

                <p> The Company upholds compliance with Republic Act No. 10173 or the Data Privacy Act of 2012 (DPA), its 
                    Implementing Rules and Regulations, and other relevant policies, including issuances of the National 
                    Privacy Commission. The Company acknowledges your right to be informed, object processing, access and 
                    rectify, suspend or withdraw Personal Data, and be indemnified in case of damages pursuant to the provisions of DPA.
                </p>

                <p className="mb-0">
                    <strong>
                        For any inquiry regarding this privacy policy, please contact us at:
                    </strong>
                </p>

                <p className="mb-0">Taters Snack Shop</p>

                <p className="mb-0"> Contact No: (+63) 949-889-9558 from Monday to Friday (9:30AM to 7:30PM) </p>
              </div>
            </div>
          </Tab>
        </div>
      </div>
    </>
  );
}