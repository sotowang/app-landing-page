import React from 'react';
import HomePage from '../../src/components/HomePage';
import { zhTranslations } from '../../src/translations';

export default function Home() {
  return (
    <HomePage translations={zhTranslations} langPath="/zh" />
  );
}
