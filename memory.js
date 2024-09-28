
let memorySize =(document.getElementById('memorySize').value);
let allocates= document.querySelector('#allocate');
let save=document.querySelector('#save');
let allocate_pro=document.querySelector('#alloca_pro');
let save_pro=document.querySelector('#saveProcess');
let space=0;
let submit=document.querySelector('#Submit');
let processLeft=[];

 // Total memory size

let memory = []; 
let left=[];


  function initializeMemory() {
   // Memory blocks
    memory = new Array(100);
  }
  function initializeProcess()
  {let process=[];
process=new Array(100);
processLeft=new Array(100);
  }
 
  
  allocate_pro.addEventListener('click',function(event){
initializeProcess();
let size=(document.getElementById('processSize').value);
    const processDiv = document.getElementById('process');
    for(let i=0;i<size;i++)
    {
     
      processDiv.innerHTML = '';
      for (let i = 0; i < size; i++) {
  
        let block = document.createElement('input');
        // block.setAttribute('type','number');
      block.id=`process_size${i}`;
        block.className ='procees_design';
        processDiv.appendChild(block);
       
        
      }
    }
    alert('Process are allocated Successfully!');
  })
  save_pro.addEventListener('click',function(event){
    let size=(document.getElementById('processSize').value);
    for(let i=0;i<size;i++)
    {
    let ele=document.getElementById(`process_size${i}`);
        process[i]=(parseInt(ele.value));
 
  }
  alert('Process size are added Successfully!');
  })

  allocates.addEventListener('click',function(event){
    initializeMemory();
    let size=(document.getElementById('memorySize').value);
    const memoryDiv = document.getElementById('memory');
    for(let i=0;i<size;i++)
    {
     
      memoryDiv.innerHTML = '';
      for (let i = 0; i < size; i++) {
  
        let block = document.createElement('input');
        // block.setAttribute('type','number');
      block.id=`mem_size${i}`;
        block.className = memory[i] === 0 ? 'memory-block free' : 'memory-block allocated';
        memoryDiv.appendChild(block);
       
        
      }
    }
    alert('Memory is allocated Successfully!');

  })


  save.addEventListener('click',allocate);
  function allocate() {
    let size=(document.getElementById('memorySize').value);
    for(let i=0;i<size;i++)
    {
    let ele=document.getElementById(`mem_size${i}`);
        memory[i]=(parseInt(ele.value));
 
  }
  alert('Size of memory block are added Successfully!');
  }

  function firstFit() {
    space = 0;
    const copyMemory = Array.from(memory);
    let memorySize=(document.getElementById('memorySize').value);
    let processSize=(document.getElementById('processSize').value);
    processLeft.splice(0, processLeft.length);
    for (let i = 0; i < processSize; i++) {
      let check=false;
     for(let j=0;j<memorySize;j++)
     {
      if(process[i]<=copyMemory[j])
      {
      console.log('inside if');
// Assume 'textInput' is the ID of the text input element
var inputElement = document.getElementById(`output_size${j}`);

// Change the input type to text
let p=i+1;
inputElement.innerText=`Process${p}`;
inputElement.className='outputalloc';
// inputElement.value='process1';
// Disable the input so that it becomes read-only


space+=copyMemory[j]-process[i];
copyMemory[j]=0;
check=true;
break;
      }
     }
     if(check==false)
     {
      processLeft.push(i+1);
     }
    }
    for(let i=0;i<memorySize;i++)
    {
      space+=copyMemory[i];
    }
    console.log('Memory allocation failed: No suitable block found.');
  }

  function nextFit() {
    space = 0;
    // Implementation similar to firstFit, starting search from the last allocated position
    let memorySize=(document.getElementById('memorySize').value);
    let processSize=(document.getElementById('processSize').value);
    let j=0;
    const copyMemory = Array.from(memory);
    let i=0;
    processLeft.splice(0, processLeft.length);
for(;i<processSize && j<memorySize;)
{
if(copyMemory[j]>=process[i])
{
  var inputElement = document.getElementById(`output_size${j}`);

  // Change the input type to text
  let p=i+1;
  inputElement.innerText=`Process${p}`;
  inputElement.className='outputalloc';
  space+=copyMemory[j]-process[i];
  copyMemory[j]=0;
  i++;
  j++;
}
else{
  console.log(`process size ${process[i]} ${memory[j]}`);
  space+=copyMemory[j];
  j++;
}
}
for(;i<processSize;i++)
{
  processLeft.push(i+1);
}

console.log(space);
  }
