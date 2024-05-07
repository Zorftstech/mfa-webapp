import React from 'react'
import DashboardLayout from '../molecules/dashboard-layout'
import TextBoxWithLine from '@/components/dashboard/items-header'
import LineDivider from '@/components/dashboard/line-divider'
import CouponCard from '@/components/dashboard/coupon-card'
import WalletCard from '@/components/dashboard/my-wallet-card'
import { ChevronDown } from 'lucide-react'
import MyWalletTransactionCard from '@/components/dashboard/my-wallet-transaction-card'

function page() {
  return (
    <DashboardLayout>
        <div style={{ height: 'auto'}}>
            <TextBoxWithLine text="My Wallet" />
            <div style={{ width: '40%'}}>
              <WalletCard amount="N200,894.00"/>
            </div>
            <div className='ml-5 mt-10'>
              <p style={{color: "#151515"}} className='mb-2 font-bold text-sm'>Payment Transactions</p>
              <div className='jus flex px--1'>
                <p className='font-bold text-md px-0'>N12,2000</p>
                <div style={{ background: "#D7D7D7" }} className='h-5 w-0.5 ml-2'></div>
                <div className='flex items-center px-2'>
                  <p style={{ color: "#646464" }}>This month</p>
                  <ChevronDown className='ml-1' style={{ color: "#646464" }} />
                </div>
              </div>
            </div>
            <MyWalletTransactionCard client_name='Busy Farm' date='20th February 2024, 8:30am' amount='N500' img=''/>
        </div>
    </DashboardLayout>
  )
}

export default page
