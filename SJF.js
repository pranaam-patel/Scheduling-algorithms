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
  let completedProcesses = [];

  while (completedProcesses.length < numProcesses) {
      let availableProcesses = processes.filter(process => !completedProcesses.includes(process.id) && process.arrivalTime <= currentTime);

      if (availableProcesses.length === 0) {
          currentTime++;
          continue;
      }

      availableProcesses.sort((a, b) => a.burstTime - b.burstTime);
      let shortestJob = availableProcesses[0];

      ganttChartHTML += `<div class="process-bar" style="width: ${shortestJob.burstTime * 30}px;">P${shortestJob.id}</div>`;
 
      currentTime += shortestJob.burstTime;

      const completionTime = currentTime;
      const turnaroundTime = completionTime - shortestJob.arrivalTime;
      const waitingTime = turnaroundTime - shortestJob.burstTime;

      const row = processTable.insertRow();
      row.innerHTML = `<td>P${shortestJob.id}</td><td>${shortestJob.arrivalTime}</td><td>${shortestJob.burstTime}</td><td>${completionTime}</td><td>${turnaroundTime}</td><td>${waitingTime}</td>`;
      //
      totalWaitingTime += waitingTime;
      completedProcesses.push(shortestJob.id);
  }

  outputHTML += "</table>";
  outputHTML += `<p>Average Waiting Time: ${totalWaitingTime / numProcesses}</p>`;

    document.getElementById("ganttChart").innerHTML = ganttChartHTML;
  document.getElementById("output").innerHTML = outputHTML;
}
