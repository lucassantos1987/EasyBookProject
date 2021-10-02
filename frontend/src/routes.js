import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './pages/Menu';
import RegisterCategory from './pages/RegisterCategory';
import RegisterSpeciality from './pages/RegisterSpeciality';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Menu} />
                <Route path="/category" component={RegisterCategory} />
            </Switch>
        </BrowserRouter>    
    );
}