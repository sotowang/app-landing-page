import React from 'react';
import HomePage from '../../src/components/HomePage';
import { enTranslations } from '../../src/translations';

export default function Home() {
  return (
    <HomePage translations={enTranslations} langPath="/en" />
  );
} 