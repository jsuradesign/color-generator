import './styles/main.scss'

const copyEear = document.getElementById('copy-year')
const year = new Date().getFullYear()
copyEear!.textContent = year.toString();
console.log(year);
