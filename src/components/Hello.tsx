import {useTranslations} from '@/next-intl';

export default function Hello() {
  const t = useTranslations('Hello');
  return t('text');
}
