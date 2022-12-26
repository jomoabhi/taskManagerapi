const userInfoUpdate = document.querySelector(".userInfoForm");
const userPassUpdate = document.querySelector(".userPassForm");
const userAccountDelete = document.querySelector(".userDeleteAction");
const input1 = document.querySelector("#username");
const input2 = document.querySelector("#email");
const input3 = document.querySelector("#age");
const input4 = document.querySelector("#password");

fetch("/users/me")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const name = data.name;
    const email = data.email;
    const age = data.age;
    // console.log(name);
    // console.log(email);
    // console.log(age);
    input1.value = name;
    input2.value = email;
    input3.value = age;
  });

userInfoUpdate.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = input1.value;
  const useremail = input2.value;
  const userage = input3.value;
  //   console.log(username);
  //   console.log(useremail);
  //   console.log(userage);

  params = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      name: username,
      email: useremail,
      age: userage,
    }),
  };
  fetch("/users/me", params)
    .then((response) => {
      if (!response.ok) {
        throw "All fields are mandatory";
      } else {
        return response.json();
      }
    })
    .then((data) => {
      input1.value = data.name;
      input2.value = data.email;
      input3.value = data.age;
      alert("Profile Updated Successfully");
    })
    .catch((error) => {
      alert(error);
    });
});

userPassUpdate.addEventListener("submit", (e) => {
  e.preventDefault();

  const userpassword = input4.value;

  params = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password: userpassword,
    }),
  };
  fetch("/users/me", params)
    .then((response) => {
      if (!response.ok) {
        throw "Password must be greater than 6 characters";
      } else {
        return response.json();
      }
    })
    .then((data) => {
      alert("Password Updated Successfully");
      location.href = "/profile";
    })
    .catch((error) => {
      alert(error);
    });
});

const signOut = document.querySelector("#logOut");

signOut.addEventListener("click", (e) => {
  fetch("/users/logout", {
    method: "POST",
  }).then((response) => {
    console.log("Successfully Logged Out");
    location.replace("/");
  });
});

const signOutAll = document.querySelector("#logOutAll");

signOutAll.addEventListener("click", (e) => {
  fetch("/users/logoutAll", {
    method: "POST",
  }).then((response) => {
    console.log("Logged Out from all devices");
    location.href = "/";
  });
});

userAccountDelete.addEventListener("submit", (e) => {
  e.preventDefault();

  if (window.confirm("Are you sure? This can NOT be undone!")) {
    fetch("/users/me", {
      method: "DELETE",
    }).then(() => {
      location.href = "/";
    });
  } else {
    location.href = "/profile";
  }
});
