function generateForm() {
  const numProcesses = parseInt(document.getElementById('processes').value);
  const formContainer = document.getElementById('formContainer');
  formContainer.innerHTML = '';

  for (let i = 1; i <= numProcesses; i++) {
    const form = document.createElement('div');
    form.innerHTML = `
      <label for="arrivalTime${i}">Arrival Time for Process ${i}:</label>
      <input type="number" id="arrivalTime${i}" required>
      <label for="burstTime${i}">Burst Time for Process ${i}:</label>
      <input type="number" id="burstTime${i}" required>
      <br><br>
    `;
    formContainer.appendChild(form);
  }
}

function simulate() {
  const numProcesses = parseInt(document.getElementById('processes').value);
  const processTable = document.getElementById('processTable').getElementsByTagName('tbody')[0];
  const ganttChart = document.getElementById('ganttChart');
  const arrivalTimes = [];
  const burstTimes = [];

  // Clear previous data
  processTable.innerHTML = '';
  ganttChart.innerHTML = '';

  // Get arrival and burst times
  for (let i = 1; i <= numProcesses; i++) {
    const arrivalTime = parseInt(document.getElementById(`arrivalTime${i}`).value);
    const burstTime = parseInt(document.getElementById(`burstTime${i}`).value);
    arrivalTimes.push(arrivalTime);
    burstTimes.push(burstTime);
  }

  // Sort processes according to arrival time
  const processes = [];
  for (let i = 0; i < numProcesses; i++) {
    processes.push({
      id: i + 1,
      arrivalTime: arrivalTimes[i],
      burstTime: burstTimes[i]
    });
  }
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  

  let currentTime = 0;
  for (const process of processes) {
    const completionTime = Math.max(currentTime, process.arrivalTime) + process.burstTime;
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;

    // Add row to process table
    const row = processTable.insertRow();
    row.innerHTML = `<td>P${process.id}</td><td>${process.arrivalTime}</td><td>${process.burstTime}</td><td>${completionTime}</td><td>${turnaroundTime}</td><td>${waitingTime}</td>`;

    // Add bar to Gantt chart
    const bar = document.createElement('div');
    bar.className = 'process-bar';
    bar.style.width = `${process.burstTime * 30}px`;
    bar.innerText = `P${process.id}`;
    ganttChart.appendChild(bar);

    currentTime = completionTime;
  }
}

