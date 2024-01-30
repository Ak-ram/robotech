"use client";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import React, { ReactComponentElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StateProps } from "../../../type";
import AdminProducts from "@/components/AdminProducts";
import Print3DComponent from "@/components/Admin3DComponent";
import AdminCourses from "@/components/AdminCourses";
import Admin3DComponent from "@/components/Admin3DComponent";
import AdminAbout from "@/components/AdminAbout";
import AdminFaq from "@/components/AdminFaq";
import AdminSlides from "@/components/AdminSlides";
import AdminComponent from "@/components/AdminComponent";
import DashboardStatsGrid from "@/components/dashboard/DashboardStatsGrid";
import TransactionChart from "@/components/dashboard/TransactionChart";
import BuyerProfilePieChart from "@/components/dashboard/BuyerProfilePieChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import PopularProducts from "@/components/dashboard/PopularProducts";

const page = () => {
  return (
    // <Container>
      <div className="flex flex-col lg:flex-row">
        <AdminComponent />
        
      </div>
    // </Container>
   
  );
};

export default page;
