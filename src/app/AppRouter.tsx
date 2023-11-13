import {useTranslations} from '../next-intl';

export default function AppRouter() {
  const t = useTranslations('AppRouter');
  return t('hello');
}
