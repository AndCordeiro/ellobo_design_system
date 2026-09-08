import { useState } from 'react';
import {
  Card,
  EmptyState,
  ErrorState,
  SegmentedControl,
  SuccessState,
} from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';
import type { StatesTab } from '../../navigation/Navigator';

export function StatesScreen({ params }: { params: { initial: StatesTab } }) {
  const [tab, setTab] = useState<StatesTab>(params.initial);
  const [retrying, setRetrying] = useState(false);

  const retry = () => {
    setRetrying(true);
    setTimeout(() => setRetrying(false), 1200);
  };

  return (
    <GalleryScreen title="Estados de tela" subtitle="Empty, Error e Success">
      <SegmentedControl
        options={[
          { label: 'Empty', value: 'empty' },
          { label: 'Error', value: 'error' },
          { label: 'Success', value: 'success' },
        ]}
        value={tab}
        onChange={setTab}
      />
      <DemoSection
        title={tab === 'empty' ? 'EmptyState' : tab === 'error' ? 'ErrorState' : 'SuccessState'}
      >
        <Card variant="outlined">
          {tab === 'empty' ? (
            <EmptyState
              icon="search"
              title="Nenhum resultado"
              description="Tente alterar sua busca ou limpar os filtros."
              actionLabel="Limpar filtros"
              onAction={() => undefined}
              secondaryActionLabel="Ver tudo"
              onSecondaryAction={() => undefined}
            />
          ) : tab === 'error' ? (
            <ErrorState
              description="Não conseguimos carregar os dados. Verifique sua conexão."
              actionLabel="Tentar novamente"
              onAction={retry}
              actionLoading={retrying}
            />
          ) : (
            <SuccessState
              title="Pedido confirmado"
              description="Você receberá um e-mail com os detalhes em instantes."
              actionLabel="Ver pedido"
              onAction={() => undefined}
            />
          )}
        </Card>
      </DemoSection>
    </GalleryScreen>
  );
}
