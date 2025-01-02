import { User } from "./global";
import { IVehicle } from "./vehicle";

export interface IVehicleRequest {
    id: number;
    start_date: string;
    end_date: string;
    renter_id: number;
    approver_id: number | null;
    admin_id: number | null;
    vehicle_id: number;
    purpose: string;
    is_approved_by_approver: boolean;
    is_approved_by_admin: boolean;
    approver_decision_date: string | null;
    admin_decision_date: string | null;
    status: string;
    rejection_reason: string | null;
    created_at: string;
    updated_at: string;
    renter: User;
    approver: User | null;
    admin: User | null;
    vehicle: IVehicle;
}
