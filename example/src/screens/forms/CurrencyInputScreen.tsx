import { useState } from 'react';
import { CurrencyInput, Stack, Text, formatCurrency } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function CurrencyInputScreen() {
  const [brl, setBrl] = useState<number | null>(5990);
  const [usd, setUsd] = useState<number | null>(null);
  const [eur, setEur] = useState<number | null>(null);
  const [jpy, setJpy] = useState<number | null>(null);

  return (
    <GalleryScreen
      title="Currency Input"
      subtitle="Digite só números; a máscara segue moeda e idioma"
    >
      <DemoSection title="Real (pt-BR)">
        <CurrencyInput label="Valor" value={brl} onChange={setBrl} currency="BRL" locale="pt-BR" />
        <Text color="secondary">
          Centavos: {brl ?? '—'} · {brl === null ? '' : formatCurrency(brl, 'BRL', 'pt-BR')}
        </Text>
      </DemoSection>
      <DemoSection title="Outras moedas">
        <Stack gap="sm">
          <CurrencyInput
            label="Amount (USD, en-US)"
            value={usd}
            onChange={setUsd}
            currency="USD"
            locale="en-US"
          />
          <CurrencyInput
            label="Betrag (EUR, de-DE)"
            value={eur}
            onChange={setEur}
            currency="EUR"
            locale="de-DE"
          />
          <CurrencyInput
            label="金額 (JPY, ja-JP)"
            value={jpy}
            onChange={setJpy}
            currency="JPY"
            locale="ja-JP"
          />
        </Stack>
      </DemoSection>
      <DemoSection title="Estados">
        <Stack gap="sm">
          <CurrencyInput
            label="Com erro"
            value={null}
            onChange={() => undefined}
            error="Informe um valor"
          />
          <CurrencyInput label="Desabilitado" value={12990} onChange={() => undefined} disabled />
          <CurrencyInput
            label="Sem símbolo"
            value={4500}
            onChange={() => undefined}
            showSymbol={false}
            helperText="Útil quando a moeda aparece no rótulo"
          />
        </Stack>
      </DemoSection>
    </GalleryScreen>
  );
}
