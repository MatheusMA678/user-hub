import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from './Router'
import { UserHubContextProvider } from './contexts/UserHubContext'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <UserHubContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </UserHubContextProvider>
  )
}
