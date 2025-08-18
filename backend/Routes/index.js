import eventsRouter from "./events/index.js";
import usersRouter from "./Users/index.js";
import registrationsRouter from "./Registrations/index.js"

const routes = {
    users : {
        path:"/profile",
        router: usersRouter,
    },
    events :{
        path: "/events",
        router: eventsRouter,
    },
    Registrations : {
        path : "/Registrations",
        router : registrationsRouter,
    }

}

export default routes;