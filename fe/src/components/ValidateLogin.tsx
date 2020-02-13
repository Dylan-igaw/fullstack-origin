export default function validateLogin() {
    return sessionStorage.getItem("id") === null
}