function findgreat(array,value)
{
  array.sort((a, b) => a - b);
 
  for(let i=0;i<array.length;i++)
  {
    if(array[i]>=value)
    {
      return array[i];
    
    }
  }
  return -1;
}
function findWorst(array,value)
{
  array.sort(function(a, b) {
    return b - a;
  });
  for(let i=0;i<array.length;i++)
  {
    if(array[i]>=value)
    {
      return array[i];
    
    }
  }
  return -1;
}
  function bestFit() {
    space = 0;
    const copyMemory2 = Array.from(memory);
    let processSize=(document.getElementById('processSize').value);
    processLeft.splice(0, processLeft.length);
    for(let i=0;i<processSize;i++)
    {const copyMemory = Array.from(copyMemory2);
let element=findgreat(copyMemory,process[i]);

if(element!=-1)
{

let index=copyMemory2.indexOf(element);
console.log(index);
var inputElement = document.getElementById(`output_size${index}`);

// Change the input type to text
let p=i+1;
inputElement.innerText=`Process${p}`;
inputElement.className='outputalloc';
space+=copyMemory2[index]-process[i];
copyMemory2[index]=0;
}
else{
  processLeft.push(i+1);
}

    }
  }

  function worstFit() {
    space = 0;
  let size=(document.getElementById('memorySize').value);
    let copyMemory2 = Array.from(memory);
    let processSize=(document.getElementById('processSize').value);
    processLeft.splice(0, processLeft.length);
    for(let i=0;i<processSize;i++)
    {const copyMemory = Array.from(copyMemory2);
let element=findWorst(copyMemory,process[i]);

if(element!=-1)
{

let index=copyMemory2.indexOf(element);

var inputElement = document.getElementById(`output_size${index}`);

let p=i+1;
inputElement.innerText=`Process${p}`;
inputElement.className='outputalloc';
space=space+copyMemory2[index]-process[i];
copyMemory2[index]=0;
}
else{
  processLeft.push(i+1);
}

    }
    
    for(let i=0;i<size;i++)
    {
console.log(copyMemory2[i]);
      space=space+copyMemory2[i];
    }
  }

  function displayMemory() {
    const memoryDiv = document.getElementById('memory');
    memoryDiv.innerHTML = '';
    for (let i = 0; i < memorySize; i++) {

      const block = document.createElement('input');
      block.className = memory[i] === 0 ? 'memory-block free' : 'memory-block allocated';
      memoryDiv.appendChild(block);
    }
  }
submit.addEventListener('click',function()
{  const outputDiv = document.getElementById('outputDiv');
let insideout=document.getElementById('insideout');
insideout.className='bg-blue-200 p-3 mt-4';
// Clear the output div before creating new elements
outputDiv.innerHTML = '';
let Size =(document.getElementById('memorySize').value);
for(let i=0;i<Size;i++)
{
    let block = document.createElement('div');
    block.id=`output_size${i}`;
    block.className =  'memory-block null';
    outputDiv.appendChild(block);
}

      const strategy = document.getElementById('strategy').value;
    switch (strategy) {
      case 'firstFit':
        firstFit();
        break;
      case 'nextFit':
        nextFit();
        break;
      case 'bestFit':
        bestFit();
        break;
      case 'worstFit':
        worstFit();
        break;
      default:
        console.error('Invalid allocation strategy');
    }
   outputDiv.append();
   let newRow = document.createElement('div');
newRow.className = 'row justify-content-between';
   let h5=document.createElement('div');
   h5.textContent=`Total Space left in Memory:${space}`;
   h5.className='col-auto';
   newRow.appendChild(h5)
   outputDiv.appendChild(newRow);
   let body=document.querySelector('body');
  
   insideout.innerHTML='';
   let h1=document.createElement('h4');
   h1.textContent='Processes not placed in Memory:';
   h1.style.marginBottom='10px';
   insideout.appendChild(h1);


   for(let i=0;i<processLeft.length;i++)
   {
   let box = document.createElement('div');
  
    box.className = 'border border-gray-400 p-3 text-center';

    box.textContent = `Process ${processLeft[i]}`;
    
    insideout.appendChild(box);
  }
  body.append(insideout);
  //  displayMemory();
})
  // Initialize memory on page load
  window.onload = function() {
    memorySize = parseInt(document.getElementById('memorySize').value);
    initializeMemory();
    displayMemory();
  };