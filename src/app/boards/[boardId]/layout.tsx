
interface BoardSelectedLayoutProps {
  children: React.ReactNode;
}

export default async function BoardSelectedLayout({ children }: BoeardSelectedLayoutProps) {
  return (
    <div>
      {children}
    </div>
  )
}
