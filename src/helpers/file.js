export const saveFile = (blob, filename) => {
    const file = new File([blob], filename)
    const url = URL.createObjectURL(file)

    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
}
