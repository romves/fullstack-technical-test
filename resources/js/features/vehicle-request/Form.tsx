import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/components/ui/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/components/ui/popover'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select'
import { Textarea } from '@/shared/components/ui/textarea'
import { User } from '@/shared/types/global'
import { IVehicle } from '@/shared/types/vehicle'
import { IVehicleRequest } from '@/shared/types/vehicleRequest'
import { router, usePage } from '@inertiajs/react'
import { toast } from 'sonner'

const formSchema = z.object({
  start_date: z.date({
    required_error: "Start date is required",
  }),
  end_date: z.date({
    required_error: "End date is required",
  }),
  vehicle_id: z.string({
    required_error: "Vehicle is required",
  }),
  purpose: z.string().min(1, "Purpose is required").max(1000, "Purpose must be 1000 characters or less"),
  approver_id: z.string().optional(),
  is_approved_by_approver: z.boolean().optional(),
  is_approved_by_admin: z.boolean().optional(),
}).refine(data => data.end_date >= data.start_date, {
  message: "End date must be after or equal to start date",
  path: ["end_date"],
});

interface VehicleRequestFormProps {
  vehicles?: IVehicle[]
  vehicleRequest?: IVehicleRequest
  approvers?: User[]
  type: "create" | "edit" | "approve"
}

export default function VehicleRequestForm({
  approvers,
  vehicles,
  vehicleRequest,
  type
}: VehicleRequestFormProps) {
  const { user } = usePage().props.auth
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start_date: new Date(vehicleRequest?.start_date || new Date(new Date().setDate(new Date().getDate() + 1))),
      end_date: new Date(vehicleRequest?.end_date || new Date(new Date().setDate(new Date().getDate() + 1))),
      vehicle_id: vehicleRequest?.vehicle_id?.toString() || '',
      purpose: vehicleRequest?.purpose || '',
      approver_id: vehicleRequest?.approver_id?.toString() || '',
      is_approved_by_approver: vehicleRequest?.is_approved_by_approver || false,
      is_approved_by_admin: vehicleRequest?.is_approved_by_admin || false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const selectedRoute = type === "edit" ? route("vehicle-request.update", vehicleRequest?.id) : route("vehicle-request.store")
      router.post(selectedRoute, values, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Vehicle request submitted successfully")
          form.reset()
        },
        onError: () => {
          toast.error("Failed to submit vehicle request")
        }
      })

    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild disabled={type != "create"}>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-[240px] pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild disabled={type != "create"}>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-[240px] pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < form.getValues('start_date') || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicle_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={type != "create"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vehicle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vehicles?.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id.toString()}
                    >
                      {vehicle.name + " (" + vehicle.plate + ")"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the purpose of your vehicle request"
                  className="resize-none"
                  disabled={type != "create"}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Briefly describe why you need the vehicle (max 1000 characters).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {
          type == "edit" && (
            <FormField
              control={form.control}
              name="approver_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approver</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a approver" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          approvers?.map((approver) => (
                            <SelectItem key={approver.id} value={approver.id.toString()}>
                              {approver.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        }

        <Button type="submit">Submit Request</Button>
      </form>
    </Form>
  )
}

