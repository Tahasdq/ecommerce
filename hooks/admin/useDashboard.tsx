"use client"
import { DashboardService } from "@/services/admin/dashboard.service";
import { useCallback, useState } from "react";

export  default function useDashboard(){
    const dashboardService = new DashboardService()
    const [totalRevenue,setTotalRevenue]=useState(0)
    const [totalOrders,setTotalOrders]=useState(0)
    const [totalCustomers,setTotalCustomers]=useState(0)
    const [totalProducts,setTotalProducts]=useState(0)
    const [topProducts,setTopProducts]=useState<{totalOrders:number , productName:string}[]>([])
    const [totalSalesPerMonth,setTotalSalesPerMonth]=useState<{_id:string , totalSales:number }[]>([])
    
    const fetchTotalRevenue = useCallback(async ()=>{
        try {
           const result = await dashboardService.getTotalRevenue()
                setTotalRevenue(result.data[0]?.totalRevenue)
        } catch (error) {
            
        }
    },[])
    const fetchTotalOrders = useCallback(async ()=>{
        try {
           const result = await dashboardService.getTotalOrders()
                setTotalOrders(result.data[0]?.totalOrders)
        } catch (error) {
            
        }
    },[])
    const fetchTotalCustomers = useCallback(async ()=>{
        try {
           const result = await dashboardService.getTotalCustomers()
                setTotalCustomers(result.data[0]?.totalCustomers)
        } catch (error) {
            
        }
    },[])
    const fetchTotalProducts = useCallback(async ()=>{
        try {
           const result = await dashboardService.getTotalProducts()
                setTotalProducts(result.data[0]?.totalProducts)
        } catch (error) {
            
        }
    },[])
    const fetchTopProducts = useCallback(async ()=>{
        try {
           const result = await dashboardService.getTopProducts()
                setTopProducts(result.data)
        } catch (error) {
            
        }
    },[])
    const fetchTotalSalesPerMonth = useCallback(async ()=>{
        try {
           const result = await dashboardService.getTopSalesPerMonth()
                setTotalSalesPerMonth(result.data)
        } catch (error) {
            
        }
    },[])

    return {fetchTotalRevenue ,fetchTotalOrders,fetchTotalCustomers,fetchTotalProducts,fetchTopProducts,fetchTotalSalesPerMonth, totalRevenue , totalOrders , totalCustomers ,totalProducts, topProducts,totalSalesPerMonth}

}