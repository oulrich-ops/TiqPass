import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import fr from "date-fns/locale/fr"
import {undefined} from "zod";
import AppLayout from '@/app/dashboard/page.tsx'

type Billetterie = {
    id: string
    eventName: string
    bannerUrl: string
    eventDate: string // ISO string
}

type UserBilletteriesProps = {
    billetteries?: Billetterie[]
}

const UserBilletteries: React.FC<UserBilletteriesProps> = ({ billetteries = []}) => {


    return (
        <AppLayout breadcrumb={[{ label: "Mes billetteries" }]}>
            {billetteries.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12">
                    <h2 className="text-lg font-semibold">Aucune billetterie trouvée</h2>
                    <p className="text-sm text-muted-foreground">
                        Vous n'avez pas encore créé de billetteries.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {billetteries.map((b) => (
                        <Card key={b.id} className="overflow-hidden shadow-md hover:shadow-lg transition">
                            <img
                                src={b.bannerUrl}
                                alt={`Bannière de ${b.eventName}`}
                                className="w-full h-40 object-cover"
                            />
                            <CardContent className="p-4 space-y-2">
                                <h3 className="text-lg font-semibold">{b.eventName}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(b.eventDate), "EEEE d MMMM yyyy", { locale: fr })}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </AppLayout>
    )

}

export default UserBilletteries
