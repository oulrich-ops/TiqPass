import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
const minutes = ["00", "15", "30", "45"]

function TimePicker({ value, onChange }: { value: string; onChange: (time: string) => void }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">{value || "Sélectionner une heure"}</Button>
            </PopoverTrigger>
            <PopoverContent className="p-2 grid grid-cols-4 gap-2">
                {hours.map((hour) =>
                    minutes.map((minute) => {
                        const time = `${hour}:${minute}`
                        return (
                            <Button
                                key={time}
                                variant="ghost"
                                onClick={() => onChange(time)}
                                className="text-sm"
                            >
                                {time}
                            </Button>
                        )
                    })
                )}
            </PopoverContent>
        </Popover>
    )
}

export default TimePicker