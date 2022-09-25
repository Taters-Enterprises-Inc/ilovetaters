import CookieConsent from "react-cookie-consent";
import { Link, Outlet } from "react-router-dom";

export function ConsentWrapper() {
  return (
    <>
      <Outlet />

      <CookieConsent
        location="bottom"
        buttonText="Accept & Continue"
        cookieName="cookie-consent"
        style={{ background: "rgb(53, 52, 57)", zIndex: 2004 }}
        buttonStyle={{
          color: "rgb(53, 52, 57)",
          background: "rgb(243, 191, 69)",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "6px",
          padding: "6px 20px 6px 20px",
        }}
        enableDeclineButton
        declineButtonStyle={{
          fontSize: "16px",
          fontWeight: "bold",
          padding: "0px 0px 0px 0px",
          margin: "0px 0px 0px 0px",
          background: "transparent",
        }}
        buttonWrapperClasses="px-4"
        declineButtonText="Decline"
        expires={150}
      >
        Ilovetaters uses cookies to provide you with a personalized online
        experience and analyze how our site is used.{" "}
        <Link to="/privacy-policy" className="underline">
          View our Privacy Policy for more details.
        </Link>
      </CookieConsent>
    </>
  );
}
