const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");
const passwordInput = document.getElementById("password");
const passwordSection = document.getElementById("password-section");
const terminalWindow = document.getElementById("terminal-window");

// --- THE ULTIMATE LORE DATABASE ---
const LORE = {
    // 1. Basic Navigation & Directory
    "help": "AVAILABLE: 'FILES', 'MED_ASA', 'MED_LEA', 'MED_CJ', 'IRIS_DIARY', 'GROUP_CHAT', 'ASA_REPORT', 'MACH_LOG', 'CLEAR', 'LOGOUT'",
    
    "files": "DIRECTORY CONTENTS:\n> medlog_asa.html\n> medlog_lea.html\n> medlog_cj.html\n> iris_diary_leaked.html\n> group_chat_leak.html\n> mach_97.html\n> asa_detention.html\n> [REDACTED]_HELIOS_DATA.zip",

    // --- FILE COMMANDS (Opens the HTML pages you built) ---
    "med_asa": () => openSecureFile('medlog_stormborn_asa_001.html', "DECRYPTING STORM_AFFINITY DATA..."),
    "med_lea": () => openSecureFile('medlog_stormborn_lea_002.html', "ACCESSING PHOTONIC_MUTATION LOGS..."),
    "med_cj": () => openSecureFile('medlog_shadow_cj_003.html', "WARNING: UMBRAL DESYNC DETECTED..."),
    "iris_diary": () => openSecureFile('iris_diary_leaked.html', "!!! SECURITY BREACH: LEAKED FILES FOUND !!!"),
    "group_chat": () => openSecureFile('group_chat_leak.html', "INTERCEPTING STUDENT_ENCRYPTED_SIGNAL..."),
    "mach_log": () => openSecureFile('mach_97.html', "CRITICAL TELEMETRY DATA FOUND..."),
    "asa_detention": () => openSecureFile('asa_detention.html', "ACCESSING DISCIPLINARY DATABASE..."),

    // --- ARG SECRETS (The Hidden "Juice") ---
    
    // The Helios Initiative (Code from Group Chat: 0101-IBIS)
    "0101-ibis": () => {
        printToTerminal("FATAL ERROR: TIMELINE DESYNC...", "red");
        printToTerminal("ATTEMPTING TO STABILIZE FUTURE_LOG_01...");
        setTimeout(() => { window.open('project_icarus_leak.html', '_blank'); }, 1500);
    },

    // Asa's Secret Experiments
    "volt_tackle": () => {
        printToTerminal("ACCESSING UNAUTHORIZED POWER_LOGS...", "#58a6ff");
        setTimeout(() => {
            window.open('asa_power_logs_secret.html', '_blank');
            printToTerminal("ASA_EXPERIMENT_LOG BYPASSED. DON'T TELL IRIS.");
        }, 1200);
    },

    // Iris's Top Secret Confessional (Code: 115_BPM)
    "115_bpm": () => {
        printToTerminal("DECRYPTING CONFIDENTIAL EMOTIONAL DATA...", "#bb8cf7");
        printToTerminal("WARNING: AGENT 042 BIOMETRIC LOCK DETECTED.", "red");
        setTimeout(() => {
            window.open('iris_confessional_top_secret.html', '_blank');
            printToTerminal("IRIS_ANDRE_LOG_FOUND. PRINTING EVIDENCE...");
        }, 1500);
    },

    // --- EASTER EGGS & REPORTS ---
    "ghost": () => openSecureFile('secret_obs_99.html', "ACCESSING ARCHIVED SURVEILLANCE..."),
    "asa_report": "INCIDENT: Vending Machine EMP. RESULT: 19 Dr. Peppers dispensed. No payment received. Student claims 'Ketchup was haunted.'",
    "icarus": "PROTOCOL MOVED. SEE: 'HELIOS'",
    "helios": "ENCRYPTION STUB FOUND. REQUIRES KEY_CODE: [XXXX-IBIS]",
    "crush": "SYSTEM ERROR: DATA REDACTED BY AGENT 042. TRY SEARCHING FOR A HEART RATE.",

    // --- UTILITY ---
    "logout": () => {
        printToTerminal("TERMINATING SECURE SESSION...", "red");
        localStorage.removeItem("umbra_access");
        setTimeout(() => location.reload(), 1000);
    }
};

// --- CORE TERMINAL ENGINE ---

// Helper function to handle window opening
function openSecureFile(file, message) {
    printToTerminal(message, "var(--accent-purple)");
    setTimeout(() => {
        window.open(file, '_blank');
        printToTerminal("FILE OPENED SUCCESSFULLY.");
    }, 1000);
}

// 1. Persistent Memory Check
window.onload = function() {
    if (localStorage.getItem("umbra_access") === "granted") {
        passwordSection.style.display = "none";
        terminalWindow.style.display = "block";
        printToTerminal("[RE-ESTABLISHING SECURE SESSION...]", "#bb8cf7");
        printToTerminal("Welcome back, Admin.", "#00ff99");
        terminalInput.focus();
    }
};

// 2. Auto-Focus (Click anywhere to focus input)
document.addEventListener("click", () => {
    if (terminalWindow && terminalWindow.style.display === "block") {
        terminalInput.focus();
    } else if (passwordInput) {
        passwordInput.focus();
    }
});

// 3. Check Password (dr.pepper)
function checkPassword() {
    const input = passwordInput.value.toLowerCase().trim();
    if(input === "dr.pepper") {
        localStorage.setItem("umbra_access", "granted");
        passwordSection.style.display = "none";
        terminalWindow.style.display = "block";
        printToTerminal("SYSTEM BOOTING UMBRA_NET v4.1...", "white");
        setTimeout(() => {
            printToTerminal("[LOGIN SUCCESSFUL] Welcome, Admin.", "#00ff99");
            printToTerminal("Type 'HELP' for a list of available commands.");
            terminalInput.focus(); 
        }, 500);
    } else {
        const error = document.getElementById("error-message");
        if (error) error.textContent = "ACCESS DENIED: INVALID KEY";
        passwordInput.value = "";
    }
}

// 4. Print to Screen
function printToTerminal(text, color) {
    const p = document.createElement("p");
    // Use the variable color if it exists in CSS, otherwise use standard color
    p.style.color = color && color.startsWith('var') ? color : (color || "#00ff99");
    p.innerHTML = text.replace(/\n/g, "<br>");
    terminalOutput.appendChild(p);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// 5. Command Handler
terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const cmd = terminalInput.value.toLowerCase().trim();
        if (cmd === "") return;

        printToTerminal(`<span class="prompt" style="color:#bb8cf7; font-weight:bold;">ADMIN@UMBRA:~$</span> ${cmd}`);
        
        if (cmd === "clear") {
            terminalOutput.innerHTML = "";
        } else if (typeof LORE[cmd] === "function") {
            LORE[cmd](); 
        } else if (LORE[cmd]) {
            printToTerminal(LORE[cmd]);
        } else {
            printToTerminal(`COMMAND NOT FOUND: ${cmd}.`, "#ff3333");
        }
        
        terminalInput.value = "";
    }
});

// Support 'Enter' key on password screen
passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkPassword();
    }
});
