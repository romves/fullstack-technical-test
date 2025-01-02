import { DashboardLayout } from "@/shared/components/layouts/dashboard";
import { Head, Link } from "@inertiajs/react";
import { IVehicle } from "@/shared/types/vehicle";

import { IPaginationResponse } from "@/shared/types/response";
import { vehicleColumns, VehicleDataTable } from "@/features/vehicle";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Plus } from "lucide-react";

export default function TransportManagement({
  vehicles
}: {
  vehicles: IVehicle[]
}) {
  return (
    <DashboardLayout
      header="Transport Management"
      desc="Manage all vehicles"
    >
      <Head title="Transport Management" />

      <div className="py-12">
        <div className="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Link
            href={route('vehicle.create')}
            className={cn(buttonVariants(), 'ml-auto')}
          >
            <Plus />
            Add Vehicle
          </Link>

          <VehicleDataTable
            className="mt-4"
            columns={vehicleColumns}
            data={vehicles}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

