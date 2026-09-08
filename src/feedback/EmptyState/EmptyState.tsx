import { StateView, type StateViewProps } from '../StateView/StateView';

export type EmptyStateProps = Omit<StateViewProps, 'tone'>;

/**
 * Communicates the absence of content and optionally suggests an action.
 *
 * @example
 * <EmptyState
 *   icon="search"
 *   title="Nenhum resultado"
 *   description="Tente alterar sua busca."
 *   actionLabel="Limpar filtros"
 *   onAction={clearFilters}
 * />
 */
export function EmptyState({ icon = 'inbox', ...rest }: EmptyStateProps) {
  return <StateView tone="neutral" icon={icon} {...rest} />;
}
