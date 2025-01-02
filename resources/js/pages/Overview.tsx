import { DashboardLayout } from '@/shared/components/layouts/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Tooltip } from '@/shared/components/ui/tooltip';
import { IVehicle } from '@/shared/types/vehicle';
import { IVehicleRequest } from '@/shared/types/vehicleRequest';
import { Head, usePage } from '@inertiajs/react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface OverviewProps {
  auth: {
    user: {
      role: string;
    };
  };
  vehicles: IVehicle[];
  vehicleRequests: IVehicleRequest[];
}

export default function Overview(props: OverviewProps) {
  const { auth } = usePage().props;
  const vehicles = props.vehicles
  const vehicleRequests = props.vehicleRequests

  return (
    <DashboardLayout
      header="Overview"
    >
      <Head title="Overview" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <VehicleLoadTypeChart vehicles={vehicles} />
            <VehicleOwnershipChart vehicles={vehicles} />
            <AvailableVehiclesChart />
            <PendingApprovalsChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function VehicleLoadTypeChart({ vehicles }: { vehicles: IVehicle[] }) {
  const loadTypeCounts = vehicles.reduce((acc, vehicle) => {
    const loadType = vehicle.load_type === "goods" ? "Goods" : "People";
    acc[loadType] = (acc[loadType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalVehicles = vehicles.length;
  const data = Object.entries(loadTypeCounts).map(([name, count]) => ({
    name,
    value: Math.round((count / totalVehicles) * 100)
  }));

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Types</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function VehicleOwnershipChart({ vehicles }: { vehicles: IVehicle[] }) {
  const vehicleGroups = vehicles?.reduce((acc, vehicle) => {
    if (!acc[vehicle.name]) {
      acc[vehicle.name] = { company: 0, rented: 0 };
    }

    if (vehicle.ownership === "owned") {
      acc[vehicle.name].company += 1;
    } else if (vehicle.ownership === "rented") {
      acc[vehicle.name].rented += 1;
    }

    return acc;
  }, {} as Record<string, { company: number; rented: number }>);

  const data = Object.entries(vehicleGroups).map(([name, counts]) => ({
    name,
    company: counts.company,
    rented: counts.rented
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Ownership</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="company" stackId="a" fill="hsl(var(--primary))" name="Company Owned" />
            <Bar dataKey="rented" stackId="a" fill="hsl(var(--secondary))" name="Rented" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function AvailableVehiclesChart() {
  const data = [
    { name: "Mon", available: 30 },
    { name: "Tue", available: 28 },
    { name: "Wed", available: 25 },
    { name: "Thu", available: 32 },
    { name: "Fri", available: 35 },
    { name: "Sat", available: 40 },
    { name: "Sun", available: 42 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Vehicles</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="available" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function PendingApprovalsChart() {
  const data = [
    { name: "Goods", pending: 12 },
    { name: "People", pending: 8 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pending" fill="hsl(var(--warning))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
