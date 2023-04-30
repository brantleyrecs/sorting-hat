
const students = [
  {
    id: 1,
    name: "Mr Bean Potter",
    house: "Gryffindor",
    imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8ZYSBv6W-khTliV1CljMIP3BCbX66NbvXRw&usqp=CAU"
  },
  {
     id: 2,
    name: "Ron Edward Beansley",
    house: "Gryffindor",
    imgURL: "https://static.boredpanda.com/blog/wp-content/uploads/2020/04/Bean-Sheeran-5e980d96dee76__880.jpg"
  },
]

const expelledStudents = [
  {
    id: 3,
    name: "Lord Valdibean",
    house: "Slytherin",
    imgURL: "https://sadanduseless.b-cdn.net/wp-content/uploads/2019/07/funny-mr-bean13.jpg"
  },
]

const renderToDom = (divId, htmlToRender) => {
    const selectedDiv = document.querySelector(divId)
    selectedDiv.innerHTML = htmlToRender
  }


const cardsOnDom = (array) => {
  let domString = "";
    for (const student of array) {
       domString += `<div class="card" style="width: 18rem;">
  <img src="${student.imgURL}" class="card-img-top" alt="${student.name}">
  <div class="card-body">
    <h5 class="card-title">${student.name}</h5>
    <p class="card-text">House: ${student.house}</p>
    <button id="expelButton--${student.id}" type="button" class="btn btn-danger">Expel!</button>
  </div>
</div>`
   }
   renderToDom('#app', domString)  
   document.querySelector("#app").addEventListener("click", expelStudent)
} 

const expelledOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `<div class="card" style="width: 18rem;">
  <img src="${student.imgURL}" class="card-img-top" alt="${student.name}">
  <div class="card-body">
    <h5 class="card-title">${student.name}</h5>
    <p class="card-text">Has gone to the dark side!</p>
  </div>
</div>`
  }
  renderToDom("#bad", domString)
}

const expelStudent = (event) => {
  if (event.target.id.includes("expelButton")) {
    const [, studentId] = event.target.id.split("--")
    const studentIndex = students.findIndex(
      (student) => Number(studentId) === student.id
    )
    const expelledStudent = students.splice(studentIndex, 1)
    expelledStudents.push(expelledStudent)

    expelledOnDom(expelledStudent)
    cardsOnDom(students)
    console.log(expelledStudents)
  }
}


const allStudents = document.querySelector('#all-students')
const gryffindorButton = document.querySelector('#gryffindor')
const hufflepuffButton = document.querySelector('#hufflepuff')
const ravenclawButton = document.querySelector('#ravenclaw')
const slytherinButton = document.querySelector('#slytherin')

const filter = (array, houseString) => {
  const houseArray = []

  for (const student of array) {
    if (student.house === houseString) {
      houseArray.push(student)
    }
  }

  return houseArray
}



allStudents.addEventListener('click', () => {
  cardsOnDom(students)
  expelledOnDom(expelledStudents)
})

gryffindorButton.addEventListener('click', () => {
  const gryffStudents = filter(students, 'gryffindor')
  cardsOnDom(gryffStudents)
})

const form = document.querySelector('form')

const newStudent = (e) => {
  e.preventDefault()

  const randNum = Math.floor(Math.random() * 4)

  const randomHouse = students[randNum]

  switch(randNum) {
    case 0:
      house = 'Gryffindor';
      break;
    case 1:
      house =  'Hufflepuff';
      break;
    case 2: 
      house =  'Ravenclaw';
      break;
    case 3:
      house =  'Slytherin';
      break;
    default:
      house =  'No house for you';
  };

  console.log(randNum);

  

  const newStudentObj = {
    id: students.length + 2,
    name: document.querySelector("#name").value,
    house: randomHouse.house,
    imgURL: document.querySelector("#url").value,
  }

  students.push(newStudentObj)
  cardsOnDom(students)
  form.reset()
}

form.addEventListener('submit', newStudent)

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

const app = document.querySelector('#app')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})
