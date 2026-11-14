export function toDigits(input: string) {
  return input.replace(/\D/g, '')
}

export function formatPhoneNumber(input: string) {
  const digits = toDigits(input).slice(0, 11)
  return [digits.slice(0, 3), digits.slice(3, 7), digits.slice(7)].filter((part) => part !== '').join('-')
}
