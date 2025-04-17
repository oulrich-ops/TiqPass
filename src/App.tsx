import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes'; // Import the centralized routes
import LoginPage from "@/app/login/page.tsx";
import Home from "@/home.tsx"; // User settings
import Tickets from "@/tickets.tsx";
import TicketDetails from "@/ticket_details.tsx";
import UserSettings from "@/user_settings_form.tsx";
import Register from "@/components/register-form.tsx";
import DashboardPage from "@/app/dashboard/page.tsx";
import { EventCreationStepper } from "@/components/EventCreationStepper";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store.ts";
import UserBilletteries from "@/app/features/UserBilletteries.tsx";

function App() {
    const user = useSelector((state: RootState) => state.user.user)

    return (
        <Router>
            <Routes>
                {/* Routes imported from routes.ts */}
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.login} element={<LoginPage />} />
                <Route path={routes.register} element={<Register />} />
                <Route path={routes.tickets} element={<Tickets />} />
                <Route path={routes.dashboard} element={<DashboardPage />} />
                <Route path={routes.eventCreation} element={<EventCreationStepper />} />
                <Route path={routes.userEvents} element={<UserBilletteries/>} />

                <Route
                    path={'/tickets/:ticketId'} // Dynamic route for a specific ticket
                    element={<TicketDetails />}
                />
                <Route path={routes.userSettings} element={<UserSettings />} />
            </Routes>
        </Router>
    );
}

export default App;
