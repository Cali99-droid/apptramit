import{createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Flujo from './views/Flujo'
import AdminLayout from './layouts/AdminLayout'
import Documentos from './views/Documentos'
import Usuarios from './views/Usuarios'
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
        path:'/admin',
        element:<AdminLayout />,
        children:[{
            index:true,
            element: <Documentos/>
        },
        {
            path:'/admin/usuarios',
            element: <Usuarios/>
        }]
    }
    ])




export default router