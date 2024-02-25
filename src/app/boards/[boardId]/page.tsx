interface BoardSelectedPageProps {
  params: { boardId: string }
}

export default function BoardSelectedPage({ params: { boardId } }: BoardSelectedPageProps) {
  return (
    <div className="text-white">
      {boardId}
    </div>
  )
}
