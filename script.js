function scoutCheck() {
  let input = document.getElementById("userInput").value.toLowerCase();
  if (input.includes("fake photo")) {
    document.getElementById("result").innerText =
      "⚠️ Scout Alert: Misuse detected. Escalating to Guardian...";
    guardianCheck(input);
  } else {
    document.getElementById("result").innerText =
      "✅ Scout: No misuse detected.";
  }
}

function guardianCheck(requestText) {
  let consent = confirm(
    "Guardian Agent:\n\nENGLISH: Do you give explicit consent for this photo to be used?\n\nSWAHILI: Je, unatoa ruhusa waziwazi picha hii itumike?"
  );

  let statusMessage;
  if (!consent) {
    statusMessage = "❌ Guardian Block: No consent recorded.\n\nSWAHILI: Imezuiwa – Hakuna ruhusa iliyorekodiwa.";
  } else {
    statusMessage = "✅ Guardian: Consent verified. Safe to proceed.\n\nSWAHILI: Ruhusa imethibitishwa. Inaweza kuendelea.";
    hunterEscalate();
  }

  document.getElementById("result").innerText = statusMessage;
  logConsent(requestText, consent);
}

function hunterEscalate() {
  document.getElementById("result").innerText =
    "📄 Hunter Briefing: Case escalated to human moderator within 15 minutes.\n\nSWAHILI: Kesi imepelekwa kwa msimamizi wa binadamu ndani ya dakika 15.";
}

function logConsent(requestText, consent) {
  let table = document.getElementById("logTable");
  let row = table.insertRow(-1);

  let cellRequest = row.insertCell(0);
  let cellConsent = row.insertCell(1);
  let cellTimestamp = row.insertCell(2);

  cellRequest.innerText = requestText;
  cellConsent.innerText = consent ? "Yes / Ndiyo" : "No / Hapana";
  cellTimestamp.innerText = new Date().toLocaleString();
}

function downloadLog() {
  let table = document.getElementById("logTable");
  let rows = Array.from(table.rows).map(row =>
    Array.from(row.cells).