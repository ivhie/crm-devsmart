import {createBrowserRouter} from 'react-router-dom';
;


import Defaultlayout from './components/default-layout.jsx';
import Adminlayout from './components/admin-layout.jsx';
import Userlayout from './components/user-layout.jsx';


//Default Display
import Home from './views/home.jsx';
import Login from './views/login.jsx';
import Register from './views/register.jsx'


//Admin Dashboard
import Dashboard from './views/admin/dashboard.jsx';

import Users from './views/admin/users.jsx';
import UserForm from './views/admin/userform.jsx';

import Clients from './views/admin/clients.jsx';
import ClientForm from './views/admin/clientform.jsx'

import Prospects from './views/admin/prospects.jsx';
import ProspectForm from './views/admin/prospectform.jsx'

//User Dashboard
import Myaccount from './views/user/my-account.jsx';

const router = createBrowserRouter ([
    { 
        path: '/', 
        element: <Defaultlayout />,
        children : [
            { path: '/login', element: <Login />},
            { path: '/register', element: <Register />},
        ]
    },

    { 
        path: '/', 
        element: <Adminlayout />,
        children: [

            { path: '/dashboard', element: <Dashboard />},

            { path: '/users', element: <Users />},
            { path: '/users/new',element: <UserForm key="userCreate"/> },
            { path: '/users/:id',element: <UserForm key="userUpdate" /> },

            { path: '/clients', element: <Clients />},
            { path: '/clients/new',element: <ClientForm key="clientCreate"/> },
            { path: '/clients/:id',element: <ClientForm key="clientUpdate" /> },
            
            { path: '/prospects', element: <Prospects />},
            { path: '/prospects/new',element: <ProspectForm key="prospectCreate"/> },
            { path: '/prospects/:id',element: <ProspectForm key="prospectUpdate" /> },

        ]
    },

    /*{ 
        path: '/', 
        element: <Userlayout />,
        children: [
            { path: '/my-account', element: <Myaccount />},
        ]
    },*/
    

]);

export default router;

