import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Accueil } from './routes/Accueil'
import { CarteMatieres } from './routes/CarteMatieres'
import { CarteMatiere } from './routes/CarteMatiere'
import { Lecon } from './routes/Lecon'
import { Exercices } from './routes/Exercices'
import { Bilan } from './routes/Bilan'
import { Profil } from './routes/Profil'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Accueil /> },
      { path: '/matieres', element: <CarteMatieres /> },
      { path: '/matiere/:matiereId', element: <CarteMatiere /> },
      { path: '/lecon/:leconId', element: <Lecon /> },
      { path: '/exercices/:leconId', element: <Exercices /> },
      { path: '/bilan/:leconId', element: <Bilan /> },
      { path: '/profil', element: <Profil /> },
    ],
  },
])
