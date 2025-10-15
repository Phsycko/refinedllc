import HeaderSimple from '@/components/HeaderSimple'

export default function OtherPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderSimple />
      {children}
    </>
  )
}
