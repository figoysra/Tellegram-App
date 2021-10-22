import { Switch, Route } from "react-router-dom";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/ForgetPassword"
import ResetPassword from "../Pages/ResetPassword";
import SignUp from "../Pages/SignUp";
import Chat from "../Pages/Chat"
import Guard from "./Guard"

const Router = () =>{
    return(
        <Switch>
            <Guard path="/" component={Chat} exact />
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/forget-password'>
                <ForgetPassword />
            </Route>
            <Route path="/reset-password" 
            render={(props) => <ResetPassword {...props} />} />
            <Route path="/sign-up">
                <SignUp />
            </Route>
        </Switch>
    )
}
export default Router