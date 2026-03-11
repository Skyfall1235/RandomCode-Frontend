// --- CONFIGURATION ---
const CONFIG = {
    API_URL: 'https://localhost:7192/api/APIHealth',
    HEALTH_CHECK_INTERVAL: 30000 // 30 seconds
};

/**
 * Manages the API Status indicator in the header
 */
class StatusManager {
    constructor(apiUrl, interval) {
        this.apiUrl = apiUrl;
        this.interval = interval;
        this.dot = document.getElementById('status-indicator');
        this.text = document.getElementById('status-text');
    }

    async checkStatus() {
        if (!this.dot || !this.text) return;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const response = await fetch(this.apiUrl, { 
                method: 'GET', 
                mode: 'cors', 
                signal: controller.signal 
            });
            
            clearTimeout(timeoutId);

            if (response.ok) {
                this.updateUI('OPERATIONAL', 'bg-emerald-500 animate-pulse', 'text-emerald-500');
            } else {
                this.updateUI(`ERR_${response.status}`, 'bg-amber-500', 'text-amber-500');
            }
        } catch (err) {
            this.updateUI('OFFLINE', 'bg-red-500', 'text-red-500');
        }
    }

    updateUI(message, dotClass, textClass) {
        this.dot.className = `status-dot ${dotClass}`;
        this.text.innerText = message;
        this.text.className = `ml-1 ${textClass}`;
    }

    start() {
        this.checkStatus();
        setInterval(() => this.checkStatus(), this.interval);
    }
}