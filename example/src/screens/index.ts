import type { ScreenRegistry } from '../navigation/Navigator';
import { HomeScreen } from './HomeScreen';
import { OverlaysScreen } from './OverlaysScreen';
import { PlaygroundScreen } from './PlaygroundScreen';
import { ThemesScreen } from './ThemesScreen';
import { AvatarsScreen } from './components/AvatarsScreen';
import { BadgesScreen } from './components/BadgesScreen';
import { ButtonsScreen } from './components/ButtonsScreen';
import { CardsScreen } from './components/CardsScreen';
import { ChipsScreen } from './components/ChipsScreen';
import { IconsScreen } from './components/IconsScreen';
import { ListItemsScreen } from './components/ListItemsScreen';
import { AlertScreen } from './feedback/AlertScreen';
import { LoadingScreen } from './feedback/LoadingScreen';
import { ProgressScreen } from './feedback/ProgressScreen';
import { SkeletonScreen } from './feedback/SkeletonScreen';
import { StatesScreen } from './feedback/StatesScreen';
import { CheckboxScreen } from './forms/CheckboxScreen';
import { DatePickerScreen } from './forms/DatePickerScreen';
import { InputsScreen } from './forms/InputsScreen';
import { PasswordInputScreen } from './forms/PasswordInputScreen';
import { RadioScreen } from './forms/RadioScreen';
import { SearchInputScreen } from './forms/SearchInputScreen';
import { SwitchScreen } from './forms/SwitchScreen';
import { TextAreaScreen } from './forms/TextAreaScreen';
import { ColorsScreen } from './foundations/ColorsScreen';
import { ElevationScreen } from './foundations/ElevationScreen';
import { MotionScreen } from './foundations/MotionScreen';
import { RadiusScreen } from './foundations/RadiusScreen';
import { SpacingScreen } from './foundations/SpacingScreen';
import { TypographyScreen } from './foundations/TypographyScreen';

export const screens: ScreenRegistry = {
  Home: HomeScreen,
  Colors: ColorsScreen,
  Typography: TypographyScreen,
  Spacing: SpacingScreen,
  Radius: RadiusScreen,
  Elevation: ElevationScreen,
  Motion: MotionScreen,
  Buttons: ButtonsScreen,
  Icons: IconsScreen,
  Cards: CardsScreen,
  Avatars: AvatarsScreen,
  Badges: BadgesScreen,
  Chips: ChipsScreen,
  ListItems: ListItemsScreen,
  Inputs: InputsScreen,
  PasswordInput: PasswordInputScreen,
  SearchInput: SearchInputScreen,
  TextArea: TextAreaScreen,
  DatePicker: DatePickerScreen,
  Checkbox: CheckboxScreen,
  Radio: RadioScreen,
  Switch: SwitchScreen,
  Loading: LoadingScreen,
  Progress: ProgressScreen,
  Skeleton: SkeletonScreen,
  Alert: AlertScreen,
  States: StatesScreen,
  Overlays: OverlaysScreen,
  Themes: ThemesScreen,
  Playground: PlaygroundScreen,
};
