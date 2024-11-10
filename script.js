// function to open dialog box 
function openDialog() {
    document.getElementById('dialogOverlay').style.display = 'flex';
    document.getElementById('addNote').style.display = 'none';
}

// function to close dialog box 
function closeDialog() {
    document.getElementById('dialogOverlay').style.display = 'none';
    document.getElementById('addNote').style.display = 'flex';
}

// function which is triggered when the button to add note is clicked 
function addNote(){
    openDialog();
}

// function which creates the new note and adds it to the container and also stores info in localStorage
function submitInput(){
    // obtaining the input entered by the user 
    let head=document.getElementById('listHeading').value;
    let desc=document.getElementById('description').value;
    // storing the user input in the form of object 
    let obj={
        description:desc,
        color:'none'
    }
    // storing in localStorage
    localStorage.setItem(head,JSON.stringify(obj));

    // creating new note and its elements 
    let newNote=document.createElement('div');
    newNote.classList.add('Note');
    let heading=document.createElement('div');
    heading.classList.add('noteHeading');
    let description=document.createElement('div');
    description.classList.add('description');

    // adding the info to the elements of the note 
    heading.innerHTML=head;
    description.innerHTML=desc;

    // creating the button that changes color of the note 
    let btn=document.createElement('button');
    btn.classList.add('changeLook');
    btn.innerHTML='<i class="fa-solid fa-bars"></i>';
    btn.addEventListener('click',(e)=>{
        popupTrigger(e.currentTarget);
    })

    // adding elements to the note 
    newNote.appendChild(heading);
    newNote.appendChild(description);
    newNote.appendChild(btn);

    // adding new note to the container 
    document.getElementById('container').appendChild(newNote);
    // closing the dialog box 
    closeDialog();
}


// adding notes present in localStorage
for(let i=0;i<localStorage.length;i++){
    // Creating new note and its children elements and adding their respective classes
    let newNote=document.createElement('div');
    newNote.classList.add('Note');
    let heading=document.createElement('div');
    heading.classList.add('noteHeading');
    let description=document.createElement('div');
    description.classList.add('description');

    // obtaining heading and object from localStorage
    heading.innerHTML=localStorage.key(i);
    let obj=JSON.parse(localStorage.getItem(localStorage.key(i)));
    
    // obtaining description of note from object 
    description.innerHTML=obj.description;

    // adding classes to the note and its elements as per the color mentioned in the object 
    if(obj.color=='red'){
        heading.classList.add('redHead');
        newNote.classList.add('redBack');
    }else if(obj.color=='yellow'){
        heading.classList.add('yellowHead');
        newNote.classList.add('yellowBack');
    }else if(obj.color=='green'){
        heading.classList.add('greenHead');
        newNote.classList.add('greenBack');
    }

    // appending the children elements to the note container 
    newNote.appendChild(heading);
    newNote.appendChild(description);

    // creating the button that changes the color of the note 
    let btn=document.createElement('button');
    btn.classList.add('changeLook');
    btn.innerHTML='<i class="fa-solid fa-bars"></i>';
    
    // adding the EventListener to the button 
    btn.addEventListener('click',(event) => {
    
        popupTrigger(event.currentTarget);}
    );
    // appending the button to the note 
    newNote.appendChild(btn);

    // adding the note to the container 
    document.getElementById('container').appendChild(newNote);
}

// variable to store the element whose color should be changed 
let selectedElement='';
// popup element 
let pop=document.getElementById('popup-btn');

// function that toggles the popup at the site of the button which was clicked 
function popupTrigger(button){
    
    if(pop.style.display=='none' || pop.style.display==''){
        // obtaining the position coordinates of the button 
        const rect=button.getBoundingClientRect();
        pop.style.top=`${rect.bottom + window.scrollY}px`;
        pop.style.left=`${rect.left + window.scrollX}px`;
        pop.style.display='block';
        // recognizing the note whose color needs to be changed  
        selectedElement=button.parentElement;
    }else{
        selectedElement='';
        pop.style.display='none';
    }
}

// function that changes the color of the note 
function change(color){
    // obtaining the note and the heading element 
    let parent=selectedElement;
    let child=parent.firstElementChild;
    // getting object from localStorage
    let obj=JSON.parse(localStorage.getItem(child.innerHTML));

    // removing the color classes which are present 
    if(parent.classList.contains('yellowBack')){
        parent.classList.remove('yellowBack');
        child.classList.remove('yellowHead');
    }
    if(parent.classList.contains('greenBack')){
        parent.classList.remove('greenBack');
        child.classList.remove('greenHead');
    }
    if(parent.classList.contains('redBack')){
        parent.classList.remove('redBack');
        child.classList.remove('redHead');
    }

    // adding the color classes mentioned by the color variable
    if(color=='Red' ){
        parent.classList.add('redBack');
        child.classList.add('redHead');
        // changing the color value of object 
        obj.color='red';
    }else if(color=='Yellow'){
        parent.classList.add('yellowBack');
        child.classList.add('yellowHead');
        obj.color='yellow';
    }else if(color=='Green'){
        parent.classList.add('greenBack');
        child.classList.add('greenHead');
        obj.color='green';
    }else{
        obj.color='none';
    }

    // storing the object with the updated color value 
    localStorage.setItem(child.innerHTML,JSON.stringify(obj));
    // closing the popup 
    pop.style.display='none';
}

// button that opens the dialog box
let addBtn=document.getElementById('addBtn');
// button that creates the new note 
let submit=document.getElementById('submit');
// button that triggers popup 
let btn=document.getElementById('change');

// adding event listerner to the button that triggers popup 
btn.addEventListener('click',(event) => {
    popupTrigger(event.currentTarget);}
);

// adding event listeners 
addBtn.addEventListener('click',addNote);
submit.addEventListener('click',submitInput);