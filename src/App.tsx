import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  { routes } from './routes'; // Import the centralized routes
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
import ProtectedRoute from "../utilities/ProtectedRoute.tsx";

function App() {
    const user = useSelector((state: RootState) => state.user.user)
   

    return (
        <Router>
            <Routes>
                {/* Routes publiques */}
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.login} element={<LoginPage />} />
                <Route path={routes.register} element={<Register />} />

                {/* Routes protégées */}
                <Route path={routes.tickets} element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
                <Route path={routes.dashboard} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path={routes.eventCreation} element={<ProtectedRoute><EventCreationStepper /></ProtectedRoute>} />
                <Route path={routes.userEvents} element={<ProtectedRoute><UserBilletteries /></ProtectedRoute>} />
                <Route path={routes.userSettings} element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />
                <Route path={'/tickets/:ticketId'} element={<ProtectedRoute><TicketDetails /></ProtectedRoute>} />
                <Route path={routes.eventEdit(':id')} element={<ProtectedRoute><EventCreationStepper /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
