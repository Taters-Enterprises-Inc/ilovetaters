import { NavLink } from "react-router-dom";
import {
  MdDashboardCustomize,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import { useAppSelector } from "features/config/hooks";
import { selectGetHrSession } from "../slices/get-hr-session.slice";
import { IoIosArrowForward } from "react-icons/io";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaUser, FaUsers } from "react-icons/fa";
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: "#22201A",
  color: "white",
  padding: 0,
  margin: 0,
  minHeight: 0,
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
    {...props}
  />
))(({ theme }) => ({
  background: "#22201A",
  color: "white",
  padding: 0,
  margin: 0,
  minHeight: 0,
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  margin: 0,
  minHeight: 0,
}));

export function HRDrawerTabs() {
  const getHrSessionState = useAppSelector(selectGetHrSession);

  return (
    <div className="relative flex flex-col pb-4 m-0 mt-[50px] text-sm text-white">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/hr/dashboard"
              onClick={() => {}}
              className={(navData) =>
                navData.isActive ? "flex bg-white text-secondary" : "flex"
              }
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <MdDashboardCustomize size={20} />

                  <span className={`whitespace-pre duration-300`}>Home</span>
                </span>
              </span>
            </NavLink>
          </li>

          {getHrSessionState.data?.hr.is_hr ? (
            <li>
              <NavLink
                to="/hr/employees"
                onClick={() => {}}
                className={(navData) =>
                  navData.isActive ? "flex bg-white text-secondary" : "flex"
                }
              >
                <span className="flex items-center px-4 ">
                  <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                    <FaUsers size={20} />

                    <span className={`whitespace-pre duration-300`}>
                      Employees
                    </span>
                  </span>
                </span>
              </NavLink>
            </li>
          ) : null}

          {!getHrSessionState.data?.hr.is_hr ? (
            <li>
              <NavLink
                to="/hr/user/employees"
                onClick={() => {}}
                className={(navData) =>
                  navData.isActive ? "flex bg-white text-secondary" : "flex"
                }
              >
                <span className="flex items-center px-4 ">
                  <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                    <FaUsers size={20} />

                    <span className={`whitespace-pre duration-300`}>
                      Employees
                    </span>
                  </span>
                </span>
              </NavLink>
            </li>
          ) : null}

          <li>
            <div className="flex px-4">
              <div className="flex-1">
                <Accordion defaultExpanded={false}>
                  <AccordionSummary>
                    <span className="flex items-center">
                      <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                        <FaUser size={20} />

                        <span className={`whitespace-pre duration-300`}>
                          User
                        </span>
                      </span>
                    </span>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {getHrSessionState.data?.hr.user_job_details ? (
                        <li>
                          <NavLink
                            to="/hr/user/job-details"
                            onClick={() => {}}
                            className={(navData) =>
                              navData.isActive
                                ? "flex bg-white text-secondary"
                                : "flex"
                            }
                          >
                            <span className="flex items-center ">
                              <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                                <IoIosArrowForward size={20} />
                                <span className={`whitespace-pre duration-300`}>
                                  Job Details
                                </span>
                              </span>
                            </span>
                          </NavLink>
                        </li>
                      ) : null}

                      {getHrSessionState.data?.hr.user_personal_details ? (
                        <li>
                          <NavLink
                            to="/hr/user/personal-details"
                            onClick={() => {}}
                            className={(navData) =>
                              navData.isActive
                                ? "flex bg-white text-secondary"
                                : "flex"
                            }
                          >
                            <span className="flex items-center ">
                              <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                                <IoIosArrowForward size={20} />
                                <span className={`whitespace-pre duration-300`}>
                                  Personal Details
                                </span>
                              </span>
                            </span>
                          </NavLink>
                        </li>
                      ) : null}
                      {getHrSessionState.data?.hr.user_contact_details ? (
                        <li>
                          <NavLink
                            to="/hr/user/contact-details"
                            onClick={() => {}}
                            className={(navData) =>
                              navData.isActive
                                ? "flex bg-white text-secondary"
                                : "flex"
                            }
                          >
                            <span className="flex items-center ">
                              <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                                <IoIosArrowForward size={20} />
                                <span className={`whitespace-pre duration-300`}>
                                  Contact Details
                                </span>
                              </span>
                            </span>
                          </NavLink>
                        </li>
                      ) : null}
                      {getHrSessionState.data?.hr.user_emergency_details ? (
                        <li>
                          <NavLink
                            to="/hr/user/emergency-details"
                            onClick={() => {}}
                            className={(navData) =>
                              navData.isActive
                                ? "flex bg-white text-secondary"
                                : "flex"
                            }
                          >
                            <span className="flex items-center ">
                              <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                                <IoIosArrowForward size={20} />
                                <span className={`whitespace-pre duration-300`}>
                                  Emergency Details
                                </span>
                              </span>
                            </span>
                          </NavLink>
                        </li>
                      ) : null}
                      {getHrSessionState.data?.hr.user_salary_details ? (
                        <li>
                          <NavLink
                            to="/hr/user/salary-details"
                            onClick={() => {}}
                            className={(navData) =>
                              navData.isActive
                                ? "flex bg-white text-secondary"
                                : "flex"
                            }
                          >
                            <span className="flex items-center ">
                              <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                                <IoIosArrowForward size={20} />
                                <span className={`whitespace-pre duration-300`}>
                                  Salary Details
                                </span>
                              </span>
                            </span>
                          </NavLink>
                        </li>
                      ) : null}
                      {getHrSessionState.data?.hr.user_termination_details ? (
                        <li>
                          <NavLink
                            to="/hr/user/termination-details"
                            onClick={() => {}}
                            className={(navData) =>
                              navData.isActive
                                ? "flex bg-white text-secondary"
                                : "flex"
                            }
                          >
                            <span className="flex items-center ">
                              <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                                <IoIosArrowForward size={20} />
                                <span className={`whitespace-pre duration-300`}>
                                  Termination Details
                                </span>
                              </span>
                            </span>
                          </NavLink>
                        </li>
                      ) : null}

                      {getHrSessionState.data?.hr.user_other_details ? (
                        <li>
                          <NavLink
                            to="/hr/user/other-details"
                            onClick={() => {}}
                            className={(navData) =>
                              navData.isActive
                                ? "flex bg-white text-secondary"
                                : "flex"
                            }
                          >
                            <span className="flex items-center ">
                              <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                                <IoIosArrowForward size={20} />
                                <span className={`whitespace-pre duration-300`}>
                                  Other Details
                                </span>
                              </span>
                            </span>
                          </NavLink>
                        </li>
                      ) : null}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
