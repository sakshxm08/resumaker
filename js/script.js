// --------------------------- ADDING INPUTS -----------------------------

let addProject = document.getElementById("addProject");
let projectContent = document.getElementById("projectContent");
addProject.addEventListener("click", () => {
  const node = document.createElement("input");
  node.type = "text";
  node.name = "project";
  node.classList.add("projectSet");
  node.placeholder = "Project Link";
  projectContent.appendChild(node);
});
let addIntern = document.getElementById("addIntern");
let internContent = document.getElementById("internContent");
addIntern.addEventListener("click", () => {
  const node = document.createElement("input");
  node.type = "text";
  node.placeholder = "Your Intern";
  node.classList.add("internSet");
  internContent.appendChild(node);
});
let addSkill = document.getElementById("addSkill");
let skillContent = document.getElementById("skillContent");
addSkill.addEventListener("click", () => {
  const node = document.createElement("input");
  node.type = "text";
  node.classList.add("skillSet");
  node.placeholder = "Your skill";
  skillContent.appendChild(node);
});

// ---------------------------- STORING INPUT VALUES ---------------------------
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let age = document.getElementById("age");
let about = document.getElementById("about");
let userImg = document.getElementById("userImg");
let school = document.getElementById("school");
let xMarks = document.getElementById("xMarks");
let xiiMarks = document.getElementById("xiiMarks");
let yocSchool = document.getElementById("yocSchool");
let college = document.getElementById("college");
let course = document.getElementById("course");
let yocCollege = document.getElementById("yocCollege");

// ---------------------------USER IMAGE SET FUNCTION -------------------------------
window.addEventListener("load", function () {
  document
    .querySelector('input[type="file"]')
    .addEventListener("change", function () {
      if (this.files && this.files[0]) {
        let img = document.querySelector("#img"); // $('img')[0]
        img.src = URL.createObjectURL(this.files[0]); // set src to file url
      }
    });
});

// -----------------------------PREVIEW ------------------------------
let preview = document.getElementById("previewBtn");
let resFile = "resume_1.html";
let design_1 = document.getElementById("design-1");
let design_2 = document.getElementById("design-2");
let design_3 = document.getElementById("design-3");
let design_4 = document.getElementById("design-4");
let design_5 = document.getElementById("design-5");

preview.addEventListener("click", async () => {
  setDesign();

  let design = document.querySelectorAll(".design");
  for (let i = 0; i < design.length; i++) {
    design[i].addEventListener("click", () => {
      resFile = `resume_${i + 1}.html`;
      setDesign();
    });
  }
});

const setDesign = async () => {
  document.getElementById("spinner").style.display = "flex";
  document.querySelector(".resumeMain").style.display = "none";
  await fetch(resFile)
    .then(function (response) {
      // The API call was successful!
      return response.text();
    })
    .then(function (html) {
      // This is the HTML from our response as a text string
      document.querySelector(".resumeMain").innerHTML = html;
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
  setTimeout(fillResume, 2000);
};
const fillResume = () => {
  document.getElementById("spinner").style.display = "none";
  document.querySelector(".resumeParent").style.display = "flex";
  document.querySelector(".resumeMain").style.display = "flex";

  let resAbout = document.getElementById("resAbout");
  let resName = document.getElementById("resName");
  let resCollege = document.getElementById("resCollege");
  let resCourse = document.getElementById("resCourse");
  let resYocCollege = document.getElementById("resYocCollege");
  let resSchool = document.getElementById("resSchool");
  let resYocSchool = document.getElementById("resYocSchool");
  let resXmarks = document.getElementById("resXmarks");
  let resXIImarks = document.getElementById("resXIImarks");
  let resSkills = document.getElementById("resSkills");
  let resProjects = document.getElementById("resProjects");
  let resCompany = document.getElementById("resCompany");
  let skillSet = document.querySelectorAll(".skillSet");
  let projectSet = document.querySelectorAll(".projectSet");
  let internSet = document.querySelectorAll(".internSet");
  resName.innerText = fname.value + " " + lname.value;
  resAbout.innerText = about.value;
  resCollege.innerText = college.value;
  resCourse.innerText = course.value;
  resYocCollege.innerText = yocCollege.value;
  resSchool.innerText = school.value;
  resYocSchool.innerText = yocSchool.value;
  resXmarks.innerText = xMarks.value;
  resXIImarks.innerText = xiiMarks.value;
  resSkills.innerHTML = "";
  resProjects.innerHTML = "";
  resCompany.innerHTML = "";

  if (
    document.querySelector('input[type="file"]').files &&
    document.querySelector('input[type="file"]').files[0]
  ) {
    let resImg = document.querySelector("#resImg"); // $('img')[0]
    resImg.src = URL.createObjectURL(
      document.querySelector('input[type="file"]').files[0]
    ); // set src to file url
  }
  for (let i = 0; i < skillSet.length; i++) {
    if (skillSet[i].value) {
      resSkills.innerHTML =
        resSkills.innerHTML + `<span class="skill">${skillSet[i].value}</span>`;
    }
  }
  for (let i = 0; i < projectSet.length; i++) {
    if (projectSet[i].value) {
      resProjects.innerHTML =
        resProjects.innerHTML +
        `<a
                href="https://${projectSet[i].value}"
                class="project"
                target="_blank"
                >${projectSet[i].value}</a
              >
           `;
    }
  }
  for (let i = 0; i < internSet.length; i++) {
    if (internSet[i].value) {
      resCompany.innerHTML =
        resCompany.innerHTML +
        `<span class="compName">${internSet[i].value}</span>`;
    }
  }
};

// ---------------------------RESUME CLOSE---------------------------
let close = document.getElementById("close");
close.addEventListener("click", () => {
  document.querySelector(".resumeParent").style.display = "none";
});

// ------------------- DOWNLOAD PDF ---------------------------

let button = document.getElementById("submitBtn");
let makepdf = document.getElementById("resume");

button.addEventListener("click", function (e) {
  // html2pdf().from(makepdf).save();
  html2canvas(document.querySelector("#resume")).then((canvas) => {
    window.base64image = canvas.toDataURL("image/png");

    window.jsPDF = window.jspdf.jsPDF;
    let pdf = jsPDF("p", "in", [11.69, 8.27]);
    pdf.addImage(base64image, "PNG", 0, 0, 8.27, 11.69);
    pdf.save("resume.pdf");
  });
});
