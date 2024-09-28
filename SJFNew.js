function addProcesses() {
    const numProcesses = parseInt(document.getElementById("numProcesses").value);
    const processInputs = document.getElementById("processInputs");
    processInputs.innerHTML = "";

    for (let i = 0; i < numProcesses; i++) {
        processInputs.innerHTML += `
            <div>
                <label for="arrivalTime${i}">Arrival Time for Process ${i + 1}:</label>
                <input type="number" id="arrivalTime${i}">
                <label for="burstTime${i}">Burst Time for Process ${i + 1}:</label>
                <input type="number" id="burstTime${i}">
            </div>
        `;
    }
}

function simulateSJF() {
    const numProcesses = parseInt(document.getElementById("numProcesses").value);
    let processes = [];

    for (let i = 0; i < numProcesses; i++) {
        const arrivalTime = parseInt(document.getElementById(`arrivalTime${i}`).value);
        const burstTime = parseInt(document.getElementById(`burstTime${i}`).value);
        processes.push({ id: i + 1, arrivalTime, burstTime });
    }

    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let ganttChartHTML = "<h2>Gantt Chart</h2>";

    let outputHTML = "<h2>Output</h2>";
    outputHTML += "<table><tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th><th>Completion Time</th><th>Turnaround Time</th><th>Waiting Time</th></tr>";

    let totalWaitingTime = 0;

    for (const process of processes) {
        if (currentTime < process.arrivalTime) {
            ganttChartHTML += `<div class="bar" style="flex: ${process.arrivalTime - currentTime};"></div>`;
            currentTime = process.arrivalTime;
        }

        ganttChartHTML += `<div class="bar" style="flex: ${process.burstTime};">${process.id}</div>`;
        currentTime += process.burstTime;

        const completionTime = currentTime;
        const turnaroundTime = completionTime - process.arrivalTime;
        const waitingTime = turnaroundTime - process.burstTime;

        outputHTML += `<tr><td>${process.id}</td><td>${process.arrivalTime}</td><td>${process.burstTime}</td><td>${completionTime}</td><td>${turnaroundTime}</td><td>${waitingTime}</td></tr>`;

        totalWaitingTime += waitingTime;
    }

    outputHTML += "</table>";
    outputHTML += `<p>Average Waiting Time: ${totalWaitingTime / numProcesses}</p>`;

    document.getElementById("ganttChart").innerHTML = ganttChartHTML;
    document.getElementById("output").innerHTML = outputHTML;
}
