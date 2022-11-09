import React from "react";
import { Link } from "react-router-dom";
import { RiSurveyLine } from "react-icons/ri";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FaUsers } from "react-icons/fa";

export function Dashboard() {
  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          DASHBOARD
        </span>
        <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
          <div>
            <Link
              to="form"
              className="inline-flex items-center px-4 tracking-wide py-1  bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700"
            >
              <RiSurveyLine size={20} />
              <span>&nbsp;&nbsp;Go to form</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 mt-4 space-y-4 lg:space-x-4 lg:space-y-0 lg:flex-row">
        <Card
          sx={{
            minWidth: 300,
            background: "#22201A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <CardMedia>
            <FaUsers size={50} color="white" />
          </CardMedia>
          <CardContent>
            <Typography sx={{ fontSize: 20, color: "white" }} gutterBottom>
              USERS
            </Typography>
            <Typography sx={{ fontSize: 14, color: "white" }} gutterBottom>
              30
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            minWidth: 300,
            background: "#22201A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <CardMedia>
            <FaUsers size={50} color="white" />
          </CardMedia>
          <CardContent>
            <Typography sx={{ fontSize: 20, color: "white" }} gutterBottom>
              USERS
            </Typography>
            <Typography sx={{ fontSize: 14, color: "white" }} gutterBottom>
              30
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
