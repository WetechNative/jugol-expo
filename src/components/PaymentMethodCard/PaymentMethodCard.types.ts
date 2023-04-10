
import { ImageSourcePropType } from 'react-native';
import { PressableProps, TextProps } from '../../types/native-base.types';
export interface IPaymentMethodCard extends PressableProps {
    icon: JSX.Element;
    title: string;
    titleStyle?: TextProps;
}
