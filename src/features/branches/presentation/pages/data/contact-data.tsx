import { ReactElement } from "react";

export interface ContactDataType {
  Icon: ReactElement;
  heading: string;
  paragraph: string;
  href: string;
  cardOpt: {
    active: boolean;
    title?: string; //all or contect
  };
}

export const contactData: Array<ContactDataType> = [
  {
    Icon: (
      <svg
        className="w-8 h-8 stroke-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
      </svg>
    ),
    heading: "Head Office Address",
    paragraph:
      "TEI Center, 3536 Hilario Street, Brgy. Palanan Makati City, 1235 PH",
    href: "https://www.google.com/maps/place/TEI+Center/@14.558713,120.9935478,15z/data=!4m12!1m6!3m5!1s0x3397c9710636ea31:0xf042ad0583cb4d42!2sTEI+Center!8m2!3d14.5587046!4d121.0022656!3m4!1s0x3397c9710636ea31:0xf042ad0583cb4d42!8m2!3d14.5587046!4d121.0022656",
    cardOpt: {
      active: true,
      title: "all",
    },
  },
  {
    Icon: (
      <svg
        className="w-8 h-8 stroke-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
    heading: "Working Hours",
    paragraph: "Mon - Fri: 9AM - 6PM",
    href: "/one",
    cardOpt: {
      active: false,
    },
  },
  {
    Icon: (
      <svg
        className="w-8 h-8 stroke-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        ></path>
      </svg>
    ),
    heading: "Phone Numbers",
    paragraph: "Hotline: (+63) 997-275-5595",
    href: "tel:09972755595",
    cardOpt: {
      active: true,
      title: "contact",
    },
  },
  {
    Icon: (
      <svg
        className="w-8 h-8 stroke-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        ></path>
      </svg>
    ),
    heading: "Email Address",
    paragraph: "contact: support@tatersgroup.com",
    href: "mailto:support@tatersgroup.com",
    cardOpt: {
      active: true,
      title: "contact",
    },
  },
];
