
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
  {
    id: 4,
    name: "Gordon Beansay",
    house: "Slytherin",
    imgURL: "https://static.boredpanda.com/blog/wp-content/uploads/2020/04/gordon-ramsay-5e980da4014fd__880.jpg"
  },
  {
    id: 5,
    name: "Bean Harrington",
    house: "Hufflepuff",
    imgURL: "https://static.boredpanda.com/blog/wp-content/uploads/2020/04/Bean-harrington-5e980d92a1f3e__880.jpg"
  },
  {
    id: 6,
    name: "Her Royal Beanness, Bean Elizabeth II",
    house: "Gryffindor",
    imgURL: "https://www.boredpanda.com/blog/wp-content/uploads/2022/07/kingdomofbean_116428777_3109501102436284_8944407196081386068_n-62c7d093c1aa2__880.jpg"
  },
  {
    id: 7,
    name: "Leonardo Dibeanio",
    house: "Ravenclaw",
    imgURL: "https://www.boredpanda.com/blog/wp-content/uploads/2022/07/kingdomofbean_97208208_589354268673693_9197022883176026636_n-62c7d0426dfc7__880.jpg"
  },
  {
    id: 8,
    name: "Justin Beanber",
    house: "Slytherin",
    imgURL: "https://www.boredpanda.com/blog/wp-content/uploads/2022/07/kingdomofbean_95865566_158702342287846_4618543140992114017_n-62c7d02d2bcb0__880.jpg"
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
  <div class="card-body  ${student.house}">
    <h5 class="card-title">${student.name}</h5>
    <p class="card-text">House: ${student.house}</p>
    <button id="expelButton--${student.id}" type="button" class="btn btn-dark">Expelliarmus!</button>
  </div>
</div>`
   }
   renderToDom('#app', domString)  
   document.querySelector("#app").addEventListener("click", expelStudent)
} 

const expelledCardsOnDom = (array) => {
  let domString = "";
    for (const student of array) {
       domString += `<div class="card" style="width: 18rem;">
  <img src="${student.imgURL}" class="card-img-top" alt="${student.name}">
  <div class="card-body dark-side">
    <h5 class="card-title">${student.name}</h5>
    <p class="card-text">Joined the dark side!</p>
  </div>
</div>`
   }
   renderToDom('#bad', domString)  
  
} 


// first attempt at expel button

const expelStudent = (event) => {
  if (event.target.id.includes("expelButton")) {
    const [, studentId] = event.target.id.split("--")
    const studentIndex = students.findIndex((student) => Number(studentId) === student.id
    )
    const expelledStudent = students[studentIndex]
    students.splice(studentIndex, 1)
    expelledStudents.push(expelledStudent)

    expelledCardsOnDom(expelledStudents)
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
      houseArray.unshift(student)
    }
  }

  return houseArray
}



allStudents.addEventListener('click', () => {
  cardsOnDom(students)
  expelledCardsOnDom(expelledStudents)
})

gryffindorButton.addEventListener('click', () => {
  const gryffStudents = filter(students, 'Gryffindor')
  cardsOnDom(gryffStudents)
})

hufflepuffButton.addEventListener('click', () => {
  const huffStudents = filter(students, 'Hufflepuff')
  cardsOnDom(huffStudents)
})

ravenclawButton.addEventListener('click', () => {
  const ravenStudents = filter(students, 'Ravenclaw')
  cardsOnDom(ravenStudents)
})

slytherinButton.addEventListener('click', () => {
  const slythStudents = filter(students, 'Slytherin')
  cardsOnDom(slythStudents)
})

const form = document.querySelector('form')

const newStudent = (e) => {
  e.preventDefault()

  const randNum = Math.floor(Math.random() * 4)


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


  

  const newStudentObj = {
    id: students.length + 2,
    name: document.querySelector("#name").value,
    house: house,
    imgURL: document.querySelector("#url").value,
  }

  students.push(newStudentObj)
  cardsOnDom(students)
  expelledCardsOnDom(expelledStudents)
  form.reset()
}

form.addEventListener('submit', newStudent)

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

const app = document.querySelector('#app')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})
