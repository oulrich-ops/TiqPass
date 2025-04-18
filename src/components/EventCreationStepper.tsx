import { useState } from 'react'
import { GeneralInformation } from './steps/GeneralInformation'
import { PricingStep } from './steps/PricingStep'
import { CustomFieldsStep } from './steps/CustomFieldsStep'
import { CustomizationStep } from './steps/CustomizationStep'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EventGeneral, PriceCategory, CustomField, Customization } from '@/types/EventTypes'
import AppLayout from '@/app/dashboard/page.tsx'

const steps = [
  'Informations générales',
  'Tarification',
  'Informations complémentaires',
  'Personnalisation'
]

export function EventCreationStepper() {
  const [activeStep, setActiveStep] = useState(0)
  const [eventData, setEventData] = useState({
    general: {} as EventGeneral,
    pricing: [] as PriceCategory[],
    customFields: [] as CustomField[],
    customization: {} as Customization
  })

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleSave = async () => {
    // Implement save logic here
    console.log('Saving...', eventData)
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <GeneralInformation
            data={eventData.general}
            onUpdate={(data) => {
              alert('General information updated');
              setEventData({ ...eventData, general: data });
            }}
          />
        )
      case 1:
        return (
          <PricingStep
            data={eventData.pricing}
            onUpdate={(data) => setEventData({ ...eventData, pricing: data })}
          />
        )
      case 2:
        return (
          <CustomFieldsStep
            data={eventData.customFields}
            priceCategories={eventData.pricing}
            onUpdate={(data) => setEventData({ ...eventData, customFields: data })}
          />
        )
      case 3:
        return (
          <CustomizationStep
            data={eventData.customization}
            onUpdate={(data) => setEventData({ ...eventData, customization: data })}
          />
        )
      default:
        return null
    }
  }

  return (
      <AppLayout breadcrumb={[{ label: "Nouvelle billetterie" }]}>
    <div className="w-full p-6">
      <nav className="flex items-center space-x-4 mb-8">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`flex items-center ${
              index <= activeStep ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${
                  index < activeStep
                    ? 'bg-primary text-primary-foreground border-primary'
                    : index === activeStep
                    ? 'border-primary text-primary'
                    : 'border-muted-foreground'
                }`}
            >
              {index + 1}
            </div>
            <span className="ml-2">{label}</span>
            {index < steps.length - 1 && (
              <div className="ml-4 w-8 h-[2px] bg-muted" />
            )}
          </div>
        ))}
      </nav>

      <Card className="p-4 sm:p-6 mb-6 shadow-sm border border-gray-200">
        {getStepContent(activeStep)}
      </Card>

      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Précédent
        </Button>
        <Button
          variant="outline"
          onClick={handleSave}
        >
          Enregistrer
        </Button>
        <Button
          disabled={activeStep === steps.length - 1}
          onClick={handleNext}
        >
          Suivant
        </Button>
      </div>
    </div>
      </AppLayout>
  )
} 