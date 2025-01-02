import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { IVehicle } from '@/shared/types/vehicle'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

const currentYear = new Date().getFullYear()

const vehicleSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  color: z.string().min(2, 'Color must be at least 2 characters'),
  year: z.number().int().min(1900).max(currentYear, `Year must be between 1900 and ${currentYear}`),
  plate: z.string().regex(/^[A-Z0-9]{1,7}$/, 'Invalid plate number'),
  last_maintenance: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  fuel_consumption: z.number().positive('Fuel consumption must be positive'),
  load_type: z.string().min(2, 'Load type must be at least 2 characters'),
  rental_company: z.string().optional(),
  ownership: z.enum(['owned', 'rented']),
})

export type VehicleFormData = z.infer<typeof vehicleSchema>

interface VehicleFormProps {
  vehicle?: IVehicle
  onSubmit: (data: VehicleFormData) => void
}

export default function VehicleForm({ vehicle, onSubmit }: VehicleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!vehicle

  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: vehicle || {
      name: '',
      color: '',
      year: currentYear,
      plate: '',
      last_maintenance: format(new Date(), 'yyyy-MM-dd'),
      fuel_consumption: 0,
      load_type: 'goods',
      rental_company: '',
      ownership: 'owned',
    },
  })

  const handleSubmit = async (data: VehicleFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className='gap-4 lg:grid lg:grid-cols-2'>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plate</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_maintenance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Maintenance</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuel_consumption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Consumption</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormDescription>Fuel consumption in liters per 100km</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="load_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Load Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select load type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="people">People</SelectItem>
                    <SelectItem value="goods">Goods</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rental_company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rental Company</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Leave blank if not applicable</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownership"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ownership</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="owned">Owned</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : isEditMode ? 'Update Vehicle' : 'Create Vehicle'}
        </Button>
      </form>
    </Form>
  )
}
