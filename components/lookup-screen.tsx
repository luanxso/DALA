'use client';

import { useState, type SyntheticEvent } from 'react';
import { ArrowRight, Search, PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type LookupScreenProps = {
  initialCode: string;
  status?: string;
  onSearch: (code: string) => void;
};

export function LookupScreen({ initialCode, status, onSearch }: LookupScreenProps) {
  const [code, setCode] = useState(initialCode);
  const [edited, setEdited] = useState(false);
  const error = edited ? '' : status === 'empty'
    ? 'Digite o código do pedido ou do lote para consultar.'
    : status === 'not-found'
      ? 'Código não encontrado. Confira o código completo e tente novamente.'
      : '';

  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setEdited(false);
    onSearch(code);
  }

  return (
    <main className="shell lookup-main" id="top">
      <section className="lookup-card" aria-labelledby="lookup-heading">
        <span className="lookup-icon" aria-hidden="true"><PackageSearch /></span>
        <p className="eyebrow">Portal do cliente</p>
        <h1 id="lookup-heading" tabIndex={-1}>Consultar pedido ou lote</h1>
        <p className="lookup-description">
          Acompanhe as etapas do produto e consulte as informações do seu lote.
        </p>

        <form className="lookup-form" onSubmit={submit} noValidate>
          <label htmlFor="lookup-code">Código do pedido ou lote</label>
          <div className="lookup-controls">
            <div className="lookup-input-wrap">
              <Search aria-hidden="true" />
              <Input
                id="lookup-code"
                name="codigo"
                className="lookup-input"
                value={code}
                onChange={(event) => { setCode(event.target.value); setEdited(true); }}
                placeholder="Digite seu código"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                maxLength={80}
                aria-required="true"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'lookup-help lookup-error' : 'lookup-help'}
              />
            </div>
            <Button type="submit" className="lookup-submit" size="lg">
              Consultar <ArrowRight aria-hidden="true" />
            </Button>
          </div>
          <p id="lookup-help" className="lookup-help">
            Você encontra esse código no pedido ou na etiqueta do produto.
          </p>
          {error && <p id="lookup-error" className="lookup-error" role="alert">{error}</p>}
        </form>

      </section>
    </main>
  );
}
