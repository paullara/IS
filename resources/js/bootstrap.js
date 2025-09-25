import axios from "axios";

// Make axios available globally
window.axios = axios;

// Set the header for XMLHttpRequest requests
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
