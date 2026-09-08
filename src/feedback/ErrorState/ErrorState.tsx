import { StateView, type StateViewProps } from '../StateView/StateView';

export type ErrorStateProps = Omit<StateViewProps, 'tone' | 'title'> & { title?: string };

/**
 * Communicates a failure and offers a recovery action.
 *
 * @example
 * <ErrorState
 *   description="Não conseguimos carregar os dados."
 *   actionLabel="Tentar novamente"
 *   onAction={refetch}
 * />
 */
export function ErrorState({
  icon = 'error',
  title = 'Algo deu errado',
  ...rest
}: ErrorStateProps) {
  return <StateView tone="error" icon={icon} title={title} {...rest} />;
}
