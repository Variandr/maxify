const getFullName = (name: string | undefined, surname?: string | null) => {
  return name + ' ' + (surname ?? '')
}
export default getFullName
