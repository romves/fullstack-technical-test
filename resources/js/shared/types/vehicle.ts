export interface IVehicle {
    id: number; // bigint unsigned
    name: string; // varchar(255)
    year: number; // varchar(255)
    color: string; // varchar(255)
    plate: string; // varchar(255)
    last_maintenance: string; // date in YYYY-MM-DD format
    fuel_consumption: number; // double
    ownership: 'rented' | 'owned'; // enum
    load_type: 'people' | 'goods'; // enum
    rentalCompany?: string | null; // nullable varchar(255)
    createdAt?: string | null; // timestamp or null
    updatedAt?: string | null; // timestamp or null
}
