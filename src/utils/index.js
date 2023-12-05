export const snakeToTitleCase = (snakeCaseString) => {
  const words = snakeCaseString.split("_")
  const titleCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  const titleCaseString = titleCaseWords.join(" ")

  return titleCaseString
}
