import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionnairePage from './pages/QuestionnairePage';
import ResultsPage from './pages/ResultsPage';
import LanguageSwitcher from './components/LanguageSwitcher';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';


export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div>
        <LanguageSwitcher />
        <Routes>
          <Route path="/" element={<QuestionnairePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
}
