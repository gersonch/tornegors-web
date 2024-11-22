export const ShowFlagIcon = (nationality) => {
  switch (nationality) {
    case 'Chile':
      return 'fi fi-cl'
    case 'Argentina':
      return 'fi fi-ar'
    case 'Peru':
      return 'fi fi-pe'
    case 'España':
      return 'fi fi-es'
    case 'Estados Unidos':
      return 'fi fi-us'
    case 'Italia':
      return 'fi fi-it'
    case 'Brazil':
      return 'fi fi-bra'
    default:
      return 'fi fi-unu'
  }
}
