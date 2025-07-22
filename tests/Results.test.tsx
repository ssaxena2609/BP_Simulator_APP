import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import Results from '../src/features/results/Results';

import { vi } from 'vitest';

vi.mock('../src/data/survey.json', () => ({
  default: {
    survey: {
      bpTest: {
        recommendations: {
          normal: {
            lifestyle_recommendations: ['Exercise regularly', 'Maintain healthy diet'],
            medical_advice: ['Regular checkups'],
            follow_up: 'Follow up in 6 months'
          },
          elevated: {
            lifestyle_recommendations: ['Reduce salt intake', 'Exercise more'],
            medical_advice: ['Monitor BP weekly'],
            follow_up: 'Follow up in 3 months'
          }
        }
      }
    }
  },
  __esModule: true
}));

i18n.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        'app.title': 'BP Simulator',
        'survey.title': 'BP Survey',
        'results.lifestyle': 'Lifestyle Recommendations',
        'results.medical': 'Medical Advice',
        'results.follow_up': 'Follow Up',
        'results.unit_label': 'Units',
        'results.unit_toggle': 'Toggle units',
        'buttons.metric': 'Metric',
        'buttons.imperial': 'Imperial',
        'results.disclaimer': 'Disclaimer text'
      }
    }
  }
});

const mockAnswers = {
  age: '30',
  weight: '70',
  height: '170',
  systolic: '120',
  diastolic: '80'
};

describe('Results Component', () => {
  beforeAll(() => {
    i18n.init({
      lng: 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      resources: {
        en: {
          translation: {
            'app.title': 'BP Simulator',
            'survey.title': 'BP Survey',
            'results.lifestyle': 'Lifestyle Recommendations',
            'results.medical': 'Medical Advice',
            'results.follow_up': 'Follow Up',
            'results.unit_label': 'Units',
            'results.unit_toggle': 'Toggle units',
            'buttons.metric': 'Metric',
            'buttons.imperial': 'Imperial',
            'results.disclaimer': 'Disclaimer text'
          }
        }
      }
    });
  });

  const renderResults = () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[{ 
          pathname: '/results',
          state: { answers: mockAnswers }
        }]}>
          <Routes>
            <Route path="/results" element={<Results />} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    );
  };

beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders main components and title', () => {
    renderResults();
    
    expect(screen.getByText('BP Simulator')).toBeInTheDocument();
    expect(screen.getByText('BP Survey')).toBeInTheDocument();
    expect(screen.getByText('Lifestyle Recommendations')).toBeInTheDocument();
    expect(screen.getByText('Medical Advice')).toBeInTheDocument();
    expect(screen.getByLabelText('Lifestyle Recommendations')).toBeInTheDocument();
    expect(screen.getByLabelText('Medical Advice')).toBeInTheDocument();
  });

  test('toggles between metric and imperial units', () => {
    renderResults();
    
    const metricButton = screen.getByText('Metric');
    const imperialButton = screen.getByText('Imperial');
    
    expect(imperialButton).toHaveAttribute('aria-pressed', 'true');
    expect(metricButton).toHaveAttribute('aria-pressed', 'false');
    
    fireEvent.click(metricButton);
    
    expect(metricButton).toHaveAttribute('aria-pressed', 'true');
    expect(imperialButton).toHaveAttribute('aria-pressed', 'false');
  });

  test('navigates to home on retest', () => {
    renderResults();
    
    const retestButton = screen.getByRole('button', { name: /retest/i });
    fireEvent.click(retestButton);
    
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  test('displays recommendations based on BP category', () => {
    renderResults();
    
    const possibleRecommendations = [
      'Exercise regularly',
      'Maintain healthy diet',
      'Reduce salt intake',
      'Exercise more'
    ];
    
    const foundRecommendation = possibleRecommendations.some(recommendation => 
      screen.queryByText(recommendation) !== null
    );
    
    expect(foundRecommendation).toBe(true);
  });

  test('displays disclaimer', () => {
    renderResults();
    expect(screen.getByText('Disclaimer text')).toBeInTheDocument();
  });
});
