export function CopyrightYeart() {
    const copyEear = document.getElementById('copy-year')
    const year = new Date().getFullYear();
    copyEear!.textContent = year.toString();
}