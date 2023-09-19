import{createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Flujo from './views/Flujo'
import AdminLayout from './layouts/AdminLayout'
import Documentos from './views/Documentos'
import Usuarios from './views/Usuarios'
import Nuevo from './views/Nuevo'
import Oficinas from './views/Oficinas'
import OficinaLayout from './layouts/OficinaLayout'
import Registro from './views/Registro'
// import Login from './views/Login'

// import Layout from './layouts/Layout'
// import AuthLayout from './layouts/AuthLayout'
// import Inicio from './views/Inicio'
// import Login from './views/Login'
// import Registro from './views/Registro'
// import Productos from './views/Productos'
// import AdminLayout from './layouts/AdminLayout'
// import Ordenes from './views/Ordenes'

const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout />, 
        children:[{
            index:true,
            element: <Inicio/>
          },
          {
            path:'/resultado',
             element: <Flujo/>
          },
          {
            path:'/solicitud',
             element: <Registro/>
          }
        ]

    },
    {
        path:'/auth',
        element:<AuthLayout />,
        children:[{
            path:'/auth/login',
            element: <Login/>
        }],
    //     {
    //         path:'/auth/registro',
    //         element: <Registro/>
    //     }
        
    //   
    },{
        path:'/oficina',
        element:<OficinaLayout />,
        children:[{
            index:true,
            element: <Documentos/>
        },{
            path:'/oficina/nuevo',
            element: <Nuevo/>
        }]  
    }
    ,{
        path:'/admin',
        element:<AdminLayout />,
        children:[{
            index:true,
            element: <Documentos/>
        },
        {
            path:'/admin/nuevo',
            element: <Nuevo/>
        },
        {
            path:'/admin/usuarios',
            element: <Usuarios/>
        },
        {
            path:'/admin/oficinas',
            element: <Oficinas/>  
        }
        
    
    ]
    }
    ])




export default router