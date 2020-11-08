export const githubIdValidate = (value?: string): boolean => {
  if (!value) return false
  return !!value.match(/[ -,\./:-@\[-`\{-~亜-熙ぁ-んァ-ヶ]/)
}