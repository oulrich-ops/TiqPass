import { useEffect, useRef, useState } from 'react'
import { GeneralInformation } from './steps/GeneralInformation'
import { PricingStep } from './steps/PricingStep'
import { CustomFieldsStep } from './steps/CustomFieldsStep'
import { CustomizationStep } from './steps/CustomizationStep'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EventGeneral, PriceCategory, CustomField, Customization, WholeEventTicketting } from '@/types/EventTypes'
import AppLayout from '@/app/dashboardLayout/page'
import { toast } from 'sonner'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { routes } from '@/config/routes'
import { apiService } from '@/config/apiServices'
import { Skeleton } from './ui/skeleton'
import { toastWithDefaults } from '@/utils/Constantes'
import { X } from 'lucide-react'

const steps = [
  'Informations générales',
  'Tarification',
  'Informations complémentaires',
  'Personnalisation'
]

export function EventCreationStepper() {
  const { id } = useParams<{ id: string }>(); 
  
  const [activeStep, setActiveStep] = useState(0)
  const [eventData, setEventData] = useState({
    general: {} as EventGeneral,
    pricing: [] as PriceCategory[],
    customFields: [] as CustomField[],
    customization: {} as Customization
  })

  const [loading, setLoading] = useState<boolean>(Number(id) > 0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const navigate = useNavigate()

  const fetchEventData = () => {
    if (id) {
      apiService.getTicketingById(Number(id)).then((res) => {
        if (res.success && res.data) {
          const data = res.data as WholeEventTicketting
          
          console.log("Données de la billetterie :", data)
          setEventData({
            general: data.eventGeneral || {},
            pricing: data.priceCategory || [],
            customFields: data.customField || [],
            customization: data.customization || {}
          })
          
        } else {
          console.log("Impossible de charger les données de la billetterie.")
        }
      }).catch((err) => {
        console.error("Erreur lors du chargement des données :", err)
        toast.error("Erreur lors du chargement des données.")
      }).finally(() => {
        setLoading(false)
      })
    } else {
      setLoading(false); 
    }
  }
  
  useEffect(() => {
    fetchEventData()
  }, [])

  // Définir hasUnsavedChanges à true lorsque les données changent
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [eventData]);

  const handleNext = async () => {
    let isValid = true
  
    if (activeStep === 0 && eventData.general.id == undefined) {
      isValid = false
    } else if((activeStep === 1 && eventData.pricing.length == 0) || 
    (activeStep === 1 && eventData.pricing[0].id==0)) {
      isValid = false
    }
  
    if (isValid) {
      if (activeStep === steps.length - 1) {
        navigate(routes.userEvents)
      } else {
        setActiveStep((prevStep) => prevStep + 1)
      }
    } else {
      toastWithDefaults.warning("Données invalides pour l'étape actuelle")
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm("Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir quitter ?")) {
        navigate(routes.dashboard);
      }
    } else {
      navigate(routes.dashboard);
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <GeneralInformation
            data={eventData.general}
            onUpdate={(data) => {
              setEventData({ ...eventData, general: data });
            }}
          />
        )
      case 1:
        return (
          <PricingStep
            data={eventData.pricing}
            onUpdate={(data) => setEventData({ ...eventData, pricing: data })}
            ticketting_id={eventData.general.id ?? 0}
          />
        )
      case 2:
        return (
          <CustomFieldsStep
            data={eventData.customFields}
            priceCategories={eventData.pricing}
            onUpdate={(data) => setEventData({ ...eventData, customFields: data })}
            ticketting_id={eventData.general.id ?? 0}
          />
        )
      case 3:
        return (
          <CustomizationStep
            data={eventData.customization}
            ticketting_id={eventData.general.id ?? 0}
            onUpdate={(data) => setEventData({ ...eventData, customization: data })}
          />
        )
      default:
        return null
    }
  }

  return (
    <AppLayout breadcrumb={[{ label: Number(id)>0 ? "Edition billeterie" : "Nouvelle billetterie" }]}>
      {loading ? (
        <div>
          <Skeleton className="h-48 w-full" />
        </div>
      ) : (
        <div className="w-full p-6">
          {/* Bouton d'annulation (en haut à droite) */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {Number(id) > 0 ? "Modifier la billetterie" : "Créer une nouvelle billetterie"}
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCancel} 
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800"
            >
              <X size={18} />
              <span>Annuler</span>
            </Button>
          </div>

          <nav className="flex flex-wrap items-center space-x-4 mb-8">
            {steps.map((label, index) => (
              <div
                key={label}
                className={`flex items-center mb-2 ${
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
                  <div className="ml-4 w-8 h-[2px] bg-muted hidden md:block" />
                )}
              </div>
            ))}
          </nav>

          <Card className="p-4 sm:p-6 mb-6 shadow-sm border border-gray-200">
            {getStepContent(activeStep)}
          </Card>

          <div className="flex justify-between mt-4 gap-3">
            <div>
              <Button
                variant="outline"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Précédent
              </Button>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Annuler et revenir au tableau de bord
              </Button>
              <Button
                onClick={handleNext}
                className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
              >
                {activeStep === steps.length - 1 ? 'Finir' : 'Suivant'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}