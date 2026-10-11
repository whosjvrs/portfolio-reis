import type { ComponentPropsWithoutRef } from 'react'

type ActionLinkProps = ComponentPropsWithoutRef<'a'> & {
  variant: 'primary' | 'secondary'
}

const variantClasses = {
  primary: 'bg-cream text-deep-blue hover:bg-cream/90',
  secondary:
    'border border-cream/20 bg-transparent text-cream hover:border-cream/40 hover:bg-cream/5',
}

function ActionLink({ variant, className = '', ...props }: ActionLinkProps) {
  return (
    <a
      className={`inline-flex min-h-14 items-center justify-center rounded-[4px] px-8 py-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}

export default ActionLink
