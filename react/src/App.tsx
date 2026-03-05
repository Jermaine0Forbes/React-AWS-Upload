import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from "react-router";
import DefaultLayout from './layouts/DefaultLayout';
import Home from './pages/Home';
import Profile from './pages/profile/Profile';
import Content from './pages/Content';
import Login from './pages/Login';
import Signup from './pages/signup/Signup';
import Media from './pages/Media';
import ErrorPage from './pages/ErrorPage';
import AuthProvider from './providers/AuthProvider';

const router = createBrowserRouter([
  {
     Component: DefaultLayout,
     errorElement: <ErrorPage/>,
     children: [
       { index: true, Component: Home },
       { path: 'profile', children: [
        {path: ":id", Component: Profile},
       ],
        },
        {
          path: 'media', children: [
            {
              path:":id", Component:Media,
            }
          ]
        },
       { path: 'content', Component: Content},
       { path: 'login', Component: Login },
       { path: 'signup', Component: Signup }
     ]
  },
]);

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>

  )
}

export default App;
