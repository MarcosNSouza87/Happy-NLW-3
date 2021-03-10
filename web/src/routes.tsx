import { BrowserRouter, Route, Switch } from "react-router-dom";
import {LandingPage, OrphanagesMap,Orphanage,CreateOrphanage} from "./pages"

const Routes:React.FC = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LandingPage}/>
                
                <Route path="/app" exact component={OrphanagesMap}/>
                <Route path="/orphanages/create" exact component={CreateOrphanage}/>
                <Route path="/orphanages/:id" exact component={Orphanage}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes