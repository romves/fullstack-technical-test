import { VehicleRequestForm } from "@/features/vehicle-request";
import { DashboardLayout } from "@/shared/components/layouts/dashboard";
import { Head } from "@inertiajs/react";

export default function ApproveVehicleRequest() {
  return (
    <DashboardLayout
      header="Approve Vehicle Request"
      desc="Approve a vehicle request"
    >
      <Head title="Add Vehicle Request" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

          <VehicleRequestForm type='approve' />
        </div>
      </div>
    </DashboardLayout>
  )
}

