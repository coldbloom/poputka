// components/auth/LegalNotice.tsx
import Link from 'next/link'
import s from './LegalNotice.module.scss'

interface LegalNoticeProps {
  className?: string
}

export function LegalNotice({ className }: LegalNoticeProps) {
  return (
    <p className={`${s.legal}${className ? ` ${className}` : ''}`}>
      Продолжая, вы принимаете{' '}
      <Link href="/terms" className={s.legalLink}>
        Условия&nbsp;использования
      </Link>
      {' '}и{' '}
      <Link href="/privacy" className={s.legalLink}>
        Политику&nbsp;конфиденциальности
      </Link>
    </p>
  )
}