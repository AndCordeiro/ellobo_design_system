import { StateView, type StateViewProps } from '../StateView/StateView';

export type SuccessStateProps = Omit<StateViewProps, 'tone'>;

/**
 * Confirms that an action was completed.
 *
 * @example
 * <SuccessState title="Pedido confirmado" description="Você receberá um e-mail em breve." />
 */
export function SuccessState({ icon = 'success', ...rest }: SuccessStateProps) {
  return <StateView tone="success" icon={icon} {...rest} />;
}
