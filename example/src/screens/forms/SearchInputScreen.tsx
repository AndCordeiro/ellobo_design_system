import { useEffect, useState } from 'react';
import { Card, EmptyState, ListItem, SearchInput, Stack } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const items = ['Button', 'Input', 'Card', 'Avatar', 'Badge', 'Modal', 'Tabs', 'Header'];

export function SearchInputScreen() {
  const [query, setQuery] = useState('');
  // The applied query lags behind the typed one to simulate an async search.
  const [appliedQuery, setAppliedQuery] = useState('');
  const loading = appliedQuery !== query;
  const results = items.filter((item) => item.toLowerCase().includes(appliedQuery.toLowerCase()));

  useEffect(() => {
    const timeout = setTimeout(() => setAppliedQuery(query), 400);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <GalleryScreen title="Search Input" subtitle="Busca com limpar e loading">
      <DemoSection title="Interativo">
        <SearchInput
          value={query}
          onChangeText={setQuery}
          loading={loading}
          placeholder="Buscar componente"
        />
        <Card variant="outlined" padding="none">
          {results.length === 0 ? (
            <EmptyState
              icon="search"
              title="Nenhum resultado"
              description="Tente alterar sua busca."
              actionLabel="Limpar"
              onAction={() => setQuery('')}
            />
          ) : (
            <Stack gap="none">
              {results.map((item, index) => (
                <ListItem key={item} title={item} divider={index < results.length - 1} />
              ))}
            </Stack>
          )}
        </Card>
      </DemoSection>
      <DemoSection title="States">
        <SearchInput value="" placeholder="Vazio" />
        <SearchInput value="com valor" />
        <SearchInput value="carregando" loading />
        <SearchInput value="desabilitado" disabled />
      </DemoSection>
    </GalleryScreen>
  );
}
