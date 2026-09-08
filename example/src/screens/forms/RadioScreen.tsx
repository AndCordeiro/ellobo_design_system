import { useState } from 'react';
import { Radio, RadioGroup, Text } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const plans = [
  { value: 'monthly', label: 'Mensal', description: 'R$ 29/mês' },
  { value: 'yearly', label: 'Anual', description: 'R$ 290/ano · 2 meses grátis' },
  { value: 'lifetime', label: 'Vitalício', description: 'Indisponível', disabled: true },
] as const;

type Plan = (typeof plans)[number]['value'];

export function RadioScreen() {
  const [plan, setPlan] = useState<Plan>('monthly');
  const [size, setSize] = useState<'p' | 'm' | 'g'>('m');

  return (
    <GalleryScreen title="Radio" subtitle="Seleção única">
      <DemoSection
        title="RadioGroup com options"
        description="value e onChange são inferidos das options."
      >
        <RadioGroup value={plan} onChange={setPlan} options={plans} />
        <Text variant="bodySmall" color="secondary">{`Plano: ${plan}`}</Text>
      </DemoSection>
      <DemoSection title="RadioGroup com children em linha">
        <RadioGroup value={size} onChange={setSize} direction="row">
          <Radio value="p" label="P" />
          <Radio value="m" label="M" />
          <Radio value="g" label="G" />
        </RadioGroup>
      </DemoSection>
      <DemoSection title="States">
        <Radio value="a" label="Unselected" />
        <Radio value="b" label="Selected" selected />
        <Radio value="c" label="Disabled" disabled />
        <Radio value="d" label="Disabled selected" disabled selected />
      </DemoSection>
    </GalleryScreen>
  );
}
