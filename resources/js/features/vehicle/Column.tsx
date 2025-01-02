import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { IVehicle } from "@/shared/types/vehicle";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export const vehicleColumns: ColumnDef<IVehicle>[] = [
    {
        id: "number",
        header: "#",
        enableHiding: false,
        cell: ({ row }) => {
            return <div className="text-sm text-center">{row.index + 1}</div>
        }
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "year",
        header: "Year",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => {
            return <div className="mx-auto rounded-md" style={{ backgroundColor: row.getValue('color'), width: '1.25rem', height: '1.25rem' }}></div>
        }
    },
    {
        accessorKey: "plate",
        header: "Plate",
    },
    {
        accessorKey: "last_maintenance",
        header: "Last Maintenance",
    },
    {
        accessorKey: "fuel_consumption",
        header: "Fuel Consumption",
        cell: ({ row }) => {
            return <div>{row.getValue('fuel_consumption')} lt/100km</div>
        }
    },
    {
        accessorKey: "ownership",
        header: "Ownership",
    },
    {
        accessorKey: "load_type",
        header: "Load Type",
    },
    {
        accessorKey: "rental_company",
        header: "Rental Company",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                router.delete(route('vehicle.destroy', { vehicle: row.original.id }), {
                                    onSuccess: () => {
                                        toast.success('Vehicle deleted successfully')
                                    },
                                    onError: () => {
                                        toast.error('Failed to delete vehicle')
                                    }
                                })
                            }}
                        >Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
