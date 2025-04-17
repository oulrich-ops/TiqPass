
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cIsVQOxrJ6l
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AddUpdateEventform() {
    const [currentStep, setCurrentStep] = useState(1)
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1)
    }
    return (
        <div className="w-full max-w-3xl mx-auto py-12 md:py-16">
            <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                            currentStep >= 1 ? "bg-gray-900 dark:bg-gray-50" : "bg-gray-300 dark:bg-gray-800"
                        }`}
                    >
                        1
                    </div>
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                            currentStep >= 2 ? "bg-gray-900 dark:bg-gray-50" : "bg-gray-300 dark:bg-gray-800"
                        }`}
                    >
                        2
                    </div>
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                            currentStep >= 3 ? "bg-gray-900 dark:bg-gray-50" : "bg-gray-300 dark:bg-gray-800"
                        }`}
                    >
                        3
                    </div>
                </div>
            </div>
            {currentStep === 1 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" placeholder="Enter your phone number" />
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleNextStep}>Next</Button>
                    </div>
                </div>
            )}
            {currentStep === 2 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="street">Street</Label>
                        <Input id="street" placeholder="Enter your street address" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Enter your city" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="Enter your state" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zip">Zip</Label>
                        <Input id="zip" placeholder="Enter your zip code" />
                    </div>
                    <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                            Previous
                        </Button>
                        <Button onClick={handleNextStep}>Next</Button>
                    </div>
                </div>
            )}
            {currentStep === 3 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" type="text" placeholder="Enter your card number" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiration">Expiration</Label>
                            <Input id="expiration" type="text" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" type="text" placeholder="CVV" />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                            Previous
                        </Button>
                        <Button>Submit</Button>
                    </div>
                </div>
            )}
        </div>
    )
}