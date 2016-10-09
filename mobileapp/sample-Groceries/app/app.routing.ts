import { ListView, LoginView } from "./app.component"

export const Routes = [
    { path: "", component: LoginView },
    { path: "list-view", component: ListView }
]

export const Views = [
    LoginView,
    ListView
]