'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {  useState } from 'react'
import { CheckoutFormValues } from '@/app/(main)/(protected)/checkout-page/page'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

interface FormValues { //refctor them to there app place
  email: string,
      name:string,
      address: string,
      city: string,
      state: string,
      zipCode: string,
      country: string,
      phone:string
  }
  interface cities{
    id:number,
    name:string,
    value:string
  }
// const emptyCityState = {id:0 , name: "", value:""}
const States = [
  {id:1 , text:"Sindh" , value:"sh"},
  {id:2 , text:"Punjab" , value:"pb"},
  {id:3 , text:"KPK" , value:"kp"},
  {id:4 , text:"Balochistan" , value:"bn"}
]
const citiesByStates :Record<string,cities[]>={
    "sh":[{id:1 , name:"Hyderabad" , value:"hy"},{id:2 , name:"Karachi" , value:"kc"} ],
    "pb":[{id:1 , name:"Lahore" , value:"lh"},{id:2 , name:"Multan" , value:"mt"} ],
    "kp":[{id:1 , name:"Peshawar" ,value:"ps"},{id:2 , name:"Mardan" ,value:"md"} ],
    "bn":[{id:1 , name:"Quetta" ,value:"qt"},{id:2 , name:"Ziarat" ,value:"zi"} ],

}
export default function CheckoutForm({ onSubmit , form }: { onSubmit : (data :CheckoutFormValues)=>void , form: UseFormReturn<FormValues> }) {
  const [cities ,setCities] = useState<cities[] |null>([])
 
 const changeState  = (field:ControllerRenderProps<FormValues ,"state">,value :string)=>{
  field.onChange(value)
  setCities(null)
  setCities(citiesByStates[value] ?? [])
  form.setValue('city', '')
 }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input disabled  placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+92-XXXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             </CardContent>
        </Card>

        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select  onValueChange={(value)=>changeState(field,value)} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue  placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                        States && States.map((state)=>(
                          <SelectItem key={state.id} value={state.value}>{state.text}</SelectItem>
                        ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <Select  onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue  placeholder="Select city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                        cities && cities?.map((city)=>(
                          <SelectItem key={city.id} value={city.value}>{city.name}</SelectItem>
                        ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
           

            
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                    <Input value={field.value} disabled className="w-full"/>
                  </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               </div>

          </CardContent>
        </Card>

        {/* Payment Information */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card> */}

        <Separator />

        <Button type="submit" className="w-full" size="lg">
          Place Order
        </Button>
      </form>
    </Form>
  )
}
