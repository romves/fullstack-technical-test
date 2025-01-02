import { VehicleRequestForm } from '@/features/vehicle-request'
import { DashboardLayout } from '@/shared/components/layouts/dashboard'
import { IVehicle } from '@/shared/types/vehicle'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function CreateVehicleRequest({ vehicles }: {
    vehicles: IVehicle[]
}) {
    return (
        <div>
            <DashboardLayout
                header="Create New Vehicle Request"
                desc='Request a vehicle'
            >
                <Head title="Add Vehicle Request" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                        <VehicleRequestForm vehicles={vehicles} type='create'/>
                    </div>
                </div>
            </DashboardLayout>

        </div>
    )
}

