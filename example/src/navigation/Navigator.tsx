import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import { BackHandler } from 'react-native';

/**
 * Minimal in-app stack navigator. The example intentionally avoids React Navigation so the
 * gallery stays focused on the design system and the library proves it is navigation-agnostic.
 */
export type StatesTab = 'empty' | 'error' | 'success';

export type RouteParams = {
  Home: undefined;
  Colors: undefined;
  Typography: undefined;
  Spacing: undefined;
  Radius: undefined;
  Elevation: undefined;
  Motion: undefined;
  Buttons: undefined;
  Icons: undefined;
  Cards: undefined;
  Avatars: undefined;
  Badges: undefined;
  Chips: undefined;
  ListItems: undefined;
  Inputs: undefined;
  PasswordInput: undefined;
  SearchInput: undefined;
  TextArea: undefined;
  Checkbox: undefined;
  Radio: undefined;
  Switch: undefined;
  Loading: undefined;
  Progress: undefined;
  Skeleton: undefined;
  Alert: undefined;
  States: { initial: StatesTab };
  Overlays: undefined;
  Themes: undefined;
  Playground: undefined;
};

export type RouteName = keyof RouteParams;

type Route = { [K in RouteName]: { name: K; params: RouteParams[K] } }[RouteName];

type NavigateArgs<K extends RouteName> = RouteParams[K] extends undefined
  ? [name: K]
  : [name: K, params: RouteParams[K]];

export interface Navigation {
  navigate: <K extends RouteName>(...args: NavigateArgs<K>) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const NavigationContext = createContext<Navigation | null>(null);

export function useNavigation(): Navigation {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used inside Navigator');
  }
  return context;
}

export type ScreenComponent<K extends RouteName> = ComponentType<{ params: RouteParams[K] }>;

export type ScreenRegistry = { [K in RouteName]: ScreenComponent<K> };

export function Navigator({ screens }: { screens: ScreenRegistry }): ReactNode {
  const [stack, setStack] = useState<Route[]>([{ name: 'Home', params: undefined }]);

  const navigate = useCallback(<K extends RouteName>(...args: NavigateArgs<K>) => {
    const [name, params] = args;
    setStack((current) => [...current, { name, params } as Route]);
  }, []);

  const goBack = useCallback(() => {
    setStack((current) => (current.length > 1 ? current.slice(0, -1) : current));
  }, []);

  const canGoBack = stack.length > 1;

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack) {
        goBack();
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [canGoBack, goBack]);

  const value = useMemo<Navigation>(
    () => ({ navigate, goBack, canGoBack }),
    [navigate, goBack, canGoBack],
  );

  const route = stack[stack.length - 1] ?? stack[0];
  if (!route) {
    return null;
  }
  const Screen = screens[route.name] as ComponentType<{ params: RouteParams[RouteName] }>;

  return (
    <NavigationContext.Provider value={value}>
      <Screen key={stack.length} params={route.params} />
    </NavigationContext.Provider>
  );
}
