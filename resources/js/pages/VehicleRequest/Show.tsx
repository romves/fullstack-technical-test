import { VehicleRequestForm } from '@/features/vehicle-request'
import { DashboardLayout } from '@/shared/components/layouts/dashboard'
import { User } from '@/shared/types/global'
import { IVehicle } from '@/shared/types/vehicle'
import { IVehicleRequest } from '@/shared/types/vehicleRequest'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function VehicleRequestDetail({ approvers, vehicles, vehicleRequest }: {
  approvers: User[],
  vehicles: IVehicle[],
  vehicleRequest: IVehicleRequest
}) {

  return (
    <div>
      <DashboardLayout
        header="Request Detail"
        desc='View request details'
      >
        <Head title="Add Vehicle Request" />

        <div className="py-12">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

            <VehicleRequestForm approvers={approvers} vehicles={vehicles} vehicleRequest={vehicleRequest} type='edit' />
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}

