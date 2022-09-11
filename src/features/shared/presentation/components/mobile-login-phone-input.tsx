import { useState } from "react";
import { AiFillPhone } from "react-icons/ai";

export function MobileLoginPhoneInput() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");

    if (value.length < 12) {
      setPhoneNumber(value);
    } else {
      //   setError("Invalid phone number");
    }
  };
  return (
    <div className="flex items-center w-full mt-4 bg-gray-100 rounded-2xl">
      <AiFillPhone className="m-3" />
      <input
        type="text"
        name="mobile_num"
        placeholder="Phone"
        required
        value={phoneNumber}
        onChange={handleChange}
        className="flex-1 w-full mr-4 text-sm bg-gray-100 outline-none h-9 autolog"
      />
    </div>
  );
}
