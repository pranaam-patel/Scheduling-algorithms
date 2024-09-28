let processes = [];

function setProcessCount() {
    const processCount = parseInt(document.getElementById('process-count').value);

    if (!isNaN(processCount) && processCount > 0) {
        const processInputsDiv = document.getElementById('process-inputs');
        processInputsDiv.innerHTML = '';

        for (let i = 0; i < processCount; i++) {
            const processIndex = i + 1;
            const processInputDiv = document.createElement('div');
            processInputDiv.innerHTML = `
                <label for="arrival-time-${processIndex}">Arrival Time for Process ${processIndex}:</label>
                <input type="number" id="arrival-time-${processIndex}">
                <label for="burst-time-${processIndex}">Burst Time for Process ${processIndex}:</label>
                <input type="number" id="burst-time-${processIndex}">
            `;
            processInputsDiv.appendChild(processInputDiv);
        }

        document.getElementById('input-container').style.display = 'block';
    }
}

function simulateSRTF() {
    processes = [];
    const processCount = parseInt(document.getElementById('process-count').value);

    for (let i = 0; i < processCount; i++) {
        const arrivalTime = parseInt(document.getElementById(`arrival-time-${i + 1}`).value);
        const burstTime = parseInt(document.getElementById(`burst-time-${i + 1}`).value);

        if (!isNaN(arrivalTime) && !isNaN(burstTime)) {
            const process = { id: i + 1, arrivalTime, burstTime };
            processes.push(process);
        }
    }

    processes.sort((a, b) => a.arrivalTime - b.arrivalTime); // Sort by arrival time
    runSRTF();
}

function runSRTF() {
    const ganttChart = document.getElementById('ganttChart');
   
    ganttChart.innerHTML = '';


    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    processes.forEach(process => {
        const waitingTime = currentTime - process.arrivalTime;
        const turnaroundTime = waitingTime + process.burstTime;
        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;

  
        const bar = document.createElement('div');
         bar.className = 'process-bar';
        bar.style.width = `${process.burstTime * 30}px`;
        bar.innerText = `P${process.id}`;
        ganttChart.appendChild(bar);

        const row = processTable.insertRow();
        row.innerHTML = `<td>P${process.id}</td><td>${process.arrivalTime}</td><td>${process.burstTime}</td><td>${currentTime}</td><td>${turnaroundTime}</td><td>${waitingTime}</td>`;
       
        currentTime += process.burstTime;
    });

    
}
