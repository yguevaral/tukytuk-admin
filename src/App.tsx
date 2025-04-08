import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme';

function App() {
  
  return (
    <>
      <AppTheme>
        <AppRouter/>  
      </AppTheme>
      
    </>
  )
}

export default App
