let numProcesses;
let processes = [];

function setupProcesses() {
    numProcesses = parseInt(document.getElementById('numProcesses').value);
    
    let processForm = document.getElementById('processForm');
    processForm.innerHTML = '';

    for (let i = 0; i < numProcesses; i++) {
        let processDiv = document.createElement('div');
        processDiv.innerHTML = `
            <label for="arrivalTime${i}">Process ${i + 1} Arrival Time:</label>
            <input type="number" id="arrivalTime${i}" required>
            <label for="burstTime${i}">Burst Time:</label>
            <input type="number" id="burstTime${i}" required>
            <label for="priority${i}">Priority:</label>
            <input type="number" id="priority${i}" required><br><br>
        `;
        processForm.appendChild(processDiv);
    }

    document.getElementById('processInputs').style.display = 'block';
}

function runPriorityScheduler() {
    processes = [];

    for (let i = 0; i < numProcesses; i++) {
        let arrivalTime = parseInt(document.getElementById(`arrivalTime${i}`).value);
        let burstTime = parseInt(document.getElementById(`burstTime${i}`).value);
        let priority = parseInt(document.getElementById(`priority${i}`).value);
        processes.push({ id: i + 1, arrivalTime, burstTime, priority });
    }

    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let ganttChart = document.getElementById('ganttChart');
    ganttChart.innerHTML = '<h2>Gantt Chart</h2>';

    let currentTime = 0;

    while (processes.length > 0) {
        let arrivedProcesses = processes.filter(p => p.arrivalTime <= currentTime);

        if (arrivedProcesses.length === 0) {
            currentTime++;
            continue;
        }

        let highestPriorityProcess = arrivedProcesses.reduce((min, p) => p.priority < min.priority ? p : min, arrivedProcesses[0]);
        let index = processes.findIndex(p => p.id === highestPriorityProcess.id);
        
        const completionTime = Math.max(currentTime, highestPriorityProcess.arrivalTime) + highestPriorityProcess.burstTime;
        const turnaroundTime =  completionTime - highestPriorityProcess.arrivalTime;
        const waitingTime = turnaroundTime - highestPriorityProcess.burstTime;
        

        //
        const bar = document.createElement('div');
         bar.className = 'process-bar';
        bar.style.width = `${highestPriorityProcess.burstTime * 30}px`;
        bar.innerText = `P${highestPriorityProcess.id}`;
        ganttChart.appendChild(bar);

        //
        
        const row = processTable.insertRow();
        row.innerHTML = `<td>P${highestPriorityProcess.id}</td><td>${highestPriorityProcess.arrivalTime}</td><td>${highestPriorityProcess.burstTime}</td><td>${completionTime}</td><td>${turnaroundTime}</td><td>${waitingTime}</td>`;
        //
        // ganttChart.innerHTML += `<div>P${highestPriorityProcess.id} (${currentTime} - ${currentTime + highestPriorityProcess.burstTime})</div>`;
        currentTime += highestPriorityProcess.burstTime;
        processes.splice(index, 1);
    }
}
