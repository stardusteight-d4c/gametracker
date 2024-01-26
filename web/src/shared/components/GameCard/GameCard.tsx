import { Content, Skeleton } from "./components"

interface GameCardProps {
  title?: string
  coverUrl?: string
  score?: number
  skeleton?: boolean
}

export function GameCard({ coverUrl, title, score, skeleton }: GameCardProps) {
  const renderingCard = title && coverUrl && (score === 0 || score)

  function handleRendering() {
    if (renderingCard && !skeleton) {
      return <Content coverUrl={coverUrl} title={title} score={score} />
    }
    if (skeleton) {
      return <Skeleton />
    }
  }

  return handleRendering()
}
