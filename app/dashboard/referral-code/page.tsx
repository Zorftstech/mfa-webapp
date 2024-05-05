import React from 'react'
import DashboardLayout from '../molecules/dashboard-layout'
import TextBoxWithLine from '@/components/dashboard/items-header'
import LineDivider from '@/components/dashboard/line-divider'

function page() {
  return (
    <DashboardLayout>
        <div style={{ height: 'auto'}}>
            <TextBoxWithLine text="Referral Code" />
            <LineDivider width="95%" color="#DDDDDD" />
            <div className='py-3 px-5 '>
            <p style={{ fontWeight: '500' }} className="text-content mb-4 mt-2">Your referral code is</p>
            <button style={{ backgroundColor: '#F7F7F7', color: '#7AB42C', fontSize: '1.5rem', fontWeight: '600' }} className="text-lg py-2 px-4 mb-10">AB720LSR</button>

            </div>
        </div>
    </DashboardLayout>
  )
}

export default page
