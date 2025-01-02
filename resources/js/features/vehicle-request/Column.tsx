import Checkbox from "@/shared/components/Checkbox";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { IVehicleRequest } from "@/shared/types/vehicleRequest";
import { router, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export const vehicleRequestColumn: ColumnDef<IVehicleRequest>[] = [
    {
        id: "number",
        header: "#",
        enableHiding: false,
        cell: ({ row }) => {
            return <div className="text-sm text-center">{row.index + 1}</div>
        }
    },
    {
        header: 'Start Date',
        accessorKey: 'start_date',
        cell: ({ row }) => {
            return (
                <span>{format(new Date(row.original.start_date), 'dd/MM/yyyy')}</span>
            )
        }
    },
    {
        header: 'End Date',
        accessorKey: 'end_date',
        cell: ({ row }) => {
            return (
                <span>{format(new Date(row.original.end_date), 'dd/MM/yyyy')}</span>
            )
        }
    },
    {
        header: 'Renter',
        accessorKey: 'renter',
        cell: ({ row }) => {
            return (
                <span>{row.original.renter.name}</span>
            )
        }
    },
    {
        header: 'Vehicle',
        accessorKey: 'vehicle',
        cell: ({ row }) => {
            return (
                <span>{row.original.vehicle.name}</span>
            )
        }
    },
    {
        header: 'Purpose',
        accessorKey: 'purpose',
    },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
            const isNeedAssignment = row.original.admin_id == null && row.original.approver_id == null
            const status = isNeedAssignment ? 'not assigned' : row.original.status

            return (
                <span>{status}</span>
            )
        }
    },
    {
        header: 'Admin Approve',
        accessorKey: 'is_approved_by_admin',
        cell: ({ row }) => {
            const isNeedAssignment = row.original.admin_id == null && row.original.approver_id == null
            return (
                <div className="flex justify-center">
                    <Checkbox
                        disabled={isNeedAssignment || row.original.is_approved_by_admin}
                        checked={row.original.is_approved_by_admin}
                        onClick={() =>
                            router.post(route('vehicle-request.update', row.original.id), {
                                is_approved_by_admin: !row.original.is_approved_by_admin
                            }, {
                                preserveScroll: true,
                                onSuccess: () => {
                                    toast.success("Vehicle request approved successfully")
                                },
                                onError: () => {
                                    toast.error("Failed to approve vehicle request")
                                }
                            })
                        }
                    />
                </div>
            )
        }
    },
    {
        header: 'Approver Approve',
        accessorKey: 'is_approved_by_approver',
        cell: ({ row }) => {
            const { user } = usePage().props.auth
            const isNeedAssignment = row.original.admin_id == null && row.original.approver_id == null
            return (
                <div className="flex justify-center">
                    <Checkbox
                        disabled={isNeedAssignment || user.role !== 'approver'}
                        checked={row.original.is_approved_by_approver}
                        onClick={() =>
                            router.post(route('vehicle-request.update', row.original.id), {
                                is_approved_by_approver: !row.original.is_approved_by_approver
                            }, {
                                preserveScroll: true,
                                onSuccess: () => {
                                    toast.success("Vehicle request approved successfully")
                                },
                                onError: () => {
                                    toast.error("Failed to approve vehicle request")
                                }
                            })
                        }
                    />
                </div>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                router.visit(route('vehicle-request.show', { vehicleRequest: row.original.id }))
                            }}
                        >
                            Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                router.delete(route('vehicle-request.destroy', row.original.id), {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        toast.success("Vehicle request deleted successfully")
                                    },
                                    onError: () => {
                                        toast.error("Failed to delete vehicle request")
                                    }
                                })
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
