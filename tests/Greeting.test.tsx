import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import Greeting from '../src/components/Greeting';
import i18n from '../src/i18n';

describe('Greeting Component', () => {
  beforeAll(() => {
    i18n.init();
  });

  it('renders greeting in English', async () => {
    render(<Greeting name="Sakshi" />);
    await waitFor(() => {
      expect(screen.getByText('Hello, Sakshi!')).toBeInTheDocument();
    });
  });
});
