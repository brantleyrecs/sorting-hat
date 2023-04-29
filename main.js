
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
  }
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
  </div>
</div>`
  }

  renderToDom('#app', domString)
  console.log(domString);
} 


const allStudents = document.querySelector('#all-students')


allStudents.addEventListener('click', () => {
  cardsOnDom(students)
})

const form = document.querySelector('form')

const newStudent = (e) => {
  e.preventDefault()

  const newStudentObj = {
    id: students.length + 1,
    name: document.querySelector("#name").value,
    // house: document.querySelector("#house").value,
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
