//this populates the program drop down
const fetchPrograms = async () => {
    await fetch('/api/programs',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'  
    }).then(response=>{
        return response.json() 
    }).then(data=>{ 
        data.forEach(program=>{
                let programEl = document.getElementById("sel-program");
                programEl.innerHTML += '<option value= "' + program + '">' + program + '</option>' 
                }); 
    })
    
} 

//this populates the year of graduation drop down
const fetchGraduationYears = async () => {
    await fetch('/api/graduationYears',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'  
    }).then(response=>{
        return response.json() 
    }).then(data=>{
        data.forEach(year =>{
            let gradEl = document.getElementById("sel-grad-year");
            gradEl.innerHTML += '<option value= "' + year + '">' + year + '</option>' 
        })
    })
} 

    //process the signup form
    const signupFormSubmit = ()=>{
        let submitFormEl = document.getElementById("submit-signup");
        submitFormEl.addEventListener('click', (e) => {
            e.preventDefault(); 
        
                let dataObj = {
                    "firstname": document.getElementsByName("firstName")[0].value,
                    "lastname": document.getElementsByName("lastName")[0].value,
                    "email": document.getElementsByName("email")[0].value,
                    "password": document.getElementsByName("password")[0].value,
                    "matricNumber": document.getElementsByName("matricNumber")[0].value,
                    "program": document.getElementsByName("program")[0].value,
                    "graduationYear": document.getElementsByName("graduationYear")[0].value
                };
        
                fetch('/api/register', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(dataObj)
                }).then(response=> { 
                        return response.json();
                    
                    }).then(data=>{   
                        if(data.status=='ok'){
                        let uid = data.data['id'];
                        setCookie(uid,7); 
                        window.location.href = 'index.html';
                        }else{
                            let errors = "";
                            data.errors.map(e=>{
                                errors +=`${e}<br>`
                            });
                            let div = document.getElementById('error-alert');
                            div.classList.add('alert-danger');
                            let p = document.createElement("p");
                            p.innerHTML = errors;
                            div.appendChild(p);
                        }
                     
                }).catch(error=>{
                    console.log('error',error);
                });
                
        })
    }
    
  //get username from cookie  
  const fetchUsername = async () =>{  
    let uid="";
    document.cookie
    .split('; ')
    .find(row => {
        if(row.startsWith('uid=')){
       uid = row.split('=')[1];
    }}) 
    
      let url = `/api/users/${uid}`;
      if(uid !=='' ){
        await fetch(url,{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET' 
        }).then(response=>{
            return response.json()
        }).then(data=>{
            let logoutEls = document.querySelector('#logout');
            let usernameEls = document.querySelector('#username');
            logoutEls.innerHTML='Logout'
            usernameEls.innerHTML = `Hi, ${data.firstname}`;
             logoutEls.addEventListener('click',(e)=>{
                 e.preventDefault();
                 document.cookie ='uid=; expires=Wed, 19 May 2021 00:00:00 UTC; path=/;';
                 window.location.href='index.html';
             });
             usernameEls.href = '#'; 
        })
      } 
    
  } 

  //get the project author
  const createdBy = async () =>{
    let uid="";
    document.cookie
    .split('; ')
    .find(row => {
        if(row.startsWith('uid=')){
       uid = row.split('=')[1];
    }}) 
    
      let url = `/api/users/${uid}`;
      if(uid !=='' ){
      const username =  await fetch(url,{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET' 
        })
        .then(response=>
             response.json()
        ) 
        return `${username.firstname} ${username.lastname}`;
      }  
  } 

  //process the login form
  const loginFormSubmit = ()=>{
    let submitFormEl = document.querySelector('#loginForm #submit-login');
    let emailEl = document.querySelector('#loginForm input[name="email"]');
    let passwordEl = document.querySelector('#loginForm input[name="password"]');
    submitFormEl.addEventListener('click',(e)=>{
        e.preventDefault();
        let formObj = {
            'email': emailEl.value,
            'password': passwordEl.value
        };
        fetch('/api/login',{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formObj)
        }).then(response=> {
            if(response.status===200){
                return response.json();
            }else{
            let errormsg='';
            let div = document.getElementById('error-alert');
            div.classList.add('alert-danger');
            let p = document.createElement("p");
            errormsg +='Invalid email/password';
            p.innerHTML = errormsg;
            div.appendChild(p); 
            }
            })
        .then(data=>{  
            let uid = data.data['id'];
            setCookie(uid,7); 
            window.location.href = 'index.html';  
            
        })
    })
  }

  //process the create project form
  const createProjectFormSubmit = ()=>{
      
    let submitFormEl = document.getElementById('submit-project');
      submitFormEl.addEventListener('click',(e)=>{
          e.preventDefault();  
          
          let nameEl = document.querySelector('#createProjectForm input[name="name"]');
          let abstractEl = document.querySelector('#createProjectForm textarea[name="abstract"]');
          let authorsEl = document.querySelector('#createProjectForm input[name="authors"]');
          let tagsEl = document.querySelector('#createProjectForm input[name="tags"]');
          let formObj ={
            "name": nameEl.value,
            "abstract": abstractEl.value,
            "authors": authorsEl.value.split(","),
            "tags": tagsEl.value.split(",")
          };
          fetch('/api/projects',{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formObj)
        }).then(response=> {  
                return response.json(); 
            })
        .then(data=>{    
            if(data.status=='ok'){ 
                window.location.href = 'index.html'; 
            } else {
                let errors = "";
                data.errors.map(e => {
                    errors += `${e}<br>`
                });
                let div = document.getElementById('error-alert');
                div.classList.add('alert-danger');
                let p = document.createElement("p");
                p.innerHTML = errors;
                div.appendChild(p);
            }
             
            
        })
      })
  }

  //check if a user is logged in
  const redirectToLogin = () =>{
      let uid = '';
      document.cookie
      .split('; ')
      .filter(row => {
          if(row.startsWith('uid=')){
           uid = row.split('=')[1];
          }})
          console.log(uid)
      
      if(uid == ''){
          window.location.href = 'login.html';
      }else{
        createProjectFormSubmit();
      }
  }

  const updateProjectList = async () =>{
    await fetch('/api/projects',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(response=>response.json())
    .then(data=>{ 
        
        for (let i = 0; i < 4; i++) { 
            let divShowcaseEl = document.querySelector('.showcase');
            let firsDivEl = document.createElement('div');
            firsDivEl.classList.add('col-md-3', 'mr-auto');
            let cardDivEl = document.createElement('div');
            cardDivEl.classList.add('card');
            let cardBodyDivEl = document.createElement('div');
            cardBodyDivEl.classList.add('card-body');
            let h5El = document.createElement('h5');
            h5El.classList.add('card-title');
            let h6El = document.createElement('h6');
            h5El.classList.add('card-subtitle', 'mb-2', 'text-muted');
            let pEl = document.createElement('p');
            pEl.classList.add('card-text');
            let aEl = document.createElement('a');
            aEl.classList.add('card-link');
            h5El.innerHTML = '<a id=viewid href=viewproject.html?id=' + `${data[i].id}` + '> ' + data[i].name + '</a>'
            let authors = data[i].authors;
            if (authors !== null) {
                h6El.textContent = data[i].authors.join(',');
            }
            pEl.textContent = data[i].abstract;
            let tags = data[i].tags;
            if (tags !== null) {
                tags.forEach(tag => { 
                    aEl.href = '#';
                    aEl.textContent += '#' + tag;
                })
            }
            divShowcaseEl.appendChild(firsDivEl);
            firsDivEl.appendChild(cardDivEl);
            cardDivEl.appendChild(cardBodyDivEl);
            cardBodyDivEl.appendChild(h5El);
            cardBodyDivEl.appendChild(h6El);
            cardBodyDivEl.appendChild(pEl);
            cardBodyDivEl.appendChild(aEl); 
        }
    });
  }

  //process viewproject 
  
      const viewProjectById = async () =>{
        // const user = await createdBy();
        let paramString = window.location.href;
        var searchParam = new URLSearchParams(paramString);
        // var projectId = searchParam.get("http://localhost:4000/project-explorer/viewproject.html?id");
        let params = new URLSearchParams(document.location.search.substring(1));
        let pId = params.get("id");
        let url= `/api/projects/${pId}`;
        await fetch(url,{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response=>response.json())
        .then(res=>{
            let projectName = document.getElementById('project_name');
            let projectAbstract = document.getElementById('project_abstract');
            let projectAuthors = document.getElementById('project_authors');
            // let projectTags = document.getElementById('project_tags');
            let projectAuthor = document.getElementById('project_author');
            projectName.innerHTML = `<h5>${res.name}</h5>`;
            projectAbstract.textContent = res.abstract;

            let authors = res.authors.map((item) => {
                return `<p class="card-text">${item}</p>`
            }).join("");
            project_authors.innerHTML = authors;


            let projectTags = res.tags;
            document.getElementById("project_tags").innerHTML = projectTags


            let project_author = document.getElementById("project_author");

            fetch(`/api/users/${res.createdBy}`)
                .then(res => res.json())
                .then((res) => {
                    project_author.textContent = `${res.firstname} ${res.lastname} `
                })
                .catch(e => console.log(e))
        
            // projectAuthors.textContent = data.authors;
            // projectTags.textContent = data.tags;
            // projectAuthor.textContent = user; 
        })
      }


//set cookie
function setCookie(cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = "uid=" + cvalue + ";" + expires + ";path=/";
    console.log('document.cookie',document.cookie);
  }

if (window.location.href.includes('register.html')) {
    fetchPrograms();
    fetchGraduationYears();
    signupFormSubmit();
}
if (window.location.href.includes('index.html')){
    updateProjectList(); 
}
if (window.location.href.includes("login.html")){
    loginFormSubmit();
}
if (window.location.href.includes('createproject.html')){
    redirectToLogin();
}
if (window.location.href.includes('viewproject.html')){
    viewProjectById(); 
}

window.onload = fetchUsername();


if (window.location.href.includes('viewprojecst.html')) {
    window.onload = function () {

        let params = new URLSearchParams(document.location.search.substring(1));
        let pId = params.get("id");

        fetch(`/api/projects/${pId}`)
            .then(res => res.json())
            .then((res) => {
                const project_name = document.getElementById("project_name");
                project_name.innerHTML = `<h3>${res.name}</h3>`;

                const project_abstract = document.getElementById("project_abstract");
                project_abstract.textContent = `${res.abstract}`;

                const project_authors = document.getElementById("project_authors");

                let authors = res.authors.map((item) => {
                    return `<p class="card-text">${item}</p>`
                }).join("");
                project_authors.innerHTML = authors;


                let projectTags = res.tags;
                document.getElementById("project_tags").innerHTML = projectTags


                let project_author = document.getElementById("project_author");

                fetch(`/api/users/${res.createdBy}`)
                    .then(res => res.json())
                    .then((res) => {
                        project_author.textContent = `${res.firstname} ${res.lastname} `
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))

    }
}