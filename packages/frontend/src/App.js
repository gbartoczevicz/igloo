import { AuthProvider } from './store/auth';
import './index.css';
import Routes from './router';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;