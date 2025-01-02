import { VehicleForm } from '@/features/vehicle'
import { VehicleFormData } from '@/features/vehicle/Form'
import { DashboardLayout } from '@/shared/components/layouts/dashboard'
import { Head, router } from '@inertiajs/react'
import React from 'react'
import { toast } from 'sonner'

export default function CreateVehicle() {
    function handleSubmit(payload: VehicleFormData) {
        router.post(route("vehicle.store"), payload, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Vehicle created successfully")
            },
            onError: () => {
                toast.error("Failed to create vehicle")
            }
        })
    }

    return (
        <DashboardLayout
            header="Add Vehicle"
            desc='Add a new vehicle'
        >
            <Head title="Add Vehicle" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <VehicleForm
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}

