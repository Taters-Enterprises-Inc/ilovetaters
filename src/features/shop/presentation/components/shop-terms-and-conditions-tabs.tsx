import { Link } from "react-router-dom";

export function ShopTermsAndConditionsTabs() {
  return (
    <ul className="flex py-2 space-x-4 overflow-hidden text-white lg:flex lg:py-0">
      <li>
        <Link to={"/shop/terms-and-conditions"}>Terms and Conditions</Link>
      </li>
      <li>
        <Link to={"/shop/privacy-policy"}>Privacy Policy</Link>
      </li>
      <li>
        <Link to={"/shop/return-policy"}>Return Policy</Link>
      </li>
    </ul>
  );
}
