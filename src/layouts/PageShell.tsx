import type { ReactNode } from 'react'
import './PageShell.css'

type PageShellProps = {
  children: ReactNode
}

function PageShell({ children }: PageShellProps) {
  return <div className="page-shell">{children}</div>
}

export default PageShell
