import {AuthProvider} from '@/features/auth/AuthContext'

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element= {<HomePage />}/>
            <Route path="*" element= {<NotFoundPage />}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
