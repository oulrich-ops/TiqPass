import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Mail, Phone } from "lucide-react";
import { CustomerInfo,customerInfoSchema } from "@/types/PaymentType";

interface CustomerFormProps {
  customerInfo: CustomerInfo;
  onInfoChange: (info: CustomerInfo) => void;
}

export default function CustomerForm({ customerInfo, onInfoChange }: CustomerFormProps) {
  const form = useForm<z.infer<typeof customerInfoSchema>>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: customerInfo,
    mode: "onChange"
  });

  // Update parent component when form values change
  const watchedValues = form.watch();
  
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.firstName !== undefined && 
          value.lastName !== undefined && 
          value.email !== undefined) {
        onInfoChange(value as CustomerInfo);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, onInfoChange]);

  return (
    <div className="p-6 md:w-3/5">
      <h2 className="text-xl font-semibold mb-5">Informations personnelles</h2>
      
      <Form {...form}>
        <form className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Prénom <span className="text-primary">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Votre prénom" 
                        className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
                        {...field} 
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Nom <span className="text-primary">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Votre nom" 
                        className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
                        {...field} 
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Email <span className="text-primary">*</span></FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="email" 
                      placeholder="votre.email@exemple.com" 
                      className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
                      {...field} 
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Téléphone (optionnel)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="tel" 
                      placeholder="06 xx xx xx xx" 
                      className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
                      {...field} 
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )}
          />

          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 text-sm text-blue-700 mt-4">
            <p className="font-medium mb-1">Informations importantes</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Vos données personnelles sont utilisées uniquement pour le traitement de votre commande</li>
              <li>Un email de confirmation vous sera envoyé après votre paiement</li>
              <li>Vous pouvez contacter notre service client pour toute question</li>
            </ul>
          </div>
        </form>
      </Form>
    </div>
  );
}