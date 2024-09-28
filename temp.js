
function priorityQueue(){
  
}























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

function simulateSJF() {
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

  // Sort processes according to burst time (SJF)
  const processes = [];
  for (let i = 0; i < numProcesses; i++) {
    processes.push({
      id: i + 1,
      arrivalTime: arrivalTimes[i],
      burstTime: burstTimes[i],
      completed:false
    });
  }
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime); // Sort by burst time (SJF)
  // for(const process of processes){
  //   if(timeTaken < process.arrivalTime){
  //     timeTaken += process.arrivalTime;
  //   }
  //   const Tempprocesses = [];
  //   for(const Tempprocess of processes){
  //     if(timeTaken > Tempprocess.arrivalTime && Tempprocess != process){
  //       Tempprocesses.push({
  //         id: Tempprocesses.id,
  //         arrivalTime: Tempprocesses.arrivalTime,
  //         burstTime: Tempprocesses.burstTimes
  //       }); 
  //     }
      
  //   }
  //   Tempprocesses.sort((a, b) => a.burstTime - b.burstTime);
  // }



  let timeTaken = 0;
  let runningProcess;

  let currentTime = 0;
  for (const process of processes) {
    const readyqueue = [];
    if(timeTaken == 0){
        runningProcess = process;
        timeTaken = process.burstTime;
        process.completed = true;

    }
    else{
        
    }


























    // if(timeTaken < process.arrivalTime){
    //   timeTaken += process.arrivalTime;
    //   process.completed = true;
    // }
    // const Tempprocesses = [];
    // for(const Tempprocess of processes){
    //   if(timeTaken > Tempprocess.arrivalTime && Tempprocess.completed == false){
    //     Tempprocesses.push({
    //       id: Tempprocess.id,
    //       arrivalTime: Tempprocess.arrivalTime,
    //       burstTime: Tempprocess.burstTime,
    //       completed: Tempprocess.completed
    //     }); 
    //   }
      
    // }
    // Tempprocesses.sort((a, b) => a.burstTime - b.burstTime);
    
    
    
    
    
    const completionTime = currentTime + process.burstTime;
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
