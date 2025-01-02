import { VehicleDataTable } from '@/features/vehicle'
import { vehicleRequestColumn } from '@/features/vehicle-request'
import { DashboardLayout } from '@/shared/components/layouts/dashboard'
import { Head } from '@inertiajs/react'

export default function VehicleRequestManagement({ vehicleRequests }: any) {
    console.log(vehicleRequests)
    return (
        <DashboardLayout
            header="Vehicle Request Management"
            desc="Manage all vehicle requests"
        >
            <Head title="Request Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <VehicleDataTable
                        columns={vehicleRequestColumn}
                        data={vehicleRequests}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}

