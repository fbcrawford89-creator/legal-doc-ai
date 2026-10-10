'use client';

import { FormEvent, useState } from 'react';

const initialForm = {
  jurisdiction: 'New Mexico',
  documentType: 'contract',
  summary: '',
  riskFocus: 'civil rights',
};

export default function HomePage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<null | {
    summary: string;
    findings: string[];
    recommendations: string[];
  }>(null);
  const [error, setError] = useState('');

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to analyze document.');
      }

      setAnalysis(data.analysis || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">LEGAL DOCUMENT INTELLIGENCE</p>
          <h1>Legal Doc AI</h1>
          <p className="subtitle">
            Review contracts, policies, and legal materials for inconsistencies, civil-rights concerns,
            and compliance issues under New Mexico standards with neutral, evidence-based analysis.
          </p>

          <div className="badges">
            <span>NM law review</span>
            <span>Civil rights checks</span>
            <span>Bias-aware analysis</span>
          </div>
        </div>

        <div className="hero-panel">
          <p className="panel-label">System note</p>
          <p>
            This tool supports evaluation and drafting review only and is not a substitute for legal advice.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <form className="panel" onSubmit={handleSubmit}>
          <h2>Document review</h2>

          <label>
            Jurisdiction
            <select value={form.jurisdiction} onChange={(e) => handleChange('jurisdiction', e.target.value)}>
              <option value="New Mexico">New Mexico</option>
              <option value="Federal">Federal</option>
              <option value="Multi-jurisdiction">Multi-jurisdiction</option>
            </select>
          </label>

          <label>
            Document type
            <select value={form.documentType} onChange={(e) => handleChange('documentType', e.target.value)}>
              <option value="contract">Contract</option>
              <option value="policy">Policy</option>
              <option value="employment">Employment</option>
              <option value="housing">Housing</option>
              <option value="government">Government</option>
            </select>
          </label>

          <label>
            Paste or summarize the document
            <textarea
              value={form.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder="Paste the contract or policy text here..."
            />
          </label>

          <label>
            Review focus
            <select value={form.riskFocus} onChange={(e) => handleChange('riskFocus', e.target.value)}>
              <option value="civil rights">Civil rights</option>
              <option value="consistency">Inconsistency</option>
              <option value="enforcement">Enforcement</option>
              <option value="privacy">Privacy</option>
              <option value="general compliance">General compliance</option>
            </select>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Reviewing...' : 'Analyze document'}
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        <div className="panel results-panel">
          <h2>Analysis</h2>

          {analysis ? (
            <>
              <div className="result-block">
                <h3>Summary</h3>
                <p>{analysis.summary}</p>
              </div>

              <div className="result-block">
                <h3>Findings</h3>
                <ul>
                  {analysis.findings.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="result-block">
                <h3>Recommendations</h3>
                <ul>
                  {analysis.recommendations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="placeholder-box">
              Add a document summary and the system will highlight risks, inconsistencies, and legal review concerns.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
